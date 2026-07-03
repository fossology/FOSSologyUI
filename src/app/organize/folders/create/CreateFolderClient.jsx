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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { getAllFolders, createFolder } from "@/services/folders";

// Helper
import { handleError } from "@/shared/helper";

const CreateFolderPage = () => {
  const initialState = {
    parentFolder: "",
    folderName: "",
    folderDescription: "",
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const initialFolderList = [
    {
      id: 1,
      name: "Software Repository",
      description: "Top Folder",
      parent: null,
    },
  ];

  const [createFolderData, setCreateFolderData] = useState(initialState);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const { parentFolder, folderName, folderDescription } =
    createFolderData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreateFolderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createFolder(createFolderData)
      .then(() => {
        setMessage({
          type: "success",
          text: messages.createdFolder,
        });

        setCreateFolderData(initialState);
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
        Create a new Fossology Folder
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parent Folder */}
        <div>
          <Label className="block mb-3">
            1. Select the parent folder:
          </Label>

          <Select
            value={parentFolder?.toString()}
            onValueChange={(value) =>
              setCreateFolderData((prev) => ({
                ...prev,
                parentFolder: value,
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

        {/* Folder Name */}
        <div>
          <Label
            htmlFor="organize-folder-create-folder-name"
            className="block mb-3"
          >
            2. Enter the new folder name:
          </Label>

          <Input
            id="organize-folder-create-folder-name"
            name="folderName"
            type="text"
            placeholder="Folder name"
            value={folderName}
            onChange={handleChange}
            className="w-[320px]"
          />
        </div>

        {/* Folder Description */}
        <div>
          <Label
            htmlFor="organize-folder-create-folder-description"
            className="block mb-3"
          >
            3. Enter a meaningful description:
          </Label>

          <Textarea
            id="organize-folder-create-folder-description"
            name="folderDescription"
            placeholder="Folder description"
            value={folderDescription}
            onChange={handleChange}
            className="min-w-[320px] resize"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !folderName}
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
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolderPage;