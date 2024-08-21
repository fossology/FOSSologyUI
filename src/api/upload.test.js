/*
 Copyright (C) 2021 Edgar Sherman (edgarshermangh14@gmail.com)
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)

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
    const uploadFileData = {
      uploadDescription: "test",
      folderId: 1,
      accessLevel: 2,
      ignoreScm: true,
      fileInput: null,
    };
    const scanOptions = {
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

    const { folderId, uploadDescription, accessLevel, ignoreScm } =
      uploadFileData;

    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(createUploadApi(uploadFileData, scanOptions)).toBe(sendRequest({}));
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
          uploadType: "file",
        },
        body: new FormData(),
      })
    );
  });

  test("createUploadApi with fileInput", () => {
    const uploadFileData = {
      uploadDescription: "uploadDescription",
      folderId: 1,
      accessLevel: 2,
      ignoreScm: true,
      fileInput: new File(["My File"], "file.txt", {
        type: "text/plain",
      }),
    };
    const scanOptions = {
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
    const { folderId, uploadDescription, accessLevel, ignoreScm, fileInput } =
      uploadFileData;

    const expectedBody = new FormData();
    expectedBody.append("fileInput", fileInput, fileInput?.name);
    expectedBody.append("scanOptions", JSON.stringify(scanOptions));

    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(createUploadApi(uploadFileData, scanOptions)).toBe(sendRequest({}));
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
          uploadType: "file",
        },
        body: expectedBody,
      })
    );
  });

  test("createUploadVcsApi", () => {
    const header = "header";
    const vcsData = "vcsData";
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
    const url = endpoints.upload.uploadCreate();
    sendRequest.mockImplementation(() => true);

    expect(createUploadVcsApi(header, vcsData, scanData)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          ...header,
          Authorization: getToken(),
        },
        body: {
          data: vcsData,
          scanOptions: {
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
        },
      })
    );
  });

  test("createUploadUrlApi", () => {
    const header = "header";
    const url = endpoints.upload.uploadCreate();
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

    sendRequest.mockImplementation(() => true);

    expect(createUploadUrlApi(header, null, scanData)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          ...header,
          Authorization: getToken(),
        },
        body: {
          data: null,
          scanOptions: {
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
        },
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
