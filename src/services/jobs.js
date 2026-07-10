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
  scheduleReportApi,
  downloadReportApi,
  getAllJobApi,
  getAllAdminJobApi,
  importReportApi,
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

// Fetching single job
export const getJob = (jobId) =>
  getJobApi({ jobId }).then(res => res || null);

// Fetching all jobs
export const getAllJob = (filters) =>
  getAllJobApi(filters).then(res => ({
    res,
    pages: getLocalStorage("pages"),
  }));

// Fetching all jobs for the Admin
export const getAllAdminJob = (filters) =>
  getAllAdminJobApi(filters).then(res => ({
    res,
    pages: getLocalStorage("pages"),
  }));

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
      bucket: Number(analysis.bucket || 0),
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

    reuse: {
      reuse_upload: reuseUploadIds[0] ?? null,
      reuse_group: reuse.reuseGroup ?? null,
      reuse_main: reuse.reuseMain ?? null,
      reuse_enhanced: reuse.reuseEnhanced ?? null,
      reuse_report: reuse.reuseReport ?? null,
      reuse_copyright: reuse.reuseCopyright ?? null,
    },

    scancode: {
      license: !!scancode.license,
      copyright: !!scancode.copyright,
      email: !!scancode.email,
      url: !!scancode.url,
    },
  };

  return scheduleAnalysisApi({
    folderId: Number(folderId),
    uploadId: Number(uploadId),
    body,
  });
};

export const scheduleReport = (uploadId, reportFormat) =>
  scheduleReportApi({ uploadId, reportFormat });

export const downloadReport = (url) => {
  const reportId = getReportIdFromUrl(url);
  if (!reportId) {
    return Promise.reject(new Error("Invalid or missing report URL"));
  }
  return downloadReportApi(reportId);
};

export const importReport = (uploadId, reportFormat, reqBody) =>
  importReportApi({ uploadId, reportFormat, reqBody });

export default getJob;

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
