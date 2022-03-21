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
import { createUploadFile } from "services/upload";
import { scheduleAnalysis } from "services/jobs";
import { getAllFolders } from "services/folders";
import { defaultAgentsList, getLocalStorage } from "shared/storageHelper";

// Helper function for error handling
import { handleError } from "shared/helper";

const UploadFile = () => {
  const initialState = {
    folderId: 1,
    uploadDescription: "",
    accessLevel: "protected",
    ignoreScm: false,
    fileInput: null,
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
      reuseGroup: getLocalStorage("user")?.default_group,
      reuseMain: false,
      reuseEnhanced: false,
      reuseReport: false,
      reuseCopyright: false,
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

  // Upload Id required for scheduling Analysis
  let uploadId;

  // Data required for creating the upload
  const [uploadFileData, setUploadFileData] = useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // Setting the data for scheduling analysis of an uploads
  const [scanFileData, setScanFileData] = useState(initialScanFileData);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUploadFile(uploadFileData)
      .then((res) => {
        window.scrollTo({ top: 0 });
        setMessage({
          type: "success",
          text: messages.uploadSuccess,
        });
        uploadId = res.message;
      })
      .then(() => {
        setTimeout(
          () =>
            scheduleAnalysis(uploadFileData.folderId, uploadId, scanFileData)
              .then(() => {
                window.scrollTo({ top: 0 });
                setMessage({
                  type: "success",
                  text: messages.scheduledAnalysis,
                });
                setUploadFileData(initialState);
                setScanFileData(initialScanFileData);
              })
              .catch((error) => {
                handleError(error, setMessage);
              }),
          1200
        );
      })
      .catch((error) => {
        handleError(error, setMessage);
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setUploadFileData({
        ...uploadFileData,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
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
          [e.target.name]:
            e.target.type === "checkbox"
              ? e.target.checked
              : parseInt(e.target.value, 10) || e.target.value,
        },
      });
    }
  };
  useEffect(() => {
    getAllFolders().then((res) => {
      setFolderList(res);
    });
  }, []);
  return (
    <>
      <Title title="Upload a New File" />
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
            <h1 className="font-size-main-heading">Upload a New file</h1>
            <br />
            <p className="font-demi">
              To manage your own group permissions go into Admin &gt; Groups
              &gt; Manage Group Users. To manage permissions for this one
              upload, go to Admin &gt; Upload Permissions.
            </p>
            <p>
              This option permits uploading a single file (which may be iso,
              tar, rpm, jar, zip, bz2, msi, cab, etc.) from your computer to
              FOSSology. Your FOSSology server has imposed a maximum upload file
              size of 700Mbytes.
            </p>
            <form className="my-3">
              <InputContainer
                type="select"
                name="folderId"
                id="upload-folder-id"
                onChange={(e) => handleChange(e)}
                options={folderList}
                property="name"
                value={folderList?.id}
              >
                Select the folder for storing the uploaded files:
              </InputContainer>
              <InputContainer
                type="file"
                name="fileInput"
                id="upload-file-input"
                onChange={(e) => handleChange(e)}
              >
                Select file to upload:
              </InputContainer>
              <div className="my-2">
                <label htmlFor="upload" className="font-demi w-100">
                  (Optional) Enter a description of this file:
                  <textarea
                    name="uploadDescription"
                    className="form-control font-regular mt-2"
                    value={uploadFileData.uploadDescription}
                    id="upload-file-description"
                    rows="3"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
              <CommonFields
                accessLevel={uploadFileData.accessLevel}
                ignoreScm={uploadFileData.ignoreScm}
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

export default UploadFile;
