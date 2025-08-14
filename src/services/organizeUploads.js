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

import {
  getUploadsByFolderIdApi,
  deleteUploadsApi,
  moveUploadApi,
  copyUploadApi,
} from "@/api/organizeUploads";

// Getting uploads with folder id
export const getUploadsFolderId = (folderId, groupName, recursive = false) => {
  return getUploadsByFolderIdApi(folderId, groupName, recursive).then((res) => {
    return res;
  });
};

// Deleting a upload its upload id
export const deleteUploadsbyId = (deleteId) => {
  return deleteUploadsApi(deleteId).then((res) => {
    return res;
  });
};

// Moving the upload into another folder
export const moveUpload = (folderId, id) => {
  return moveUploadApi(folderId, id).then((res) => {
    return res;
  });
};

// Copying the upload into another folder
export const copyUpload = (folderId, id) => {
  return copyUploadApi(folderId, id).then((res) => {
    return res;
  });
};
