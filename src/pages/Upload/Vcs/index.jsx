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
import { createUploadVcs, getUploadById } from "services/upload";
import { scheduleAnalysis } from "services/jobs";

// Default Agents list
import { defaultAgentsList, getLocalStorage } from "shared/storageHelper";

// Helper function for error handling
import { handleError } from "shared/helper";

const UploadFromVcs = () => {
  const initialState = {
    folderId: 1,
    uploadDescription: "",
    accessLevel: "protected",
    ignoreScm: false,
    uploadType: "vcs",
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
  const typeVcs = [
    { id: "git", type: "Git" },
    { id: "svn", type: "SVN" },
  ];

  const initialVcsData = {
    vcsType: "git",
    vcsUrl: "",
    vcsBranch: "",
    vcsName: "",
    vcsUsername: "",
    vcsPassword: "",
  };

  // Upload Id required for scheduling Analysis
  let uploadId;

  // Data required for creating the upload
  const [uploadVcsData, setUploadVcsData] = useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // Setting the data for scheduling analysis of an uploads
  const [scanFileData, setScanFileData] = useState(initialScanFileData);

  // Data required for creating the upload from Version Control System
  const [vcsData, setVcsData] = useState(initialVcsData);

  // State Variables for handling Error Boundaries
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
          text: `The Upload has been queued its upload Id is #${res.message}`,
        });
        uploadId = res.message;
      })
      // Calling the api for maximum 10 times to check whether the upload is unpacked by the agent
      .then(() => getUploadById(uploadId, 10))
      .then(() =>
        setTimeout(
          () =>
            scheduleAnalysis(uploadVcsData.folderId, uploadId, scanFileData)
              .then(() => {
                window.scrollTo({ top: 0 });
                setMessage({
                  type: "success",
                  text: "Analysis for the file is scheduled.",
                });
                setUploadVcsData(initialState);
                setScanFileData(initialScanFileData);
              })
              .catch((error) => {
                handleError(error, setMessage);
              }),
          200000
        )
      )
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
      setUploadVcsData({
        ...uploadVcsData,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      setUploadVcsData({
        ...uploadVcsData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setUploadVcsData({
        ...uploadVcsData,
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
  const handleVcsChange = (e) => {
    setVcsData({
      ...vcsData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    getAllFolders()
      .then((res) => {
        setFolderList(res);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, []);
  return (
    <>
      <Title title="Upload from Version Control System" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            message={message.text}
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
              &gt; Manage Group Users. To manage permissions for this one
              upload, go to Admin &gt; Upload Permissions.
            </p>
            <p>
              You can upload source code from a version control system; one risk
              is that FOSSology will store your username/password of a
              repository to database, also run checkout source code from command
              line with username and password explicitly.
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
                type="select"
                name="vcsType"
                id="upload-vcs-type"
                onChange={(e) => handleVcsChange(e)}
                options={typeVcs}
                property="type"
              >
                Select the type of version control system:
              </InputContainer>
              <InputContainer
                type="text"
                name="vcsUrl"
                id="upload-vcs-url-repo"
                onChange={(e) => handleVcsChange(e)}
                value={vcsData.vcsUrl}
              >
                Enter the URL of the repo:
              </InputContainer>
              <div className="font-size-small">
                Note: The URL can begin with HTTP://, HTTPS:// . When do git
                upload, if https url fails, please try http URL.
              </div>
              <InputContainer
                type="text"
                name="vcsBranch"
                id="upload-vcs-branch"
                onChange={(e) => handleVcsChange(e)}
                value={vcsData.vcsBranch}
              >
                (Optional for Git) Branch name:
              </InputContainer>
              <InputContainer
                type="text"
                name="vcsUsername"
                id="upload-vcs-username"
                onChange={(e) => handleVcsChange(e)}
                value={vcsData.vcsUsername}
              >
                (Optional) Username:
              </InputContainer>
              <InputContainer
                type="text"
                name="vcsPassword"
                id="upload-vcs-branch"
                onChange={(e) => handleVcsChange(e)}
                value={vcsData.vcsPassword}
              >
                (Optional) Password:
              </InputContainer>
              <InputContainer
                type="text"
                name="vcsName"
                id="upload-vcs-name"
                onChange={(e) => handleVcsChange(e)}
                value={vcsData.vcsName}
              >
                (Optional) Enter a viewable name for this file (directory):
              </InputContainer>
              <div className="font-size-small">
                Note: If no name is provided, then the uploaded file (directory)
                name will be used.
              </div>
              <div className="my-2">
                <label htmlFor="upload" className="font-demi">
                  (Optional) Enter a description of this file:
                  <textarea
                    name="uploadDescription"
                    className="form-control"
                    value={uploadVcsData.uploadDescription}
                    id="upload-file-description"
                    rows="3"
                    onChange={(e) => handleChange(e)}
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
    </>
  );
};

export default UploadFromVcs;
