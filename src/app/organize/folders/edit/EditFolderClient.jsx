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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import {
  getAllFolders,
  editFolder,
  getSingleFolder,
} from "@/services/folders";

// Helper
import { handleError } from "@/shared/helper";

const EditFolderPage = () => {
  const initialState = {
    name: "",
    description: "",
    id: "",
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [editFolderData, setEditFolderData] = useState(initialState);
  const [folderList, setFolderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const { name, description, id } = editFolderData;

  const handleChange = (e) => {
    setEditFolderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editFolder(editFolderData)
      .then(() => {
        setMessage({
          type: "success",
          text: messages.updatedFolderProps,
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

  // Fetch all folders for dropdown
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

  // Refetch selected folder info when `id` changes
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    getSingleFolder(id)
      .then((res) => {
        if (!cancelled) setEditFolderData(res);
      })
      .catch((error) => {
        if (!cancelled) {
          handleError(error, setMessage);
          setShowMessage(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

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
        Edit Folder Properties
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-3 text-sm">
            The folder properties that can be changed are the folder name and description. First select the folder to edit. Then enter the new values. If no value is entered, then the corresponding field will not be changed.
          </p>
        </div>

        {/* Folder to edit */}
        <div>
          <Label className="block mb-3">
            1. Select the folder to edit:
          </Label>

          <Select
            value={id?.toString()}
            onValueChange={(value) =>
              setEditFolderData((prev) => ({
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

        {/* Folder Name */}
        <div>
          <Label
            htmlFor="organize-folder-edit-name"
            className="block mb-3"
          >
            2. Change the folder name:
          </Label>

          <Input
            id="organize-folder-edit-name"
            name="name"
            type="text"
            placeholder="Folder name"
            value={name}
            onChange={handleChange}
            className="w-[320px]"
          />
        </div>

        {/* Folder Description */}
        <div>
          <Label
            htmlFor="organize-folder-edit-description"
            className="block mb-3"
          >
            3. Change the folder description:
          </Label>

          <Textarea
            id="organize-folder-edit-description"
            name="description"
            placeholder="Folder description"
            value={description}
            onChange={handleChange}
            className="min-w-[320px] resize"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !id}
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
              "Edit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditFolderPage;
