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
import FolderNavigation from "@/components/FolderNavigation";
import { getAllFolders, moveFolder, copyFolder } from "@/services/folders";
import { moveUpload, copyUpload, getUploadsFolderId } from "@/services/organizeUploads";
import { handleError } from "@/shared/helper";

const MoveFolderPage = () => {
  const [folderList, setFolderList]               = useState([]);
  const [loadingAction, setLoadingAction] = useState(null);
  const [contentList, setContentList]             = useState([]);
  const [destinationFolder, setDestinationFolder] = useState("");
  const [searchValue, setSearchValue]             = useState("");
  const [message, setMessage]                     = useState(null);
  const [showMessage, setShowMessage]             = useState(false);
  const [selectedContent, setSelectedContent]     = useState([]);
  const [selectedFolderId, setSelectedFolderId]   = useState(null);

  const loadFolderContents = async (folderId, folders = folderList) => {
    if (!folderId) {
      setContentList([]);
      return;
    }

    try {
      const uploads = await getUploadsFolderId({
        folderId,
        recursive: false,
      }).catch(() => []);

      const uploadItems = (Array.isArray(uploads) ? uploads : []).map((u) => {
        const name = u.uploadName || u.uploadname || `Upload #${u.id}`;
        const date = u.uploadDate
          ? u.uploadDate.replace("T", " ").replace(/\.\d+Z?$/, "")
          : null;
        const status = u.status || u.clearingStatus || null;

        let displayName = name;
        if (date) displayName += ` from ${date}`;
        if (status) displayName += ` (${status.toLowerCase()})`;

        return {
          id: u.id,
          name: displayName,
          type: "upload",
        };
      });

      const subFolderItems = folders
        .filter(
          (f) =>
            Number(f.parent) === Number(folderId)
        )
        .map((f) => ({
          id: f.id,
          name: f.name,
          type: "folder",
        }));

      setContentList([...subFolderItems, ...uploadItems]);
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res || []))
      .catch((error) => { handleError(error, setMessage); setShowMessage(true); });
  }, []);

  useEffect(() => {
    setSelectedContent([]);
    loadFolderContents(selectedFolderId);
  }, [selectedFolderId, folderList]);

  const toggleContent = (item) => {
    setSelectedContent((prev) => {
      const exists = prev.some((c) => c.id === item.id && c.type === item.type);
      return exists
        ? prev.filter((c) => !(c.id === item.id && c.type === item.type))
        : [...prev, item];
    });
  };

  const performAction = async (action) => {
    if (selectedContent.length === 0 || !destinationFolder) {
      setMessage({ type: "error", text: "Please select content and a destination folder." });
      setShowMessage(true);
      return;
    }

    setLoadingAction(action);
    try {
      const folders = selectedContent.filter((item) => item.type === "folder");
      const uploads = selectedContent.filter((item) => item.type === "upload");

      await Promise.all([
        // PUT /folders/{id}?parent=…&action=move|copy
        ...folders.map((folder) =>
          (action === "move" ? moveFolder : copyFolder)({
            parent: Number(destinationFolder),
            id:     folder.id,
          })
        ),
        // PUT /uploads/{id}?folderId=…&action=move|copy
        ...uploads.map((upload) =>
          (action === "move" ? moveUpload : copyUpload)({
            folderId: Number(destinationFolder),
            uploadId: upload.id,
          })
        ),
      ]);

      const updatedFolders = await getAllFolders();

      setFolderList(updatedFolders);

      await loadFolderContents(selectedFolderId, updatedFolders);

      setSelectedContent([]);
      setDestinationFolder("");

      let successMessage;

      if (folders.length > 0) {
        successMessage =
          action === "move"
            ? messages.movedFolder
            : messages.copiedFolder;
      } else {
        successMessage =
          action === "move"
            ? messages.movedUpload
            : messages.copiedUpload;
      }

      setMessage({
        type: "success",
        text: successMessage,
      });

      setShowMessage(true);

    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setLoadingAction(null);
    }
  };

  const alertType =
    message?.type === "danger" || message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  const filteredContent = contentList.filter((item) =>
    (item.name ?? "").toLowerCase().includes(searchValue.toLowerCase())
  );

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

      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Move upload or folder</h1>

      <p className="mb-8 text-base text-gray-900">
        Select a folder on the left hand side to move or copy content to a different folder.
      </p>

      <div className="flex gap-8">
        <div className="shrink-0">
        <FolderNavigation
            folders={folderList}
            selectedFolderId={selectedFolderId}
            onFolderSelect={setSelectedFolderId}
        />
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <Label>Search and select uploads or folders you wish to move:</Label>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search uploads or folders"
              className="w-[390px]"
            />
          </div>

          <ContentBox className="h-[360px] overflow-y-auto">
            {filteredContent.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {selectedFolderId
                  ? "No uploads or folders found in this folder."
                  : "Select a folder on the left to see its contents."}
              </div>
            ) : (
              filteredContent.map((item) => {
                const selected = selectedContent.some(
                  (c) => c.id === item.id && c.type === item.type
                );
                return (
                  <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onClick={() => toggleContent(item)}
                    className={`
                      w-full rounded-sm px-2 py-1 text-left text-sm
                      outline-none transition-colors
                      ${selected
                        ? "bg-secondary text-gray-900"
                        : "text-foreground hover:bg-secondary hover:text-gray-900 focus:bg-secondary focus:text-gray-900"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                );
              })
            )}
          </ContentBox>

          {selectedContent.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {selectedContent.length} item{selectedContent.length > 1 ? "s" : ""} selected.
            </p>
          )}

          <div className="space-y-2">
            <Label>Select the folder where the content shall be placed:</Label>
            <Select value={destinationFolder} onValueChange={setDestinationFolder}>
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                {folderList.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id.toString()}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => performAction("copy")}
              disabled={
                loadingAction !== null ||
                selectedContent.length === 0 ||
                !destinationFolder
              }
            >
            {loadingAction === "copy" ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Copying...</span>
              </div>
            ) : (
              "Copy"
            )}
            </Button>

            <Button
              type="button"
              onClick={() => performAction("move")}
              disabled={
                loadingAction !== null ||
                selectedContent.length === 0 ||
                !destinationFolder
              }
            >
            {loadingAction === "move" ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Moving...</span>
              </div>
            ) : (
              "Move"
            )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveFolderPage;