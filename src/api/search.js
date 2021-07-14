/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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

import PropTypes from "prop-types";
import sendRequest from "./sendRequest";
import endpoints from "../constants/endpoints";
import { getToken } from "../shared/authHelper";

// Fetching all the uploads on the basis of search criteria
const searchFiles = ({
  groupName,
  searchType,
  uploadId,
  filename,
  tag,
  filesizemin,
  filesizemax,
  license,
  copyright,
}) => {
  const url = endpoints.search.search();
  return sendRequest({
    url,
    method: "GET",
    headers: {
      Authorization: getToken(),
      groupName,
      searchType,
      uploadId,
      filename,
      tag,
      filesizemin,
      filesizemax,
      license,
      copyright,
    },
  });
};

searchFiles.propTypes = {
  groupName: PropTypes.string,
  searchType: PropTypes.string,
  uploadId: PropTypes.number,
  filename: PropTypes.string,
  tag: PropTypes.string,
  filesizemin: PropTypes.number,
  filesizemax: PropTypes.number,
  license: PropTypes.string,
  copyright: PropTypes.string,
};

export default searchFiles;
