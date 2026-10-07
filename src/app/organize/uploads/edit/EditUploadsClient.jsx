/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import React, { useEffect, useState } from "react";
import messages from "@/constants/messages";
import { handleError } from "@/shared/helper";

// Widgets
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertBanner } from "@/components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Services
import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId, updateUpload } from "@/services/organizeUploads";
import { getUploadById } from "@/services/upload";

const UploadEditPage = () => {
  const [folderList, setFolderList] = useState([]);
  const [uploadList, setUploadList] = useState([]);

  const [folderId, setFolderId] = useState(null);
  const [uploadId, setUploadId] = useState(null);

  const [uploadName, setUploadName] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");

  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res || []))
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, []);

  useEffect(() => {
    setUploadId(null);
    setUploadName("");
    setUploadDescription("");

    if (!folderId) {
      setUploadList([]);
      return;
    }

    getUploadsFolderId({
      folderId,
      recursive: false,
    })
      .then((uploads) => {
        setUploadList(uploads || []);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, [folderId]);

  useEffect(() => {
    if (!uploadId) {
      setUploadName("");
      setUploadDescription("");
      return;
    }

    getUploadById(uploadId)
      .then((upload) => {
        setUploadName(upload.uploadName ?? upload.uploadname ?? "");
        setUploadDescription(upload.description ?? "");
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, [uploadId]);

  const handleEdit = async () => {
    if (!uploadId) {
      setMessage({
        type: "error",
        text: messages.selectUploadToEdit,
      });
      setShowMessage(true);
      return;
    }

    try {
      await updateUpload({
        uploadId,
        uploadName,
        uploadDescription,
      });

      // Refresh upload list
      if (folderId) {
        const uploads = await getUploadsFolderId({
          folderId,
          recursive: false,
        });

        setUploadList(uploads || []);
      }

      // Reset entire form
      setFolderId(null);
      setUploadId(null);
      setUploadName("");
      setUploadDescription("");

      setMessage({
        type: "success",
        text: messages.uploadPropertiesUpdated,
      });

      setShowMessage(true);
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    }
  };

  const alertType =
    message?.type === "danger" || message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="pb-10">
      {showMessage && message && (
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
        Edit Uploaded File Properties
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
        className="space-y-6"
      >
        <div>
          <p className="mb-3">
            Select the folder containing the upload. Then choose the upload you wish
            to edit. Modify the upload name and/or description as needed.
          </p>
        </div>

        {/* Folder */}
        <div>
          <Label className="block mb-3">
            1. Select the folder that contains the upload:
          </Label>

          <Select
            value={folderId ? folderId.toString() : ""}
            onValueChange={(value) => setFolderId(Number(value))}
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

        {/* Upload */}
        <div>
          <Label className="block mb-3">
            2. Select the upload you wish to edit:
          </Label>

          <Select
            value={uploadId ? uploadId.toString() : ""}
            onValueChange={(value) => setUploadId(Number(value))}
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select upload" />
            </SelectTrigger>

            <SelectContent>
              {!folderId ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Select a folder first.
                </div>
              ) : uploadList.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No uploads found in this folder.
                </div>
              ) : (
                uploadList.map((upload) => (
                  <SelectItem
                    key={upload.id}
                    value={upload.id.toString()}
                  >
                    {upload.uploadName ?? upload.uploadname}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Upload Name */}
        <div>
          <Label
            htmlFor="upload-name"
            className="block mb-3"
          >
            3. Upload name:
          </Label>
            <Input
              id="upload-name"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
              placeholder="Upload name"
              className="w-[320px]"
            />
        </div>

        {/* Upload Description */}
        <div>
          <Label
            htmlFor="upload-description"
            className="block mb-3"
          >
            4. Upload Description:
          </Label>
            <Textarea
              id="upload-description"
              value={uploadDescription}
              onChange={(e) => setUploadDescription(e.target.value)}
              placeholder="Upload description"
              className="min-w-[320px] resize"
            />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={!uploadId}
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadEditPage;