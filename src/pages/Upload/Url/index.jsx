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

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Common Fields for all the Uploads
import CommonFields from "components/Upload/CommonFields";

// Required functions for calling APIs
import { getAllFolders } from "services/folders";
import {
  createUploadUrl,
  scheduleAnalysis,
  getUploadById,
} from "services/upload";

// Default Agents list
import { defaultAgentsList } from "shared/storageHelper";

const UploadFromUrl = () => {
  const initialState = {
    folderId: 1,
    uploadDescription: "",
    accessLevel: "protected",
    ignoreScm: false,
    uploadType: "url",
  };
  const initialScanFileData = {
    analysis: defaultAgentsList(),
    decider: {
      nomosMonk: false,
      bulkReused: false,
      newScanner: false,
      ojoDecider: false,
    },
    reuse: {
      reuseUpload: 0,
      reuseGroup: "",
      reuseMain: false,
      reuseEnhanced: false,
    },
  };
  const initialFolderList = [
    {
      id: 1,
      name: "Software Repository",
      description: "Top Folder",
      parent: null,
    },
  ];
  const initialUrlData = {
    url: "",
    name: "",
  };

  // Upload Id required for scheduling Analysis
  let uploadId;

  // Data required for creating the upload
  const [uploadUrlData, setUploadUrlData] = useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // Setting the data for scheduling analysis of an uploads
  const [scanFileData, setScanFileData] = useState(initialScanFileData);

  // Data required for creating the upload from URL
  const [urlData, setUrlData] = useState(initialUrlData);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUploadUrl(uploadUrlData, urlData)
      .then((res) => {
        setMessage({
          type: "success",
          text: `The Upload has been queued its upload Id is #${res.message}`,
        });
        uploadId = res.message;
      })
      // Calling the api for maximum 10 times to check whether the upload is unpacked by the agent
      .then(() => getUploadById(uploadId, 10))
      .then(() => {
        setTimeout(
          () =>
            scheduleAnalysis(uploadUrlData.folderId, uploadId, scanFileData)
              .then(() => {
                setMessage({
                  type: "success",
                  text: "Analysis for the file is scheduled.",
                });
                setUploadUrlData(initialState);
                setScanFileData(initialScanFileData);
              })
              .catch((error) => {
                setMessage({
                  type: "danger",
                  text: error.message,
                });
              }),
          150000
        );
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
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setUploadUrlData({
        ...uploadUrlData,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      setUploadUrlData({
        ...uploadUrlData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setUploadUrlData({
        ...uploadUrlData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleScanChange = (e) => {
    const { name } = e.target;
    if (
      Object.keys(scanFileData.analysis).find((analysis) => analysis === name)
    ) {
      setScanFileData({
        ...scanFileData,
        analysis: {
          ...scanFileData.analysis,
          [e.target.name]: e.target.checked,
        },
      });
    } else if (
      Object.keys(scanFileData.decider).find((decider) => decider === name)
    ) {
      setScanFileData({
        ...scanFileData,
        decider: {
          ...scanFileData.decider,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setScanFileData({
        ...scanFileData,
        reuse: {
          ...scanFileData.reuse,
          [e.target.name]: e.target.checked,
        },
      });
    }
  };
  const handleUrlChange = (e) => {
    setUrlData({
      ...urlData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    getAllFolders()
      .then((res) => {
        setFolderList(res);
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
        setShowMessage(true);
      });
  }, []);
  return (
    <>
      <Title title="Upload from URL" />
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
            <h1 className="font-size-main-heading">Upload from URL</h1>
            <br />
            <p className="font-demi">
              To manage your own group permissions go into Admin &gt; Groups
              &gt; Manage Group Users. To manage permissions for this one
              upload, go to Admin &gt; Upload Permissions.
            </p>
            <p>This option permits uploading a files from the server.</p>
            <form className="my-3">
              <InputContainer
                type="select"
                name="folderId"
                id="upload-url-folder-id"
                onChange={(e) => handleChange(e)}
                options={folderList}
                property="name"
                value={folderList?.id}
              >
                Select the folder for storing the uploaded files:
              </InputContainer>
              <InputContainer
                type="text"
                name="url"
                id="upload-url-file-path"
                onChange={(e) => handleUrlChange(e)}
                value={urlData.url}
              >
                Enter the URL to the file or directory:
              </InputContainer>
              <InputContainer
                type="text"
                name="name"
                id="upload-url-name"
                onChange={(e) => handleUrlChange(e)}
                value={urlData.name}
              >
                (Optional) Enter a viewable name for this file or directory:
              </InputContainer>
              <div className="mb-3 mt-n2">
                Note: If no name is provided, then the uploaded file (directory)
                name will be used.
              </div>
              {/* <InputContainer
                type="text"
                name="fileListAccept"
                id="upload-url-file-list-accept"
                onChange={(e) => handleChange(e)}
                value={uploadUrlData.fileListAccept}
              >
                (Optional) Enter comma-separated lists of file name suffixes or
                patterns to accept:
              </InputContainer>
              <InputContainer
                type="text"
                name="fileListReject"
                id="upload-url-file-list-reject"
                onChange={(e) => handleChange(e)}
                value={uploadUrlData.fileListReject}
              >
                (Optional) Enter comma-separated lists of file name suffixes or
                patterns to reject:
              </InputContainer>
              <InputContainer
                type="text"
                name="recursionDepth"
                id="upload-url-file-path"
                onChange={(e) => handleChange(e)}
                value={uploadUrlData.recursionDepth}
              >
                (Optional) maximum recursion depth (inf or 0 for infinite):
              </InputContainer> */}
              <div className="my-3">
                <label htmlFor="upload" className="font-demi w-100">
                  (Optional) Enter a description of this file:
                  <textarea
                    name="uploadDescription"
                    className="form-control font-regular"
                    value={uploadUrlData.uploadDescription}
                    id="upload-url-description"
                    rows="3"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
              <CommonFields
                accessLevel={uploadUrlData.accessLevel}
                ignoreScm={uploadUrlData.ignoreScm}
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
    </>
  );
};

export default UploadFromUrl;
