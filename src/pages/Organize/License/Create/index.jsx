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

import React, { useState } from "react";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Required functions for calling APIs
import { createCandidateLicense } from "services/licenses";

const AddCandidateLicense = () => {
  const options = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 2,
    },
    {
      id: 3,
      value: 3,
    },
    {
      id: 4,
      value: 4,
    },
    {
      id: 5,
      value: 5,
    },
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

  // Data required for creating the candidate license
  const [createLicenseData, setCreateLicenseData] = useState(initialState);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setCreateLicenseData({
        ...createLicenseData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setCreateLicenseData({
        ...createLicenseData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCandidateLicense(createLicenseData)
      .then(() => {
        setMessage({
          type: "success",
          text: "Successfully created the license",
        });
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };
  return (
    <>
      <Title title="Create Candidate License" />
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
            <form>
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
                value={createCandidateLicense.fullName}
                name="fullName"
                type="text"
                id="organize-add-license-full-name"
                onChange={handleChange}
              >
                Full name
              </InputContainer>
              <div className="my-2">
                <label htmlFor="upload" className="font-demi w-100">
                  Reference Text
                  <textarea
                    name="text"
                    className="form-control font-regular"
                    value={createCandidateLicense.text}
                    id="organize-add-license-text"
                    rows="3"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
              <InputContainer
                value={createCandidateLicense.licenseUrl}
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
                onChange={handleChange}
              >
                Risk level
              </InputContainer>
              <InputContainer
                type="checkbox"
                checked={createLicenseData.mergeRequest}
                name="mergeRequest"
                id="organize-add-license-merge-request"
                onChange={(e) => handleChange(e)}
              >
                Merge Request
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
                  "Add License"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCandidateLicense;
