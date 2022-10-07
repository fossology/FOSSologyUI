/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com),
 Copyright (C) 2022 Soham Banerjee (sohambanerjee4abc@hotmail.com), Krishna Mahato (krishhtrishh9304@gmail.com)

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
import routes from "constants/routes";
import { Link, useHistory } from "react-router-dom";
import arrayToTree from "array-to-tree";
import messages from "constants/messages";

// Title
import Title from "components/Title";

// Widgets
import { InputContainer, Alert } from "components/Widgets";

// Tree View of folders
import TreeContainer from "components/TreeContainer";

// Required functions for calling APIs
import getBrowseData from "services/browse";
import { getAllFolders } from "services/folders";
import {
  scheduleReport,
  downloadReport,
  scheduleDownload,
} from "services/jobs";
import {
  getFileNameFromContentDispostionHeader,
  handleError,
} from "shared/helper";
import Pagination from "@material-ui/lab/Pagination";

import {
  statusOptions,
  entriesOptions,
  assignOptions,
  actionsOptions,
  initialMessage,
} from "../../constants/constants";

const Browse = () => {
  const initialState = {
    folderId: 1,
    page: 1,
    limit: 10,
    recursive: false,
  };

  // Data required for getting the browse data list
  const [browseData, setBrowseData] = useState(initialState);

  // Setting the browse data to the table
  const [browseDataList, setBrowseDataList] = useState();

  // Setting the count of pages
  const [pagesOptions, setPagesOptions] = useState();

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState();
  const [folderCount, setFolderCount] = useState(0);

  // State Variables for handling Error Boundaries
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  // qurey used for searching in the current page
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState();

  const history = useHistory();

  useEffect(() => {
    setMessage({
      type: "success",
      text: messages.loading,
    });
    setShowMessage(true);
    getBrowseData(browseData)
      .then((res) => {
        setBrowseDataList(res.res);
        const arr = [];
        setPages(res.pages);
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
        // setting the folders and subfolders count before converting the array to tree
        setFolderCount(folders.length);
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
  }, [browseData]);

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
    if (e.target.value === "importReport") {
      history.push(
        `/upload/reportImport?folder=${browseData.folderId}&upload=${uploadId}`
      );
      return;
    }

    if (e.target.value !== "download") {
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
    } else {
      scheduleDownload(uploadId)
        .then((response) => {
          const filename = getFileNameFromContentDispostionHeader(
            response.headers.get("pragma")
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
                window.URL.revokeObjectURL(blob);
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
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setPages(1);
    setBrowseData({ ...browseData, folderId: id, page: 1 });
  };
  const handlePageChange = (e, value) => {
    if (value >= 1) {
      setPages(value);
      setBrowseData({ ...browseData, [`page`]: value });
    }
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
              <TreeContainer
                folderCount={folderCount}
                data={folderList}
                handleClick={handleClick}
              />
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
                      placeholder="Filter upload"
                      onChange={(event) => setQuery(event.target.value)}
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
                {browseDataList
                  ?.filter((post) => {
                    if (query === "") {
                      return post;
                    }
                    if (
                      post?.uploadname
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    )
                      return post;
                    return null;
                  })
                  ?.map((data) => (
                    <tr key={data?.id} className="text-center">
                      <td>
                        <Link
                          to={`${routes.browseUploads.licenseBrowser}/uploadID=${data.id}`}
                        >
                          <div className="text-primary-color">
                            <div className="font-demi">{data?.uploadname}</div>
                            <div className="font-size-small">
                              {data?.description}
                            </div>
                          </div>
                        </Link>
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
                    <div className="right-pagination">
                      Page:
                      {pagesOptions && (
                        <div className="row">
                          <Pagination
                            name="page"
                            className="col-md-6 pagination-div "
                            property="value"
                            count={pages}
                            page={browseData.page}
                            onChange={handlePageChange}
                          />
                          <div className="row ">
                            Go to: &nbsp;
                            <input
                              type="number"
                              className="pagination-textarea"
                              size="3"
                              onChange={(event) =>
                                handlePageChange(event, event.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
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
