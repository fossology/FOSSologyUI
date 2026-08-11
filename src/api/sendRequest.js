/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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
  isFormEncoded = false,
  noHeaders = false,
  addGroupName = true,
  retries = 0,
  isFile = false,
}) => {
  
  // 1. Build headers safely
  
  let mergedHeaders;

  if (noHeaders) {
    mergedHeaders = undefined;
  } else if (isFormEncoded) {
    mergedHeaders = new Headers({
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json",
      ...headers,
    });
  } else {
    const baseHeaders =
      isMultipart || isFile
        ? {}
        : {
            "content-type": "application/json",
            accept: "application/json",
          };

    mergedHeaders = new Headers({
      ...baseHeaders,
      ...headers,
    });
  }

  
  // 2. Inject groupName header
  
  if (addGroupName && mergedHeaders instanceof Headers) {
    mergedHeaders.append(
      "groupName",
      groupName ||
        getLocalStorage("currentGroup") ||
        getLocalStorage("user")?.defaultGroup
    );
  }

  
  // 3. Build final URL safely
  
  let finalURL = url;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const cleanedParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, v]) => v !== undefined && v !== null && v !== ""
      )
    );

    const query = queryString.stringify(cleanedParams);
    if (query) {
      finalURL = `${url}?${query}`;
    }
  }

  
  // 4. Build fetch options
  
  const options = {
    method,
    headers: mergedHeaders,
  };

  if (body !== undefined && body !== null) {
    // Body encoding precedence: multipart/FormData > form-encoded > JSON (default)
    if (isMultipart || body instanceof FormData) {
      options.body = body;
    } else if (isFormEncoded) {
      options.body = new URLSearchParams(body).toString();
    } else {
      options.body = JSON.stringify(body);
    }
  }

  
  // 5. Fetch request
  
  return fetch(finalURL, options).then((res) => {
    // SUCCESS
    if (res.ok) {
      const totalPages = res.headers.get("x-total-pages");
      if (totalPages) {
        setLocalStorage("pages", totalPages);
      }

  if (isFile) {
    return res.blob().then((blob) => {
      const disposition = res.headers.get("content-disposition");

      let filename;

      if (disposition) {
        const match = disposition.match(
          /filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i
        );

        filename = decodeURIComponent(
          match?.[1] || match?.[2] || ""
        );
      }

      return {
        blob,
        filename, // undefined if not provided by backend
      };
    });
  }

    return res.json();
    }

    
    // RETRY LOGIC
    
    if (retries > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          sendRequest({
            url,
            method,
            body,
            groupName,
            headers,
            queryParams,
            isMultipart,
            noHeaders,
            addGroupName,
            retries: retries - 1,
            isFile,
          })
            .then(resolve)
            .catch(reject);
        }, 10000);
      });
    }

    
    // ERROR HANDLING
    
    return res.json().then((json) => {
      if (json.code === 403) {
        logout({
          message: json.message || messages.forbiddenResource,
        });
      }

      return Promise.reject({
        status: res.status,
        ok: false,
        message: json.message,
        body: json,
      });
    });
  });
};

export default sendRequest;
