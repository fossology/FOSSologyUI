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

import fetchTokenApi from "@/api/auth";
import {
  getUserSelfApi,
  getAllUsersApi,
  getUserByIdApi,
  addUserApi,
  editUserByIdApi,
  deleteUserApi,
  getTokensApi,
} from "@/api/users";
import { setLocalStorage } from "@/shared/storageHelper";


// SELF USER

export const getUserSelf = () => {
  return getUserSelfApi().then((res) => {
    if (!res || typeof res !== "object") return res;

    const safeUser = {
      id: res.id,
      name: res.name,
      email: res.email,
      defaultGroup: res.defaultGroup,
      accessLevel: res.accessLevel,
      agents: res.agents,
    };

    setLocalStorage("user", safeUser);
    setLocalStorage("currentGroup", res.defaultGroup);

    return res;
  });
};

// ALL USERS

export const getAllUsers = () => {
  return getAllUsersApi().then((res) => res);
};


// USER BY ID

export const getUserById = (id) => {
  return getUserByIdApi(id).then((res) => res);
};


// CREATE USER (DTO SAFE)

export const addUser = (data) => {
  const payload = {
    name: data.name,
    description: data.description,
    email: data.email,
    accessLevel: data.accessLevel,
    rootFolderId: data.rootFolderId,
    emailNotification: data.emailNotification,
    defaultGroup: data.defaultGroup,
    defaultBucketpool: data.defaultBucketpool ?? null,

    agents: {
      bucket: data.agents?.bucket ?? false,
      copyrightEmailAuthor: data.agents?.copyrightEmailAuthor ?? false,
      ecc: data.agents?.ecc ?? false,
      ipra: data.agents?.ipra ?? false,
      keyword: data.agents?.keyword ?? false,
      mime: data.agents?.mime ?? false,
      monk: data.agents?.monk ?? false,
      nomos: data.agents?.nomos ?? false,
      ojo: data.agents?.ojo ?? false,
      pkgagent: data.agents?.pkgagent ?? false,
      reso: data.agents?.reso ?? false,
      softwareHeritage: data.agents?.softwareHeritage ?? false,
    },
  };

  return addUserApi(payload).then((res) => res);
};


// UPDATE USER (DTO SAFE)

export const editUserById = (id, data) => {
  const payload = {
    ...data,
    defaultBucketpool: data.defaultBucketpool ?? null,
  };

  return editUserByIdApi(id, payload).then((res) => res);
};


// DELETE USER

export const deleteUser = (id) => {
  return deleteUserApi(id).then((res) => res);
};


// TOKENS

export const getTokens = (type) => {
  return getTokensApi(type).then((res) => res);
};


// CREATE TOKEN

export const createToken = (tokenDetails) => {
  return fetchTokenApi(
    tokenDetails.username,
    tokenDetails.password,
    tokenDetails
  ).then((res) => res);
};
