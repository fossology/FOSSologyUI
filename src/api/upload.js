/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

import PropTypes from "prop-types";
import endpoints from "constants/endpoints";

// Getting Authorization Token
import { getToken } from "shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Create Uploads from File
export const createUploadApi = (uploadFileData, scanData) => {
  const { folderId, uploadDescription, accessLevel, ignoreScm, fileInput } =
    uploadFileData;

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

  const url = endpoints.upload.uploadCreate();
  const formdata = new FormData();
  const scanOptions = {
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
  };

  if (fileInput) {
    formdata.append("fileInput", fileInput, fileInput?.name);
    formdata.append("scanOptions", JSON.stringify(scanOptions));
  }
  return sendRequest({
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
    body: formdata,
  });
};

// Create Uploads from Version Control System
export const createUploadVcsApi = (header, vcsData, scanData) => {
  const url = endpoints.upload.uploadCreate();
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
      ...header,
      Authorization: getToken(),
    },
    body: {
      data: vcsData,
      scanOptions: {
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
    },
  });
};

// Create Uploads from URL
export const createUploadUrlApi = (header, urlData, scanData) => {
  const url = endpoints.upload.uploadCreate();
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
      ...header,
      Authorization: getToken(),
    },
    body: {
      data: urlData,
      scanOptions: {
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
    },
  });
};

// Getting an Upload by id
export const getUploadByIdApi = (uploadId, retries) => {
  const url = endpoints.upload.getId(uploadId);
  return sendRequest({
    url,
    method: "GET",
    retries,
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting an Upload Summary
export const getUploadSummaryApi = (uploadId) => {
  const url = endpoints.upload.getSummary(uploadId);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Getting an Upload License
export const getUploadLicenseApi = (uploadId, agent) => {
  const url = endpoints.upload.getLicense(uploadId);
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      agent,
    },
  });
};

createUploadApi.propTypes = {
  folderId: PropTypes.number,
  uploadDescription: PropTypes.string,
  accessLevel: PropTypes.string,
  ignoreScm: PropTypes.bool,
  fileInput: PropTypes.string,
};
