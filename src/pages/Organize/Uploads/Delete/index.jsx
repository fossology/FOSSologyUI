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

// Widgets
import {
  Alert,
  Button,
  InputContainer,
  Spinner,
} from "../../../../components/Widgets";

// Required functions for calling APIs
import { getAllFolders } from "../../../../services/folders";
import {
  getUploadsFolderId,
  deleteUploadsbyId,
} from "../../../../services/organizeUploads";

const UploadDelete = () => {
  const initialState = {
    folderId: 1,
    uploadId: null,
    groupName: "",
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

  // Data required for deleting the upload
  const [deleteUploadFolderData, setDeleteUploadFolderData] =
    useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // Setting the list for all the uploads of respective folders
  const [uploadFolderList, setUploadFolderList] = useState([]);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    if (e.target.multiple) {
      return setDeleteUploadFolderData({
        ...deleteUploadFolderData,
        [e.target.name]: Array.from(
          e.target.selectedOptions,
          (option) => option.value
        ),
      });
    }
    return setDeleteUploadFolderData({
      ...deleteUploadFolderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (deleteUploadFolderData.uploadId.length > 0) {
      deleteUploadFolderData?.uploadId?.forEach((id) => {
        return deleteUploadsbyId(parseInt(id, 10))
          .then(() => {
            setMessage({
              type: "success",
              text: "Successfully scheduled selected uploads for deletion.",
            });
            getUploadsFolderId(deleteUploadFolderData.folderId).then((res) => {
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
      });
    }
  };

  useEffect(() => {
    getAllFolders().then((res) => {
      setFolderList(res);
    });
    getUploadsFolderId(deleteUploadFolderData.folderId).then((res) => {
      setUploadFolderList(res);
    });
  }, [deleteUploadFolderData.folderId, deleteUploadFolderData.uploadId]);

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
        <h1 className="font-size-main-heading mb-4">Delete Uploaded File</h1>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <p>Select the uploaded file to delete</p>
            <ul>
              <li>This will delete the upload file!</li>
              <li>
                Be very careful with your selection since you can delete a lot
                of work!
              </li>
              <li>
                All analysis only associated with the deleted upload file will
                also be deleted.
              </li>
              <li>
                THERE IS NO UNDELETE. When you select something to delete, it
                will be removed from the database and file repository.
              </li>
            </ul>
            <p>Select the uploaded file to delete:</p>
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
                  Select the folder containing the file to delete:
                </InputContainer>
              </li>
              <li className="mt-4">
                <InputContainer
                  type="select"
                  name="uploadId"
                  id="organize-upload-list"
                  onChange={(e) => handleChange(e)}
                  options={uploadFolderList}
                  value={uploadFolderList.id}
                  property="uploadname"
                  multiple="multiple"
                >
                  Select the uploaded project to delete:
                </InputContainer>
              </li>
            </ul>
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
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDelete;
