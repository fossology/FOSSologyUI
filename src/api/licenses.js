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

import endpoints from "constants/endpoints";

// Getting Authorization Token
import { getToken } from "shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Fetching the licenses with their kind i.e (candidate, main, all)
export const getAllLicenseApi = ({ page, limit, kind }) => {
  const url = endpoints.admin.license.get();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
      page,
      limit,
    },
    queryParams: {
      kind,
    },
  });
};

export const createCandidateLicenseApi = ({
  shortName,
  fullName,
  text,
  risk,
  licenseUrl,
  mergeRequest,
}) => {
  const url = endpoints.admin.license.createCandidateLicense();
  return sendRequest({
    url,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      shortName,
      fullName,
      text,
      risk,
      url: licenseUrl,
      isCandidate: true,
      mergeRequest,
    },
  });
};

export const importLicenseCsvApi = (fileInput, delimiter, enclosure) => {
  const url = endpoints.admin.license.importCsv();
  const formdata = new FormData();

  if (fileInput) {
    formdata.append("file_input", fileInput);
    formdata.append("delimiter", delimiter);
    formdata.append("enclosure", enclosure);
  }
  return sendRequest({
    url,
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formdata,
  });
};
