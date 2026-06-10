/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

// api/auth.js
// ─────────────────────────────────────────────────────────────────────────────
// CHANGES v1 → v2
// • Endpoint path /tokens is unchanged.
// • The request body is sent as application/x-www-form-urlencoded in v2
//   (the v2 OpenAPI spec specifies the content-type as
//   `application/x-www-form-urlencoded` for POST /tokens).
//   In v1 the body was JSON; sendRequest must now serialise it as form-data.
//   We pass isFormUrlEncoded: true so sendRequest can handle it.
// • Field names are unchanged: username, password, tokenName, tokenScope,
//   tokenExpire.
// ─────────────────────────────────────────────────────────────────────────────
import endpoints from "@/constants/endpoints";
import { tokenNameLength, tokenScope, tokenExpiryDays } from "@/constants/auth";
import { randomString, getDate } from "@/shared/helper";
import sendRequest from "./sendRequest";

const fetchTokenApi = (username, password, tokenDetails = null) => {
  const url = endpoints.auth.tokens();
  return sendRequest({
    url,
    method: "POST",
    // v2 requires form-encoded body for /tokens
    isFormUrlEncoded: true,
    body: tokenDetails || {
      username,
      password,
      tokenName: randomString(tokenNameLength),
      tokenScope: tokenScope,
      tokenExpire: getDate(tokenExpiryDays),
    },
    addGroupName: false,
  });
};

export default fetchTokenApi;
