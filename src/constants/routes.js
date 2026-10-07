/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 Copyright (C) 2022 Krishna Mahato <krishhtrishh9304@gmail.com>
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

// Routes for all the pages
const routes = {
  home: "/",
  login: "/login",
  search: "/search",
  browse: "/browse",
  upload: {
    file: "/upload/file",
    server: "/upload/server",
    url: "/upload/url",
    vcs: "/upload/vcs",
    importReport: "/upload/reportImport",
    instructions: "/upload/instructions",
    oneShotNomos: "/upload/oneShotNomos",
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
    licenses: {
      create: "/organize/license/create",
      candidate: "/organize/license/candidate",
    },
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
  },
  thirdPartyLicensesHTML: "/thirdPartyLicenses.html",
  admin: {
    monk: "/admin/agent/monk",
    customize:"/admin/customize",
    scheduler:"/admin/scheduler",
    group: {
      index: "/admin/group",
      create: "/admin/group/create",
      delete: "/admin/group/delete",
      edit: "/admin/group/edit",
      manageUsers: "/admin/group/manageUsers",
    },
    users: {
      add: "/admin/users/add",
      delete: "/admin/users/delete",
      edit: "/admin/users/edit",
      operations: "/admin/users/operations",
      userImport: "/admin/users/operations/userImport"
    },
    compatibility:{
      selectCompatibility: "/admin/compatibility/selectCompatibility",
      operations: "/admin/compatibility/operations",
      rulesImport: "/admin/compatibility/operations/rulesImport",
    },
    license: {
      create: "/admin/licenseAdmin/addLicense",
      selectLicense: "/admin/licenseAdmin/selectLicense",
      candidates: "/admin/licenseAdmin/candidates",
      candidatesEdit:"/admin/licenseAdmin/candidates/candidatesEdit",
      operations: "/admin/licenseAdmin/operations",
      licenseCSV: "/admin/licenseAdmin/operations/licenseCSV/fossology-license-export.csv",
      licenseImport: "/admin/licenseAdmin/operations/licenseImport"
    },
    maintenance: "/admin/maintenance",
    tag: {
      create: "/admin/tag/create",
      enableDisable: "/admin/tag/enableDisable"
    },
    obligation: {
      add: "/admin/obligation/add",
      select: "/admin/obligation/select",
      operations: "/admin/obligation/operations",
      obligationImport: "/admin/obligation/operations/obligationImport"
    },
  },
  browseUploads: {
    licenseBrowser: "/browseUploads/licenseBrowser",
    copyright: "/browseUploads/copyright",
    ecc: "/browseUploads/ecc",
    ipra: "/browseUploads/ipra",
    conf: "/browseUploads/conf",
    more: {
      softwareHeritage: "/browseUploads/more/softwareHeritage",
      fileBrowser: "/browseUploads/more/fileBrowser",
      email: "/browseUploads/more/email",
      spasht: "/browseUploads/more/spasht",
      keyword: "/browseUploads/more/keyword",
      exportList: "/browseUploads/more/exportList",
      search: "/browseUploads/more/search",
      bucket: "/browseUploads/more/bucket",
      view: "/browseUploads/more/view",
      info: "/browseUploads/more/info",
    }
  },
};

export default routes;
