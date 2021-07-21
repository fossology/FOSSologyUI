/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Required functions for calling APIs
import { getAllFolders, editFolder, getSingleFolder } from "services/folders";

const EditFolder = () => {
  const initialState = {
    name: "",
    description: "",
    id: 1,
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

  // Data required for editing the folder properties
  const [editFolderData, setEditFolderData] = useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const { name, description, id } = editFolderData;

  const handleChange = (e) => {
    setEditFolderData({
      ...editFolderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = (error) => {
    setMessage({
      type: "danger",
      text: error.message,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editFolder(editFolderData)
      .then(() => {
        setMessage({
          type: "success",
          text: "Successfully updated the folder properties",
        });
      })
      .catch((error) => {
        handleError(error);
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
        handleError(error);
        setShowMessage(true);
      });
  }, []);

  useEffect(() => {
    getSingleFolder(id)
      .then((res) => {
        setEditFolderData(res);
      })
      .catch((error) => {
        handleError(error);
        setShowMessage(true);
      });
  }, [id]);

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
        <h1 className="font-size-main-heading">Edit Folder Properties</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <p>
              The folder properties that can be changed are the folder name and
              description. First select the folder to edit. Then enter the new
              values. If no value is entered, then the corresponding field will
              not be changed.
            </p>
            <form>
              <InputContainer
                type="select"
                name="id"
                id="organize-folder-edit-id"
                onChange={handleChange}
                options={folderList}
                value={id}
                property="name"
              >
                Select the folder to edit:
              </InputContainer>
              <InputContainer
                type="text"
                name="name"
                id="organize-folder-edit-name"
                onChange={handleChange}
                placeholder="Folder name"
                value={name}
              >
                Change the folder name:
              </InputContainer>
              <InputContainer
                type="text"
                name="description"
                id="organize-folder-edit-description"
                onChange={handleChange}
                placeholder="Folder description"
                value={description}
              >
                Change the folder description:
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
                  "Edit"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFolder;
