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

import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";


// GET current user

export const getUserSelfApi = () => {
  return sendRequest({
    url: endpoints.users.getSelf(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};


// GET all users

export const getAllUsersApi = () => {
  return sendRequest({
    url: endpoints.users.getAll(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};


// GET user by ID

export const getUserByIdApi = (id) => {
  return sendRequest({
    url: endpoints.users.getByName(id),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};


// CREATE user

export const addUserApi = (userData) => {
  return sendRequest({
    url: endpoints.users.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: userData,
  });
};


// UPDATE user

export const editUserByIdApi = (id, userData) => {
  return sendRequest({
    url: endpoints.users.updateByName(id),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: userData,
  });
};


// DELETE user

export const deleteUserApi = (id) => {
  return sendRequest({
    url: endpoints.users.deleteByName(id),
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
};


// GET user tokens

export const getTokensApi = (type) => {
  return sendRequest({
    url: endpoints.users.tokensByType(type),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};
// api endpoints not exposed
// EXPORT USERS CSV

export const exportUsersCsvApi = () => {
  return sendRequest({
    url: endpoints.users.exportCsv(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

// EXPORT USERS JSON

export const exportUsersJsonApi = () => {
  return sendRequest({
    url: endpoints.users.exportJson(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

// IMPORT USERS CSV

export const importUsersCsvApi = (formData) => {
  return sendRequest({
    url: endpoints.users.importCsv(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: formData,
    isMultipart: true,
  });
};

// IMPORT USERS JSON

export const importUsersJsonApi = (formData) => {
  return sendRequest({
    url: endpoints.users.importJson(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: formData,
    isMultipart: true,
  });
};
