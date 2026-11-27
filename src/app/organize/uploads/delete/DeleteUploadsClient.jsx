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

// API Services
import { getAllFolders } from "@/services/folders";
import {
  getUploadsFolderId,
  deleteUploadsbyId,
} from "@/services/organizeUploads";

const UploadDeletePage = () => {
  const initialState = {
    folderId: 1,
    uploadId: [],
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [deleteUploadFolderData, setDeleteUploadFolderData] = useState(initialState);
  const [folderList, setFolderList] = useState([]);
  const [uploadFolderList, setUploadFolderList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;

    setDeleteUploadFolderData((prev) => ({
      ...prev,
      [name]: multiple
        ? Array.from(selectedOptions, (option) => option.value)
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { uploadId, folderId } = deleteUploadFolderData;

    if (uploadId?.length > 0) {
      Promise.all(
        uploadId.map((id) => deleteUploadsbyId(parseInt(id, 10)))
      )
        .then(() => {
          setMessage({
            type: "success",
            text: messages.scheduleUploadDeletion,
          });

          return getUploadsFolderId(folderId).then((res) => {
            setUploadFolderList(res);
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
    } else {
      setMessage({
        type: "danger",
        text: messages.selectUploadsToDelete,
      });
      setShowMessage(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFolders()
      .then(setFolderList)
      .catch((err) => console.error("Error fetching folders", err));
  }, []);

  useEffect(() => {
    getUploadsFolderId(deleteUploadFolderData.folderId)
      .then(setUploadFolderList)
      .catch((err) => console.error("Error fetching uploads", err));
  }, [deleteUploadFolderData.folderId]);

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}
      <h1 className="font-size-main-heading mb-4">Delete Uploaded File</h1>
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <p>Select the uploaded file to delete</p>
          <ul>
            <li>This will delete the upload file!</li>
            <li>Be very careful with your selection since you can delete a lot of work!</li>
            <li>
              All analysis only associated with the deleted upload file will also be deleted.
            </li>
            <li>
              <strong>THERE IS NO UNDELETE.</strong> When you select something to delete, it
              will be removed from the database and file repository.
            </li>
          </ul>
          <form onSubmit={handleSubmit}>
            <InputContainer
              type="select"
              name="folderId"
              id="organize-upload-folder-list"
              onChange={handleChange}
              options={folderList}
              property="name"
              value={deleteUploadFolderData.folderId}
            >
              Select the folder containing the file to delete:
            </InputContainer>

            <InputContainer
              type="select"
              name="uploadId"
              id="organize-upload-list"
              onChange={handleChange}
              options={uploadFolderList}
              value={deleteUploadFolderData.uploadId}
              property="uploadname"
              multiple
            >
              Select the uploaded project(s) to delete:
            </InputContainer>

            <Button type="submit" className="mt-4">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Delete"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDeletePage;
