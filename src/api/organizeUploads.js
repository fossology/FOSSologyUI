/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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

// Getting uploads with folder id
export const getUploadsByFolderIdApi = (id, groupName, recursive) => {
  const url = endpoints.organize.uploads.get();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    groupName,
    queryParams: {
      recursive,
      folderId: id,
    },
  });
};

// Deleting a upload with its id
export const deleteUploadsApi = (id) => {
  const url = endpoints.organize.uploads.delete(id);
  return sendRequest({
    url,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Moving the upload into another folder
export const moveUploadApi = (folderId, id) => {
  const url = endpoints.organize.uploads.move(id);
  return sendRequest({
    url,
    method: "PATCH",
    headers: {
      Authorization: getToken(),
      folderId,
    },
    queryParams: {
      // Set the recursive false to reduce amount of data in response
      recursive: false,
    },
  });
};

// Copying the upload into another folder
export const copyUploadApi = (folderId, id) => {
  const url = endpoints.organize.uploads.copy(id);
  return sendRequest({
    url,
    method: "PUT",
    headers: {
      Authorization: getToken(),
      folderId,
    },
    queryParams: {
      // Set the recursive false to reduce amount of data in response
      recursive: false,
    },
  });
};
