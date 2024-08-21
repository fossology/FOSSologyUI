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

import endpoints from "constants/endpoints";

// Getting Authorization Token
import { getToken } from "shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Fetching all the groups
export const getAllGroupsApi = () => {
  const url = endpoints.admin.groups.getAll();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// Fetching all deletable groups
export const getAllDeletableGroupsApi = () => {
  const url = endpoints.admin.groups.getAllDeletable();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// Creating a group
export const createGroupApi = (name) => {
  const url = endpoints.admin.groups.create();
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
      name,
    },
    addGroupName: false,
  });
};

// Delete a group
export const deleteGroupApi = (id) => {
  const url = endpoints.admin.groups.delete(id);
  return sendRequest({
    url,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// Get all group members
export const getAllGroupMembersApi = (groupId) => {
  const url = endpoints.admin.groups.getAllGroupMembers(groupId);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Remove Group Member
export const removeGroupMemberApi = (groupId, userId) => {
  const url = endpoints.admin.groups.removeGroupMember(groupId, userId);
  return sendRequest({
    url,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Change user permission
export const changeUserPermissionApi = (groupId, userId, permission) => {
  const url = endpoints.admin.groups.changeUserPermission(groupId, userId);
  return sendRequest({
    url,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: {
      perm: permission,
    },
  });
};
