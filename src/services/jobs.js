/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
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

import {
  getJobApi,
  scheduleAnalysisApi,
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
  return getJobApi(jobId).then((res) => {
    return res.entity.map((jsonObject) => {
      const tag = {};
      tag.stats = { score: jsonObject.score };
      return tag;
    });
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
  return scheduleAnalysisApi(folderId, uploadId, scanData).then((res) => {
    return res;
  });
};

export const scheduleReport = (uploadId, reportFormat) => {
  return scheduleReportApi(uploadId, reportFormat).then((res) => {
    return res;
  });
};

export const downloadReport = (url) => {
  const reportId = getReportIdFromUrl(url);
  if (reportId === null) {
    return null;
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
