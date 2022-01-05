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
import messages from "constants/messages";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Required functions for calling APIs
import { getAllFolders, deleteFolder } from "services/folders";

// Helper function for error handling
import { handleError } from "shared/helper";

const DeleteFolder = () => {
  const initialState = {
    id: 1,
    name: "Software Repository",
    description: "Top Folder",
    parent: null,
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

  // Data required for deleting a folder
  const [deleteFolderData, setDeleteFolderData] = useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) =>
    setDeleteFolderData({
      ...deleteFolderData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteFolder(deleteFolderData)
      .then(() => {
        setMessage({
          type: "success",
          text: messages.deletedFolder,
        });
      })
      .then(() => {
        getAllFolders().then((res) => {
          setFolderList(res);
        });
      })
      .catch((error) => {
        handleError(error, setMessage);
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
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
      <Title title="Delete Folder" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">Delete a Fossology Folder</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <p>Select the folder to delete.</p>
            <ul>
              <li>
                This will delete the folder, all subfolders, and all uploaded
                files stored within the folder!
              </li>
              <li>
                Be very careful with your selection since you can delete a lot
                of work!
              </li>
              <li>
                All analysis only associated with the deleted uploads will also
                be deleted.
              </li>
              <li>
                THERE IS NO UNDELETE. When you select something to delete, it
                will be removed from the database and file repository.
              </li>
            </ul>
            <form>
              <InputContainer
                type="select"
                name="id"
                id="organize-folder-delete-id"
                onChange={handleChange}
                options={folderList}
                value={deleteFolderData.id}
                property="name"
              >
                Select the folder to delete:
              </InputContainer>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFolder;
