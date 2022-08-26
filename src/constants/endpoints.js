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
    scheduleAnalysis: () => `${apiUrl}/jobs`,
    scheduleReport: () => `${apiUrl}/report`,
    downloadReport: (reportId) => `${apiUrl}/report/${reportId}`,
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
    add: () => `${apiUrl}/users`,
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
    getId: (uploadId) => `${apiUrl}/uploads/${uploadId}`,
    getSummary: (uploadId) => `${apiUrl}/uploads/${uploadId}/summary`,
    getLicense: (uploadId) => `${apiUrl}/uploads/${uploadId}/licenses`,
  },
  browse: {
    get: () => `${apiUrl}/uploads`,
  },
  organize: {
    uploads: {
      get: () => `${apiUrl}/uploads`,
      delete: (deleteId) => `${apiUrl}/uploads/${deleteId}`,
      move: (moveId) => `${apiUrl}/uploads/${moveId}`,
      copy: (copyId) => `${apiUrl}/uploads/${copyId}`,
    },
  },
  admin: {
    groups: {
      create: () => `${apiUrl}/groups`,
      getAll: () => `${apiUrl}/groups`,
      getAllDeletable: () => `${apiUrl}/groups/deletable`,
      delete: (groupId) => `${apiUrl}/groups/${groupId}`,
    },
  },
  license: {
    get: () => `${apiUrl}/license`,
    createCandidateLicense: () => `${apiUrl}/license`,
  },
  info: {
    info: () => `${apiUrl}/info`,
    health: () => `${apiUrl}/health`,
  },
};

export default endpoints;
