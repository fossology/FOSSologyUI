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

import React, { useState, useEffect } from "react";
import arrayToTree from "array-to-tree";

// Title
import Title from "components/Title";

// Widgets
import { InputContainer, Alert } from "components/Widgets";

// Tree View of folders
import TreeContainer from "components/TreeContainer";

// Required functions for calling APIs
import getBrowseData from "services/browse";
import { getAllFolders } from "services/folders";
import { scheduleReport, downloadReport } from "services/jobs";
import {
  getFileNameFromContentDispostionHeader,
  handleError,
} from "shared/helper";

const Browse = () => {
  const initialState = {
    folderId: 1,
    page: 1,
    limit: 10,
    recursive: false,
  };

  const statusOptions = [
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
  const entriesOptions = [
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
  const assignOptions = [
    {
      id: 0,
      name: "me",
    },
    {
      id: 1,
      name: "unassigned",
    },
  ];
  const actionsOptions = [
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
  const initialMessage = {
    type: "success",
    text: "",
  };

  // Data required for getting the browse data list
  const [browseData, setBrowseData] = useState(initialState);

  // Setting the browse data to the table
  const [browseDataList, setBrowseDataList] = useState();

  // Setting the count of pages
  const [pagesOptions, setPagesOptions] = useState();

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState();

  // State Variables for handling Error Boundaries
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setMessage({
      type: "success",
      text: "Loading...",
    });
    setShowMessage(true);
    getBrowseData(browseData)
      .then((res) => {
        setBrowseDataList(res.res);
        const arr = [];
        for (let i = 0; i < res.pages; i++) {
          arr.push({
            id: i + 1,
            value: i + 1,
          });
        }
        setPagesOptions(arr);
        setShowMessage(false);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, [browseData]);

  useEffect(() => {
    getAllFolders()
      .then((res) => {
        const folders = res.map((folder) => {
          return {
            ...folder,
            state: {
              expanded: true,
              favorite: false,
              deletable: false,
            },
          };
        });
        setFolderList(
          arrayToTree(folders, {
            parentProperty: "parent",
            customID: "id",
          })
        );
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "limit") {
      setBrowseData({
        ...browseData,
        [e.target.name]: e.target.value,
        page: 1,
      });
    } else {
      setBrowseData({ ...browseData, [e.target.name]: e.target.value });
    }
  };

  const handleActionChange = (e, uploadId) => {
    scheduleReport(uploadId, e.target.value)
      .then((res) => {
        return res?.message;
      })
      .then((url) => {
        setTimeout(() => {
          downloadReport(url)
            .then((response) => {
              return response;
            })
            .then((response) => {
              const filename = getFileNameFromContentDispostionHeader(
                response.headers.get("content-disposition")
              );
              response
                .blob()
                .then((blob) => {
                  const aTag = document.createElement("a");
                  aTag.href = window.URL.createObjectURL(blob);
                  aTag.download = filename;
                  document.body.appendChild(aTag); // Required for this to work in FireFox
                  aTag.click();
                  setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(aTag);
                  }, 150);
                })
                .catch((error) => {
                  handleError(error, setMessage);
                  setShowMessage(true);
                });
            })
            .catch((error) => {
              handleError(error, setMessage);
              setShowMessage(true);
            });
        }, 1200);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setBrowseData({ ...browseData, folderId: id });
  };

  return (
    <>
      <Title title="Browse" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <h2 className="font-size-sub-heading">Folder Navigation</h2>
            {folderList && (
              <TreeContainer data={folderList} handleClick={handleClick} />
            )}
          </div>
          <div className="col-md-9 col-lg-10">
            <table className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered">
              <thead>
                <tr>
                  <th colSpan="6" className="font-size-sub-heading text-center">
                    Uploads in Software Repository
                  </th>
                </tr>
                <tr className="font-demi">
                  <td colSpan="6" className="p-2 m-2">
                    <span className="mt-1">Show entries: </span>
                    <InputContainer
                      name="limit"
                      type="select"
                      onChange={(e) => handleChange(e)}
                      options={entriesOptions}
                      property="entry"
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                  </th>
                  <th>
                    <InputContainer
                      name="status"
                      type="select"
                      onChange={(e) => handleChange(e)}
                      options={statusOptions}
                      property="name"
                    />
                  </th>
                  <th />
                  <th />
                  <th>
                    <InputContainer
                      name="status"
                      type="select"
                      onChange={(e) => handleChange(e)}
                      options={assignOptions}
                      property="name"
                    />
                  </th>
                </tr>
                <tr className="font-bold text-center">
                  <th>Upload Name and Description</th>
                  <th>Status</th>
                  <th>Comment</th>
                  <th>Main Licenses</th>
                  <th>Assigned to</th>
                  <th>Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {browseDataList?.map((data) => (
                  <tr key={data?.id} className="text-center">
                    <td>
                      <div className="font-demi">{data?.uploadname}</div>
                      <div className="font-size-small">{data?.description}</div>
                      <InputContainer
                        name="action"
                        type="select"
                        onChange={(e) => handleActionChange(e, data?.id)}
                        options={actionsOptions}
                        property="name"
                        defaultValue="0"
                        valueProperty="reportFormat"
                      />
                    </td>
                    <td>
                      <InputContainer
                        name="status"
                        type="select"
                        onChange={(e) => handleChange(e)}
                        options={statusOptions}
                        property="name"
                      />
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <InputContainer
                        name="status"
                        type="select"
                        onChange={(e) => handleChange(e)}
                        options={assignOptions}
                        property="name"
                      />
                    </td>
                    <td>{data?.uploaddate.split(".")[0]}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="6">
                    Page:
                    {pagesOptions && (
                      <InputContainer
                        name="page"
                        type="select"
                        onChange={(e) => handleChange(e)}
                        options={pagesOptions}
                        property="value"
                        className="mt-n4"
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
