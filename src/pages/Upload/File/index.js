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

import React, { useState, useEffect } from "react";
import InputContainer from "../../../components/Widgets/Input";
import Alert from "../../../components/Widgets/Alert";
import Button from "../../../components/Widgets/Button";
import CommonFields from "../../../components/Upload/CommonFields";
import { createUploadFile, scheduleJobs } from "../../../services/upload";
import { getFolders } from "../../../services/getFolder";
import { Spinner } from "react-bootstrap";

const UploadFile = () => {
  const initialState = {
    folderId: 1,
    uploadDescription: "",
    accessLevel: "protected",
    ignoreScm: false,
    fileInput: null,
  };
  const initialScanFileData = {
    analysis: {
      bucket: true,
      copyrightEmailAuthor: false,
      ecc: false,
      keyword: false,
      mime: false,
      monk: false,
      nomos: false,
      ojo: false,
      package: false,
    },
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

  let uploadId;

  const [uploadFileData, setUploadFileData] = useState(initialState);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [scanFileData, setScanFileData] = useState(initialScanFileData);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUploadFile(uploadFileData)
      .then((res) => {
        setMessage({
          type: "success",
          text: "Successfully uploaded the files",
        });
        scrollTo({ top: 0 });
        uploadId = res.message;
      })
      .then(() => {
        setTimeout(
          () =>
            scheduleJobs(uploadFileData.folderId, uploadId, scanFileData)
              .then(() => {
                setMessage({
                  type: "success",
                  text: "Analysis for the file is scheduled.",
                });
                scrollTo({ top: 0 });
                setUploadFileData(initialState);
                setScanFileData(initialScanFileData);
              })
              .catch((error) => {
                setMessage({
                  type: "danger",
                  text: error.message,
                });
                scrollTo({ top: 0 });
              }),
          1200
        );
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
        scrollTo({ top: 0 });
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
    const name = e.target.name;
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
  useEffect(() => {
    getFolders().then((res) => {
      setFolderList(res);
    });
  }, []);
  return (
    <>
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}
      <div className="main-container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <h3 className="font-size-sub-heading">Upload a New file</h3>
            <p className="font-demi my-3">
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
                <label htmlFor="upload" className="font-demi font-15">
                  (Optional) Enter a description of this file:
                </label>
                <textarea
                  name="uploadDescription"
                  className="form-control"
                  value={uploadFileData.uploadDescription}
                  id="upload-file-description"
                  rows="3"
                  onChange={(e) => handleChange(e)}
                ></textarea>
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
