/*
 Copyright (C) 2021 Edgar Sherman (edgarshermangh14@gmail.com)
 SPDX-License-Identifier: GPL-2.0
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
  downloadReportApi,
  getJobApi,
  scheduleAnalysisApi,
  scheduleReportApi,
} from "api/jobs";
import sendRequest from "api/sendRequest";
import endpoints from "constants/endpoints";
import { getToken } from "shared/authHelper";

jest.mock("api/sendRequest");

describe("jobs", () => {
  test("getJobApi", () => {
    const jobId = 1;
    const url = endpoints.jobs.details(jobId);
    sendRequest.mockImplementation(() => true);

    expect(getJobApi({ jobId })).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
      })
    );
  });

  test("scheduleAnalysisApi", () => {
    const folderId = 1;
    const uploadId = 2;
    const scanData = {
      analysis: {
        bucket: "bucket",
        copyrightEmailAuthor: "copyrightEmailAuthor",
        ecc: "ecc",
        keyword: "keyword",
        mime: "mime",
        monk: "monk",
        nomos: "nomos",
        ojo: "ojo",
        package: "package",
      },
      decider: {
        nomosMonk: "nomosMonk",
        bulkReused: "bulkReused",
        newScanner: "newScanner",
        ojoDecider: "ojoDecider",
      },
      reuse: {
        reuseUpload: "reuseUpload",
        reuseGroup: "reuseGroup",
        reuseMain: "reuseMain",
        reuseEnhanced: "reuseEnhanced",
        reuseReport: "reuseReport",
        reuseCopyright: "reuseCopyright",
      },
    };
    const url = endpoints.jobs.scheduleAnalysis();
    sendRequest.mockImplementation(() => true);

    expect(scheduleAnalysisApi(folderId, uploadId, scanData)).toBe(
      sendRequest({})
    );
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          Authorization: getToken(),
          folderId,
          uploadId,
        },
        body: {
          analysis: {
            bucket: scanData.analysis.bucket,
            copyright_email_author: scanData.analysis.copyrightEmailAuthor,
            ecc: scanData.analysis.ecc,
            keyword: scanData.analysis.keyword,
            mime: scanData.analysis.mime,
            monk: scanData.analysis.monk,
            nomos: scanData.analysis.nomos,
            ojo: scanData.analysis.ojo,
            package: scanData.analysis.package,
          },
          decider: {
            nomos_monk: scanData.decider.nomosMonk,
            bulk_reused: scanData.decider.bulkReused,
            new_scanner: scanData.decider.newScanner,
            ojo_decider: scanData.decider.ojoDecider,
          },
          reuse: {
            reuse_upload: scanData.reuse.reuseUpload,
            reuse_group: scanData.reuse.reuseGroup,
            reuse_main: scanData.reuse.reuseMain,
            reuse_enhanced: scanData.reuse.reuseEnhanced,
            reuse_report: scanData.reuse.reuseReport,
            reuse_copyright: scanData.reuse.reuseCopyright,
          },
        },
      })
    );
  });

  test("scheduleReportApi", () => {
    const uploadId = 1;
    const reportFormat = "reportFormat";
    const url = endpoints.jobs.scheduleReport();
    sendRequest.mockImplementation(() => true);

    expect(scheduleReportApi(uploadId, reportFormat)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
          uploadId,
          reportFormat,
        },
      })
    );
  });

  test("downloadReportApi", () => {
    const reportId = 1;
    const url = endpoints.jobs.downloadReport(reportId);
    sendRequest.mockImplementation(() => true);

    expect(downloadReportApi(reportId)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
        isFile: true,
      })
    );
  });
});
