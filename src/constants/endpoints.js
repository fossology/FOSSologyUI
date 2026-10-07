/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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

// constants/endpoints.js — FOSSology API v2

const getApiBase = () => {
  const protocol =
    process.env.NEXT_PUBLIC_HTTPS === "true" ? "https" : "http";
  return `${protocol}://${process.env.NEXT_PUBLIC_SERVER_URL}`;
};

const base = getApiBase();

const withBase = (path) => `${base}${path}`;

const endpoints = {
  // Auth 
  auth: {
    tokens: () => withBase("/tokens"),
  },

  // Info / Health 
  info: {
    apiInfo:  () => withBase("/info"),
    openapi:  () => withBase("/openapi"),
    health:   () => withBase("/health"),
  },

  // Users
  users: {
    create:         ()      => withBase("/users"),
    getAll:         ()      => withBase("/users"),
    getSelf:        ()      => withBase("/users/self"),
    getByName:      (name)  => withBase(`/users/${name}`),
    updateByName:   (name)  => withBase(`/users/${name}`),
    deleteByName:   (name)  => withBase(`/users/${name}`),
    tokens:         ()      => withBase("/users/tokens"), 
    tokensByType:   (type)  => withBase(`/users/tokens/${type}`),
    exportCsv: () => withBase("/users/export-csv"),// api endpoint not exposed
    exportJson: () => withBase("/users/export-json"),// api endpoint not exposed
    importJson: () => withBase("/users/import-json"),// api endpoint not exposed
    importCsv: () => withBase("/users/import-csv"),// api endpoint not exposed
  },

  // Uploads
  uploads: {
    getAll:   ()    => withBase("/uploads"),
    create:   ()    => withBase("/uploads"),
    getById:  (id)  => withBase(`/uploads/${id}`),
    moveOrCopy: (id) => withBase(`/uploads/${id}`),
    delete:     (id) => withBase(`/uploads/${id}`),
    summary:    (id) => withBase(`/uploads/${id}/summary`),
    licenses:   (id) => withBase(`/uploads/${id}/licenses`),
    download:   (id) => withBase(`/uploads/${id}/download`),
    oneshotCEU: () => withBase("/uploads/oneshot/ceu"),
    oneShotMonk: () => withBase("/uploads/oneshot/monk"),
    oneShotNomos: () => withBase("/uploads/oneshot/nomos"),
    getAgentRevision: (id) => withBase(`/uploads/${id}/agents/revision`),
    getGroupsWithPermissions: (id) => withBase(`/uploads/${id}/groups/permission`),
  },

  // Search
  search: {
    search: () => withBase("/search"),
  },

  // Jobs 
  jobs: {
    getAll:      ()      => withBase("/jobs"),           
    create:      ()      => withBase("/jobs"),           
    getAllAdmin:  ()      => withBase("/jobs/all"),      
    getById:     (id)    => withBase(`/jobs/${id}`),    
    deleteJob:   (id, queue) => withBase(`/jobs/${id}/${queue}`),
    statistics:  ()      => withBase("/jobs/dashboard/statistics"),
    dashboard:   ()      => withBase("/jobs/dashboard"),
    schedulerOperation: (operation) =>
      withBase(`/jobs/scheduler/operation/${operation}`),
    schedulerRun: () =>
      withBase("/jobs/scheduler/operation/run"),
  },

  // Report
  report: {
    schedule:  ()   => withBase("/report"),        
    download:  (id) => withBase(`/report/${id}`),    
    import:    ()   => withBase("/report/import"),   
  },

  // Folders
  folders: {
    getAll:          ()    => withBase("/folders"),
    create:          ()    => withBase("/folders"),
    getById:         (id)  => withBase(`/folders/${id}`),
    updateById:      (id)  => withBase(`/folders/${id}`),  
    moveOrCopy:      (id)  => withBase(`/folders/${id}`),  
    deleteById:      (id)  => withBase(`/folders/${id}`),
    contents:        (id)  => withBase(`/folders/${id}/contents`),
    unlinkContent:   (contentId) =>
      withBase(`/folders/contents/${contentId}/unlink`),
  },

  // Groups
  groups: {
    getAll: () => withBase("/groups"),
    create: () => withBase("/groups"),
    deleteByName: (name) =>
      withBase(`/groups/${encodeURIComponent(name)}`),
    updateByName: (name) =>
      withBase(`/groups/${encodeURIComponent(name)}`),
    members: (name) =>
      withBase(`/groups/${encodeURIComponent(name)}/members`),
    addUser: (name, userName) =>
      withBase(
        `/groups/${encodeURIComponent(name)}/user/${encodeURIComponent(userName)}`
      ),
    deleteUser: (name, userName) =>
      withBase(
        `/groups/${encodeURIComponent(name)}/user/${encodeURIComponent(userName)}`
      ),
    updateUserPermission: (name, userName) =>
      withBase(
        `/groups/${encodeURIComponent(name)}/user/${encodeURIComponent(userName)}`
      ),
    deletable: () => withBase("/groups/deletable"),
  },

  // License
  license: {
    get:                () => withBase("/license"),
    create:             () => withBase("/license"),          
    getByShortName:     (shortName) => withBase(`/license/${shortName}`),
    importCsv:          () => withBase("/license/import-csv"),
    importJson:         () => withBase("/license/import-json"),// api endpoint not exposed
    exportCsv:          () => withBase("/license/export-csv"),
    exportJson:         () => withBase("/license/export-json"),// api endpoint not exposed
    marydoneExportJson: () => withBase("/license/marydone/export-json"),// api endpoint not exposed
    marydoneExportCsv:  () => withBase("/license/marydone/export-csv"),// api endpoint not exposed
    adminCandidates:    () => withBase("/license/admincandidates"),
    adminAcknowledgements: () => withBase("/license/adminacknowledgements"),
    standardComments:   () => withBase("/license/stdcomments"),
    suggest:            () => withBase("/license/suggest"),
    verify:             (shortName) => withBase(`/license/verify/${shortName}`),
    merge:              (shortName) => withBase(`/license/merge/${shortName}`),
    importRules:        () => withBase("/license/import-rules"),// api endpoint not exposed
    exportRules:        () => withBase("/license/export-rules"),// api endpoint not exposed
  },

  // Maintenance
  maintenance: {
    run: () => withBase("/maintenance"),
  },
};

export default endpoints;
