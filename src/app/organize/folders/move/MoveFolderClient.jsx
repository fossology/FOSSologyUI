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

"use client";

import React, { useState, useEffect } from "react";
import messages from "@/constants/messages";

// Widgets
import { Alert, Button, InputContainer } from "@/components/Widgets";

// API Services
import { getAllFolders, moveFolder, copyFolder } from "@/services/folders";

// Helpers
import { handleError } from "@/shared/helper";

const MoveFolderPage = () => {
  const initialState = {
    parent: 1,
    id: 1,
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [moveFolderData, setMoveFolderData] = useState(initialState);
  const [folderList, setFolderList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const { id, parent } = moveFolderData;

  const handleChange = (e) => {
    setMoveFolderData({
      ...moveFolderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMove = async (e) => {
    e.preventDefault();
    try {
      await moveFolder(moveFolderData);
      setMessage({ type: "success", text: messages.movedFolder });
    } catch (error) {
      handleError(error, setMessage);
    } finally {
      setShowMessage(true);
    }
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await copyFolder(moveFolderData);
      setMessage({ type: "success", text: messages.copiedFolder });
    } catch (error) {
      handleError(error, setMessage);
    } finally {
      setShowMessage(true);
    }
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
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}
      <h1 className="font-size-main-heading">Move or Copy Folder</h1>
      <br />
      <div className="row">
        <div className="col-12 col-lg-8">
          <form>
            <InputContainer
              type="select"
              name="id"
              id="organize-folder-move-id"
              onChange={handleChange}
              options={folderList}
              value={id}
              property="name"
            >
              Select the folder you wish to move:
            </InputContainer>
            <br />
            <InputContainer
              type="select"
              name="parent"
              id="organize-folder-move-parent"
              onChange={handleChange}
              options={folderList}
              value={parent}
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
  );
};

export default MoveFolderPage;
