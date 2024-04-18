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
import messages from "constants/messages";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Common Fields for all the Uploads
import CommonFields from "components/Upload/CommonFields";

// Required functions for calling APIs
import { getAllFolders } from "services/folders";
import { createUploadUrl } from "services/upload";

// constants
import {
  initialScanFileData,
  initialFolderList,
  initialStateUrl,
  initialUrlData,
} from "constants/constants";

const UploadFromUrl = () => {
  // Data required for creating the upload
  const [uploadUrlData, setUploadUrlData] = useState(initialStateUrl);

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

  // Function to reset the state variables to initial state
  const resetStateVariables = () => {
    setScanFileData(initialScanFileData);
    setFolderList(initialFolderList);
    setUploadUrlData(initialStateUrl);
    setUrlData(initialUrlData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUploadUrl(uploadUrlData, urlData, scanFileData)
      .then(() => {
        resetStateVariables();
        window.scrollTo({ top: 0 });
        setMessage({
          type: "success",
          text: `${messages.uploadSuccess}`,
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
                    className="form-control font-regular mt-2"
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
