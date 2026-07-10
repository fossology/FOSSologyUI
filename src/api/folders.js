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

// GET /folders
export const getAllFoldersApi = (groupName) => {
  return sendRequest({
    url: endpoints.folders.getAll(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    groupName,
  });
};

// GET /folders/{id}
export const getSingleFolderApi = (id) => {
  return sendRequest({
    url: endpoints.folders.getById(id),   // v1: getSingle(id)
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// DELETE /folders/{id}
export const deleteFolderApi = (id) => {
  return sendRequest({
    url: endpoints.folders.deleteById(id), // v1: delete(id)
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
};

// POST /folders?parentFolder=…&folderName=…&folderDescription=…
export const createFolderApi = (parentFolder, folderName, folderDescription) => {
  return sendRequest({
    url: endpoints.folders.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      parentFolder,
      folderName,
      folderDescription,
    },
  });
};

// PATCH /folders/{id}?name=…&description=…
export const editFolderApi = (name, description, id) => {
  return sendRequest({
    url: endpoints.folders.updateById(id), // v1: edit(id)
    method: "PATCH",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      name,
      description,
    },
  });
};

// PUT /folders/{id}?parent=…&action=move|copy
export const moveCopyFolderApi = (parent, id, action) => {
  return sendRequest({
    url: endpoints.folders.moveOrCopy(id), // v1: move(id)
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      parent,
      action,
    },
  });
};

export const getFolderContentsApi = ({ folderId }) => {
  return sendRequest({
    url: endpoints.folders.contents(folderId),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};
