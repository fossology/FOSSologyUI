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

import { getAllGroupsApi, createGroupApi } from "api/groups";
import { setLocalStorage, getLocalStorage } from "shared/storageHelper";

// Fetching all the groups
export const getAllGroups = () => {
  return getLocalStorage("groups");
};

export const fetchAllGroups = () => {
  return getAllGroupsApi().then((res) => {
    setLocalStorage("groups", res);
    return res;
  });
};

// Creating a group
export const createGroup = (name) => {
  return createGroupApi(name).then((res) => {
    return res;
  });
};
