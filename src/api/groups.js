/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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

// api/groups.js
// ─────────────────────────────────────────────────────────────────────────────
// CHANGES v1 → v2
// • Groups are now addressed by {name} (string) instead of {id} (integer).
//     DELETE /groups/{id}    → DELETE /groups/{name}
//     PATCH  /groups/{id}    → REMOVED — v2 has no group-rename endpoint
//
// • Endpoint key changes (matching updated endpoints.js):
//     admin.groups.getAll()        → groups.getAll()
//     admin.groups.getAllDeletable()→ groups.deletable()
//     admin.groups.create()        → groups.create()
//     admin.groups.delete(id)      → groups.deleteByName(name)
//     admin.groups.edit(id)        → REMOVED (no v2 equivalent)
//
// • editGroupApi is removed from this file. If you need to rename a group,
//   you must handle it at the server/admin level outside the REST API.
// ─────────────────────────────────────────────────────────────────────────────
import endpoints from "@/constants/endpoints";
import { getToken } from "@/shared/authHelper";
import sendRequest from "./sendRequest";

// GET /groups
export const getAllGroupsApi = () => {
  return sendRequest({
    url: endpoints.groups.getAll(),   // v1: admin.groups.getAll()
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// GET /groups/deletable
export const getAllDeletableGroupsApi = () => {
  return sendRequest({
    url: endpoints.groups.deletable(), // v1: admin.groups.getAllDeletable()
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// POST /groups?name=…
export const createGroupApi = (name) => {
  return sendRequest({
    url: endpoints.groups.create(),   // v1: admin.groups.create()
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      name,
    },
  });
};

// DELETE /groups/{name}
// v1 accepted an integer id; v2 accepts the group name string.
export const deleteGroupApi = (name) => {
  return sendRequest({
    url: endpoints.groups.deleteByName(name), // v1: admin.groups.delete(id)
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};