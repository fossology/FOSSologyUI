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

"use client";

import React, { useState, useEffect } from "react";
import messages from "@/constants/messages";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "@/components/Widgets";

// Common Fields for all the Uploads
import CommonFields from "@/components/Upload/CommonFields";

// Required functions for calling APIs
import { getAllFolders } from "@/services/folders";
import { createUploadVcs, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";

// Constants
import {
  initialScanFileData,
  initialFolderList,
  initialStateVcs,
  initialVcsData,
  typeVcs,
} from "@/constants/constants";

// Helpers
import { handleError } from "@/shared/helper";

const UploadFromVcsPage = () => {
  let uploadId;

  const [uploadVcsData, setUploadVcsData] = useState(initialStateVcs);
  const [vcsData, setVcsData] = useState(initialVcsData);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [scanFileData, setScanFileData] = useState(initialScanFileData);

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createUploadVcs(uploadVcsData, vcsData)
      .then((res) => {
        window.scrollTo({ top: 0 });
        setMessage({
          type: "success",
          text: `${messages.queuedUpload} #${res.message}`,
        });
        uploadId = res.message;
      })
      .then(() => getUploadById(uploadId, 10))
      .then(() =>
        setTimeout(() => {
          scheduleAnalysis(uploadVcsData.folderId, uploadId, scanFileData)
            .then(() => {
              window.scrollTo({ top: 0 });
              setMessage({
                type: "success",
                text: messages.scheduledAnalysis,
              });
              setUploadVcsData(initialStateVcs);
              setScanFileData(initialScanFileData);
            })
            .catch((error) => handleError(error, setMessage));
        }, 200000)
      )
      .catch((error) => handleError(error, setMessage))
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (!name) return;

    setUploadVcsData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleScanChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (!name) return;

    if (scanFileData.analysis.hasOwnProperty(name)) {
      setScanFileData((prev) => ({
        ...prev,
        analysis: { ...prev.analysis, [name]: checked },
      }));
    } else if (scanFileData.decider.hasOwnProperty(name)) {
      setScanFileData((prev) => ({
        ...prev,
        decider: { ...prev.decider, [name]: checked },
      }));
    } else {
      setScanFileData((prev) => ({
        ...prev,
        reuse: {
          ...prev.reuse,
          [name]: type === "checkbox" ? checked : parseInt(value, 10) || value,
        },
      }));
    }
  };

  const handleVcsChange = (e) => {
    const { name, value } = e.target;
    setVcsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, []);

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message?.type}
          message={message?.text}
          setShow={setShowMessage}
        />
      )}

      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <h3 className="font-size-main-heading">
            Upload From Version Control System
          </h3>
          <p className="font-demi my-3">
            To manage your own group permissions go into Admin &gt; Groups
            &gt; Manage Group Users. To manage permissions for this one upload,
            go to Admin &gt; Upload Permissions.
          </p>
          <p>
            You can upload source code from a version control system. One risk
            is that FOSSology will store your username/password of a
            repository in the database and use them in command-line operations.
          </p>

          <form className="my-3">
            <InputContainer
              type="select"
              name="folderId"
              id="upload-folder-id"
              onChange={handleChange}
              options={folderList}
              property="name"
              value={uploadVcsData.folderId}
            >
              Select the folder for storing the uploaded files:
            </InputContainer>

            <InputContainer
              type="select"
              name="vcsType"
              id="upload-vcs-type"
              onChange={handleVcsChange}
              options={typeVcs}
              property="type"
              value={vcsData.vcsType}
            >
              Select the type of version control system:
            </InputContainer>

            <InputContainer
              type="text"
              name="vcsUrl"
              id="upload-vcs-url-repo"
              onChange={handleVcsChange}
              value={vcsData.vcsUrl}
            >
              Enter the URL of the repo:
            </InputContainer>
            <div className="font-size-small">
              Note: The URL can begin with HTTP:// or HTTPS://. If HTTPS fails
              for Git, try HTTP.
            </div>

            <InputContainer
              type="text"
              name="vcsBranch"
              id="upload-vcs-branch"
              onChange={handleVcsChange}
              value={vcsData.vcsBranch}
            >
              (Optional for Git) Branch name:
            </InputContainer>

            <InputContainer
              type="text"
              name="vcsUsername"
              id="upload-vcs-username"
              onChange={handleVcsChange}
              value={vcsData.vcsUsername}
            >
              (Optional) Username:
            </InputContainer>

            <InputContainer
              type="text"
              name="vcsPassword"
              id="upload-vcs-password"
              onChange={handleVcsChange}
              value={vcsData.vcsPassword}
            >
              (Optional) Password:
            </InputContainer>

            <InputContainer
              type="text"
              name="vcsName"
              id="upload-vcs-name"
              onChange={handleVcsChange}
              value={vcsData.vcsName}
            >
              (Optional) Enter a viewable name for this file (directory):
            </InputContainer>
            <div className="font-size-small">
              Note: If no name is provided, the uploaded file (directory) name
              will be used.
            </div>

            <div className="my-2">
              <label htmlFor="upload-file-description" className="font-demi w-100">
                (Optional) Enter a description of this file:
                <textarea
                  name="uploadDescription"
                  className="form-control font-regular mt-2"
                  value={uploadVcsData.uploadDescription}
                  id="upload-file-description"
                  rows="3"
                  onChange={handleChange}
                />
              </label>
            </div>

            <CommonFields
              accessLevel={uploadVcsData.accessLevel}
              ignoreScm={uploadVcsData.ignoreScm}
              analysis={scanFileData.analysis}
              decider={scanFileData.decider}
              reuse={scanFileData.reuse}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />

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
                "Upload"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFromVcsPage;

