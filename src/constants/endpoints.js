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

// ─────────────────────────────────────────────────────────────────────────────
// WHAT CHANGED in v2
// ─────────────────────────────────────────────────────────────────────────────
// • Base path changes from /api/v1 to /api/v2  (set at the server/proxy level;
//   these helpers just build the path suffix, so no change needed here, but
//   your NEXT_PUBLIC_SERVER_URL must now point to the v2 base.)
//
// • /users/{id}    → /users/{name}        (integer id ➜ username string)
// • /users/add     → /users               (POST, same path as GET-all)
// • /users/edit    → /users/{name}        (PUT, keyed by name not id)
// • /users/delete  → /users/{name}        (DELETE, keyed by name not id)
// • /users/tokens  kept; /users/tokens/{type} kept (GET only, no POST change)
//
// • /groups  keyed by {name} (string) instead of {id} (integer)
//   - DELETE /groups/{id}   → DELETE /groups/{name}
//   - PATCH  /groups/{id}   → removed; v2 has no rename endpoint
//   - /groups/deletable     → kept as GET /groups/deletable
//
// • /jobs/scheduleReport  was GET /jobs/schedule?reportFormat=…
//   → now GET /report?uploadId=…&reportFormat=…
// • /jobs/downloadReport  was GET /jobs/{reportId}/download
//   → now GET /report/{id}
// • /jobs/importReport    was POST /jobs/import/{uploadId}
//   → now POST /report/import?upload={uploadId}&reportFormat=…
//
// • /organize/uploads.get  was its own endpoint group
//   → now unified under /uploads (same path as browse)
// • /organize/uploads.move → PUT  /uploads/{id}?folderId=…&action=move
// • /organize/uploads.copy → PUT  /uploads/{id}?folderId=…&action=copy
// • /organize/uploads.delete → DELETE /uploads/{id}  (same path as before)
//
// • /admin/license → /license   (flat, not nested under admin)
// • /admin/maintenance → /maintenance
// • /admin/info → /info  /health (flat)
// ─────────────────────────────────────────────────────────────────────────────

const endpoints = {
  // ── Auth ─────────────────────────────────────────────────────────────────
  auth: {
    // POST /tokens  — unchanged path, unchanged behaviour
    tokens: () => withBase("/tokens"),
  },

  // ── Info / Health ─────────────────────────────────────────────────────────
  // v1: nested under endpoints.admin.info.*
  // v2: flat top-level
  info: {
    apiInfo:  () => withBase("/info"),
    openapi:  () => withBase("/openapi"),
    health:   () => withBase("/health"),
  },

  // ── Users ─────────────────────────────────────────────────────────────────
  // v2 key change: users are addressed by {name} (string), not {id} (integer)
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

  // ── Uploads ───────────────────────────────────────────────────────────────
  // Core browse + upload + organize endpoints are all /uploads in v2.
  // The separate /organize subtree is gone.
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
  },

  // ── Search ────────────────────────────────────────────────────────────────
  search: {
    files: () => withBase("/search"), // unchanged
  },

  // ── Jobs ──────────────────────────────────────────────────────────────────
  // scheduleReport / downloadReport / importReport paths moved to /report
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

  // ── Report ────────────────────────────────────────────────────────────────
  // v1 had report endpoints scattered under /jobs; v2 has a dedicated /report group
  report: {
    schedule:  ()   => withBase("/report"),          // GET ?uploadId=…&reportFormat=…
    download:  (id) => withBase(`/report/${id}`),    // GET
    import:    ()   => withBase("/report/import"),   // POST ?upload=…&reportFormat=…
  },

  // ── Folders ───────────────────────────────────────────────────────────────
  // Paths unchanged; the old endpoints.folders.move(id) used PUT which is now
  // correct — no breaking change here, just renamed key for clarity.
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

  // ── Groups ────────────────────────────────────────────────────────────────
  // v2 key change: groups addressed by {name} string, not {id} integer
  // PATCH /groups/{id} (rename) is REMOVED from v2 — no equivalent
  groups: {
    getAll:               ()            => withBase("/groups"),
    create:               ()            => withBase("/groups"),            // POST ?name=…
    deleteByName:         (name)        => withBase(`/groups/${name}`),    // DELETE
    members:              (name)        => withBase(`/groups/${name}/members`),
    addUser:              (name, userName) =>
      withBase(`/groups/${name}/user/${userName}`),                        // POST
    deleteUser:           (name, userName) =>
      withBase(`/groups/${name}/user/${userName}`),                        // DELETE
    updateUserPermission: (name, userName) =>
      withBase(`/groups/${name}/user/${userName}`),                        // PUT
    deletable:            ()            => withBase("/groups/deletable"),
  },

  // ── License ───────────────────────────────────────────────────────────────
  // v1: nested under endpoints.admin.license.*
  // v2: flat /license
  license: {
    get:                () => withBase("/license"),
    create:             () => withBase("/license"),          // POST (replaces createCandidateLicense)
    getByShortName:     (shortName) => withBase(`/license/${shortName}`),
    importCsv:          () => withBase("/license/import-csv"),
    exportCsv:          () => withBase("/license/export-csv"),
    adminCandidates:    () => withBase("/license/admincandidates"),
    adminAcknowledgements: () => withBase("/license/adminacknowledgements"),
    suggest:            () => withBase("/license/suggest"),
    verify:             (shortName) => withBase(`/license/verify/${shortName}`),
    merge:              (shortName) => withBase(`/license/merge/${shortName}`),
  },

  // ── Maintenance ───────────────────────────────────────────────────────────
  // v1: nested under endpoints.admin.maintenance.create()
  // v2: flat /maintenance
  maintenance: {
    run: () => withBase("/maintenance"),
  },
};

export default endpoints;