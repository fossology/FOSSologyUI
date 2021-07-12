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
import InputContainer from "../../../../components/Widgets/Input";
import Button from "../../../../components/Widgets/Button";

const AddLicense = () => {
  const options = [
    {
      id: 1,
      value: "Yes",
    },
    {
      id: 2,
      value: "No",
    },
  ];
  const handleChange = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="main-container my-3">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <h1 className="font-size-main-heading">Add License</h1>
          <br />
          <form>
            <InputContainer
              options={options}
              name=""
              type="select"
              property="value"
              id="admin-add-license-status"
              onChange={handleChange}
            >
              Active
            </InputContainer>
            <InputContainer
              options={options}
              name=""
              type="select"
              property="value"
              id="admin-add-license-checked"
              onChange={handleChange}
            >
              Checked
            </InputContainer>
            <InputContainer
              options={options}
              name=""
              type="select"
              property="value"
              id="admin-add-license-spdx-compatible"
              onChange={handleChange}
            >
              SPDX Compatible
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-short-name"
              placeholder="Must be unique"
              onChange={handleChange}
            >
              Short name
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-full-name"
              onChange={handleChange}
            >
              Full name
            </InputContainer>
            <div className="my-2">
              <label htmlFor="upload" className="font-demi font-15">
                License Text
              </label>
              <textarea
                name="uploadDescription"
                className="form-control"
                value={""}
                id="admin-add-license-text"
                rows="3"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <InputContainer
              options={options}
              name=""
              type="select"
              property="value"
              id="admin-add-license-text-update"
              onChange={handleChange}
            >
              Text Updatable
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-detector-type"
              onChange={handleChange}
            >
              Detector Type
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-url"
              onChange={handleChange}
            >
              URL
            </InputContainer>
            <div className="my-2">
              <label htmlFor="upload" className="font-demi font-15">
                Public Notes
              </label>
              <textarea
                name="uploadDescription"
                className="form-control"
                value={""}
                id="admin-add-license-public-notes"
                rows="3"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-conclusion"
              onChange={handleChange}
            >
              Conclusion
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-report"
              onChange={handleChange}
            >
              Reported License
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-risk-level"
              onChange={handleChange}
            >
              Risk level
            </InputContainer>
            <InputContainer
              value={""}
              name=""
              type="text"
              id="admin-add-license-obligations"
              placeholder="selected obligations associated with this license"
              onChange={handleChange}
            >
              Associated Obligations
            </InputContainer>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="mt-4"
            >
              Add License
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLicense;
