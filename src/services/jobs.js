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

import {
  getJobApi,
  getJobLogApi,
  downloadJobLogApi,
  scheduleReportApi,
  downloadReportApi,
  getAllJobApi,
  getAllAdminJobApi,
  importReportApi,
  pauseJobApi,
  cancelJobApi,
  resumeJobApi,
  importFossologyDumpApi,
} from "@/api/jobs";
import { getReportIdFromUrl } from "@/shared/helper";
import { getLocalStorage } from "@/shared/storageHelper";
import { scheduleAnalysisApi } from "@/api/jobs";
import { oneShotCEUApi } from "@/api/jobs";
import { oneShotMonkApi } from "@/api/jobs";
import { oneShotNomosApi } from "@/api/jobs";
import {
  getSchedulerOptionsApi,
  runSchedulerOperationApi,
} from "@/api/jobs";

const fetchAllJobPages = async (apiFunction, filters = {}) => {
  const limit = 10;

  // Fetch the first page.
  const firstResponse = await apiFunction({
    ...filters,
    page: 1,
    limit,
  });

  const firstPageJobs = firstResponse || [];

  // The backend stores the total number of pages in localStorage.
  const totalPages = Number(
    getLocalStorage("pages") || 1
  );

  if (totalPages <= 1) {
    return firstPageJobs;
  }

  // Fetch all remaining pages.
  const remainingPages = await Promise.all(
    Array.from(
      { length: totalPages - 1 },
      (_, index) =>
        apiFunction({
          ...filters,
          page: index + 2,
          limit,
        })
    )
  );

  return [
    ...firstPageJobs,
    ...remainingPages.flat(),
  ];
};

// Fetching single job
export const getJob = (jobId) =>
  getJobApi({ jobId }).then(res => res || null);

// Fetch all jobs for the current user.
// Jobs are restricted to the selected group.
export const getAllJob = async (filters = {}) => {
  const jobs = await fetchAllJobPages(
    getAllJobApi,
    filters
  );

  return {
    res: jobs,
    totalPages: Number(
      getLocalStorage("pages") || 1
    ),
  };
};

// Fetch the log contents for a job queue
export const getJobLog = (jobId, queueId) =>
  getJobLogApi({ jobId, queueId }).then((res) => res || null);

export const downloadJobLog = (jobId, queueId) =>
  downloadJobLogApi({ jobId, queueId });

// Fetch all jobs for all users.
// Admin only.
export const getAllAdminJob = async (filters = {}) => {
  const jobs = await fetchAllJobPages(
    getAllAdminJobApi,
    filters
  );

  return {
    res: jobs,
    totalPages: Number(
      getLocalStorage("pages") || 1
    ),
  };
};

// Scheduling the analysis for the uploads
export const scheduleAnalysis = (folderId, uploadId, scanData) => {
  const analysis = scanData?.analysis || {};
  const decider = scanData?.decider || {};
  const reuse = scanData?.reuse || {};
  const scancode = scanData?.scancode || {};

  // Normalize reuse properly
  const reuseUploadIds = Array.isArray(reuse.reuseUpload)
    ? reuse.reuseUpload
        .map((item) =>
          typeof item === "object" ? Number(item.id) : Number(item)
        )
        .filter((n) => Number.isFinite(n))
    : [];

  const body = {
    analysis: {
      bucket: !!analysis.bucket,
      copyrightEmailAuthor: !!analysis.copyrightEmailAuthor,
      ecc: !!analysis.ecc,
      ipra: !!analysis.ipra,
      keyword: !!analysis.keyword,
      mime: !!analysis.mime,
      monk: !!analysis.monk,
      nomos: !!analysis.nomos,
      ojo: !!analysis.ojo,
      pkgagent: !!analysis.pkgagent,
      reso: !!analysis.reso,
      softwareHeritage: !!analysis.softwareHeritage,
    },

    decider: {
      nomosMonk: !!decider.nomosMonk,
      bulkReused: !!decider.bulkReused,
      newScanner: !!decider.newScanner,
      ojoDecider: !!decider.ojoDecider,
      concludeLicenseType: decider.autoConclude ? decider.autoConcludeType : "",
      copyrightDeactivation: !!decider.copyrightDeactivation,
      copyrightClutterRemoval: !!decider.copyrightClutterRemoval,
    },

    scancode: {
      license: !!scancode.license,
      copyright: !!scancode.copyright,
      email: !!scancode.email,
      url: !!scancode.url,
    },
  };

  if (
    reuseUploadIds.length > 0 ||
    reuse.reuseMain ||
    reuse.reuseEnhanced ||
    reuse.reuseReport ||
    reuse.reuseCopyright
  ) {
    body.reuse = {
      reuseGroup: reuse.reuseGroup,
      reuseMain: reuse.reuseMain,
      reuseEnhanced: reuse.reuseEnhanced,
      reuseReport: reuse.reuseReport,
      reuseCopyright: reuse.reuseCopyright,
    };

    if (reuseUploadIds.length > 0) {
      body.reuse.reuseUpload = reuseUploadIds[0];
    }
  }

  return scheduleAnalysisApi({
    folderId: Number(folderId),
    uploadId: Number(uploadId),
    body,
  });
};

// Schedule report generation.
export const scheduleReport = (
  uploadId,
  reportFormat
) => {
  return scheduleReportApi({
    uploadId,
    reportFormat,
  });
};

export const generateAndDownloadReport = async (
  uploadId,
  reportFormat = "unifiedreport"
) => {
  const response = await scheduleReportApi({
    uploadId,
    reportFormat,
  });

  const reportId = getReportIdFromUrl(response?.message);

  if (!reportId) {
    throw new Error(
      response?.message || "Report generation did not return a report URL"
    );
  }

  return downloadReportApi(reportId, 3);
};

export const downloadReport = (reportUrl) => {
  const reportId = getReportIdFromUrl(reportUrl);

  if (!reportId) {
    return Promise.reject(
      new Error("Invalid or missing report URL")
    );
  }

  return downloadReportApi(reportId);
};

export const importReport = (uploadId, reportFormat, reqBody) =>
  importReportApi({ uploadId, reportFormat, reqBody });

export const importFossologyDump = (
  uploadId,
  reqBody
) =>
  importFossologyDumpApi({
    uploadId,
    reqBody,
  });

export const oneShotCEU = (reqBody) =>
  oneShotCEUApi({ reqBody });

export const oneShotMonk = (reqBody) =>
  oneShotMonkApi({ reqBody });

export const oneShotNomos = (reqBody) =>
  oneShotNomosApi({ reqBody });

export const getSchedulerOptions = (operation) => {
  return getSchedulerOptionsApi(operation);
};

export const runSchedulerOperation = (
  operation,
  job,
  level,
  priority
) => {
  return runSchedulerOperationApi(
    operation,
    job,
    level,
    priority
  );
};

export const pauseJob = (jobId) =>
  pauseJobApi(jobId);

export const cancelJob = (jobId, queue) =>
  cancelJobApi({
    jobId,
    queue,
  });

export const resumeJob = (jobId) =>
  resumeJobApi(jobId);
