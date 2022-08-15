/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)
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

import sendRequest from "api/sendRequest";
import endpoints from "constants/endpoints";
import { getToken } from "shared/authHelper";
import { createMaintenanceApi } from "api/maintenance";

jest.mock("api/sendRequest");

describe("maintenance", () => {
  test("createMaintenanceApi", () => {
    const data = { options: ["O", "L"] };
    const url = endpoints.admin.maintenance.create();

    sendRequest.mockImplementation(() => true);
    expect(createMaintenanceApi(data)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          Authorization: getToken(),
        },
        body: data,
      })
    );
  });
});
