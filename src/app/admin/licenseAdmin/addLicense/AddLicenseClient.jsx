/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
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

"use client";

import React, { useState } from "react";

// Widgets
import { InputContainer, Button } from "@/components/Widgets";

const AddLicensePage = () => {
  const options = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" },
  ];

  const [formData, setFormData] = useState({
    active: "",
    checked: "",
    spdxCompatible: "",
    shortName: "",
    fullName: "",
    licenseText: "",
    textUpdatable: "",
    detectorType: "",
    url: "",
    publicNotes: "",
    conclusion: "",
    reportedLicense: "",
    riskLevel: "",
    obligations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData via API here
    console.log("Submitted:", formData);
  };

  return (
    <div className="main-container my-3">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <h1 className="font-size-main-heading">Add License</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <InputContainer
              type="select"
              name="active"
              id="admin-add-license-status"
              value={formData.active}
              options={options}
              property="value"
              valueProperty="value"
              onChange={handleChange}
            >
              Active
            </InputContainer>

            <InputContainer
              type="select"
              name="checked"
              id="admin-add-license-checked"
              value={formData.checked}
              options={options}
              property="value"
              valueProperty="value"
              onChange={handleChange}
            >
              Checked
            </InputContainer>

            <InputContainer
              type="select"
              name="spdxCompatible"
              id="admin-add-license-spdx-compatible"
              value={formData.spdxCompatible}
              options={options}
              property="value"
              valueProperty="value"
              onChange={handleChange}
            >
              SPDX Compatible
            </InputContainer>

            <InputContainer
              type="text"
              name="shortName"
              id="admin-add-license-short-name"
              value={formData.shortName}
              placeholder="Must be unique"
              onChange={handleChange}
            >
              Short name
            </InputContainer>

            <InputContainer
              type="text"
              name="fullName"
              id="admin-add-license-full-name"
              value={formData.fullName}
              onChange={handleChange}
            >
              Full name
            </InputContainer>

            <div className="my-2">
              <label
                htmlFor="admin-add-license-text"
                className="font-demi w-100"
              >
                License Text
                <textarea
                  name="licenseText"
                  id="admin-add-license-text"
                  className="form-control font-regular mt-2"
                  value={formData.licenseText}
                  rows="3"
                  onChange={handleChange}
                />
              </label>
            </div>

            <InputContainer
              type="select"
              name="textUpdatable"
              id="admin-add-license-text-update"
              value={formData.textUpdatable}
              options={options}
              property="value"
              valueProperty="value"
              onChange={handleChange}
            >
              Text Updatable
            </InputContainer>

            <InputContainer
              type="text"
              name="detectorType"
              id="admin-add-license-detector-type"
              value={formData.detectorType}
              onChange={handleChange}
            >
              Detector Type
            </InputContainer>

            <InputContainer
              type="text"
              name="url"
              id="admin-add-license-url"
              value={formData.url}
              onChange={handleChange}
            >
              URL
            </InputContainer>

            <div className="my-2">
              <label
                htmlFor="admin-add-license-public-notes"
                className="font-demi w-100"
              >
                Public Notes
                <textarea
                  name="publicNotes"
                  id="admin-add-license-public-notes"
                  className="form-control font-regular mt-2"
                  value={formData.publicNotes}
                  rows="3"
                  onChange={handleChange}
                />
              </label>
            </div>

            <InputContainer
              type="text"
              name="conclusion"
              id="admin-add-license-conclusion"
              value={formData.conclusion}
              onChange={handleChange}
            >
              Conclusion
            </InputContainer>

            <InputContainer
              type="text"
              name="reportedLicense"
              id="admin-add-license-report"
              value={formData.reportedLicense}
              onChange={handleChange}
            >
              Reported License
            </InputContainer>

            <InputContainer
              type="text"
              name="riskLevel"
              id="admin-add-license-risk-level"
              value={formData.riskLevel}
              onChange={handleChange}
            >
              Risk level
            </InputContainer>

            <InputContainer
              type="text"
              name="obligations"
              id="admin-add-license-obligations"
              value={formData.obligations}
              placeholder="Selected obligations associated with this license"
              onChange={handleChange}
            >
              Associated Obligations
            </InputContainer>

            <Button type="submit" className="mt-4">
              Add License
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLicensePage;
