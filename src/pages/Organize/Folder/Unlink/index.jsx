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
import { getAllFolders, deleteFolder } from "../../../../services/folders";

const UnlinkFolder = () => {
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

  // Data required for unlinking a folder
  const [unlinkFolderData, setUnlinkFolderData] = useState(initialState);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderList);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    setUnlinkFolderData({
      ...unlinkFolderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteFolder(unlinkFolderData)
      .then(() => {
        setMessage({
          type: "success",
          text: "Successfully unlinked the folder",
        });
      })
      .then(() => {
        getAllFolders().then((res) => {
          setFolderList(res);
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
  };

  useEffect(() => {
    getAllFolders()
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
  }, []);
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
        <h1 className="font-size-main-heading text-center">Unlink folder</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <p>
              Only folders or uploads that can be accessed via a different path
              can be deleted
            </p>
            <form>
              <InputContainer
                type="select"
                name="id"
                id="organize-folder-unlink-id"
                onChange={handleChange}
                options={folderList}
                value={unlinkFolderData.id}
                property="name"
              >
                Select the upload or folder you wish to unlink:
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

export default UnlinkFolder;
