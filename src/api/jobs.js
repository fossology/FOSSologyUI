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

// api/jobs.js
// ─────────────────────────────────────────────────────────────────────────────
// CHANGES v1 → v2
//
// 1. scheduleAnalysis  — POST /jobs (unchanged path, unchanged body shape)
//    params: folderId + uploadId as query params (unchanged)
//
// 2. scheduleReport    — was GET /jobs/schedule?uploadId=…&reportFormat=…
//    → now GET /report?uploadId=…&reportFormat=…
//    Uses endpoints.report.schedule() instead of endpoints.jobs.scheduleReport()
//
// 3. downloadReport    — was GET /jobs/{reportId}/download  (or similar)
//    → now GET /report/{id}
//    Uses endpoints.report.download(id)
//
// 4. importReport      — was POST /jobs/import/{uploadId}
//    → now POST /report/import?upload={uploadId}&reportFormat=…
//    Uses endpoints.report.import()
//    The uploadId is now a query param named "upload" (not a path segment).
//    reportFormat is also a required query param in v2.
//
// 5. getAllJobApi / getAllAdminJobApi endpoint keys:
//    jobs.allJobs() → jobs.getAll()  and  jobs.getAllAdmin()
//    (URL /jobs and /jobs/all are unchanged)
//
// 6. getJobApi: jobs.details(jobId) → jobs.getById(jobId)
// ─────────────────────────────────────────────────────────────────────────────
import endpoints from "@/constants/endpoints";
import { getToken } from "@/shared/authHelper";
import sendRequest from "./sendRequest";

// GET /jobs — jobs for the current user
export const getAllJobApi = ({ page = 1, limit = 10, status, sort, upload }) => {
  return sendRequest({
    url: endpoints.jobs.getAll(),   // v1: jobs.allJobs()
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
    url: endpoints.jobs.getAllAdmin(), // v1: jobs.allJobs() (same path, now split)
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
    url: endpoints.jobs.getById(jobId), // v1: jobs.details(jobId)
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
// v1 was: GET /jobs/schedule?uploadId=…&reportFormat=…
export const scheduleReportApi = ({ uploadId, reportFormat }) => {
  return sendRequest({
    url: endpoints.report.schedule(), // v1: jobs.scheduleReport()
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
// v1 was: GET /jobs/{reportId}/download (or similar)
export const downloadReportApi = (reportId) => {
  return sendRequest({
    url: endpoints.report.download(reportId), // v1: jobs.downloadReport(reportId)
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
