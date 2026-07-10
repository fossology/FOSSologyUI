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
    create:         ()      => withBase("/users"),          // POST
    getAll:         ()      => withBase("/users"),          // GET
    getSelf:        ()      => withBase("/users/self"),     // GET
    getByName:      (name)  => withBase(`/users/${name}`), // GET  (was getSingle by id)
    updateByName:   (name)  => withBase(`/users/${name}`), // PUT  (was edit by id)
    deleteByName:   (name)  => withBase(`/users/${name}`), // DELETE (was delete by id)
    tokens:         ()      => withBase("/users/tokens"),   // POST (create token for self)
    tokensByType:   (type)  => withBase(`/users/tokens/${type}`), // GET active|expired
  },

  // Uploads
  uploads: {
    getAll:   ()    => withBase("/uploads"),              // GET  (browse + organize list)
    create:   ()    => withBase("/uploads"),              // POST
    getById:  (id)  => withBase(`/uploads/${id}`),       // GET
    moveOrCopy: (id) => withBase(`/uploads/${id}`),      // PUT
    delete:     (id) => withBase(`/uploads/${id}`),      // DELETE
    summary:    (id) => withBase(`/uploads/${id}/summary`),   // GET
    licenses:   (id) => withBase(`/uploads/${id}/licenses`),  // GET
    download:   (id) => withBase(`/uploads/${id}/download`),  // GET
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
    getAll:      ()      => withBase("/jobs"),           // GET (user's own jobs)
    create:      ()      => withBase("/jobs"),           // POST (schedule analysis)
    getAllAdmin:  ()      => withBase("/jobs/all"),       // GET (admin)
    getById:     (id)    => withBase(`/jobs/${id}`),     // GET
    deleteJob:   (id, queue) => withBase(`/jobs/${id}/${queue}`), // DELETE
    statistics:  ()      => withBase("/jobs/dashboard/statistics"),
    dashboard:   ()      => withBase("/jobs/dashboard"),
    schedulerOperation: (operation) =>
      withBase(`/jobs/scheduler/operation/${operation}`),
    schedulerRun: () =>
      withBase("/jobs/scheduler/operation/run"),
  },

  // Report
  report: {
    schedule:  ()   => withBase("/report"),          // GET ?uploadId=…&reportFormat=…
    download:  (id) => withBase(`/report/${id}`),    // GET
    import:    ()   => withBase("/report/import"),   // POST ?upload=…&reportFormat=…
  },

  // Folders
  folders: {
    getAll:          ()    => withBase("/folders"),
    create:          ()    => withBase("/folders"),
    getById:         (id)  => withBase(`/folders/${id}`),
    updateById:      (id)  => withBase(`/folders/${id}`),  // PATCH
    moveOrCopy:      (id)  => withBase(`/folders/${id}`),  // PUT ?parent=…&action=…
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
