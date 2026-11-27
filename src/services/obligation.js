/*
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
    getObligationsListApi,
    getAllObligationsApi,
    getObligationByIdApi,
    createObligationApi,
    deleteObligationApi,
    importObligationCsvApi,
    importObligationJsonApi,
    exportObligationCsvApi,
    exportObligationJsonApi,
} from "@/api/obligation";

export const getObligationsList = async () => {
    return await getObligationsListApi();
};

export const getAllObligations = async () => {
    return await getAllObligationsApi();
};

export const getObligationById = async (id) => {
    return await getObligationByIdApi(id);
};

export const createObligation = (data) => {
    return createObligationApi(data).then((res) => res);
};

export const deleteObligation = async (id) => {
    return await deleteObligationApi(id);
};

export const importObligationCsv = (formData) => {
  return importObligationCsvApi(formData).then((res) => res);
};
// api endpoints not implemented
export const importObligationJson = (formData) => {
  return importObligationJsonApi(formData).then((res) => res);
};

export const exportObligationCsv = (id = 0) => {
    return exportObligationCsvApi(id);
};
// api endpoints not implemented
export const exportObligationJson = (id = 0) => {
    return exportObligationJsonApi(id);
};
