/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

 SPDX-License-Identifier: GPL-2.0

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

export const routes = {
  home: "/",
  login: "/login",
  search: "/search",
  browse: "/browse",
  upload: {
    file: "/upload/file",
    server: "/upload/server",
    url: "/upload/url",
    vcs: "/upload/vcs",
    report: "/upload/report",
    instructions: "/upload/instructions",
    oneShotAnalysis: "/upload/oneShotAnalysis",
    oneShotCopyright: "/upload/oneShotCopyright",
    oneShotMonk: "/upload/oneShotMonk",
  },
  jobs: {
    myRecentJobs: "/jobs/myRecentJobs",
    allRecentJobs: "/jobs/allRecentJobs",
    scheduleAgents: "/jobs/scheduleAgents",
  },
  organize: {
    folders: {
      create: "/organize/folders/create",
      delete: "/organize/folders/delete",
      edit: "/organize/folders/edit",
      move: "/organize/folders/move",
      unlinkContent: "/organize/folders/unlinkContent",
    },
    licenses: "/organize/licenses",
    uploads: {
      delete: "/organize/uploads/delete",
      edit: "/organize/uploads/edit",
      move: "/organize/uploads/move",
    },
  },
  help: {
    overview: "/help/overview",
    licenseBrowser: "/help/licenseBrowser",
    about: "/help/about",
    thirdPartyLicenses: "/help/thirdPartyLicenses",
    thirdPartyLicensesHTML: "/thirdPartyLicenses.html",
  },
  admin: {
    group: {
      create: "/admin/group/create",
      delete: "/admin/group/delete",
    },
    users: {
      delete: "/admin/users/delete",
    },
    license: {
      create: "/admin/license/create",
      selectLicense: "/admin/selectLicense",
    },
  },
};
