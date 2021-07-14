/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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
import sendRequest from "./sendRequest";
import endpoints from "../constants/endpoints";
import { getToken } from "../shared/authHelper";

// Create Uploads from File
export const createUpload = (
  folderId,
  uploadDescription,
  accessLevel,
  ignoreScm,
  fileInput
) => {
  const url = endpoints.upload.uploadCreate();
  const formdata = new FormData();
  if (fileInput) {
    formdata.append("fileInput", fileInput, fileInput?.name);
  }
  return sendRequest({
    url,
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
      folderId,
      uploadDescription,
      accessLevel,
      ignoreScm,
      uploadType: "",
      groupName: "",
    },
    body: formdata,
  });
};

// Create Uploads from Version Control System
export const createUploadVcs = (header, body) => {
  const url = endpoints.upload.uploadCreate();
  return sendRequest({
    url,
    method: "POST",
    credentials: false,
    headers: {
      ...header,
      Authorization: getToken(),
    },
    body,
  });
};

// Scheduling the analysis for the uploads
export const scheduleAnalysis = (folderId, uploadId, scanData) => {
  const url = endpoints.upload.scheduleAnalysis();
  const { bucket, copyrightEmailAuthor, ecc, keyword, mime, monk, nomos, ojo } =
    scanData?.analysis;
  const { nomosMonk, bulkReused, newScanner, ojoDecider } = scanData?.decider;
  const { reuseUpload, reuseGroup, reuseMain, reuseEnhanced } = scanData?.reuse;
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
      folderId,
      uploadId,
      groupName: "",
    },
    body: {
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
      },
    },
  });
};

// Getting a Upload by id
export const getUploadById = (uploadId, retries) => {
  const url = endpoints.upload.getId(uploadId);
  return sendRequest({
    url,
    method: "GET",
    retries,
    headers: {
      Authorization: getToken(),
      groupName: "",
    },
  });
};

createUpload.propTypes = {
  folderId: PropTypes.number,
  uploadDescription: PropTypes.string,
  accessLevel: PropTypes.string,
  ignoreScm: PropTypes.bool,
  fileInput: PropTypes.string,
  groupName: PropTypes.string,
};
