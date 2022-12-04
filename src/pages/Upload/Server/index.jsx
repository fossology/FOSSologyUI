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

// Title
import Title from "components/Title";
// Common Fields for all the Uploads
import CommonFields from "components/Upload/CommonFields";
// Widgets
import { Alert, Button, InputContainer } from "components/Widgets";
import React, { useEffect, useState } from "react";
// Required functions for calling APIs
import { getAllFolders } from "services/folders";

// constants
import {
  initialFolderList,
  initialScanFileData,
  initialStateUploadFromServer,
} from "../../../constants/constants";

const UploadFromServer = () => {
  // Data required for creating the upload
  const [uploadServerData, setUploadServerData] = useState(
    initialStateUploadFromServer
  );

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // Setting the data for scheduling analysis of an uploads
  const [scanFileData, setScanFileData] = useState(initialScanFileData);

  // State Variables for handling Error Boundaries
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setUploadServerData({
        ...uploadServerData,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      setUploadServerData({
        ...uploadServerData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setUploadServerData({
        ...uploadServerData,
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
    <>
      <Title title="Upload from Server" />
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
              To manage your own group permissions go into Admin &gt; Groups
              &gt; Manage Group Users. To manage permissions for this one
              upload, go to Admin &gt; Upload Permissions.
            </p>
            <p>This option permits uploading a files from the server.</p>
            <form className="my-3">
              <InputContainer
                type="select"
                name=""
                id="upload-server-folder-id"
                onChange={(e) => handleChange(e)}
                options={folderList}
                property="name"
                value=""
              >
                Select the folder for storing the uploaded files:
              </InputContainer>
              <InputContainer
                type="text"
                name=""
                id="upload-server-file-path"
                onChange={(e) => handleChange(e)}
                value=""
              >
                Enter the file path:
              </InputContainer>
              <div className="mt-n2 mb-3">
                NOTE: Contents under a directory will be recursively included.
                '*' is supported to select multiple files (e.g. *.txt).
              </div>
              <InputContainer
                type="text"
                name=""
                id="upload-server-viewable-name"
                onChange={(e) => handleChange(e)}
                value=""
              >
                (Optional) Enter a viewable name for this file or directory:
              </InputContainer>
              <div className="mt-n2">
                Note: If no name is provided, then the uploaded file (directory)
                name will be used.
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
                    value=""
                    id="upload-server-description"
                    rows="3"
                    onChange={(e) => handleChange(e)}
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
    </>
  );
};

export default UploadFromServer;
