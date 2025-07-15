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

// API services
import { getAllFolders } from "@/services/folders";
import { createUploadUrl, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";

// Constants
import {
  initialScanFileData,
  initialFolderList,
  initialStateUrl,
  initialUrlData,
} from "@/constants/constants";

const UploadFromUrlPage = () => {
  let uploadId;

  const [uploadUrlData, setUploadUrlData] = useState(initialStateUrl);
  const [urlData, setUrlData] = useState(initialUrlData);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [scanFileData, setScanFileData] = useState(initialScanFileData);
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
          text: `${messages.queuedUpload} #${res.message}`,
        });
        uploadId = res.message;
      })
      .then(() => getUploadById(uploadId, 10))
      .then(() => {
        setTimeout(() => {
          scheduleAnalysis(uploadUrlData.folderId, uploadId, scanFileData)
            .then(() => {
              setMessage({
                type: "success",
                text: messages.scheduledAnalysis,
              });
              setUploadUrlData(initialStateUrl);
              setScanFileData(initialScanFileData);
            })
            .catch((error) => {
              setMessage({ type: "danger", text: error.message });
            });
        }, 150000); // Wait before scheduling analysis
      })
      .catch((error) => {
        setMessage({ type: "danger", text: error.message });
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (!name) return;

    setUploadUrlData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrlData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScanChange = (e) => {
    const { name, type, checked, value } = e.target;
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

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      });
  }, []);

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
          <h1 className="font-size-main-heading">Upload from URL</h1>
          <br />
          <p className="font-demi">
            To manage your own group permissions go into Admin &gt; Groups
            &gt; Manage Group Users. To manage permissions for this one upload,
            go to Admin &gt; Upload Permissions.
          </p>
          <p>This option permits uploading files from a URL.</p>

          <form className="my-3">
            <InputContainer
              type="select"
              name="folderId"
              id="upload-url-folder-id"
              onChange={handleChange}
              options={folderList}
              property="name"
              value={uploadUrlData.folderId}
            >
              Select the folder for storing the uploaded files:
            </InputContainer>

            <InputContainer
              type="text"
              name="url"
              id="upload-url-file-path"
              onChange={handleUrlChange}
              value={urlData.url}
            >
              Enter the URL to the file or directory:
            </InputContainer>

            <InputContainer
              type="text"
              name="name"
              id="upload-url-name"
              onChange={handleUrlChange}
              value={urlData.name}
            >
              (Optional) Enter a viewable name for this file or directory:
            </InputContainer>

            <div className="mb-3 mt-n2">
              Note: If no name is provided, then the uploaded file (directory)
              name will be used.
            </div>

            <div className="my-3">
              <label htmlFor="upload-url-description" className="font-demi w-100">
                (Optional) Enter a description of this file:
                <textarea
                  name="uploadDescription"
                  className="form-control font-regular mt-2"
                  value={uploadUrlData.uploadDescription}
                  id="upload-url-description"
                  rows="3"
                  onChange={handleChange}
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
  );
};

export default UploadFromUrlPage;
