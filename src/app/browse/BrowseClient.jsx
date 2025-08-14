/*
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

'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import arrayToTree from "array-to-tree";

// Constants
import routes from "@/constants/routes";
import messages from "@/constants/messages";
import {
  statusOptions,
  entriesOptions,
  assignOptions,
  actionsOptions,
  initialMessage,
} from "@/constants/constants";

// Components
import { InputContainer, Alert } from "@/components/Widgets";
import TreeContainer from "@/components/TreeContainer";
import Pagination from '@mui/material/Pagination';

// Services
import getBrowseData from "@/services/browse";
import { getAllFolders } from "@/services/folders";
import { scheduleReport, downloadReport } from "@/services/jobs";

// Helpers
import {
  getFileNameFromContentDispostionHeader,
  handleError,
} from "@/shared/helper";

const BrowseClient = () => {
  const router = useRouter();

  const initialState = {
    folderId: 1,
    page: 1,
    limit: 10,
    recursive: false,
  };

  const [browseData, setBrowseData] = useState(initialState);
  const [browseDataList, setBrowseDataList] = useState([]);
  const [pagesOptions, setPagesOptions] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [folderCount, setFolderCount] = useState(0);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setMessage({ type: "success", text: messages.loading });
    setShowMessage(true);

    getBrowseData(browseData)
      .then((res) => {
        setBrowseDataList(res.res);
        setPages(res.pages);
        setPagesOptions(
          Array.from({ length: res.pages }, (_, i) => ({ id: i + 1, value: i + 1 }))
        );
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
        const folders = res.map((folder) => ({
          ...folder,
          state: { expanded: true, favorite: false, deletable: false },
        }));
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
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "limit") {
      setBrowseData({ ...browseData, [e.target.name]: e.target.value, page: 1 });
    } else {
      setBrowseData({ ...browseData, [e.target.name]: e.target.value });
    }
  };

  const handleActionChange = (e, uploadId) => {
    const value = e.target.value;

    if (value === "importReport") {
      router.push(
        `/upload/reportImport?folder=${browseData.folderId}&upload=${uploadId}`
      );
      return;
    }

    scheduleReport(uploadId, value)
      .then((res) => res?.message)
      .then((url) => {
        setTimeout(() => {
          downloadReport(url)
            .then(async (response) => {
              const filename = getFileNameFromContentDispostionHeader(
                response.headers.get("content-disposition")
              );
              const blob = await response.blob();
              const aTag = document.createElement("a");
              aTag.href = window.URL.createObjectURL(blob);
              aTag.download = filename;
              document.body.appendChild(aTag);
              aTag.click();
              setTimeout(() => {
                window.URL.revokeObjectURL(aTag.href);
                document.body.removeChild(aTag);
              }, 150);
            })
            .catch((error) => handleError(error, setMessage));
        }, 1200);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  };

  const handleClick = (e, id) => {
    if (e?.preventDefault) e.preventDefault();
    setPages(1);
    setBrowseData({ ...browseData, folderId: id, page: 1 });
  };

  const handlePageChange = (e, value) => {
    if (value >= 1) {
      setPages(value);
      setBrowseData({ ...browseData, page: value });
    }
  };

  return (
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
          {folderList.length > 0 && (
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    options={statusOptions}
                    property="name"
                  />
                </th>
                <th />
                <th />
                <th>
                  <InputContainer
                    name="assign"
                    type="select"
                    onChange={handleChange}
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
                ?.filter((item) =>
                  query ? item?.uploadname.toLowerCase().includes(query.toLowerCase()) : true
                )
                ?.map((data) => (
                  <tr key={data?.id} className="text-center">
                    <td>
                      <a
                        href={`${routes.browseUploads.licenseBrowser}?uploadID=${data.id}`}
                      >
                        <div className="text-primary-color">
                          <div className="font-demi">{data?.uploadname}</div>
                          <div className="font-size-small">{data?.description}</div>
                        </div>
                      </a>
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
                        onChange={handleChange}
                        options={statusOptions}
                        property="name"
                      />
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <InputContainer
                        name="assign"
                        type="select"
                        onChange={handleChange}
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
                          className="col-md-6 pagination-div"
                          count={pages}
                          page={browseData.page}
                          onChange={handlePageChange}
                        />
                        <div className="row">
                          Go to:&nbsp;
                          <input
                            type="number"
                            className="pagination-textarea"
                            size="3"
                            onChange={(event) =>
                              handlePageChange(event, Number(event.target.value))
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
  );
};

export default BrowseClient;
