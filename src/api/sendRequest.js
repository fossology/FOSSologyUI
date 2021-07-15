/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

import { stringify } from "query-string";
import { logout } from "../shared/authHelper";
import routes from "../constants/routes";
import { setLocalStorage } from "../shared/storageHelper";

const sendRequest = ({
  url,
  method,
  credentials = false,
  body,
  headers = {},
  queryParams,
  isMultipart = false,
  noHeaders = false,
  retries = 0,
}) => {
  let mergedHeaders;
  if (isMultipart) {
    mergedHeaders = new Headers({ ...headers });
  } else {
    mergedHeaders = new Headers({
      "content-type": "application/json",
      accept: "application/json",
      ...headers,
    });
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

  if (credentials) {
    options.credentials = credentials;
  }
  if (queryParams) {
    URL = `${url}?${stringify(queryParams)}`;
  }
  return fetch(URL, options).then((res) => {
    if (res.ok) {
      // eslint-disable-next-line no-restricted-syntax
      for (const pair of res.headers.entries()) {
        if (pair[0] === "x-total-pages") {
          setLocalStorage("pages", pair[1]);
        }
      }
      return res.json();
    }
    if (retries > 0) {
      setTimeout(() => {
        const retriesLeft = retries - 1;
        sendRequest({
          url,
          method,
          headers,
          retriesLeft,
        });
      }, 10000);
    }
    return res.json().then((json) => {
      if (json.code === 403) {
        return logout(() => {
          window.location.href = routes.home;
          return true;
        });
      }
      const error = new Error(json.message);
      error.body = json;
      error.status = res.status;
      error.ok = false;
      return Promise.reject(error);
    });
  });
};

export default sendRequest;
