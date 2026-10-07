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

import endpoints from "@/constants/endpoints";
import { getToken } from "@/shared/authHelper";
import sendRequest from "./sendRequest";

// Get list of obligations (id + topic)
export const getObligationsListApi = () => {
    return sendRequest({
        url: endpoints.obligations.getList(),
        method: "GET",
        headers: {
        Authorization: getToken(),
        },
    });
};


// Get all obligation details
export const getAllObligationsApi = () => {
    return sendRequest({
        url: endpoints.obligations.getAll(),
        method: "GET",
        headers: {
        Authorization: getToken(),
        },
    });
};


// Get obligation by id
export const getObligationByIdApi = (id) => {
    return sendRequest({
        url: endpoints.obligations.getById(id),
        method: "GET",
        headers: {
        Authorization: getToken(),
        },
    });
};

//Create obligation
export const createObligationApi = (body) => {
    return sendRequest({
        url: endpoints.obligations.create(),
        method: "POST",
        headers: {
        Authorization: getToken(),
        },
        body,
    });
};

// Delete obligation
export const deleteObligationApi = (id) => {
    return sendRequest({
        url: endpoints.obligations.getById(id),
        method: "DELETE",
        headers: {
        Authorization: getToken(),
        },
    });
};

// Export obligations CSV
export const exportObligationCsvApi = (id = 0) => {
    return sendRequest({
        url: endpoints.obligations.exportCsv(),
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

// Export obligations JSON
export const exportObligationJsonApi = (id = 0) => {
    return sendRequest({
        url: endpoints.obligations.exportJson(),
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

// Import obligations CSV
export const importObligationCsvApi = (formData) => {
  return sendRequest({
    url: endpoints.obligations.importCsv(),
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });
};

// Import obligations JSON
export const importObligationJsonApi = (formData) => {
  return sendRequest({
    url: endpoints.obligations.importJson(),
    method: "POST",
    isMultipart: true,
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  });
};