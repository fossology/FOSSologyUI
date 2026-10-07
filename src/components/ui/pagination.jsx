/*
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import * as React from "react"
import Image from "next/image";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const paginationLinkVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        page: "h-8 w-8",
        nav: "h-8 px-2",
      },
      active: {
        true:
          "bg-tertiary1-800 text-white",
        false:
          "bg-transparent hover:bg-neutral-200",
      },
    },
    defaultVariants: {
      variant: "page",
      active: false,
    },
  }
);

const arrowFilter =
  "[filter:invert(17%)_sepia(99%)_saturate(2306%)_hue-rotate(204deg)_brightness(75%)_contrast(108%)]";

const disabledArrowFilter =
  "[filter:invert(82%)_sepia(13%)_saturate(585%)_hue-rotate(179deg)_brightness(92%)_contrast(89%)]";

function Pagination({
  className,
  ...props
}) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props} />
  );
}

function PaginationContent({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props} />
  );
}

function PaginationItem({
  ...props
}) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  variant = "page",
  disabled = false,
  children,
  onClick,
  href,
  ...props
}) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled}
      href={disabled ? undefined : href}
      onClick={
        disabled
          ? (e) => e.preventDefault()
          : onClick
      }
      className={cn(
        paginationLinkVariants({
          variant,
          active: isActive,
        }),
        disabled
          ? "cursor-default pointer-events-none text-tertiary1-400"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function PaginationPrevious({
  className,
  disabled = false,
  ...props
}) {
  return (
    <PaginationLink
      variant="nav"
      disabled={disabled}
      className={cn(
        "gap-1",
        disabled
          ? "text-tertiary1-400"
          : "text-tertiary1-800 hover:bg-neutral-200",
        className
      )}
      {...props}
    >
      <Image
        src="/assets/icons/ArrowLeft_20px.svg"
        width={20}
        height={20}
        alt=""
          className={`h-5 w-5 ${
            disabled ? disabledArrowFilter : arrowFilter
          }`}
      />

      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  disabled = false,
  ...props
}) {
  return (
    <PaginationLink
      variant="nav"
      disabled={disabled}
      className={cn(
        "gap-1",
        disabled
          ? "text-tertiary1-400"
          : "text-tertiary1-800 hover:bg-neutral-200",
        className
      )}
      {...props}
    >
      <span>Next</span>

      <Image
        src="/assets/icons/ArrowRight_20px.svg"
        width={20}
        height={20}
        alt=""
          className={`h-5 w-5 ${
            disabled ? disabledArrowFilter : arrowFilter
          }`}
      />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
}) {
  return (
    <span
      className={cn(
        "px-2",
        className
      )}
    >
      ...
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
