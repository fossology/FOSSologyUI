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

import { createGroupApi, getAllGroupsApi } from "api/groups";
import sendRequest from "api/sendRequest";
import endpoints from "constants/endpoints";
import { getToken } from "shared/authHelper";

jest.mock("api/sendRequest");

describe("groups", () => {
  test("getAllGroupsApi", () => {
    const url = endpoints.admin.groups.getAll();
    sendRequest.mockImplementation(() => true);

    expect(getAllGroupsApi()).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
        addGroupName: false,
      })
    );
  });

  test("createGroupApi", () => {
    const name = "name";
    const url = endpoints.admin.groups.create();
    sendRequest.mockImplementation(() => true);

    expect(createGroupApi(name)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          Authorization: getToken(),
          name,
        },
        addGroupName: false,
      })
    );
  });
});
