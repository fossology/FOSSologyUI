/*
 Copyright (C) 2021 Edgar Sherman (edgarshermangh14@gmail.com)
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

import { disableFetchMocks, enableFetchMocks } from "jest-fetch-mock";
import { stringify } from "query-string";
import { setLocalStorage } from "shared/storageHelper";
import { logout } from "shared/authHelper";
import sendRequest from "api/sendRequest";

jest.mock("shared/storageHelper", () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn(),
}));

jest.mock("shared/authHelper", () => ({
  logout: jest.fn(),
}));

describe("sendRequest", () => {
  let defaultArgs;
  beforeEach(() => {
    jest.useFakeTimers();
    enableFetchMocks();
    fetch.doMock();

    defaultArgs = {
      url: "url",
      method: "GET",
      body: null,
      groupName: "myGroupName",
      queryParams: null,
    };
  });

  afterEach(() => {
    disableFetchMocks();
  });

  test("basic call for sendRequest", async () => {
    fetch.mockResponse(JSON.stringify({}));

    await sendRequest(defaultArgs);

    expect(fetch).toHaveBeenCalledWith(
      defaultArgs.url,
      expect.objectContaining({
        body: defaultArgs.body,
        headers: new Headers({
          "content-type": "application/json",
          accept: "application/json",
          groupName: "myGroupName",
          ...defaultArgs.headers,
        }),
        method: defaultArgs.method,
      })
    );
  });

  test("sendRequest handles isMultipart", async () => {
    defaultArgs.method = "POST";
    defaultArgs.body = {};
    defaultArgs.isMultipart = true;
    fetch.mockResponse(JSON.stringify({}));

    await sendRequest(defaultArgs);

    expect(fetch).toHaveBeenCalledWith(
      defaultArgs.url,
      expect.objectContaining({
        body: defaultArgs.body,
        headers: new Headers({
          groupName: "myGroupName",
          ...defaultArgs.headers,
        }),
        method: defaultArgs.method,
      })
    );
  });

  test("sendRequest handles isFile", async () => {
    defaultArgs.isFile = true;
    defaultArgs.method = "POST";
    defaultArgs.body = {};
    fetch.mockResponse(JSON.stringify({}));

    await sendRequest(defaultArgs);

    expect(fetch).toHaveBeenCalledWith(
      defaultArgs.url,
      expect.objectContaining({
        body: JSON.stringify(defaultArgs.body),
        headers: new Headers({
          groupName: "myGroupName",
          ...defaultArgs.headers,
        }),
        method: defaultArgs.method,
      })
    );
  });

  test("sendRequest handles addGroupName", async () => {
    defaultArgs.addGroupName = false;
    fetch.mockResponse(JSON.stringify({}));

    await sendRequest(defaultArgs);

    expect(fetch).toHaveBeenCalledWith(
      defaultArgs.url,
      expect.objectContaining({
        body: defaultArgs.body,
        headers: new Headers({
          "content-type": "application/json",
          accept: "application/json",
          ...defaultArgs.headers,
        }),
        method: defaultArgs.method,
      })
    );
  });

  test("sendRequest handles noHeaders", async () => {
    defaultArgs.noHeaders = true;
    fetch.mockResponse(JSON.stringify({}));

    await sendRequest(defaultArgs);

    expect(fetch).toHaveBeenCalledWith(
      defaultArgs.url,
      expect.objectContaining({
        body: defaultArgs.body,
        headers: {},
        method: defaultArgs.method,
      })
    );
  });

  test("sendRequest handles queryParams", async () => {
    defaultArgs.queryParams = {
      option1: "abc",
      option2: "def",
    };
    fetch.mockResponse(JSON.stringify({}));

    await sendRequest(defaultArgs);

    expect(fetch).toHaveBeenCalledWith(
      `${defaultArgs.url}?${stringify(defaultArgs.queryParams)}`,
      expect.objectContaining({
        body: defaultArgs.body,
        headers: new Headers({
          "content-type": "application/json",
          accept: "application/json",
          groupName: "myGroupName",
          ...defaultArgs.headers,
        }),
        method: defaultArgs.method,
      })
    );
  });

  test("sendRequest handles response headers", async () => {
    const pages = "1";
    const headers = {
      "x-total-pages": pages,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const body = { data: {} };
    fetch.mockResponse(JSON.stringify(body), {
      status: 200,
      headers,
    });

    await sendRequest(defaultArgs);

    expect(setLocalStorage).toHaveBeenCalledWith("pages", pages);
  });

  test("sendRequest handles retries", async () => {
    defaultArgs.retries = 3;
    const body = { data: {} };
    fetch.mockResponses(
      [JSON.stringify(body), { status: 400 }],
      [JSON.stringify(body), { status: 200 }]
    );

    await sendRequest(defaultArgs);
    jest.runAllTimers();
    await new Promise((resolve) => setImmediate(resolve));
    jest.runAllTimers();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test("sendRequest handles failure", async () => {
    const message = "message";
    const body = { data: {}, message };
    const status = 400;
    fetch.mockResponse(JSON.stringify(body), { status });

    await expect(sendRequest(defaultArgs)).rejects.toEqual(
      expect.objectContaining({
        status,
        ok: false,
        message,
        body,
      })
    );
  });

  test("sendRequest handles 403", async () => {
    const message = "message";
    const status = 403;
    fetch.mockResponses(
      [JSON.stringify({ data: {}, code: status, message }), { status }],
      [JSON.stringify({ data: {}, code: status }), { status }]
    );

    await sendRequest(defaultArgs);
    expect(logout).toHaveBeenCalledWith(
      expect.objectContaining({
        message,
      })
    );
    await sendRequest(defaultArgs);
    expect(logout).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Requested resource is forbidden",
      })
    );
  });
});
