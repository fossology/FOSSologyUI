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

// Fetching the self information
export const getUserSelfApi = () => {
  const url = endpoints.users.self();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    addGroupName: false,
  });
};

// Fetching all the users and returning their complete info
export const getAllUsersApi = () => {
  const url = endpoints.users.getAll();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Api call to create a new user
export const addUserApi = (userData) => {
  const url = endpoints.users.add();
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: userData,
  });
};

// Deleting the user info
export const deleteUserApi = (id) => {
  const url = endpoints.users.delete(id);
  return sendRequest({
    url,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Modifying user PUT request
export const editUserByIdApi = (id, editedUserDetails) => {
  const url = endpoints.users.edit(id);
  return sendRequest({
    url,
    method: "PUT",
    body: editedUserDetails,
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting user by id
export const getUserByIdAapi = (id) => {
  const url = endpoints.users.getSingle(id);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting REST API Tokens based on token type (active | expired)
export const getTokensApi = (type) => {
  const url = endpoints.users.getTokens(type);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};
