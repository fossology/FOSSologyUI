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

import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

export const getAllJobApi = ({ page, limit }) => {
  const url = endpoints.jobs.scheduleAnalysis();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
      page,
      limit,
    },
  });
};

// Fetch all the jobs for admin
export const getAllAdminJobApi = ({ page, limit }) => {
  const url = endpoints.jobs.allJobs();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
      page,
      limit,
    },
  });
};

// Fetching the jobs
export const getJobApi = ({ jobId }) => {
  const url = endpoints.jobs.details(jobId);
  return sendRequest({
    url,
    method: "GET",
  });
};

// Scheduling the analysis for the uploads
export const scheduleAnalysisApi = (folderId, uploadId, scanData) => {
  const url = endpoints.jobs.scheduleAnalysis();
  const { bucket, copyrightEmailAuthor, ecc, keyword, mime, monk, nomos, ojo } =
    scanData?.analysis;
  const { nomosMonk, bulkReused, newScanner, ojoDecider } = scanData?.decider;
  const {
    reuseUpload,
    reuseGroup,
    reuseMain,
    reuseEnhanced,
    reuseReport,
    reuseCopyright,
  } = scanData?.reuse;
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
      folderId,
      uploadId,
    },
    body: {
      analysis: {
        bucket,
        copyright_email_author: copyrightEmailAuthor,
        ecc,
        keyword,
        mime,
        monk,
        nomos,
        ojo,
        package: scanData.analysis.package,
      },
      decider: {
        nomos_monk: nomosMonk,
        bulk_reused: bulkReused,
        new_scanner: newScanner,
        ojo_decider: ojoDecider,
      },
      reuse: {
        reuse_upload: reuseUpload,
        reuse_group: reuseGroup,
        reuse_main: reuseMain,
        reuse_enhanced: reuseEnhanced,
        reuse_report: reuseReport,
        reuse_copyright: reuseCopyright,
      },
    },
  });
};

export const scheduleReportApi = (uploadId, reportFormat) => {
  const url = endpoints.jobs.scheduleReport();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
      uploadId,
      reportFormat,
    },
  });
};

export const downloadReportApi = (reportId) => {
  const url = endpoints.jobs.downloadReport(reportId);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

export const importReportApi = (uploadId, reqBody) => {
  const url = endpoints.jobs.importReport(uploadId);
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    isMultipart: true,
    body: reqBody,
  });
};

export default getJobApi;
