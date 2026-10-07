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

import sendRequest from "api/sendRequest";
import endpoints from "constants/endpoints";
import {
  downloadReportApi,
  getJobApi,
  scheduleAnalysisApi,
  scheduleReportApi,
} from "api/jobs";
import { getToken } from "shared/authHelper";

jest.mock("api/sendRequest");

describe("jobs", () => {
  test("getJobApi", () => {
    const jobId = 1;
    const url = endpoints.jobs.getById(jobId);
    sendRequest.mockImplementation(() => true);

    expect(getJobApi({ jobId })).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
      })
    );
  });

  test("scheduleAnalysisApi forwards folder/upload as query params and the body verbatim", () => {
    const folderId = 1;
    const uploadId = 2;
    const body = {
      analysis: { monk: true, nomos: true, ojo: true },
      decider: { nomosMonk: false },
      scancode: { license: false },
    };
    const url = endpoints.jobs.create();
    sendRequest.mockImplementation(() => true);

    expect(scheduleAnalysisApi({ folderId, uploadId, body })).toBe(
      sendRequest({})
    );
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          Authorization: getToken(),
        },
        queryParams: {
          folderId,
          uploadId,
        },
        body,
      })
    );
  });

  test("scheduleReportApi", () => {
    const uploadId = 1;
    const reportFormat = "reportFormat";
    const url = endpoints.report.schedule();
    sendRequest.mockImplementation(() => true);

    expect(scheduleReportApi({ uploadId, reportFormat })).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
        queryParams: {
          uploadId,
          reportFormat,
        },
      })
    );
  });

  test("downloadReportApi", () => {
    const reportId = 1;
    const url = endpoints.report.download(reportId);
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
