/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import {
  AlertBanner,
} from "@/components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// API Services
import { getAllFolders, moveFolder, copyFolder } from "@/services/folders";

// Helpers
import { handleError } from "@/shared/helper";

const MoveFolderPage = () => {
  const initialState = {
    parent: "",
    id: "",
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [moveFolderData, setMoveFolderData] = useState(initialState);
  const [folderList, setFolderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const { id, parent } = moveFolderData;

  const handleMove = (e) => {
    e.preventDefault();
    setLoading(true);
    moveFolder(moveFolderData)
      .then(() => {
        setMessage({ type: "success", text: messages.movedFolder });
      })
      .catch((error) => {
        handleError(error, setMessage);
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleCopy = (e) => {
    e.preventDefault();
    setLoading(true);
    copyFolder(moveFolderData)
      .then(() => {
        setMessage({ type: "success", text: messages.copiedFolder });
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

  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div>
      {showMessage && (
        <div className="mb-4">
          <AlertBanner
            type={alertType}
            description={message.text}
            showClose
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Move or Copy Folder
      </h1>

      <form className="space-y-6">
        {/* Folder to move */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder you wish to move:
          </label>

          <Select
            value={id?.toString()}
            onValueChange={(value) =>
              setMoveFolderData((prev) => ({
                ...prev,
                id: value,
              }))
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>

            <SelectContent>
              {folderList.map((folder) => (
                <SelectItem
                  key={folder.id}
                  value={folder.id.toString()}
                >
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Destination folder */}
        <div>
          <label className="block font-normal mb-3">
            2. Select the folder where the content shall be placed:
          </label>

          <Select
            value={parent?.toString()}
            onValueChange={(value) =>
              setMoveFolderData((prev) => ({
                ...prev,
                parent: value,
              }))
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>

            <SelectContent>
              {folderList.map((folder) => (
                <SelectItem
                  key={folder.id}
                  value={folder.id.toString()}
                >
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <div className="pt-2 flex gap-4">
          <Button
            type="submit"
            onClick={handleMove}
            disabled={loading}
            variant="default" size="default"
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Move"
            )}
          </Button>

          <Button
            type="submit"
            onClick={handleCopy}
            disabled={loading}
            variant="default" size="default"
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Copy"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MoveFolderPage;
