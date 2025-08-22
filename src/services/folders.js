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

import {
  getAllFoldersApi,
  getSingleFolderApi,
  createFolderApi,
  deleteFolderApi,
  editFolderApi,
  moveCopyFolderApi,
} from "@/api/folders";

// Fetching all the folders
export const getAllFolders = (groupName) => {
  return getAllFoldersApi(groupName).then((res) => {
    return res;
  });
};

// Fetching a single folder by its id
export const getSingleFolder = (id) => {
  return getSingleFolderApi(id).then((res) => {
    return res;
  });
};

// Deleting a folder by its id
export const deleteFolder = ({ id }) => {
  return deleteFolderApi(id).then((res) => {
    return res;
  });
};

// Creating a folder
export const createFolder = ({
  parentFolder,
  folderName,
  folderDescription,
}) => {
  return createFolderApi(parentFolder, folderName, folderDescription).then(
    (res) => {
      return res;
    }
  );
};

// Editing a folder properties
export const editFolder = ({ name, description, id }) => {
  return editFolderApi(name, description, id).then((res) => {
    return res;
  });
};

// Moving a folder into another folder
export const moveFolder = ({ parent, id }) => {
  return moveCopyFolderApi(parent, id, "move").then((res) => {
    return res;
  });
};

// Copying a folder into another folder
export const copyFolder = ({ parent, id }) => {
  return moveCopyFolderApi(parent, id, "copy").then((res) => {
    return res;
  });
};
