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

// Widgets
import { Alert, Button, InputContainer } from "@/components/Widgets";

// Common Fields for all the Uploads
import CommonFields from "@/components/Upload/CommonFields";

// Required functions for calling APIs
import { getAllFolders } from "@/services/folders";

// constants
import {
  initialStateUploadFromServer,
  initialScanFileData,
  initialFolderList,
} from "@/constants/constants";

const UploadFromServerPage = () => {
  const [uploadServerData, setUploadServerData] = useState(initialStateUploadFromServer);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [scanFileData, setScanFileData] = useState(initialScanFileData);
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your actual API logic here
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (!name) return; // Prevent undefined property mutation

    if (type === "checkbox") {
      setUploadServerData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file") {
      setUploadServerData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setUploadServerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleScanChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (!name) return;

    if (scanFileData.analysis.hasOwnProperty(name)) {
      setScanFileData((prev) => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          [name]: checked,
        },
      }));
    } else if (scanFileData.decider.hasOwnProperty(name)) {
      setScanFileData((prev) => ({
        ...prev,
        decider: {
          ...prev.decider,
          [name]: checked,
        },
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
      .then((res) => {
        setFolderList(res);
      })
      .catch((error) => {
        window.scrollTo({ top: 0 });
        setMessage({
          type: "danger",
          text: error.message,
        });
        setShowMessage(true);
      });
  }, []);

  return (
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
          <h1 className="font-size-main-heading">Upload from Server</h1>
          <br />
          <p className="font-demi">
            To manage your own group permissions go into Admin &gt; Groups &gt;
            Manage Group Users. To manage permissions for this one upload, go to
            Admin &gt; Upload Permissions.
          </p>
          <p>This option permits uploading files from the server.</p>

          <form className="my-3">
            <InputContainer
              type="select"
              name="folderId"
              id="upload-server-folder-id"
              onChange={handleChange}
              options={folderList}
              property="name"
              value={uploadServerData.folderId}
            >
              Select the folder for storing the uploaded files:
            </InputContainer>

            <InputContainer
              type="text"
              name="filePath"
              id="upload-server-file-path"
              onChange={handleChange}
              value={uploadServerData.filePath}
            >
              Enter the file path:
            </InputContainer>

            <div className="mt-n2 mb-3">
              NOTE: Contents under a directory will be recursively included. '*' is
              supported to select multiple files (e.g. *.txt).
            </div>

            <InputContainer
              type="text"
              name="viewableName"
              id="upload-server-viewable-name"
              onChange={handleChange}
              value={uploadServerData.viewableName}
            >
              (Optional) Enter a viewable name for this file or directory:
            </InputContainer>

            <div className="mt-n2">
              Note: If no name is provided, then the uploaded file (directory) name
              will be used.
            </div>

            <div className="my-3">
              <label
                htmlFor="upload-server-description"
                className="font-demi w-100"
              >
                (Optional) Enter a description of this file:
                <textarea
                  name="description"
                  className="form-control font-regular mt-2"
                  value={uploadServerData.description}
                  id="upload-server-description"
                  rows="3"
                  onChange={handleChange}
                />
              </label>
            </div>

            <CommonFields
              accessLevel={uploadServerData.accessLevel}
              ignoreScm={uploadServerData.ignoreScm}
              analysis={scanFileData.analysis}
              decider={scanFileData.decider}
              reuse={scanFileData.reuse}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />

            <Button type="submit" onClick={handleSubmit} className="mt-4">
              Upload
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFromServerPage;
