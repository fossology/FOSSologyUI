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
import FolderNavigation from "@/components/FolderNavigation";
import {
  getAllFolders,
  getFolderContents,
  unlinkContent,
} from "@/services/folders";
import { handleError } from "@/shared/helper";

const UnlinkFolderPage = () => {
  const [folderList, setFolderList]               = useState([]);
  const [loading, setLoading]                     = useState(false);
  const [contentList, setContentList]             = useState([]);
  const [searchValue, setSearchValue]             = useState("");
  const [message, setMessage]                     = useState(null);
  const [showMessage, setShowMessage]             = useState(false);
  const [selectedContent, setSelectedContent]     = useState([]);
  const [selectedFolderId, setSelectedFolderId]   = useState(null);

  const loadFolderContents = async (folderId) => {
    if (!folderId) {
      setContentList([]);
      return;
    }

    try {
      const contents = await getFolderContents(folderId);
      setContentList(contents || []);
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
    if (!item.removable) return;

    setSelectedContent((prev) => {
      const exists = prev.some((c) => c.id === item.id);
      return exists
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item];
    });
  };

  const alertType =
    message?.type === "danger" || message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  const filteredContent = contentList.filter((item) =>
    (item.content ?? "").toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedContent.length === 0) return;

    setLoading(true);

    try {
      await Promise.all(
        selectedContent.map((item) => unlinkContent(item.id))
      );

      await loadFolderContents(selectedFolderId);

      setSelectedContent([]);

      const hasFolder = selectedContent.some((item) =>
        item.content.startsWith("/")
      );

      setMessage({
        type: "success",
        text: hasFolder
          ? messages.unlinkedFolder
          : messages.unlinkedUpload,
      });

      setShowMessage(true);
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

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

      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Unlink folder</h1>

      <p className="mb-8 text-base text-gray-900">
        Only folders or uploads that can be accessed via a different path can be deleted.
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
            <Label>Search and select uploads or folders you wish to unlink:</Label>
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
                const selected = selectedContent.some((c) => c.id === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!item.removable}
                    onClick={() => toggleContent(item)}
                    className={`
                      w-full rounded-sm px-2 py-1 text-left text-sm outline-none transition-colors
                      ${
                        !item.removable
                          ? "cursor-not-allowed text-muted-foreground opacity-50"
                          : selected
                          ? "bg-secondary text-gray-900"
                          : "text-foreground hover:bg-secondary hover:text-gray-900 focus:bg-secondary focus:text-gray-900"
                      }
                    `}
                  >
                    {item.content}
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

          <div className="flex gap-4 pt-2">
            <div className="flex pt-2">
              <Button
                type="button"
                variant="alert"
                onClick={handleDelete}
                disabled={loading || selectedContent.length === 0}
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
        </div>
      </div>
    </div>
  );
};

export default UnlinkFolderPage;