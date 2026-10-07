/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

// Getting uploads with folder id
export const getUploadsByFolderIdApi = ({
  folderId,
  groupName,
  recursive = false,
}) => {
  return sendRequest({
    url: endpoints.uploads.getAll(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      folderId,
      groupName,
      recursive,
    },
  });
};

// Deleting a upload with its id
export const deleteUploadsApi = (uploadId) => {
  return sendRequest({
    url: endpoints.uploads.delete(uploadId),
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Moving the upload into another folder
export const moveUploadApi = ({ folderId, uploadId }) => {
  return sendRequest({
    url: endpoints.uploads.moveOrCopy(uploadId),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      folderId,
      action: "move",
    },
  });
};

// Copying the upload into another folder
export const copyUploadApi = ({ folderId, uploadId }) => {
  return sendRequest({
    url: endpoints.uploads.moveOrCopy(uploadId),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      folderId,
      action: "copy",
    },
  });
};

// Updating upload properties
export const updateUploadApi = ({
  uploadId,
  uploadName,
  uploadDescription,
}) => {
  return sendRequest({
    url: endpoints.uploads.getById(uploadId),
    method: "PATCH",
    headers: {
      Authorization: getToken(),
    },
    body: {
      name: uploadName,
      uploadDescription,
    },
  });
};
