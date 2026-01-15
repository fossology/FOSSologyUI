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

import endpoints from "@/constants/endpoints";

// Constants for the user login
import { tokenNameLength, tokenScope, tokenExpiryDays } from "@/constants/auth";

// Helper functions for generating random string and getting date in the requied format
import { randomString, getDate } from "@/shared/helper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

const fetchTokenApi = (username, password, tokenDetails = null) => {
  const url = endpoints.auth.tokens();

  const isApiV2 =
    typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_SERVER_URL &&
    process.env.NEXT_PUBLIC_SERVER_URL.includes("/api/v2");

  const buildDefaultBody = () => {
    if (isApiV2) {
      return {
        username,
        password,
        tokenName: randomString(tokenNameLength),
        tokenScope: tokenScope,
        tokenExpire: getDate(tokenExpiryDays),
      };
    }

    return {
      username,
      password,
      token_name: randomString(tokenNameLength),
      token_scope: tokenScope,
      token_expire: getDate(tokenExpiryDays),
    };
  };

  const transformProvidedDetails = (details) => {
    if (!details) return null;
    if (isApiV2) {
      return {
        username: details.username,
        password: details.password,
        tokenName: details.tokenName ?? details.token_name,
        tokenScope: details.tokenScope ?? details.token_scope,
        tokenExpire: details.tokenExpire ?? details.token_expire,
      };
    }

    return {
      username: details.username,
      password: details.password,
      token_name: details.token_name ?? details.tokenName,
      token_scope: details.token_scope ?? details.tokenScope,
      token_expire: details.token_expire ?? details.tokenExpire,
    };
  };

  const body = tokenDetails ? transformProvidedDetails(tokenDetails) : buildDefaultBody();

  return sendRequest({
    url,
    method: "POST",
    body,
    addGroupName: false,
  });
};

export default fetchTokenApi;
