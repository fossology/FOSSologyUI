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
import { Alert, Button, InputContainer } from "components/Widgets";

// Required functions for calling APIs
import { getAllFolders } from "services/folders";
import { getUploadsFolderId } from "services/organizeUploads";
import { getUploadById } from "services/upload";

// Helper function for error handling
import { handleError } from "shared/helper";

const UploadEdit = () => {
  const initialState = {
    folderId: 1,
    uploadId: null,
    uploadName: "",
    uploadDescription: "",
  };
  const initialFolderList = [
    {
      id: 1,
      name: "Software Repository",
      description: "Top Folder",
      parent: null,
    },
  ];
  const initialMessage = {
    type: "success",
    text: "",
  };

  // Data required for editing the upload
  const [editUploadFolderData, setEditUploadFolderData] =
    useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // Setting the list for all the uploads of respective folders
  const [uploadFolderList, setUploadFolderList] = useState([]);

  // State Variables for handling Error Boundaries
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    setEditUploadFolderData({
      ...editUploadFolderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => {
        setFolderList(res);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      });
    getUploadsFolderId(editUploadFolderData.folderId)
      .then((res) => {
        setUploadFolderList(res);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      });
    if (editUploadFolderData.uploadId) {
      getUploadById(editUploadFolderData.uploadId)
        .then((res) =>
          setEditUploadFolderData({
            ...editUploadFolderData,
            uploadName: res.uploadname,
            uploadDescription: res.description,
          })
        )
        .catch((error) => {
          handleError(error, setMessage);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 2000);
        });
    }
  }, [editUploadFolderData.folderId, editUploadFolderData.uploadId]);

  return (
    <>
      <Title title="Edit Uploads" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading mb-4">
          Edit Uploaded File Properties
        </h1>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <ul>
              <li>
                <InputContainer
                  type="select"
                  name="folderId"
                  id="organize-upload-folder-list"
                  onChange={(e) => handleChange(e)}
                  options={folderList}
                  property="name"
                  value={folderList?.id}
                >
                  Select the folder that contains the upload:
                </InputContainer>
              </li>
              <li className="mt-4">
                <InputContainer
                  type="select"
                  name="uploadId"
                  id="organize-upload-list"
                  onChange={(e) => handleChange(e)}
                  options={uploadFolderList}
                  property="uploadname"
                >
                  Select the upload you wish to edit:
                </InputContainer>
              </li>
              <li className="mt-4">
                <InputContainer
                  type="text"
                  name="uploadName"
                  id="organize-upload-name"
                  onChange={(e) => handleChange(e)}
                  value={editUploadFolderData.uploadName}
                >
                  Upload name:
                </InputContainer>
              </li>
              <li className="mt-4">
                <InputContainer
                  type="text"
                  name="uploadDescription"
                  id="organize-upload-description"
                  onChange={(e) => handleChange(e)}
                  value={editUploadFolderData.uploadDescription}
                >
                  Upload Description:
                </InputContainer>
              </li>
            </ul>
            <Button type="submit" onClick={handleSubmit} className="mt-4">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadEdit;
