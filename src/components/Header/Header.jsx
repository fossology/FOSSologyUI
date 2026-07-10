/*
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { cva } from "class-variance-authority";

import { DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSub, 
  DropdownMenuSubTrigger, 
  DropdownMenuSubContent} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Services
import { getAllGroups, fetchAllGroups } from "@/services/groups";

// Constants
import routes from "@/constants/routes";
import externalLinks from "@/constants/externalLinks";

// Helpers
import { logout, isAuth, getUserName, isAdmin } from "@/shared/authHelper";
import { getLocalStorage, setLocalStorage } from "@/shared/storageHelper";

const topNavigationVariants = cva(
  "sticky top-0 z-50 text-sm border-b flex items-center justify-between px-6",
  {
    variants: {
      variant: {
        default: "bg-neutral-300 border-neutral-300",
        compact: "bg-neutral-100 border-neutral-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export default function Header({ variant = "default" }) {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isOrganizeOpen, setIsOrganizeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isGroupSelectOpen, setIsGroupSelectOpen] = useState(false);

  const isHomeActive = pathname === routes.home;

  const isSearchActive = pathname === routes.search;

  const isBrowseActive = pathname === routes.browse;

  const isUploadActive = (isOpen || pathname.startsWith("/upload"));

  const isJobsActive = (isJobsOpen || pathname.startsWith("/jobs"));

  const isOrganizeActive = (isOrganizeOpen || pathname.startsWith("/organize"));

  const isAdminActive = (isAdminOpen || pathname.startsWith("/admin"));

  const isHelpActive = (isHelpOpen || pathname.startsWith("/help"));

  // Re-check auth state on every route change (covers post-login redirect)
  useEffect(() => {
    setAuthenticated(isAuth());
    setAdmin(isAdmin());
    setUserName(getUserName() || "");
    const defaultGroup =
      getLocalStorage("currentGroup") ||
      getLocalStorage("user")?.defaultGroup;
    setCurrentGroup(defaultGroup);
  }, [pathname]);

  // Fetch groups once on mount
  useEffect(() => {
    const stored = getAllGroups();
    if (stored?.length) {
      setGroups(stored);
    } else {
      fetchAllGroups().then(setGroups).catch(() => {});
    }
  }, []);

  const handleGroupChange = (groupName) => {
    setLocalStorage("currentGroup", groupName);
    setCurrentGroup(groupName);
  };

  return (
    <header className={topNavigationVariants({ variant })}>
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src="/assets/images/logo.svg" alt="FOSSology Logo" className="h-13" />

        {/* Navigation Menu */}
        <nav className="hidden md:flex">
          <Link href={routes.home} className={clsx("flex items-center h-13 p-4 justify-between", !isHomeActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium")}>Home</Link>
          {authenticated && (
            <>
              <Link href={routes.search} className={clsx("flex items-center h-13 p-4 justify-between", !isSearchActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium")}>Search</Link>
              <Link href={routes.browse} className={clsx("flex items-center h-13 p-4 justify-between", !isBrowseActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium")}>Browse</Link>

              {/* Uploads Dropdown */}
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger
                  className={clsx(
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isUploadActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium"
                  )}
                >
                  Upload
                  {isOpen ? (
                      <img
                      src="/assets/icons/chevron_up/chevron_up_20px.svg"
                      alt="Chevron Up"
                      />
                  ) : (
                    <img
                      src="/assets/icons/chevron_down/chevron_down_20px.svg"
                      alt="Chevron Down"
                      />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={4} className="p-0 m-0 min-w-[200px] bg-white shadow-lg border border-gray-200 z-50">
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.file}>From File</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.server}>From Server</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.url}>From URL</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.vcs}>From Version Control System</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Import FOSSology Dump</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.importReport}>Import Report</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.instructions}>Instructions</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.oneShotCopyright}>One-Shot Copyright/Email/URL</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.oneShotMonk}>One-Shot Monk Analysis</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.upload.oneShotNomos}>One-Shot Nomos Analysis</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Jobs Dropdown */}
              <DropdownMenu open={isJobsOpen} onOpenChange={setIsJobsOpen}>
                <DropdownMenuTrigger
                  onClick={(e) => {
                    e.preventDefault();
                    setIsJobsOpen((prev) => !prev);
                  }}
                  className={clsx(
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isJobsActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium"
                  )}
                >
                  Jobs
                  {isJobsOpen ? <img
                      src="/assets/icons/chevron_up/chevron_up_20px.svg"
                      alt="Chevron Up"
                      />
                      : <img
                      src="/assets/icons/chevron_down/chevron_down_20px.svg"
                      alt="Chevron Down"
                      />}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={4} className="p-0 m-0 min-w-[200px] bg-white shadow-lg border border-gray-200 z-50">
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={routes.jobs.myRecentJobs}>My Recent Jobs</Link>
                  </DropdownMenuItem>
                  {admin && (
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                      <Link href={routes.jobs.allRecentJobs}>All Recent Jobs</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={routes.jobs.scheduleAgents}>Schedule Agents</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Organize Dropdown */}
              <DropdownMenu open={isOrganizeOpen} onOpenChange={setIsOrganizeOpen}>
                <DropdownMenuTrigger
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOrganizeOpen((prev) => !prev);
                  }}
                  className={clsx(
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isOrganizeActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium"
                  )}
                >
                  Organize
                  {isOrganizeOpen ? <img
                      src="/assets/icons/chevron_up/chevron_up_20px.svg"
                      alt="Chevron Up"
                      />: <img
                      src="/assets/icons/chevron_down/chevron_down_20px.svg"
                      alt="Chevron Down"
                      />}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={4} className="p-0 m-0 min-w-[220px] bg-white shadow-lg border border-gray-200 z-50">
                  <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.organize.folders.create}>Folders</Link></DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                    className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                    )}>Licenses
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                      <DropdownMenuItem asChild className="focus:bg-secondary  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.licenses.candidate}>Candidate Licenses</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-secondary  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.licenses.create}>Create Candidate License</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                    className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                    )}>Uploads
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                      <DropdownMenuItem asChild className="focus:bg-secondary  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.uploads.delete}>Delete Uploaded File</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-secondary  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.uploads.edit}>Edit Properties</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-secondary  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.uploads.move}>Move or Copy</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Admin Dropdown */}
              {admin && (
                <DropdownMenu open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                  <DropdownMenuTrigger
                    onClick={(e) => {
                      e.preventDefault();
                      setIsAdminOpen((prev) => !prev);
                    }}
                    className={clsx(
                      "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isAdminActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium"
                    )}
                  >
                    Admin
                    {isAdminOpen ? <img
                      src="/assets/icons/chevron_up/chevron_up_20px.svg"
                      alt="Chevron Up"
                      />: <img
                      src="/assets/icons/chevron_down/chevron_down_20px.svg"
                      alt="Chevron Down"
                      />}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={4} className="p-0 m-0 min-w-[240px] bg-white shadow-lg border border-gray-200 z-50">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Agent
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.admin.monk}>Monk</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Buckets
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Duplicate Bucketpool</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={""}>Customize</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Dashboards
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>All Jobs</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Folder/Upload Proportions</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Overview</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Statistics</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={""}>Fossdash</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                      <Link href={routes.admin.group.index}>Groups</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                      <Link href={""}>Standard Comments</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                      <Link href={""}>Acknowledgements</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                      <Link href={routes.admin.compatibility.selectCompatibility}>Compatibility Rules</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                      <Link href={routes.admin.license.create}>License Administration</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={routes.admin.maintenance}>Maintenance</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={routes.admin.obligation.add}>Obligation Administration</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={routes.admin.scheduler}>Scheduler</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={""}>Scheduler</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Tag
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Create Tag</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Enable/Disable Tag</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold">
                    <Link href={""}>Upload Permissions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Users
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.admin.users.add}>Add User</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.admin.users.edit}>Edit User Account</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.admin.users.delete}>Delete User</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {/* Help Dropdown */}
                <DropdownMenu open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                <DropdownMenuTrigger
                  className={clsx(
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isHelpActive ? "hover:border-b-2 hover:border-brand-900 hover:font-medium" : "border-b-2 border-brand-900 font-medium"
                  )}
                >
                  Help
                  {isHelpOpen ? (
                    <img
                      src="/assets/icons/chevron_up/chevron_up_20px.svg"
                      alt="Chevron Up"
                      />
                  ) : (
                    <img
                      src="/assets/icons/chevron_down/chevron_down_20px.svg"
                      alt="Chevron Down"
                      />
                  )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={4} className="p-0 m-0 min-w-[200px] bg-white shadow-lg border border-gray-200 z-50">
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.help.about}>About</Link></DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Debug
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Debug Menus</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Debug Plugins</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Debug User</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Flush Cache</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={""}>Global Variables</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={externalLinks.fossologyWiki} target="_blank" rel="noreferrer">Documentation</Link></DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-secondary hover:text-gray-900 hover:font-bold",
                        "focus:bg-secondary focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-secondary data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Getting Started
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.help.licenseBrowser}>License Browser</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.help.overview}>Overview</Link></DropdownMenuItem>                        
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="hover:font-bold focus:font-bold"><Link href={routes.help.thirdPartyLicenses}>Third Party Licenses</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </>
          )}
        </nav>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6 text-sm text-gray-800">
        {/* Group Dropdown */}
        {authenticated && (
          <DropdownMenu open={isGroupOpen} onOpenChange={setIsGroupOpen}>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.preventDefault();
                setIsGroupOpen((prev) => !prev);
              }}
              className={clsx(
                "flex items-center h-13 pr-2 pl-2 pt-4 pb-4 justify-between gap-2 hover:border-b-2 hover:border-gray-900 cursor-pointer",
                isGroupOpen && "text-brand-900"
              )}
            >
              <span
                className={clsx(
                  "block w-6 h-6 [mask-image:url('/assets/icons/User/User_24px.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
                  isGroupOpen ? "bg-brand-900" : "bg-gray-800"
                )}
              />
              Group: {currentGroup}
              {isGroupOpen ? (
                <span className="block w-4 h-4 bg-brand-900 [mask-image:url('/assets/icons/chevron_up/chevron_up_16px.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" />
              ) : (
                <span className="block w-4 h-4 bg-gray-800 [mask-image:url('/assets/icons/chevron_down/chevron_down_16px.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" />
              )}
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="min-w-[180px] bg-white shadow-md border border-gray-200 p-3"
            >
              <div className="flex flex-col gap-2">
                {/* Group Label */}
                <div htmlFor="groupSelect" className="text-sm  text-gray-700">
                <span className="font-semibold">Group: </span>{currentGroup}
                </div>

                {/* Group Select (custom dropdown) */}
                  <div className="relative">
                    <div
                      onClick={() => setIsGroupSelectOpen((prev) => !prev)}
                      className="border rounded-[4px] border-border px-3 py-2 text-sm cursor-pointer bg-white hover:bg-secondary flex justify-between items-center"
                    >
                      {currentGroup}
                      {isGroupSelectOpen ? (
                        <img
                        src="/assets/icons/chevron_up/chevron_up_16px.svg"
                        alt="Chevron Up"
                        />
                      ) : (
                        <img
                        src="/assets/icons/chevron_down/chevron_down_16px.svg"
                        alt="Chevron Down"
                        />
                      )}
                  </div>

                    {isGroupSelectOpen && (
                      <div className="mt-1 border rounded-[4px] border-border shadow bg-white overflow-hidden">
                        {groups.map((group) => (
                          <div
                            key={group.id}
                            onClick={() => {
                              handleGroupChange(group.name);
                              setIsGroupSelectOpen(false);
                            }}
                            className={clsx(
                              "px-3 py-2 text-sm cursor-pointer hover:bg-secondary",
                              group.name === currentGroup && "bg-secondary font-semibold"
                            )}
                          >
                            {group.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                {/* User Info */}
                <div className="text-sm mt-2">
                  <span className="font-semibold">User:</span> {userName}
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center gap-2 
                  group
                  text-primary 
                  border-primary 
                  hover:bg-accent 
                  hover:text-accent-foreground 
                  hover:border-accent-foreground 
                  cursor-pointer 
                  rounded-[4px] h-10 
                  font-medium text-base px-4 py-2"
                  onClick={() => logout(null)}
                >
                  <span className="block w-4 h-4 bg-primary group-hover:bg-accent-foreground [mask-image:url('/assets/icons/Logout/Logout_16px.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" />
                  Logout
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
