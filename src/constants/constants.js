/*
 Copyright (C) 2022 Soham Banerjee(sohambanerjee4abc@hotmail.com)

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

export const statusOptions = [
  {
    id: 0,
    name: "open",
  },
  {
    id: 1,
    name: "in progress",
  },
  {
    id: 2,
    name: "closed",
  },
  {
    id: 3,
    name: "rejected",
  },
];
export const entriesOptions = [
  {
    id: 10,
    entry: "10",
  },
  {
    id: 25,
    entry: "25",
  },
  {
    id: 50,
    entry: "50",
  },
  {
    id: 100,
    entry: "100",
  },
];
export const assignOptions = [
  {
    id: 0,
    name: "me",
  },
  {
    id: 1,
    name: "unassigned",
  },
];
export const actionsOptions = [
  {
    id: 0,
    name: "-- select action --",
    reportFormat: "0",
    disabled: true,
  },
  {
    id: 1,
    name: "Export DEP5",
    reportFormat: "dep5",
  },
  {
    id: 2,
    name: "Export ReadMe_OSS",
    reportFormat: "readmeoss",
  },
  {
    id: 3,
    name: "Export SPDX RDF",
    reportFormat: "spdx2",
  },
  {
    id: 4,
    name: "Export SPDX tag:value",
    reportFormat: "spdx2tv",
  },
  {
    id: 5,
    name: "Export Unified Report",
    reportFormat: "unifiedreport",
  },
];
export const initialMessage = {
  type: "success",
  text: "",
};

export const initialState = {
  searchType: "allfiles",
  uploadId: "",
  filename: "",
  tag: "",
  filesizemin: "",
  filesizemax: "",
  license: "",
  copyright: "",
  page: 1,
  limit: 10,
};
export const initialMessageSearch = {
  type: "danger",
  text: "",
};
export const entriesOptionsSearch = [
  {
    id: 10,
    entry: "10",
  },
  {
    id: 25,
    entry: "25",
  },
  {
    id: 50,
    entry: "50",
  },
  {
    id: 100,
    entry: "100",
  },
];
