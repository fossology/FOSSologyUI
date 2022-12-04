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

import { getHealthApi, getInfoApi } from "api/info";
import sendRequest from "api/sendRequest";
import endpoints from "constants/endpoints";

jest.mock("api/sendRequest");

describe("info", () => {
  test("getInfoApi", () => {
    const url = endpoints.admin.info.info();
    sendRequest.mockImplementation(() => true);

    expect(getInfoApi()).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
      })
    );
  });

  test("getHealthApi", () => {
    const url = endpoints.admin.info.health();
    sendRequest.mockImplementation(() => true);

    expect(getHealthApi()).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
      })
    );
  });
});
