/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)
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

// services/groups.js
// ─────────────────────────────────────────────────────────────────────────────
// CHANGES v1 → v2
// • deleteGroup(id)  → deleteGroup(name)  — now passes group name, not integer id
// • editGroup        → REMOVED            — no v2 endpoint exists for renaming
// ─────────────────────────────────────────────────────────────────────────────
import {
  getAllGroupsApi,
  createGroupApi,
  deleteGroupApi,
  getAllDeletableGroupsApi,
} from "@/api/groups";
import { setLocalStorage, getLocalStorage } from "@/shared/storageHelper";

export const getAllGroups = () => {
  return getLocalStorage("groups");
};

export const fetchAllGroups = () => {
  return getAllGroupsApi().then((res) => {
    setLocalStorage("groups", res);
    return res;
  });
};

export const fetchAllGroupsForManagement = () => {
  return getAllGroupsApi(true).then((res) => res);
};

export const createGroup = (name) => {
  return createGroupApi(name).then((res) => res);
};

export const deleteGroup = (name) => {
  return deleteGroupApi(name).then((res) => res);
};

export const fetchAllDeletableGroups = () => {
  return getAllDeletableGroupsApi().then((res) => res);
};

// editGroup is REMOVED — v2 has no group-rename REST endpoint.