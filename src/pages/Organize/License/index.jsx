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

import React from "react";
import Button from "../../../components/Widgets/Button";
import InputContainer from "../../../components/Widgets/Input";

const AdviceLicenses = () => {
  const entriesOptions = [
    {
      id: 10,
      value: 10,
    },
    {
      id: 25,
      value: 25,
    },
    {
      id: 50,
      value: 50,
    },
    {
      id: 100,
      value: 100,
    },
  ];
  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <div className="main-container my-3">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <h1 className="font-size-main-heading">Candidate Licenses</h1>
          <br />
          <div className="d-flex justify-content-between">
            <InputContainer
              name="limit"
              type="select"
              onChange={(e) => handleChange(e)}
              options={entriesOptions}
              property="value"
            />
            <input
              type="search"
              className="form-control w-25 mt-4"
              placeholder="Search"
            />
          </div>
          <table className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered">
            <thead>
              <tr className="font-bold text-center font-size-sub-heading">
                <th>Edit</th>
                <th>Short Name</th>
                <th>Full Name</th>
                <th>Text</th>
                <th>URL</th>
                <th>Merge Request</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td></td>
                <td>AGPL-3.0+ </td>
                <td></td>
                <td>License by OJO.</td>
                <td></td>
                <td></td>
              </tr>
              <tr className="text-center">
                <td></td>
                <td>GFDL-1.3-or-later </td>
                <td></td>
                <td>License by OJO.</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Button type="Button" onClick={handleSubmit} className="mt-4">
            New License
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdviceLicenses;
