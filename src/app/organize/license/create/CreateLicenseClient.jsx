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

"use client";

import React, { useState } from "react";
import messages from "@/constants/messages";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "@/components/Widgets";

// API Service
import { createCandidateLicense } from "@/services/licenses";

const AddCandidateLicensePage = () => {
  const options = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

  const initialState = {
    shortName: "",
    fullName: "",
    text: "",
    risk: 1,
    licenseUrl: "",
    mergeRequest: false,
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [createLicenseData, setCreateLicenseData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateLicenseData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCandidateLicense(createLicenseData)
      .then(() => {
        setMessage({
          type: "success",
          text: messages.createdLicense,
        });
        setCreateLicenseData(initialState); // Reset form after success
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message || "An error occurred",
        });
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
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
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <h1 className="font-size-main-heading">Add License</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <InputContainer
              value={createLicenseData.shortName}
              name="shortName"
              type="text"
              id="organize-add-license-short-name"
              placeholder="Must be unique"
              onChange={handleChange}
            >
              Short name
            </InputContainer>

            <InputContainer
              value={createLicenseData.fullName}
              name="fullName"
              type="text"
              id="organize-add-license-full-name"
              onChange={handleChange}
            >
              Full name
            </InputContainer>

            <div className="my-2">
              <label htmlFor="organize-add-license-text" className="font-demi w-100">
                Reference Text
                <textarea
                  name="text"
                  className="form-control font-regular mt-2 license-textarea"
                  value={createLicenseData.text}
                  id="organize-add-license-text"
                  rows="3"
                  onChange={handleChange}
                />
              </label>
            </div>

            <InputContainer
              value={createLicenseData.licenseUrl}
              name="licenseUrl"
              type="text"
              id="organize-add-license-text-url"
              onChange={handleChange}
            >
              URL
            </InputContainer>

            <InputContainer
              options={options}
              name="risk"
              type="select"
              property="value"
              id="organize-add-license-risk-level"
              value={createLicenseData.risk}
              onChange={handleChange}
            >
              Risk level
            </InputContainer>

            <InputContainer
              type="checkbox"
              checked={createLicenseData.mergeRequest}
              name="mergeRequest"
              id="organize-add-license-merge-request"
              onChange={handleChange}
            >
              Merge Request
            </InputContainer>

            <Button type="submit" className="mt-4">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Add License"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateLicensePage;
