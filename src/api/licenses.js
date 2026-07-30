/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Fetching the licenses with their kind i.e (candidate, main, all)
export const getAllLicenseApi = ({
  page = 1,
  limit = 100,
  kind = "all",
  active,
} = {}) => {
  return sendRequest({
    url: endpoints.license.get(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  queryParams: {
    page,
    limit,
    kind,
    active,
  },
  });
};

export const createLicenseApi = ({
  shortName,
  fullName,
  text,
  url,
  risk,
  mergeRequest = false,
}) => {
  return sendRequest({
    url: endpoints.license.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      shortName,
      fullName,
      text,
      url,
      risk,
      mergeRequest,
    },
  });
};

export const getCustomiseDataApi = () => {
  return sendRequest({
    url: endpoints.customise.get(),
    method: "GET",
    headers: {
      Authorization: getToken(),
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
  return sendRequest({
    url: endpoints.admin.license.createCandidateLicense(),
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

export const importLicenseCsvApi = (formData) => {
  return sendRequest({
    url: endpoints.license.importCsv(),
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });
};
// api endpoint not exposed
export const importLicenseJsonApi = (formData) => {
  return sendRequest({
    url: endpoints.license.importJson(),
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });
};

export const exportLicenseCsvApi = (id = 0) => {
  return sendRequest({
    url: endpoints.license.exportCsv(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      id,
    },
    isFile: true,
  });
};
// api endpoint not exposed
export const exportLicenseJsonApi = (id = 0) => {
  return sendRequest({
    url: endpoints.license.exportJson(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      id,
    },
    isFile: true,
  });
};
// api endpoints not yet exposed
// Export Marydone JSON

export const marydoneExportJsonApi = () => {
  return sendRequest({
    url: endpoints.license.marydoneExportJson(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

// Export Marydone CSV

export const marydoneExportCsvApi = () => {
  return sendRequest({
    url: endpoints.license.marydoneExportCsv(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

// Import License Rules

export const importLicenseRulesApi = (formData) => {
  return sendRequest({
    url: endpoints.license.importRules(),
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });
};

// Export License Rules

export const exportLicenseRulesApi = () => {
  return sendRequest({
    url: endpoints.license.exportRules(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    isFile: true,
  });
};

// Fetching admin license acknowledgements
export const getAdminLicenseAcknowledgementsApi = () => {
  return sendRequest({
    url: endpoints.license.adminAcknowledgements(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

export const mutateAdminLicenseAcknowledgementApi = (
  acknowledgements
) => {
  return sendRequest({
    url: endpoints.license.adminAcknowledgements(),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: acknowledgements,
  });
};

// Fetching standard license comments
export const getStandardLicenseCommentsApi = () => {
  return sendRequest({
    url: endpoints.license.standardComments(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
};

// Adding and updating standard license comments
export const mutateStandardLicenseCommentsApi = (
  comments
) => {
  return sendRequest({
    url: endpoints.license.standardComments(),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: comments,
  });
};

// Fetch licenses for compatibility rule dropdowns
export const getCompatibilityLicenseOptionsApi = () => {
  return sendRequest({
    url: endpoints.license.get(),
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      page: 1,
      limit: 10000,
      kind: "all",
      active: true,
    },
  });
};
