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

import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// GET /groups
export const getAllGroupsApi = () => {
  return sendRequest({
    url: endpoints.groups.getAll(),
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
    url: endpoints.groups.deletable(),
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
    url: endpoints.groups.create(),
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
export const deleteGroupApi = (name) => {
  return sendRequest({
    url: endpoints.groups.deleteByName(name),
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// GET /groups/{name}/members
export const getGroupMembersApi = (name) => {
  return sendRequest({
    url: endpoints.groups.members(name),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// POST /groups/{name}/user/{userName}
export const addGroupUserApi = (name, userName, perm) => {
  return sendRequest({
    url: endpoints.groups.addUser(name, userName),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      perm,
    },
  });
};

// PUT /groups/{name}/user/{userName}
export const updateGroupUserPermissionApi = (
  name,
  userName,
  perm
) => {
  return sendRequest({
    url: endpoints.groups.updateUserPermission(
      name,
      userName
    ),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: {
      perm,
    },
  });
};

// DELETE /groups/{name}/user/{userName}
export const deleteGroupUserApi = (name, userName) => {
  return sendRequest({
    url: endpoints.groups.deleteUser(name, userName),
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};
