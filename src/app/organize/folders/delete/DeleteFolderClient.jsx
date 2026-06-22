/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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
import { getAllFolders, deleteFolder } from "@/services/folders";

// Helper
import { handleError } from "@/shared/helper";

const DeleteFolderPage = () => {
  const initialFolder = {
    id: "",
    name: "",
    description: "",
    parent: null,
  };

  const initialMessage = {
    type: "success",
    text: "",
  };

  const [deleteFolderData, setDeleteFolderData] = useState(initialFolder);
  const [folderList, setFolderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    deleteFolder(deleteFolderData)
      .then(() => {
        setMessage({
          type: "success",
          text: messages.deletedFolder,
        });
        // Refresh folder list after deletion
        return getAllFolders();
      })
      .then((res) => {
        setFolderList(res);
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
        Delete a Fossology Folder
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-3">Select the folder to delete.</p>
          <ul className="list-disc pl-5 space-y-1 mb-6 text-sm">
            <li>This will delete the folder, all subfolders, and all uploaded files stored within the folder!</li>
            <li>Be very careful with your selection since you can delete a lot of work!</li>
            <li>All analysis only associated with the deleted uploads will also be deleted.</li>
            <li>
              THERE IS NO UNDELETE. When you select something to delete, it will be removed from the
              database and file repository.
            </li>
          </ul>
        </div>

        <div>
          <label className="block font-normal mb-3">
            Select the folder to delete:
          </label>

          <Select
            value={deleteFolderData.id?.toString()}
            onValueChange={(value) =>
              setDeleteFolderData((prev) => ({
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

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !deleteFolderData.id}
            variant="alert" size="default"
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
              "Delete"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeleteFolderPage;
