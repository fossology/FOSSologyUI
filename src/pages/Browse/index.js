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
import { Spinner } from "react-bootstrap";
import arrayToTree from "array-to-tree";
import InputContainer from "../../components/Widgets/Input";
import TreeContainer from "../../components/TreeContainer";
import { getBrowseData } from "../../services/browse";
import { getAllFolders } from "../../services/folders";
import "./index.css";

const Browse = () => {
  const initialState = {
    folderId: 1,
    page: 1,
    limit: 10,
    groupName: "",
    recursive: true,
  };

  const statusOptions = ["open", "in progress", "closed", "rejected"];
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
  const assignOptions = ["me", "unassigned"];

  const [browseData, setBrowseData] = useState(initialState);
  const [browseDataList, setBrowseDataList] = useState();
  const [loading, setLoading] = useState(true);
  const [pagesOptions, setPagesOptions] = useState();
  const [folderList, setFolderList] = useState();

  useEffect(() => {
    getBrowseData(browseData).then((res) => {
      setBrowseDataList(res.res);
      let arr = [];
      for (let i = 0; i < res.pages; i++) {
        arr.push({
          id: i + 1,
          value: i + 1,
        });
      }
      setPagesOptions(arr);
      setLoading(false);
    });
  }, [browseData]);

  useEffect(() => {
    getAllFolders()
      .then((res) => {
        const folders = res;
        folders.forEach((folder) => {
          folder.state = {
            expanded: true,
            favorite: false,
            deletable: false,
          };
        });
        setFolderList(
          arrayToTree(folders, {
            parentProperty: "parent",
            customID: "id",
          })
        );
      })
      .catch((err) => {
        console.log(err);
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

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else
    return (
      <div className="main-container my-3">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <h2 className="font-size-sub-heading">Folder Navagation</h2>
            {folderList && <TreeContainer data={folderList} />}
          </div>
          <div className="col-md-9 col-lg-10">
            <table className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered">
              <thead>
                <tr>
                  <th
                    colSpan="6"
                    className="font-size-main-heading text-center"
                  >
                    Uploads in Software Repository
                  </th>
                </tr>
                <tr className="d-flex font-demi">
                  <span className="mt-1">Show entries: </span>
                  <InputContainer
                    name="limit"
                    type="select"
                    onChange={(e) => handleChange(e)}
                    options={entriesOptions}
                    property="entry"
                    className="mt-n4 ml-3"
                  />
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
                    />
                  </th>
                  <th></th>
                  <th></th>
                  <th>
                    <InputContainer
                      name="status"
                      type="select"
                      onChange={(e) => handleChange(e)}
                      options={assignOptions}
                    />
                  </th>
                  <th></th>
                </tr>
                <tr className="font-bold text-center font-size-sub-heading">
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
                  <tr key={data.id} className="text-center">
                    <td>
                      <div className="font-demi">{data?.uploadname}</div>
                      <div className="font-size-small">{data?.description}</div>
                    </td>
                    <td>
                      <InputContainer
                        name="status"
                        type="select"
                        onChange={(e) => handleChange(e)}
                        options={statusOptions}
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
    );
};

export default Browse;
