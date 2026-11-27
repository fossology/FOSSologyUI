/*
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

import endpoints from "@/constants/endpoints";

// Getting Authorization Token
import { getToken } from "@/shared/authHelper";

// Function for calling the fetch function for the APIs
import sendRequest from "./sendRequest";

// POST /tags
export const createTagApi = ({ name, description }) => {
  return sendRequest({
    url: endpoints.tags.create(),
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    body: {
      name,
      description,
    },
  });
};

// PUT /uploads/{uploadId}/tags/display
export const setTagDisplayStatusApi = ({ uploadId, enabled }) => {
  return sendRequest({
    url: endpoints.tags.setDisplayStatus(uploadId),
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    body: {
      enabled,
    },
  });
};
