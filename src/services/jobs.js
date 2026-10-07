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
import messages from "@/constants/messages";
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

  // Normalize the selected reuse upload(s) to positive integer ids.
  const reuseUploadIds = Array.isArray(reuse.reuseUpload)
    ? reuse.reuseUpload
        .map((item) =>
          typeof item === "object" ? Number(item.id) : Number(item)
        )
        .filter((n) => Number.isInteger(n) && n > 0)
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

    scancode: {
      license: !!scancode.license,
      copyright: !!scancode.copyright,
      email: !!scancode.email,
      url: !!scancode.url,
    },
  };

  // Reuse is optional. The API v2 `Reuser` model only reads camelCase keys
  // (`reuseUpload`, `reuseGroup`, `reuseMain`, `reuseEnhanced`, `reuseReport`,
  // `reuseCopyright`). Sending the v1 snake_case keys made the backend ignore
  // every reuse setting while still answering HTTP 201, and sending the block
  // with an empty/`null` `reuseUpload` makes v2 reject the whole request. Only
  // attach it when a real upload to reuse from was picked and reuse was not
  // explicitly switched off.
  const reuseEnabled =
    reuseUploadIds.length > 0 && reuse.reuseChecked !== false;
  if (reuseEnabled) {
    body.reuse = {
      reuseUpload: reuseUploadIds[0],
      reuseGroup: reuse.reuseGroup ?? "",
      reuseMain: !!reuse.reuseMain,
      reuseEnhanced: !!reuse.reuseEnhanced,
      reuseReport: !!reuse.reuseReport,
      reuseCopyright: !!reuse.reuseCopyright,
    };
  }

  return scheduleAnalysisApi({
    folderId: Number(folderId),
    uploadId: Number(uploadId),
    body,
  }).then((res) => {
    // On success the scheduler returns { code: 201, message: <jobId>, type }.
    // Anything else — a non-201 code or a response without a real, positive job
    // id — means no job was actually created/queued, so surface it as an error
    // instead of letting a false success reach the caller.
    const jobId = Number(res?.message);
    const scheduled =
      Number(res?.code) === 201 && Number.isInteger(jobId) && jobId > 0;
    if (!scheduled) {
      // A non-201 code carries the backend's own error text; a 201 without a
      // real job id is a false success, so fall back to a generic message.
      const reason =
        Number(res?.code) !== 201 && res && res.message != null
          ? String(res.message)
          : messages.scheduleAnalysisFailed;
      return Promise.reject(new Error(reason));
    }
    return { ...res, jobId };
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
