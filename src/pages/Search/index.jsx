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

import React, { useState } from "react";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Required functions for calling APIs
import search from "services/search";

// Required constants
import {
  initialState,
  initialMessageSearch,
  entriesOptions,
} from "../../constants/constants";

const Search = () => {
  // Data for searching specific uploads
  const [searchData, setSearchData] = useState(initialState);

  // Required uploads on the basis of search criteria
  const [searchResult, setSearchResult] = useState("");

  // Setting the count of pages
  const [pagesOptions, setPagesOptions] = useState();

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessageSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    search(searchData)
      .then((result) => {
        setSearchResult(result.search);
        const arr = [];
        for (let i = 0; i < result.pages; i++) {
          arr.push({
            id: i + 1,
            value: i + 1,
          });
        }
        setPagesOptions(arr);
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
        setShowMessage(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "limit") {
      setSearchData({
        ...searchData,
        [e.target.name]: e.target.value,
        page: 1,
      });
    } else {
      setSearchData({ ...searchData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <Title title="Search" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">Search</h1>
        <br />
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <form>
              {pagesOptions && (
                <InputContainer
                  name="page"
                  type="select"
                  onChange={(e) => handleChange(e)}
                  options={pagesOptions}
                  property="value"
                >
                  Pages
                </InputContainer>
              )}
              <InputContainer
                name="limit"
                type="select"
                onChange={(e) => handleChange(e)}
                options={entriesOptions}
                property="entry"
              >
                Show entries:
              </InputContainer>
              <InputContainer
                value="directory"
                name="searchType"
                type="radio"
                className="mt-4"
                id="search-upload-type-directory"
                onChange={handleChange}
                checked={searchData.searchType === "directory"}
              >
                Containers only (rpms, tars, isos, etc), including directories.
              </InputContainer>
              <InputContainer
                value="containers"
                name="searchType"
                type="radio"
                id="search-upload-type-containers"
                onChange={handleChange}
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
                id="search-upload-type-all-files"
                onChange={handleChange}
                checked={searchData.searchType === "allfiles"}
              >
                All Files
              </InputContainer>
              <div className="font-demi mt-4">
                You must choose one or more search criteria (not case
                sensitive).
              </div>
              <div className="mb-2">
                <InputContainer
                  value={searchData.uploadId}
                  name="uploadId"
                  type="text"
                  id="search-upload-id"
                  onChange={handleChange}
                >
                  Choose upload to search into
                </InputContainer>
              </div>
              <InputContainer
                value={searchData.filename}
                name="filename"
                type="text"
                id="search-file-name"
                onChange={handleChange}
              >
                Enter the filename to find:
              </InputContainer>
              <InputContainer
                value={searchData.tag}
                name="tag"
                type="text"
                id="search-tag"
                onChange={handleChange}
              >
                Tag to find
              </InputContainer>
              <InputContainer
                value={searchData.filesizemin}
                name="filesizemin"
                type="text"
                id="search-file-size-min"
                placeholder="in Bytes"
                onChange={handleChange}
              >
                File size is &ge;
              </InputContainer>
              <InputContainer
                value={searchData.filesizemax}
                name="filesizemax"
                type="text"
                id="search-file-size-max"
                placeholder="in Bytes"
                onChange={handleChange}
              >
                File size is &le;
              </InputContainer>
              <div className="font-demi mt-4">
                You may also choose one or more optional search filters (not
                case sensitive).
              </div>
              <InputContainer
                value={searchData.license}
                name="license"
                type="text"
                id="search-license"
                onChange={handleChange}
              >
                License
              </InputContainer>
              <InputContainer
                value={searchData.copyright}
                name="copyright"
                type="text"
                id="search-copyright"
                onChange={handleChange}
              >
                Copyright
              </InputContainer>
              <Button type="submit" onClick={handleSubmit} className="mt-4">
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Search"
                )}
              </Button>
            </form>
            {searchResult && (
              <>
                <h3 className="font-size-sub-heading mt-4">
                  {searchResult.length} files matching your search result.
                </h3>
                {searchResult.map(
                  (
                    { uploadTreeId, uploadName, folderName, fileName },
                    index
                  ) => (
                    <div key={uploadTreeId} className="box p-3 mt-2">
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
    </>
  );
};

export default Search;
