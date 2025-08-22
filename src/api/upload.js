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

import PropTypes from "prop-types";
import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Create Uploads from File
export const createUploadApi = (
  folderId,
  uploadDescription,
  accessLevel,
  ignoreScm,
  fileInput
) => {
  const url = endpoints.upload.uploadCreate();
  const formdata = new FormData();
  if (fileInput) {
    formdata.append("fileInput", fileInput, fileInput?.name);
  }
  return sendRequest({
    url,
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
      folderId,
      uploadDescription,
      public: accessLevel,
      ignoreScm,
      uploadType: "",
    },
    body: formdata,
  });
};

// Create Uploads from Version Control System
export const createUploadVcsApi = (header, body) => {
  const url = endpoints.upload.uploadCreate();
  return sendRequest({
    url,
    method: "POST",
    headers: {
      ...header,
      Authorization: getToken(),
    },
    body,
  });
};

// Create Uploads from URL
export const createUploadUrlApi = (header, body) => {
  const url = endpoints.upload.uploadCreate();
  return sendRequest({
    url,
    method: "POST",
    headers: {
      ...header,
      Authorization: getToken(),
    },
    body,
  });
};

// Getting a Upload by id
export const getUploadByIdApi = (uploadId, retries) => {
  const url = endpoints.upload.getId(uploadId);
  return sendRequest({
    url,
    method: "GET",
    retries,
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting a Upload Summary
export const getUploadSummaryApi = (uploadId) => {
  const url = endpoints.upload.getSummary(uploadId);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting a Upload License
export const getUploadLicenseApi = (uploadId, agent) => {
  const url = endpoints.upload.getLicense(uploadId);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      agent,
    },
  });
};

createUploadApi.propTypes = {
  folderId: PropTypes.number,
  uploadDescription: PropTypes.string,
  accessLevel: PropTypes.string,
  ignoreScm: PropTypes.bool,
  fileInput: PropTypes.string,
};
