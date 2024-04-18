/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)

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
import { initialImportCsvLicense, initialMessage } from "constants/constants";
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";
import { importLicenseCsv } from "services/licenses";

const ImportLicense = () => {
  // Data required for importing the csv file
  const [uploadFileData, setUploadFileData] = useState(initialImportCsvLicense);
  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    if (e.target.type === "fileInput") {
      setUploadFileData({
        ...uploadFileData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setUploadFileData({
        ...uploadFileData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await importLicenseCsv(uploadFileData);
      setMessage({
        type: "success",
        text: data.message,
      });
      setUploadFileData(initialImportCsvLicense);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.message,
      });
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };
  return (
    <>
      <Title title="Admin Obligation CSV Import" />
      <div className="main-container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            {showMessage && (
              <Alert
                type={message.type}
                setShow={setShowMessage}
                message={message.text}
              />
            )}
            <h1 className="font-size-main-heading">
              Admin Obligation CSV Import
            </h1>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <p>
              This option permits uploading a CSV file from your computer to
              Your FOSSology server has imposed a maximum upload file size of
              700Mbytes.
            </p>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <span>Select the CSV-file to upload:</span>
            <InputContainer
              type="file"
              name="fileInput"
              id="upload-file-input"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <div>
              <InputContainer
                type="text"
                name="name"
                id="delimiter"
                onChange={handleChange}
                value={uploadFileData.delimiter}
              >
                Delimiter:
              </InputContainer>
            </div>

            <div>
              <InputContainer
                type="text"
                name="name"
                id="admin-group-add-name"
                onChange={handleChange}
                placeholder="Group name"
                value={uploadFileData.enclosure}
              >
                Enclosure:
              </InputContainer>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
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
                "Add"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportLicense;
