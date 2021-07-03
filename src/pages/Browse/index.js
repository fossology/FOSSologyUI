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
import InputContainer from "../../components/Widgets/Input";
import { getBrowseData } from "../../services/browse";

const Browse = () => {
  const initialState = {
    folderId: 1,
    page: 1,
    limit: 100,
    groupName: "",
    recursive: true,
  };

  const statusOptions = ["open", "in progress", "closed", "rejected"];
  const assignOptions = ["me", "unassigned"];

  const [browseData, setBrowseData] = useState(initialState);
  const [browseDataList, setBrowseDataList] = useState();
  useEffect(() => {
    getBrowseData(browseData).then((res) => setBrowseDataList(res));
  }, [browseData]);
  const handleChange = (e) => {
    setBrowseData({ ...browseData, [e.target.name]: e.target.value });
  };
  return (
    <div className="main-container my-3">
      <table className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered">
        <thead>
          <tr>
            <th colSpan="6" className="font-size-main-heading text-center">
              Uploads in Software Repository
            </th>
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
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
              Previous
            </a>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={(e) => handleChange(e)}
              name="page"
            >
              1
            </button>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Browse;
