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
import { getToken } from "shared/authHelper";
import {
  createUploadApi,
  createUploadUrlApi,
  createUploadVcsApi,
  getUploadByIdApi,
} from "api/upload";

jest.mock("api/sendRequest");

describe("upload", () => {
  test("createUploadApi without fileInput", () => {
    const folderId = 1;
    const uploadDescription = "uploadDescription";
    const accessLevel = 2;
    const ignoreScm = true;
    const fileInput = null;
    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(
      createUploadApi(
        folderId,
        uploadDescription,
        accessLevel,
        ignoreScm,
        fileInput
      )
    ).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        isMultipart: true,
        headers: {
          Authorization: getToken(),
          folderId,
          uploadDescription,
          public: accessLevel,
          ignoreScm,
          uploadType: "",
        },
        body: new FormData(),
      })
    );
  });

  test("createUploadApi with fileInput", () => {
    const folderId = 1;
    const uploadDescription = "uploadDescription";
    const accessLevel = 2;
    const ignoreScm = true;
    const fileInput = new File(["My File"], "file.txt", {
      type: "text/plain",
    });
    const expectedBody = new FormData();
    expectedBody.append("fileInput", fileInput, fileInput?.name);
    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(
      createUploadApi(
        folderId,
        uploadDescription,
        accessLevel,
        ignoreScm,
        fileInput
      )
    ).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        isMultipart: true,
        headers: {
          Authorization: getToken(),
          folderId,
          uploadDescription,
          public: accessLevel,
          ignoreScm,
          uploadType: "",
        },
        body: expectedBody,
      })
    );
  });

  test("createUploadVcsApi", () => {
    const header = "header";
    const body = "body";
    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(createUploadVcsApi(header, body)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        credentials: false,
        headers: {
          ...header,
          Authorization: getToken(),
        },
        body,
      })
    );
  });

  test("createUploadUrlApi", () => {
    const header = "header";
    const body = "body";
    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(createUploadUrlApi(header, body)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          ...header,
          Authorization: getToken(),
        },
        body,
      })
    );
  });

  test("getUploadByIdApi", () => {
    const uploadId = 1;
    const retries = 2;
    const url = endpoints.upload.getId(uploadId);
    sendRequest.mockImplementation(() => true);

    expect(getUploadByIdApi(uploadId, retries)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        retries,
        headers: {
          Authorization: getToken(),
        },
      })
    );
  });
});
