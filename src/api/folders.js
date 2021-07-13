/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)

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

import endpoints from "../constants/endpoints";
import sendRequest from "./sendRequest";
import { getToken } from "../shared/authHelper";

// Fetching all the folders
export const getAllFoldersApi = async () => {
  const url = endpoints.folders.getAll();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: await getToken(),
    },
  });
};

// Fetching a single folder by its id
export const getSingleFolderApi = async (id) => {
  const url = endpoints.folders.getSingle(id);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: await getToken(),
    },
  });
};

// Deleting a folder by its id
export const deleteFolderApi = async (id) => {
  const url = endpoints.folders.delete(id);
  return sendRequest({
    url,
    method: "DELETE",
    headers: {
      Authorization: await getToken(),
    },
  });
};

// Creating a folder
export const createFolderApi = async (
  parentFolder,
  folderName,
  folderDescription
) => {
  const url = endpoints.folders.create();
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: await getToken(),
      parentFolder,
      folderName,
      folderDescription,
    },
  });
};

// Editing a folder properties
export const editFolderApi = async (name, description, id) => {
  const url = endpoints.folders.edit(id);
  return sendRequest({
    url,
    method: "PATCH",
    headers: {
      Authorization: await getToken(),
      name,
      description,
    },
  });
};

// Moving and copying a folder into another folder
export const moveCopyFolderApi = async (parent, id, action) => {
  const url = endpoints.folders.move(id);
  return sendRequest({
    url,
    method: "PUT",
    headers: {
      Authorization: await getToken(),
      parent,
      action,
    },
  });
};
