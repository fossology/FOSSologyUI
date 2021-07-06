/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)

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

const apiUrl = "http://localhost/repo/api/v1";

export const endpoints = {
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
    get: (folderId, recursive) =>
      `${apiUrl}/uploads?folderId=${folderId}&recursive=${recursive}`,
  },
  organize: {
    uploads: {
      get: (folder) => `${apiUrl}/uploads?folderId=${folder}`,
      delete: (deleteId) => `${apiUrl}/uploads/${deleteId}`,
    },
  },
};
