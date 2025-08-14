/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import searchApi from "@/api/search";
import { getLocalStorage } from "@/shared/storageHelper";

// Fetching all the uploads on the basis of search criteria
const search = (searchData) => {
  return searchApi(searchData).then((res) => {
    // Sending the required data to the search page
    const modifiedSearchData = [];
    res.forEach((data) => {
      modifiedSearchData.push({
        uploadTreeId: data.upload.uploadTreeId,
        uploadName: data.upload.uploadname,
        folderName: data.upload.foldername,
        description: data.upload.description,
        fileName: data.filename,
      });
    });
    return { search: modifiedSearchData, pages: getLocalStorage("pages") };
  });
};

export default search;
