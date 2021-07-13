/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

// Api Url set in the env file
const apiUrl = `${
  process.env.REACT_APP_HTTPS === "true" ? "https" : "http"
}://${process.env.REACT_APP_SERVER_URL}`;

// Endpoints for all the REST APIs
const endpoints = {
  jobs: {
    details: (jobId) => `${apiUrl}/jobs/${jobId}`,
  },
  auth: {
    tokens: () => `${apiUrl}/tokens`,
  },
  search: {
    search: () => `${apiUrl}/search`,
  },
  users: {
    self: () => `${apiUrl}/users/self`,
    getAll: () => `${apiUrl}/users`,
    getSingle: (userId) => `${apiUrl}/users/${userId}`,
    delete: (userId) => `${apiUrl}/users/${userId}`,
  },
  folders: {
    getAll: () => `${apiUrl}/folders`,
    getSingle: (folderId) => `${apiUrl}/folders/${folderId}`,
    create: () => `${apiUrl}/folders`,
    read: (folderId) => `${apiUrl}/folders/${folderId}`,
    edit: (folderId) => `${apiUrl}/folders/${folderId}`,
    delete: (folderId) => `${apiUrl}/folders/${folderId}`,
    move: (folderId) => `${apiUrl}/folders/${folderId}`,
  },
  upload: {
    uploadCreate: () => `${apiUrl}/uploads`,
    scheduleAnalysis: () => `${apiUrl}/jobs`,
    getId: (uploadId) => `${apiUrl}/uploads/${uploadId}`,
  },
  browse: {
    get: () => `${apiUrl}/uploads`,
  },
  organize: {
    uploads: {
      get: (folder) => `${apiUrl}/uploads?folderId=${folder}`,
      delete: (deleteId) => `${apiUrl}/uploads/${deleteId}`,
      // Set the recursive false to reduce amount of data in response
      move: (moveId) => `${apiUrl}/uploads/${moveId}?recursive=false`,
      copy: (copyId) => `${apiUrl}/uploads/${copyId}?recursive=false`,
    },
  },
  admin: {
    groups: {
      create: () => `${apiUrl}/groups`,
      getAll: () => `${apiUrl}/groups`,
    },
  },
  license: {
    get: (kind) => `${apiUrl}/license?kind=${kind}`,
  },
};

export default endpoints;
