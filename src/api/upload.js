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

import PropTypes from "prop-types";
import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Create Uploads from File
export const createUploadApi = ({
  folderId,
  uploadDescription,
  accessLevel,
  ignoreScm,
  applyGlobal,
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
  formdata.append("applyGlobal", applyGlobal);

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
      applyGlobal: header.applyGlobal,
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
      applyGlobal: header.applyGlobal,
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
      applyGlobal: header.applyGlobal,
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

// Download upload file by upload ID
export const getUploadFileByIdApi = (uploadId, retries = 0) => {
  return sendRequest({
    url: endpoints.uploads.download(uploadId),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
    retries,
  });
};

export const updateUploadByIdApi = ({
  uploadId,
  status,
  comment = "",
  assignee,
}) => {
  const url = endpoints.uploads.updateById(uploadId);

  const queryParams = {};

  if (status) {
    queryParams.status = status;
  }

  if (
    assignee !== undefined &&
    assignee !== null
  ) {
    queryParams.assignee = assignee;
  }

  return sendRequest({
    url,
    method: "PATCH",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    queryParams,
    body: {
      comment,
    },
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

export const getTopItemApi = (uploadId) => {
  return sendRequest({
    url: endpoints.uploads.topItem(uploadId),
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

createUploadApi.propTypes = {
  folderId: PropTypes.number,
  uploadDescription: PropTypes.string,
  accessLevel: PropTypes.string,
  ignoreScm: PropTypes.bool,
  applyGlobal: PropTypes.bool,
  fileInput: PropTypes.string,
};
