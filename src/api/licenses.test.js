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

import sendRequest from "api/sendRequest";
import endpoints from "constants/endpoints";
import { getToken } from "shared/authHelper";
import { createCandidateLicenseApi, getAllLicenseApi } from "api/licenses";

jest.mock("api/sendRequest");

describe("licenses", () => {
  test("getAllLicenseApi", () => {
    const page = 1;
    const limit = 2;
    const kind = "kind";
    const url = endpoints.license.get();

    sendRequest.mockImplementation(() => true);

    expect(getAllLicenseApi({ page, limit, kind })).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
          page,
          limit,
        },
        queryParams: {
          kind,
        },
      })
    );
  });

  test("createCandidateLicenseApi", () => {
    const shortName = "shortName";
    const fullName = "fullName";
    const text = "text";
    const risk = "risk";
    const licenseUrl = "licenseUrl";
    const mergeRequest = "mergeRequest";
    const url = endpoints.license.createCandidateLicense();

    expect(
      createCandidateLicenseApi({
        shortName,
        fullName,
        text,
        risk,
        licenseUrl,
        mergeRequest,
      })
    ).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          Authorization: getToken(),
        },
        body: {
          shortName,
          fullName,
          text,
          risk,
          url: licenseUrl,
          isCandidate: true,
          mergeRequest,
        },
      })
    );
  });
});
