/*
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

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import { DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSub, 
  DropdownMenuSubTrigger, 
  DropdownMenuSubContent} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Services
import { getAllGroups } from "@/services/groups";

// Constants
import routes from "@/constants/routes";
import externalLinks from "@/constants/externalLinks";

// Helpers
import { logout, isAuth, getUserName, isAdmin } from "@/shared/authHelper";
import { getLocalStorage, setLocalStorage } from "@/shared/storageHelper";


export default function Header() {
  const [currentGroup, setCurrentGroup] = useState(null);
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

  useEffect(() => {
    const defaultGroup =
      getLocalStorage("currentGroup") ||
      getLocalStorage("user")?.default_group;
    setCurrentGroup(defaultGroup);
  }, []);

  const handleGroupChange = (groupName) => {
    setLocalStorage("currentGroup", groupName);
    setCurrentGroup(groupName);
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-300 text-sm border-b border-neutral-300 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src="/assets/images/logo.svg" alt="FOSSology Logo" className="h-13" />

        {/* Navigation Menu */}
        <nav className="hidden md:flex">
          <Link href={routes.home} className={clsx("flex items-center h-13 p-4 justify-between", !isHomeActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium")}>Home</Link>
          {isAuth() && (
            <>
              <Link href={routes.search} className={clsx("flex items-center h-13 p-4 justify-between", !isSearchActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium")}>Search</Link>
              <Link href={routes.browse} className={clsx("flex items-center h-13 p-4 justify-between", !isBrowseActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium")}>Browse</Link>

              {/* Uploads Dropdown */}
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger
                  className={clsx(
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isUploadActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium"
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
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.file}>From File</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.server}>From Server</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.url}>From URL</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.vcs}>From Version Control System</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Import FOSSology Dump</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.importReport}>Import Report</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.instructions}>Instructions</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.oneShotCopyright}>One-Shot Copyright/Email/URL</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.oneShotMonk}>One-Shot Monk Analysis</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.upload.oneShotAnalysis}>One-Shot Nomos Analysis</Link></DropdownMenuItem>
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
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isJobsActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium"
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
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                    <Link href={routes.jobs.myRecentJobs}>My Recent Jobs</Link>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                      <Link href={routes.jobs.allRecentJobs}>All Recent Jobs</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
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
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isOrganizeActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium"
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
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger   
                    className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                    )}>Folders
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.organize.folders.create}>Create</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.organize.folders.delete}>Delete Folder</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.organize.folders.edit}>Edit Properties</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.organize.folders.move}>Move or Copy</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.organize.folders.unlinkContent}>Unlink Content</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                    className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                    )}>Licenses
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED]  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.licenses.candidate}>Candidate Licenses</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED]  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.licenses.create}>Create Candidate License</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                    className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                    )}>Uploads
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED]  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.uploads.delete}>Delete Uploaded File</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED]  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.uploads.edit}>Edit Properties</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild className="focus:bg-[#EDEDED]  focus:text-gray-900 focus:font-bold"><Link href={routes.organize.uploads.move}>Move or Copy</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Admin Dropdown */}
              {isAdmin() && (
                <DropdownMenu open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                  <DropdownMenuTrigger
                    onClick={(e) => {
                      e.preventDefault();
                      setIsAdminOpen((prev) => !prev);
                    }}
                    className={clsx(
                      "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isAdminActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium"
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
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Agent
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Monk</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Buckets
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Duplicate Bucketpool</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                    <Link href={""}>Customize</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Dashboards
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>All Jobs</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Folder/Upload Proportions</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Overview</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Statistics</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                    <Link href={""}>Fossdash</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Groups
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.group.create}>Add Group</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.group.delete}>Delete Group</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Manage Group Users</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>License Administration
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Acknowledgements</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.license.create}>Add License</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.license.licenseCSV}>CSV Export All</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>CSV Export Marrydone</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Candidates</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Compatibility Rules</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>JSON Export All</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>JSON Export Marrydone</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>License Import</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Rules Export</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Rules Import</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.license.selectLicense}>Select License</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Standard Comments</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                    <Link href={routes.admin.maintenance}>Maintenance</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Obligation Administration
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Add Obligation</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>CSV Export</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>JSON Export</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Obligation Import</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Select Obligation</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                    <Link href={""}>Scheduler</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Tag
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Create Tag</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Enable/Disable Tag</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold">
                    <Link href={""}>Upload Permissions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Users
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.users.add}>Add User</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.users.edit}>Edit User Account</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.admin.users.delete}>Delete User</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {/* Help Dropdown */}
                <DropdownMenu open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                <DropdownMenuTrigger
                  className={clsx(
                    "flex items-center h-13 p-4 justify-between gap-1 cursor-pointer", !isHelpActive ? "hover:border-b-2 hover:border-[#C31730] hover:font-medium" : "border-b-2 border-[#C31730] font-medium"
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
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.help.about}>About</Link></DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Debug
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Debug Menus</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Debug Plugins</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Debug User</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Flush Cache</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={""}>Global Variables</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={externalLinks.fossologyWiki} target="_blank" rel="noreferrer">Documentation</Link></DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger 
                      className={clsx(
                        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md cursor-pointer",
                        "hover:bg-[#EDEDED] hover:text-gray-900 hover:font-bold",
                        "focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold",
                        "data-[state=open]:bg-[#EDEDED] data-[state=open]:text-gray-900 data-[state=open]:font-bold"
                      )}>Getting Started
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-0 m-0 bg-white border border-gray-200">
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.help.licenseBrowser}>License Browser</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.help.overview}>Overview</Link></DropdownMenuItem>                        
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild className="focus:bg-[#EDEDED] focus:text-gray-900 focus:font-bold"><Link href={routes.help.thirdPartyLicenses}>Third Party Licenses</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </>
          )}
        </nav>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6 text-sm text-gray-800">
        {/* Group Dropdown */}
        {getAllGroups() && (
          <DropdownMenu open={isGroupOpen} onOpenChange={setIsGroupOpen}>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.preventDefault();
                setIsGroupOpen((prev) => !prev);
              }}
              className={clsx(
                "flex items-center h-13 pr-2 pl-2 pt-4 pb-4 justify-between gap-2 hover:border-b-2 hover:border-gray-900 cursor-pointer",
                isGroupOpen && "text-[#C31730]"
              )}
            >
              <img
              src="/assets/icons/User/User_24px.svg"
              alt="User"
              /> 
              Group: {currentGroup}
              {isGroupOpen ? (
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
                      className="border rounded-[4px] border-[#CECECE] px-3 py-2 text-sm cursor-pointer bg-white hover:bg-[#EDEDED] flex justify-between items-center"
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
                      <div className="mt-1 border rounded-[4px] border-[#CECECE] shadow bg-white overflow-hidden">
                        {getAllGroups().map((group) => (
                          <div
                            key={group.id}
                            onClick={() => {
                              handleGroupChange(group.name);
                              setIsGroupSelectOpen(false);
                            }}
                            className={clsx(
                              "px-3 py-2 text-sm cursor-pointer hover:bg-[#EDEDED]",
                              group.name === currentGroup && "bg-[#EDEDED] font-semibold"
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
                  <span className="font-semibold">User:</span> {getUserName()}
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center gap-2 
                  text-[#004494] 
                  border-[#004494] 
                  hover:bg-[#DEE7F2] 
                  hover:text-[#000B54] 
                  hover:border-[#000B54] 
                  cursor-pointer 
                  rounded-[4px] h-10 
                  font-medium text-base px-4 py-2"
                  onClick={() => logout(null)}
                >
                  <img
                  src="/assets/icons/Logout/Logout_24px.svg"
                  alt="Logout"
                  /> 
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
