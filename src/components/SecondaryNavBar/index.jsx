/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

"use client";

import { useState } from "react"
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import routes from "@/constants/routes";
import { isAuth } from "@/shared/authHelper";
import Image from "next/image"
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  {
    name: "License Browser",
    href: (uploadID) => 
      uploadID 
    ? `${routes.browseUploads.licenseBrowser}?uploadID=${uploadID}`
    : routes.browseUploads.licenseBrowser,
    match: routes.browseUploads.licenseBrowser,
  },
  {
    name: "Copyright",
    href: routes.browseUploads.copyright,
    match: routes.browseUploads.copyright,
  },
  {
    name: "ECC",
    href: routes.browseUploads.ecc,
    match: routes.browseUploads.ecc,
  },
  {
    name: "IPRA",
    href: routes.browseUploads.ipra,
    match: routes.browseUploads.ipra,
  },
  {
    name: "Conf",
    href: routes.browseUploads.conf,
    match: routes.browseUploads.conf,
  }
];

const moreItems = [
  { name: "Software Heritage", href: routes.browseUploads.more.softwareHeritage},
  { name: "Email/URL/Author", href: routes.browseUploads.more.email },
  { name: "File Browser", href: routes.browseUploads.more.fileBrowser },
  { name: "Spasht", href: routes.browseUploads.more.spasht },
  { name: "Keyword", href: routes.browseUploads.more.keyword },
  { name: "Export List", href: routes.browseUploads.more.exportList },
  { name: "Search", href: routes.browseUploads.more.search },
  { name: "Bucket", href: routes.browseUploads.more.bucket },
  { name: "View", href: routes.browseUploads.more.view },
  { name: "Info", href: routes.browseUploads.more.info },
];


const BrowseHeader = ({ title }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const uploadID = searchParams.get("uploadID");

  const [open, setOpen] = useState(false)

  const isActive = moreItems.some((item) => pathname === item.href)

  const chevronIcon = open
    ? "/assets/icons/chevron_up/chevron_up_16px.svg"
    : "/assets/icons/chevron_down/chevron_down_16px.svg"

  const chevronColor = isActive ? "#004494" : "#101010"

  if (!isAuth()) return null;

  return (
    <div className="w-full bg-gray-100 h-18 px-4 flex items-end justify-between">
      {/* <div className="flex items-end justify-between"> */}
        {/* Dynamic Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 ml-8">{title}</h1>

        {/* Tabs */}
        <div className="flex h-full items-end">
        {navLinks.map((item) => {
          const href = typeof item.href === "function" ? item.href(uploadID) : item.href;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={href}
              className={cn(
                "px-4 py-2 text-sm font-medium border border-transparent rounded-t-md",
                isActive
                  ? "border-gray-300 border-b-white text-[#004494] bg-white"
                  : "text-gray-800 hover:text-[#004494] hover:bg-gray-100"
              )}
            >
              {item.name}
            </Link>
          );
        })}

        {/* "More" Dropdown */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm font-medium border border-transparent rounded-t-md",
              isActive
                ? "border-gray-300 border-b-white text-[#004494] bg-white"
                : "text-gray-800 hover:text-[#004494] hover:bg-gray-100"
            )}
          >
            More
            <Image
              src={chevronIcon}
              alt=""
              width={16}
              height={16}
              style={{ filter: `brightness(0) saturate(100%) invert(9%) sepia(9%) saturate(0%) hue-rotate(180deg) brightness(94%) contrast(100%)`, ...(isActive && {
                filter:
                  "invert(17%) sepia(99%) saturate(2306%) hue-rotate(204deg) brightness(91%) contrast(104%)"
              }) }}
              aria-hidden="true"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="p-0 m-0 bg-white shadow-md border border-gray-200"
          >
            {moreItems.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href}>{item.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      {/* </div> */}
    </div>
  );
};

export default BrowseHeader;

