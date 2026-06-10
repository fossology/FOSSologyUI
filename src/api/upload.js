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

import endpoints from "@/constants/endpoints";
import { getToken } from "@/shared/authHelper";
import sendRequest from "./sendRequest";

// Create Uploads from File
export const createUploadApi = ({
  folderId,
  uploadDescription,
  accessLevel,
  ignoreScm,
  fileInput,
}) => {
  const url = endpoints.uploads.create();

  const formdata = new FormData();

  if (fileInput) {
    formdata.append("fileInput", fileInput, fileInput.name);
  }

  formdata.append("uploadType", "file");
  formdata.append("folderId", folderId);
  formdata.append("uploadDescription", uploadDescription || "");
  formdata.append("public", accessLevel);
  formdata.append("ignoreScm", ignoreScm);

  return sendRequest({
    url,
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formdata,
  });
};

// Create Uploads from Version Control System
export const createUploadVcsApi = ({ header = {}, body = {} }) => {
  return sendRequest({
    url: endpoints.uploads.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      uploadType: "vcs",
      folderId: Number(header.folderId),
      public: header.public,
      ignoreScm: header.ignoreScm,
      location: body.location,
    },
  });
};

// Create Uploads from URL
export const createUploadUrlApi = ({ header, body }) => {
  return sendRequest({
    url: endpoints.uploads.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      uploadType: "url",
      folderId: Number(header.folderId),
      public: header.public,
      ignoreScm: header.ignoreScm,
      location: {
        url: body?.location?.url?.trim() || "",
        name: body?.location?.name?.trim() || "",
      },
    },
  });
};

// Create Uploads from Server
export const createUploadServerApi = ({ header, body }) => {
  return sendRequest({
    url: endpoints.uploads.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      uploadType: "server",
      folderId: Number(header.folderId),
      public: header.public,
      ignoreScm: header.ignoreScm,
      location: {
        path: body?.location?.path?.trim() || "",
        name: body?.location?.name?.trim() || "",
      },
    },
  });
};

export const getUploadByIdApi = async ({ uploadId, retries }) => {
  const url = endpoints.uploads.getById(uploadId);

  const headers = new Headers({
    "content-type": "application/json",
    accept: "application/json",
    Authorization: getToken(),
  });

  const res = await fetch(url, { method: "GET", headers });

  // 200 → normal success
  if (res.ok) {
    return res.json();
  }

  if (res.status === 503) {
    const body = await res.json().catch(() => ({}));

    return { _status503: true, ...body };
  }


  const errorBody = await res.json().catch(() => ({}));
  return Promise.reject({
    status: res.status,
    ok: false,
    message: errorBody.message || `HTTP ${res.status}`,
    body: errorBody,
  });
};

// Getting a Upload Summary
export const getUploadSummaryApi = ({ uploadId }) => {
  return sendRequest({
    url: endpoints.uploads.summary(uploadId),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting a Upload License
export const getUploadLicenseApi = ({ uploadId, agent }) => {
  return sendRequest({
    url: endpoints.uploads.licenses(uploadId),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    params: {
      agent,
    },
  });
};