/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";


// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// GET /jobs — jobs for the current user
export const getAllJobApi = ({ page = 1, limit = 10, status, sort, upload }) => {
  return sendRequest({
    url: endpoints.jobs.getAll(),   
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    params: {
      page,
      limit,
      status,
      sort,
      upload,
    },
  });
};

// GET /jobs/all — all jobs (admin only)
export const getAllAdminJobApi = ({ page = 1, limit = 10, status, sort }) => {
  return sendRequest({
    url: endpoints.jobs.getAllAdmin(), 
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    params: {
      page,
      limit,
      status,
      sort,
    },
  });
};

// GET /jobs/{id}
export const getJobApi = ({ jobId }) => {
  return sendRequest({
    url: endpoints.jobs.getById(jobId), 
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// POST /jobs?folderId=…&uploadId=…  body: ScanOptions JSON
export const scheduleAnalysisApi = ({ folderId, uploadId, body }) => {
  return sendRequest({
    url: endpoints.jobs.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      folderId,
      uploadId,
    },
    body,
  });
};

// GET /report?uploadId=…&reportFormat=…
export const scheduleReportApi = ({ uploadId, reportFormat }) => {
  return sendRequest({
    url: endpoints.report.schedule(), 
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      uploadId,
      reportFormat,
    },
  });
};

// GET /report/{id}
export const downloadReportApi = (reportId) => {
  return sendRequest({
    url: endpoints.report.download(reportId), 
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

export const importReportApi = ({ uploadId, reportFormat, reqBody }) => {
  return sendRequest({
    url: endpoints.report.import(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      upload: uploadId,
      reportFormat: "spdxrdf",
    },
    isMultipart: true,
    body: reqBody,
  });
};

export const oneShotCEUApi = ({ reqBody }) => {
  return sendRequest({
    url: endpoints.uploads.oneshotCEU(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    isMultipart: true,
    body: reqBody,
  });
};

export const oneShotMonkApi = ({ reqBody }) => {
  return sendRequest({
    url: endpoints.uploads.oneShotMonk(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    isMultipart: true,
    body: reqBody,
  });
};

export const oneShotNomosApi = ({ reqBody }) => {
  return sendRequest({
    url: endpoints.uploads.oneShotNomos(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    isMultipart: true,
    body: reqBody,
  });
};

export default getJobApi;
