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
import { Alert, Button, InputContainer } from "@/components/Widgets";
import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId } from "@/services/organizeUploads";
import { getUploadById } from "@/services/upload";
import { handleError } from "@/shared/helper";

const UploadEditPage = () => {
  const initialState = {
    folderId: 1,
    uploadId: null,
    uploadName: "",
    uploadDescription: "",
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [editUploadFolderData, setEditUploadFolderData] = useState(initialState);
  const [folderList, setFolderList] = useState([]);
  const [uploadFolderList, setUploadFolderList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    setEditUploadFolderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit API logic here (e.g., updateUploadInfo)
    // For now, simulate success message:
    setMessage({
      type: "success",
      text: "Upload properties updated (not implemented)",
    });
    setShowMessage(true);
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, []);

  useEffect(() => {
    if (editUploadFolderData.folderId) {
      getUploadsFolderId(editUploadFolderData.folderId)
        .then((res) => setUploadFolderList(res))
        .catch((error) => {
          handleError(error, setMessage);
          setShowMessage(true);
        });
    }
  }, [editUploadFolderData.folderId]);

  useEffect(() => {
    if (editUploadFolderData.uploadId) {
      getUploadById(editUploadFolderData.uploadId)
        .then((res) => {
          setEditUploadFolderData((prev) => ({
            ...prev,
            uploadName: res.uploadname,
            uploadDescription: res.description,
          }));
        })
        .catch((error) => {
          handleError(error, setMessage);
          setShowMessage(true);
        });
    }
  }, [editUploadFolderData.uploadId]);

  return (
    <>
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
                  onChange={handleChange}
                  options={folderList}
                  property="name"
                  value={editUploadFolderData.folderId}
                >
                  Select the folder that contains the upload:
                </InputContainer>
              </li>

              <li className="mt-4">
                <InputContainer
                  type="select"
                  name="uploadId"
                  id="organize-upload-list"
                  onChange={handleChange}
                  options={uploadFolderList}
                  property="uploadname"
                  value={editUploadFolderData.uploadId ?? ""}
                >
                  Select the upload you wish to edit:
                </InputContainer>
              </li>

              <li className="mt-4">
                <InputContainer
                  type="text"
                  name="uploadName"
                  id="organize-upload-name"
                  onChange={handleChange}
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
                  onChange={handleChange}
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

export default UploadEditPage;
