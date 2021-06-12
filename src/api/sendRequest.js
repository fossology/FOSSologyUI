/*
* This file contains the function to make an API call using fetch
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