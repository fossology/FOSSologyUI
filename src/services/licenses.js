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

import {
  getAllLicenseApi,
  createLicenseApi,
  createCandidateLicenseApi,
  importLicenseCsvApi,
  importLicenseJsonApi,
  exportLicenseCsvApi,
  exportLicenseJsonApi,
  marydoneExportCsvApi,
  marydoneExportJsonApi,
  importLicenseRulesApi,
  exportLicenseRulesApi,
  getAdminLicenseAcknowledgementsApi,
  mutateAdminLicenseAcknowledgementApi,
  getStandardLicenseCommentsApi,
  mutateStandardLicenseCommentsApi,
  getCompatibilityLicenseOptionsApi,
  getCustomiseDataApi,
} from "@/api/licenses";

// Fetching the licenses with their kind i.e (candidate, main, all)
export const getAllLicense = (licenseData) => {
  return getAllLicenseApi(licenseData).then((res) => res);
};

export const createLicense = (licenseData) => {
  return createLicenseApi(licenseData).then((res) => res);
};

// Fetch Admin customisation data
export const getCustomiseData = () => {
  return getCustomiseDataApi().then((res) => res);
};

export const createCandidateLicense = (licenseData) => {
  return createCandidateLicenseApi(licenseData).then((res) => res);
};

export const importLicenseCsv = (formData) => {
  return importLicenseCsvApi(formData).then((res) => res);
};
// api endpoint not exposed
export const importLicenseJson = (formData) => {
  return importLicenseJsonApi(formData).then((res) => res);
};

export const exportLicenseCsv = (id) => {
  return exportLicenseCsvApi(id);
};
// api endpoint not exposed
export const exportLicenseJson = (id) => {
  return exportLicenseJsonApi(id);
};
// api endpoints not exposed
export const exportMarydoneCsv = () => {
  return marydoneExportCsvApi();
};

export const exportMarydoneJson = () => {
  return marydoneExportJsonApi();
};

export const importLicenseRules = (formData) => {
  return importLicenseRulesApi(formData);
};

export const exportLicenseRules = () => {
  return exportLicenseRulesApi();
};

export const getAdminLicenseAcknowledgements = () => {
  return getAdminLicenseAcknowledgementsApi().then(
    (res) => res
  );
};

export const mutateAdminLicenseAcknowledgement = (
  acknowledgements
) => {
  return mutateAdminLicenseAcknowledgementApi(
    acknowledgements
  ).then((res) => res);
};

// Fetching standard license comments
export const getStandardLicenseComments = () => {
  return getStandardLicenseCommentsApi().then(
    (res) => res
  );
};

// Adding and updating standard license comments
export const mutateStandardLicenseComments = (
  comments
) => {
  return mutateStandardLicenseCommentsApi(
    comments
  ).then((res) => res);
};

// Fetch licenses for compatibility rule dropdowns
export const getCompatibilityLicenseOptions = () => {
  return getCompatibilityLicenseOptionsApi().then(
    (res) => res
  );
};
