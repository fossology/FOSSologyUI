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

// Required functions for calling APIs
import {
  moveUpload,
  copyUpload,
  getUploadsFolderId,
} from "@/services/organizeUploads";
import { getAllFolders } from "@/services/folders";

// Helper function for error handling
import { handleError } from "@/shared/helper";

const UploadMovePage = () => {
  const initialState = {
    folderId: 1,
  };
  const initialMessage = {
    type: "success",
    text: "",
  };

  const [moveCopyUploadData, setMoveCopyUploadData] = useState(initialState);
  const [moveCopyUploadsList, setMoveCopyUploadsList] = useState([]);
  const [folderId, setFolderId] = useState(1);
  const [folderList, setFolderList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    if (e.target.multiple) {
      setMoveCopyUploadsList(
        Array.from(e.target.selectedOptions, (option) => option.value)
      );
    } else {
      setMoveCopyUploadData({
        ...moveCopyUploadData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getUploadList = () => {
    getUploadsFolderId(parseInt(folderId, 10))
      .then((res) => setUploadList(res))
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  };

  const handleMove = async (e) => {
    e.preventDefault();
    if (moveCopyUploadsList.length === 0) {
      setMessage({ type: "danger", text: messages.selectUploadsToMove });
      setShowMessage(true);
      return;
    }

    setLoading(true);
    try {
      for (const id of moveCopyUploadsList) {
        await moveUpload(moveCopyUploadData.folderId, parseInt(id, 10));
      }
      setMessage({ type: "success", text: messages.scheduleUploadMovement });
      getUploadList();
    } catch (error) {
      handleError(error, setMessage);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    if (moveCopyUploadsList.length === 0) {
      setMessage({ type: "danger", text: messages.selectUploadsToCopy });
      setShowMessage(true);
      return;
    }

    setLoading(true);
    try {
      for (const id of moveCopyUploadsList) {
        await copyUpload(moveCopyUploadData.folderId, id);
      }
      setMessage({ type: "success", text: messages.scheduledUploadCopy });
      getUploadList();
    } catch (error) {
      handleError(error, setMessage);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });

    getUploadList();
  }, [folderId]);

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}

      <h1 className="font-size-main-heading">Move or Copy Upload</h1>
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
              value={folderId}
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
              value={moveCopyUploadsList}
            >
              Select the uploaded content to move/copy:
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
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Move"
              )}
            </Button>

            &emsp;

            <Button type="submit" onClick={handleCopy} className="mt-4">
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Copy"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMovePage;

