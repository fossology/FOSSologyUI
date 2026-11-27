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

import { createTagApi, setTagDisplayStatusApi } from "@/api/tags";

// Creating a tag
export const createTag = ({ name, description }) => {
  return createTagApi({ name, description }).then((res) => res);
};

// Enabling or disabling the tag display for an upload
export const setTagDisplayStatus = ({ uploadId, enabled }) => {
  return setTagDisplayStatusApi({ uploadId, enabled }).then((res) => res);
};
