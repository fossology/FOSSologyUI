/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)

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

import { searchFiles } from "../api/search";

export function search(searchData) {
  return searchFiles(searchData).then((res) => {
    const searchData = [];
    res.map((data) => {
      searchData.push({
        uploadName: data.upload.uploadname,
        folderName: data.upload.foldername,
        description: data.upload.description,
        fileName: data.filename,
      });
    });
    return searchData;
  });
}
