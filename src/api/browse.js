/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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

import PropTypes from "prop-types";

import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// Fetching uploads with browse filters
const getBrowseDataApi = ({
  folderId,
  page,
  limit,
  recursive,
  status,
  assignee,
}) => {
  const url = endpoints.uploads.getAll();

  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
    queryParams: {
      folderId,
      recursive,
      page,
      limit,
      status: status || undefined,
      assignee: assignee || undefined,
    },
  });
};

getBrowseDataApi.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  folderId: PropTypes.number,
  recursive: PropTypes.bool,
  status: PropTypes.string,
  assignee: PropTypes.string,
};

export default getBrowseDataApi;