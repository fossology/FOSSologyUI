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

// api/browse.js
// ─────────────────────────────────────────────────────────────────────────────
// CHANGES v1 → v2
// • Endpoint: was endpoints.browse.get() → now endpoints.uploads.getAll()
//   The dedicated "browse" group is gone in v2; the same /uploads endpoint
//   serves both the "Browse" view and the "Organize uploads" view.
// • page and limit are now query params (not request headers) in v2.
//   The v2 spec places them under the `parameters` array (in: query).
//   They are moved from `headers` to `queryParams`.
// ─────────────────────────────────────────────────────────────────────────────
import endpoints from "@/constants/endpoints";
import { getToken } from "@/shared/authHelper";
import sendRequest from "./sendRequest";

const getBrowseDataApi = ({ folderId, page, limit, recursive }) => {
  // v2: /uploads — page & limit are query params, not headers
  const url = endpoints.uploads.getAll();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      folderId,
      recursive,
      page,
      limit,
    },
  });
};

export default getBrowseDataApi;