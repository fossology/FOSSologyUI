/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

import {
  createUploadApi,
  getUploadByIdApi,
  getUploadFileByIdApi,
  updateUploadByIdApi,
  createUploadVcsApi,
  createUploadUrlApi,
  createUploadServerApi,
  getUploadSummaryApi,
  getUploadLicenseApi,
  getUploadCopyrightsApi,
  getItemTreeViewApi,
  getTopItemApi,
} from "@/api/upload";

// Create Uploads from File
export const createUploadFile = (data) => {
  return createUploadApi(data).then((res) => res);
};

// Create Uploads from Version Control System
export const createUploadVcs = (data) => {
  return createUploadVcsApi(data).then((res) => res);
};

// Create Uploads from URL
export const createUploadUrl = (data) => {
  return createUploadUrlApi(data).then((res) => res);
};

// Create Uploads from Server
export const createUploadServer = (data) => {
  return createUploadServerApi(data).then((res) => res);
};

// Getting a Upload by id
export const getUploadById = (uploadId, retries) => {
  return getUploadByIdApi({ uploadId, retries }).then((res) => res);
};

// Download upload file by upload ID
export const getUploadFileById = (
  uploadId,
  retries = 0
) => {
  return getUploadFileByIdApi(
    uploadId,
    retries
  ).then((res) => res);
};

export const updateUploadById = (
  uploadId,
  status,
  comment = "",
  assignee
) => {
  return updateUploadByIdApi({
    uploadId,
    status,
    comment,
    assignee,
  }).then((res) => res);
};

// Getting a Upload Summary
export const getUploadSummary = (uploadId) => {
  return getUploadSummaryApi({ uploadId }).then((res) => res);
};

export const getTopItem = (uploadId) => {
  return getTopItemApi(uploadId).then((res) => res);
};

// Getting a Upload License
export const getUploadLicense = (uploadId, agent, containers) => {
  return getUploadLicenseApi({
    uploadId,
    agent,
    containers,
  }).then((res) => res);
};

// Getting copyrights for an upload
export const getUploadCopyrights = (uploadId) => {
    return getUploadCopyrightsApi({
        uploadId,
    }).then((res) => res);
};

// Getting the tree view for an upload item
export const getItemTreeView = ({
  uploadId,
  itemId,
  agentId,
  tagId,
  scanLicenseFilter,
  editedLicenseFilter,
  flatten,
  sort,
  search,
  showQuick,
  filterOpen,
  page,
  limit,
}) => {
  return getItemTreeViewApi({
    uploadId,
    itemId,
    agentId,
    tagId,
    scanLicenseFilter,
    editedLicenseFilter,
    flatten,
    sort,
    search,
    showQuick,
    filterOpen,
    page,
    limit,
  }).then((res) => res);
};