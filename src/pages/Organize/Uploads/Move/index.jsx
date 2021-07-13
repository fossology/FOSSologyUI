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
import { Alert, Button, InputContainer } from "../../../../components/Widgets";
import {
  moveUpload,
  copyUpload,
  getUploadsFolderId,
} from "../../../../services/organizeUploads";

import { getAllFolders } from "../../../../services/folders";

const UploadMove = () => {
  const initialState = {
    folderId: 1,
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
  const [moveCopyUploadData, setMoveCopyUploadData] = useState(initialState);
  const [moveCopyUploadsList, setMoveCopyUploadsList] = useState([]);
  const [folderId, setFolderId] = useState(1);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [uploadList, setUploadList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    if (e.target.multiple) {
      return setMoveCopyUploadsList(
        Array.from(e.target.selectedOptions, (option) => option.value)
      );
    }
    return setMoveCopyUploadData({
      ...moveCopyUploadData,
      [e.target.name]: e.target.value,
    });
  };

  const getUploadList = () => {
    getUploadsFolderId(parseInt(folderId, 10))
      .then((res) => {
        setUploadList(res);
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
        setShowMessage(true);
      });
  };
  const handleMove = (e) => {
    e.preventDefault();
    if (moveCopyUploadsList.length > 0) {
      moveCopyUploadsList.map((id) => {
        return moveUpload(
          moveCopyUploadData.folderId,
          parseInt(id, 10),
          moveCopyUploadData.groupName
        )
          .then(() => {
            setMessage({
              type: "success",
              text: "Successfully scheduled the selected uploads movement.",
            });
            getUploadList();
          })
          .catch((error) => {
            setMessage({
              type: "danger",
              text: error.message,
            });
          })
          .finally(() => {
            setShowMessage(true);
          });
      });
    }
  };

  const handleCopy = (e) => {
    e.preventDefault();
    if (moveCopyUploadsList.length > 0) {
      moveCopyUploadsList.map((id) => {
        return copyUpload(
          moveCopyUploadData.folderId,
          id,
          moveCopyUploadData.groupName
        )
          .then(() => {
            setMessage({
              type: "success",
              text: "Successfully scheduled the selected uploads for copy.",
            });
            getUploadList();
          })
          .catch((error) => {
            setMessage({
              type: "danger",
              text: error.message,
            });
          })
          .finally(() => {
            setShowMessage(true);
          });
      });
    }
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
    getUploadList();
  }, [folderId]);
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
        <h1 className="font-size-main-heading">Move and Copy Upload</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <form>
              <InputContainer
                type="select"
                name="folderId"
                id="organize-upload-folder-id"
                onChange={(e) => setFolderId(e.target.value)}
                options={folderList}
                property="name"
              >
                Select a folder whose uploads you want to move/copy:
              </InputContainer>
              <br />
              <InputContainer
                type="select"
                name="moveCopyUploadList"
                id="organize-upload"
                onChange={handleChange}
                options={uploadList}
                property="uploadname"
                multiple
              >
                Select the folder where the content shall be placed:
              </InputContainer>
              <br />
              <InputContainer
                type="select"
                name="folderId"
                id="organize-upload-move-folder"
                onChange={handleChange}
                options={folderList}
                value={moveCopyUploadData.folderId}
                property="name"
              >
                Select the folder where the content shall be placed:
              </InputContainer>
              <Button type="submit" onClick={handleMove} className="mt-4">
                Move
              </Button>
              &emsp;
              <Button type="submit" onClick={handleCopy} className="mt-4">
                Copy
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMove;
