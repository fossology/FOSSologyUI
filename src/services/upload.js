/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)

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

import {
  createUpload,
  scheduleAnalysis,
  getUploadById,
  createUploadVcs,
} from "../api/upload";

export function createUploadFile({
  folderId,
  uploadDescription,
  accessLevel,
  ignoreScm,
  fileInput,
}) {
  return createUpload(
    folderId,
    uploadDescription,
    accessLevel,
    ignoreScm,
    fileInput
  ).then((res) => {
    return res;
  });
}

export function createUploadVCS(header, body) {
  return createUploadVcs(header, body).then((res) => {
    return res;
  });
}

export function scheduleJobs(folderId, uploadId, scanData) {
  return scheduleAnalysis(folderId, uploadId, scanData).then((res) => {
    return res;
  });
}

export function getId(uploadId, retries) {
  return getUploadById(uploadId, retries).then((res) => {
    return res;
  });
}
