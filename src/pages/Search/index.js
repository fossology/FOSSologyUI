/***************************************************************
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
***************************************************************/

import React, { useState } from "react";
import { search } from "../../services/search";
import InputContainer from "../../components/Widgets/Input";
import Button from "../../components/Widgets/Button";

const Search = () => {
  const initialState = {
    groupName: "",
    searchType: "allfiles",
    uploadId: "",
    filename: "",
    tag: "",
    filesizemin: "",
    filesizemax: "",
    license: "",
    copyright: "",
  };
  const [searchData, setSearchData] = useState(initialState);
  const [searchResult, setSearchResult] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await search(searchData);
    setSearchResult(result);
  };
  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };
  return (
    <div className="main-container my-3">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12 bg-white home-box-shadow">
          <form>
            <InputContainer
              value="directory"
              name="searchType"
              type="radio"
              id="upload"
              onChange={(e) => handleChange(e)}
              checked={searchData.searchType === "directory"}
            >
              Containers only (rpms, tars, isos, etc), including directories.
            </InputContainer>
            <InputContainer
              value="containers"
              name="searchType"
              type="radio"
              id="upload"
              onChange={(e) => handleChange(e)}
              checked={searchData.searchType === "containers"}
            >
              Containers only (rpms, tars, isos, etc), excluding directories.
              The filtering for license or copyright is not supported in this
              case.
            </InputContainer>
            <InputContainer
              value="allfiles"
              name="searchType"
              type="radio"
              id="upload"
              onChange={(e) => handleChange(e)}
              checked={searchData.searchType === "allfiles"}
            >
              All Files
            </InputContainer>
            <div className="font-demi mt-4">
              You must choose one or more search criteria (not case sensitive).
            </div>
            <div className="mb-2">
              <InputContainer
                value={searchData.uploadId}
                name="uploadId"
                type="text"
                id="search-upload-id"
                onChange={(e) => handleChange(e)}
              >
                Choose upload to search into
              </InputContainer>
            </div>
            <InputContainer
              value={searchData.filename}
              name="filename"
              type="text"
              id="search-file-name"
              onChange={(e) => handleChange(e)}
            >
              Enter the filename to find:
            </InputContainer>
            <InputContainer
              value={searchData.tag}
              name="tag"
              type="text"
              id="search-tag"
              onChange={(e) => handleChange(e)}
            >
              Tag to find
            </InputContainer>
            <InputContainer
              value={searchData.filesizemin}
              name="filesizemin"
              type="text"
              id="search-file-size-min"
              placeholder="in Bytes"
              onChange={(e) => handleChange(e)}
            >
              File size is &ge;
            </InputContainer>
            <InputContainer
              value={searchData.filesizemax}
              name="filesizemax"
              type="text"
              id="search-file-size-max"
              placeholder="in Bytes"
              onChange={(e) => handleChange(e)}
            >
              File size is &le;
            </InputContainer>
            <div className="font-demi mt-4">
              You may also choose one or more optional search filters (not case
              sensitive).
            </div>
            <InputContainer
              value={searchData.license}
              name="license"
              type="text"
              id="search-license"
              onChange={(e) => handleChange(e)}
            >
              License
            </InputContainer>
            <InputContainer
              value={searchData.copyright}
              name="copyright"
              type="text"
              id="search-copyright"
              onChange={(e) => handleChange(e)}
            >
              Copyright
            </InputContainer>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="mt-4"
            >
              Search
            </Button>
          </form>
          {searchResult && (
            <>
              <h3 className="font-size-sub-heading mt-4">
                {searchResult.length} files matching your search result.
              </h3>
              {searchResult.map(
                ({ uploadName, folderName, fileName }, index) => (
                  <div key={index} className="card p-3 mt-2">
                    <div className="font-demi">
                      {index + 1}. Folder: {folderName}
                    </div>
                    <div className="font-medium ml-3">
                      {uploadName}/{fileName}
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
