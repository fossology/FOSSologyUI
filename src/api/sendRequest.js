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

import queryString from "query-string";
import { logout } from "@/shared/authHelper";
import messages from "@/constants/messages";

// Helper function for setting the item in Localstorage
import { getLocalStorage, setLocalStorage } from "@/shared/storageHelper";

const sendRequest = ({
  url,
  method,
  body,
  groupName,
  headers = {},
  queryParams,
  isMultipart = false,
  noHeaders = false,
  addGroupName = true,
  retries = 0,
  isFile = false,
}) => {
  let mergedHeaders;
  if (isMultipart) {
    mergedHeaders = new Headers({
      ...headers,
    });
  } else {
    mergedHeaders = new Headers({
      "content-type": "application/json",
      accept: "application/json",
      ...headers,
    });
  }
  if (isFile) {
    mergedHeaders = new Headers({
      ...headers,
    });
  }
  if (addGroupName) {
    mergedHeaders.append(
      "groupName",
      groupName ||
        getLocalStorage("currentGroup") ||
        getLocalStorage("user")?.default_group
    );
  }
  if (noHeaders) {
    mergedHeaders = {};
  }
  const options = {
    method,
    headers: mergedHeaders,
    body,
  };
  let URL = url;
  if (body) {
    if (isMultipart) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
  } else {
    options.body = null;
  }
  if (queryParams) {
    URL = `${url}?${queryString.stringify(queryParams)}`;
  }
  return fetch(URL, options).then((res) => {
    if (res.ok) {
      for (const pair of res.headers.entries()) {
        if (pair[0] === "x-total-pages") {
          setLocalStorage("pages", pair[1]);
        }
      }
      if (isFile) {
        return res;
      }
      return res.json();
    }
    // Checking the retries for hitting the request several times
    if (retries > 0) {
      return setTimeout(() => {
        const retriesLeft = retries - 1;
        sendRequest({
          url,
          method,
          headers,
          retries: retriesLeft,
        });
      }, 10000);
    }
    return res.json().then((json) => {
      const error = {
        status: res.status,
        ok: false,
        message: json.message,
        body: json,
      };
      if (json.code === 403) {
        if (json.message) {
          return logout({ message: json.message });
        }
        return logout({ message: messages.forbiddenResource });
      }
      return Promise.reject(error);
    });
  });
};

export default sendRequest;
