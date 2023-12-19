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
import {
  copyUploadApi,
  deleteUploadsApi,
  getUploadsByFolderIdApi,
  moveUploadApi,
} from "api/organizeUploads";

jest.mock("api/sendRequest");

describe("organizeUploads", () => {
  test("getUploadsByFolderIdApi", () => {
    const id = 1;
    const groupName = "groupName";
    const recursive = "recursive";
    const url = endpoints.organize.uploads.get();
    sendRequest.mockImplementation(() => true);

    expect(getUploadsByFolderIdApi(id, groupName, recursive)).toBe(
      sendRequest({})
    );
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
        groupName,
        queryParams: {
          recursive,
          folderId: id,
        },
      })
    );
  });

  test("deleteUploadsApi", () => {
    const id = 1;
    const url = endpoints.organize.uploads.delete(id);
    sendRequest.mockImplementation(() => true);

    expect(deleteUploadsApi(id)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "DELETE",
        headers: {
          Authorization: getToken(),
        },
      })
    );
  });

  test("moveUploadApi", () => {
    const folderId = 1;
    const id = 2;
    const url = endpoints.organize.uploads.move(id);
    sendRequest.mockImplementation(() => true);

    expect(moveUploadApi(folderId, id)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "PATCH",
        headers: {
          Authorization: getToken(),
          folderId,
        },
        queryParams: {
          // Set the recursive false to reduce amount of data in response
          recursive: false,
        },
      })
    );
  });

  test("copyUploadApi", () => {
    const folderId = 1;
    const id = 2;
    const url = endpoints.organize.uploads.copy(id);
    sendRequest.mockImplementation(() => true);

    expect(copyUploadApi(folderId, id)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "PUT",
        headers: {
          Authorization: getToken(),
          folderId,
        },
        queryParams: {
          // Set the recursive false to reduce amount of data in response
          recursive: false,
        },
      })
    );
  });
});
