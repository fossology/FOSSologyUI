/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
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
import sendRequest from "@/api/sendRequest";
import {
  getJobApi,
  scheduleReportApi,
  downloadReportApi,
  getAllJobApi,
  getAllAdminJobApi,
  importReportApi,
} from "@/api/jobs";
import { getReportIdFromUrl } from "@/shared/helper";
import { getLocalStorage } from "@/shared/storageHelper";

// Fetching the jobs
export const getJob = (jobId) => {
  return getJobApi({ jobId }).then((res) => {
    if (!res) return null;
    return res;
  });
};

// Fetching all jobs
export const getAllJob = (jobsDatalist) => {
  return getAllJobApi(jobsDatalist).then((res) => {
    return {
      res,
      pages: getLocalStorage("pages"),
    };
  });
};

// Fetching all jobs for the Admin
export const getAllAdminJob = (jobsDatalist) => {
  return getAllAdminJobApi(jobsDatalist).then((res) => {
    return {
      res,
      pages: getLocalStorage("pages"),
    };
  });
};

// Scheduling the analysis for the uploads
export const scheduleAnalysis = (folderId, uploadId, scanData) => {
  const url = endpoints.jobs.scheduleAnalysis();

  const { bucket, copyrightEmailAuthor, ecc, keyword, mime, monk, nomos, ojo } =
    scanData?.analysis || {};
  const { nomosMonk, bulkReused, newScanner, ojoDecider, autoConclude, autoConcludeType } = scanData?.decider || {};
  const {
    reuseUpload,
    reuseGroup,
    reuseMain,
    reuseEnhanced,
    reuseReport,
    reuseCopyright,
  } = scanData?.reuse || {};

  const reuseUploadIds = Array.isArray(reuseUpload)
    ? reuseUpload
        .map((item) => (item && typeof item === "object" && Object.prototype.hasOwnProperty.call(item, "id") ? Number(item.id) : Number(item)))
        .filter((n) => Number.isInteger(n))
    : reuseUpload;
  // If reuseUploadIds is an array, send a single integer (first id) as backend expects an integer
  const reuseUploadValue = Array.isArray(reuseUploadIds)
    ? reuseUploadIds.length > 0
      ? reuseUploadIds[0]
      : null
    : reuseUploadIds;

  const body = {
    analysis: {
      bucket,
      copyright_email_author: copyrightEmailAuthor,
      ecc,
      keyword,
      mime,
      monk,
      nomos,
      ojo,
      package: scanData.analysis?.package,
    },
    decider: {
      nomos_monk: nomosMonk,
      bulk_reused: bulkReused,
      new_scanner: newScanner,
      ojo_decider: ojoDecider,
      auto_conclude: autoConclude,
      auto_conclude_type: autoConcludeType,
    },
      reuse: {
      reuse_upload: reuseUploadValue,
      reuse_group: reuseGroup,
      reuse_main: reuseMain,
      reuse_enhanced: reuseEnhanced,
      reuse_report: reuseReport,
      reuse_copyright: reuseCopyright,
    },
  };

  // Log the outgoing payload for debugging (temporary)
  try {
    // Use console.log so it's visible in browser devtools by default
    console.log("[debug] scheduleAnalysis payload:", body);
  } catch (e) {}

  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
      folderId,
      uploadId,
    },
    body,
  }).then((res) => res);
};

// DEBUG: temporary helper to inspect payloads when needed
export const _debug_schedulePayload = (folderId, uploadId, scanData) => {
  const { reuseUpload } = scanData?.reuse || {};
  const reuseUploadIds = Array.isArray(reuseUpload)
    ? reuseUpload.map((item) => (item && typeof item === "object" && Object.prototype.hasOwnProperty.call(item, "id") ? Number(item.id) : Number(item)))
    : reuseUpload;
  const body = {
    analysis: scanData.analysis || {},
    decider: scanData.decider || {},
    reuse: {
      reuse_upload: reuseUploadIds,
      reuse_group: scanData.reuse?.reuseGroup,
    },
  };
  // Log to console so the browser devtools will capture it
  // (intended for temporary debugging by developer)
  console.debug("scheduleAnalysis payload", { folderId, uploadId, body });
  return body;
};

export const scheduleReport = (uploadId, reportFormat) => {
  return scheduleReportApi(uploadId, reportFormat).then((res) => {
    return res;
  });
};

export const downloadReport = (url) => {
  const reportId = getReportIdFromUrl(url);
  if (reportId === null) {
    return Promise.reject(new Error("Invalid or missing report URL"));
  }
  return downloadReportApi(reportId).then((res) => {
    return res;
  });
};

export const importReport = (uploadId, reqBody) => {
  return importReportApi(uploadId, reqBody).then((res) => {
    return res;
  });
};

export default getJob;
