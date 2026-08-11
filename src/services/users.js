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
  getUserByNameApi,
  addUserApi,
  editUserByNameApi,
  deleteUserApi,
  createTokenApi,
  getTokensApi,
  exportUsersCsvApi,
  exportUsersJsonApi,
  importUsersCsvApi,
  importUsersJsonApi,
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

export const getAllUsersName = () => {
  return getAllUsers();
};

// USER BY ID

export const getUserByName = (id) => {
  return getUserByNameApi(id).then((res) => res);
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

    userPass: data.userPass,
    defaultVisibility: data.defaultVisibility,

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
console.log(payload);
  return addUserApi(payload).then((res) => res);
};


// UPDATE USER (DTO SAFE)

export const editUserByName = (id, data) => {
  const payload = {
    name: data.name,
    description: data.description,
    email: data.email,
    accessLevel: data.accessLevel,
    rootFolderId: Number(data.rootFolderId),
    defaultFolderId: Number(data.defaultFolderId),
    defaultGroup: data.defaultGroup,
    defaultBucketpool: data.defaultBucketpool ?? null,
    emailNotification: data.emailNotification,
    defaultVisibility: data.defaultVisibility,
    userStatus: data.userStatus,

    ...(data.userPass ? { userPass: data.userPass } : {}),

    agents: {
      bucket: data.agents?.bucket ?? false,
      copyrightEmailAuthor:
        data.agents?.copyrightEmailAuthor ?? false,
      ecc: data.agents?.ecc ?? false,
      ipra: data.agents?.ipra ?? false,
      keyword: data.agents?.keyword ?? false,
      mime: data.agents?.mime ?? false,
      monk: data.agents?.monk ?? false,
      nomos: data.agents?.nomos ?? false,
      ojo: data.agents?.ojo ?? false,
      pkgagent: data.agents?.pkgagent ?? false,
      reso: data.agents?.reso ?? false,
      softwareHeritage:
        data.agents?.softwareHeritage ?? false,
    },
  };
console.log(payload);
  return editUserByNameApi(id, payload).then((res) => res);
};


// DELETE USER

export const deleteUser = (name) => {
  return deleteUserApi(name).then((res) => res);
};

// TOKENS

export const getTokens = (type) => {
  return getTokensApi(type).then((res) => res);
};

//Create Token
export const createToken = (tokenDetails) => {
  const payload = {
    tokenName: tokenDetails.tokenName,
    tokenScope: tokenDetails.tokenScope,
    tokenExpire: tokenDetails.tokenExpire,
  };

  return createTokenApi(payload).then((res) => res);
};
// api endpoints not exposed
// EXPORT USERS CSV

export const exportUsersCsv = () => {
  return exportUsersCsvApi().then((res) => res);
};

// EXPORT USERS JSON

export const exportUsersJson = () => {
  return exportUsersJsonApi().then((res) => res);
};

// IMPORT USERS CSV

export const importUsersCsv = (formData) => {
  return importUsersCsvApi(formData).then((res) => res);
};

// IMPORT USERS JSON

export const importUsersJson = (formData) => {
  return importUsersJsonApi(formData).then((res) => res);
};
