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
import InputContainer from "../../../../components/Widgets/Input";
import Button from "../../../../components/Widgets/Button";
import Alert from "../../../../components/Widgets/Alert";
import { getFolders } from "../../../../services/getFolder";
import { getUploadsFolderId } from "../../../../services/organizeUploads";
import { getId } from "../../../../services/upload";

const UploadEdit = () => {
  const initialState = {
    folderId: 1,
    uploadId: null,
    groupName: "",
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
  const [editUploadFolderData, setEditUploadFolderData] =
    useState(initialState);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [uploadFolderList, setUploadFolderList] = useState([]);
  // const [loading, setLoading] = useState(false);
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
    getFolders()
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
    getUploadsFolderId(editUploadFolderData.folderId)
      .then((res) => {
        setUploadFolderList(res);
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
        setShowMessage(true);
      });
    if (editUploadFolderData.uploadId) {
      getId(editUploadFolderData.uploadId)
        .then((res) =>
          setEditUploadFolderData({
            ...editUploadFolderData,
            uploadName: res.uploadname,
            uploadDescription: res.description,
          })
        )
        .catch((error) => {
          setMessage({
            type: "danger",
            text: error.message,
          });
          setShowMessage(true);
        });
    }
  }, [editUploadFolderData.folderId, editUploadFolderData.uploadId]);

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
