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
import {
  createFolderApi,
  deleteFolderApi,
  editFolderApi,
  getAllFoldersApi,
  getSingleFolderApi,
  moveCopyFolderApi,
} from "api/folders";
import { getToken } from "shared/authHelper";
import endpoints from "constants/endpoints";

jest.mock("api/sendRequest");

describe("folders", () => {
  test("getAllFoldersApi", () => {
    const groupName = "group";
    const url = endpoints.folders.getAll();
    sendRequest.mockImplementation(() => true);

    expect(getAllFoldersApi(groupName)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
        groupName,
      })
    );
  });

  test("getSingleFolderAPI", () => {
    const id = 1;
    const url = endpoints.folders.getSingle(id);
    sendRequest.mockImplementation(() => true);

    expect(getSingleFolderApi(id)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
      })
    );
  });

  test("deleteFolderApi", () => {
    const id = 1;
    const url = endpoints.folders.getSingle(id);
    sendRequest.mockImplementation(() => true);

    expect(deleteFolderApi(id)).toBe(sendRequest({}));
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

  test("createFolderApi", () => {
    const parentFolder = "parent";
    const folderName = "name";
    const folderDescription = "description";
    const url = endpoints.folders.create();
    sendRequest.mockImplementation(() => true);

    expect(createFolderApi(parentFolder, folderName, folderDescription)).toBe(
      sendRequest({})
    );
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "POST",
        headers: {
          Authorization: getToken(),
          parentFolder,
          folderName,
          folderDescription,
        },
      })
    );
  });

  test("editFolderApi", () => {
    const name = "name";
    const description = "description";
    const id = 1;
    const url = endpoints.folders.edit(id);
    sendRequest.mockImplementation(() => true);

    expect(editFolderApi(name, description, id)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "PATCH",
        headers: {
          Authorization: getToken(),
          name,
          description,
        },
      })
    );
  });

  test("moveCopyFolderApi", () => {
    const parent = "parent";
    const id = 1;
    const action = "action";
    const url = endpoints.folders.move(id);
    sendRequest.mockImplementation(() => true);

    expect(moveCopyFolderApi(parent, id, action)).toBe(sendRequest({}));
    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url,
        method: "PUT",
        headers: {
          Authorization: getToken(),
          parent,
          action,
        },
      })
    );
  });
});
