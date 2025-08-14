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
  createUploadApi,
  getUploadByIdApi,
  createUploadVcsApi,
  createUploadUrlApi,
  getUploadSummaryApi,
  getUploadLicenseApi,
} from "@/api/upload";

// Create Uploads from File
export const createUploadFile = ({
  folderId,
  uploadDescription,
  accessLevel,
  ignoreScm,
  fileInput,
}) => {
  return createUploadApi(
    folderId,
    uploadDescription,
    accessLevel,
    ignoreScm,
    fileInput
  ).then((res) => {
    return res;
  });
};

// Create Uploads from Version Control System
export const createUploadVcs = (header, body) => {
  return createUploadVcsApi(header, body).then((res) => {
    return res;
  });
};

// Create Uploads from URL
export const createUploadUrl = (header, body) => {
  return createUploadUrlApi(header, body).then((res) => {
    return res;
  });
};

// Getting a Upload by id
export const getUploadById = (uploadId, retries) => {
  return getUploadByIdApi(uploadId, retries).then((res) => {
    return res;
  });
};

// Getting a Upload Summary
export const getUploadSummary = (uploadId) => {
  return getUploadSummaryApi(uploadId).then((res) => {
    return res;
  });
};

// Getting a Upload License
export const getUploadLicense = (uploadId, agent) => {
  return getUploadLicenseApi(uploadId, agent).then((res) => {
    return res;
  });
};
