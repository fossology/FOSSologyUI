/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
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

import { stringify } from 'query-string';
export const sendRequest = ({
  url,
  method,
  credentials = null,
  body,
  headers = {},
  queryParams,
  isMultipart = false,
  noHeaders = false,
}) => {
  let mergedHeaders;
  if (isMultipart) {
    mergedHeaders = new Headers({ ...headers });
  }
  else {
    mergedHeaders = new Headers({ 'content-type': 'application/json', ...headers })
  }
  if (noHeaders) {
    mergedHeaders = {}
  }
  const options = {
    method: method,
    headers: mergedHeaders,
    body: body ? (isMultipart ? body : JSON.stringify((body))) : null
  };
  if (credentials) {
    options.credentials = credentials;
  }
  if (queryParams) {
    url = `${url}?${stringify(queryParams)}`;
  }
  return fetch(url, options).then(res => {
    if (res.ok) {
      return res.json();
    }
    else {
      return res.json().then(function(json) {
        return Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json
        });
      });
    }
  })
}