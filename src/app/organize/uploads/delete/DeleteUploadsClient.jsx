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

import React, { useState, useEffect } from "react";
import messages from "@/constants/messages";
import { handleError } from "@/shared/helper";

// Widgets
import { Spinner } from "@/components/Widgets";
import { ContentBox } from "@/components/ui/content-box";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertBanner } from "@/components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// API Services
import { getAllFolders } from "@/services/folders";
import {
  getUploadsFolderId,
  deleteUploadsbyId,
} from "@/services/organizeUploads";

const UploadDeletePage = () => {
  const [folderList, setFolderList] = useState([]);
  const [folderId, setFolderId] = useState(null);
  const [uploadFolderList, setUploadFolderList] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const filteredUploads = uploadFolderList.filter((upload) => {
    const uploadName = upload.uploadName ?? upload.uploadname ?? "";

    return uploadName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });
  

  const handleDelete = async () => {
    if (!selectedUpload) {
      setMessage({
        type: "error",
        text: messages.selectUploadsToDelete,
      });
      setShowMessage(true);
      return;
    }

    setLoading(true);

    try {
      await deleteUploadsbyId(selectedUpload.id);

      const uploads = await getUploadsFolderId({
        folderId,
        recursive: false,
      });

      setUploadFolderList(formatUploads(uploads || []));

      setSelectedUpload(null);
      setSearchValue("");

      setMessage({
        type: "success",
        text: messages.scheduleUploadDeletion,
      });

      setShowMessage(true);
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFolders()
      .then(setFolderList)
      .catch((err) => console.error("Error fetching folders", err));
  }, []);

  useEffect(() => {
    setSelectedUpload(null);
    setSearchValue("");

    if (!folderId) {
      setUploadFolderList([]);
      return;
    }

    getUploadsFolderId({
      folderId,
      recursive: false,
    })
    .then((uploads) => {
      setUploadFolderList(formatUploads(uploads || []));
    })
    .catch((err) => console.error(err));
  }, [folderId]);

  const formatUploads = (uploads = []) => {
    return uploads.map((u) => {
      const name = u.uploadName || u.uploadname || `Upload #${u.id}`;
      const date = u.uploadDate
        ? u.uploadDate.replace("T", " ").replace(/\.\d+Z?$/, "")
        : null;
      const status = u.status || u.clearingStatus || null;

      let displayName = name;

      if (date) {
        displayName += ` from ${date}`;
      }

      if (status) {
        displayName += ` (${status.toLowerCase()})`;
      }

      return {
        ...u,
        displayName,
      };
    });
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

      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Delete Uploaded File
      </h1>

      <p className="mb-4 text-base text-gray-900">
        Select the uploaded file to delete
      </p>

      <ul className="mb-8 list-disc space-y-2 pl-6 text-base text-gray-900">
        <li>This will delete the upload file!</li>
        <li>
          Be very careful with your selection since you can delete a lot of work!
        </li>
        <li>
          All analysis only associated with the deleted upload file will also be
          deleted.
        </li>
        <li>
          THERE IS NO UNDELETE. When you select something to
          delete, it will be removed from the database and file repository.
        </li>
      </ul>

      <div className="space-y-8">

        <div className="space-y-2">
          <Label>1. Select the folder to delete:</Label>

          <Select
              value={folderId ? folderId.toString() : ""}
            onValueChange={(value) => setFolderId(Number(value))}
          >
            <SelectTrigger className="w-[360px]">
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

        <div className="space-y-2">
          <Label>2. Select the uploaded project to delete:</Label>

          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search uploaded projects"
            className="w-[390px]"
          />

          <ContentBox className="h-[360px] overflow-y-auto">
            {filteredUploads.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {!folderId
                  ? "Select a folder first"
                  : "No removable uploads found"}
              </div>
            ) : (
              filteredUploads.map((upload) => {
                const selected = selectedUpload?.id === upload.id;
                return (
                  <button
                    key={upload.id}
                    type="button"
                    onClick={() => setSelectedUpload(upload)}
                    className={`
                      w-full rounded-sm px-2 py-1 text-left text-sm
                      outline-none transition-colors
                      ${
                        selected
                          ? "bg-secondary text-gray-900"
                          : "text-foreground hover:bg-secondary hover:text-gray-900 focus:bg-secondary focus:text-gray-900"
                      }
                    `}
                  >
                    {upload.displayName}
                  </button>
                );
              })
            )}
          </ContentBox>

          {selectedUpload && (
            <p className="text-sm text-muted-foreground">
              1 upload selected.
            </p>
          )}
        </div>

        <Button
          variant="alert"
          onClick={handleDelete}
          disabled={loading || !selectedUpload}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner />
              <span>Deleting...</span>
            </div>
          ) : (
            "Delete"
          )}
        </Button>

      </div>
    </div>
  );
};

export default UploadDeletePage;
