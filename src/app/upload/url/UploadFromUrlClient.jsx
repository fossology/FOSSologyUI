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

import React, { useState, useEffect, useMemo, useReducer } from "react";
import messages from "@/constants/messages";

// Common Fields
import CommonFields from "@/components/Upload/CommonFields";

// ShadCN Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
 AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  AlertBanner,
} from "@/components/ui/alert";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import { Tooltip } from "@/components/Widgets";

// APIs
import { getAllFolders } from "@/services/folders";
import { createUploadUrl, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";

// Helper
import { handleError } from "@/shared/helper";

// Constants
import {
  initialScanFileDataFile,
  initialFolderList,
  initialStateUrl,
  initialUrlData,
} from "@/constants/constants";

const scanReducer = (state, action) => {
  switch (action.type) {
    case "RESET": {
      return action.payload;
    }

    case "UPDATE_SECTION": {
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.name]: action.value,
        },
      };
    }

    case "TOGGLE_REUSE": {
      const current = state.reuse?.reuseUpload || [];

      const exists = current.find(
        (item) => item.id === action.value?.id
      );

      return {
        ...state,
        reuse: {
          ...state.reuse,
          reuseUpload: action.checked
            ? exists
              ? current
              : [...current, action.value]
            : current.filter((i) => i.id !== action.value?.id),
        },
      };
    }

    default:
      return state;
  }
};

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const UploadFromUrlPage = () => {
  const [uploadUrlData, setUploadUrlData] =
    useState(initialStateUrl);

  const [urlData, setUrlData] = useState(initialUrlData);

  const [folderList, setFolderList] =
    useState(initialFolderList);

  const [scanFileData, dispatchScan] = useReducer(
    scanReducer,
    initialScanFileDataFile
  );

  const [loading, setLoading] = useState(false);

  const [showMessage, setShowMessage] = useState(true);

  const [message, setMessage] = useState({
    type: "info",
    text:
      "To manage your own group permissions go into Admin > Groups > Manage Group Users. To manage permissions for this one upload, go to Admin > Upload Permissions.",
  });

  const isUrlValid = Boolean(urlData.url?.trim());
  const TAB_REUSE = "reuse";

  const UPLOAD_READY_MAX_ATTEMPTS = 10;
  const UPLOAD_READY_POLL_INTERVAL_MS = 1500;

  const getFileNameFromUrl = (url) => {
    if (!url || url === "/") return "";

    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const fileName = getFileNameFromUrl(urlData.url);
  const displayName = fileName || "No file chosen";

  const folderOptions = useMemo(
    () =>
      folderList.map((folder) => (
        <SelectItem key={folder.id} value={folder.id.toString()}>
          {folder.name}
        </SelectItem>
      )),
    [folderList]
  );

  const waitForUploadReady = async (uploadId) => {
    let lastError = null;

    for (let attempt = 0; attempt < UPLOAD_READY_MAX_ATTEMPTS; attempt += 1) {
      try {
        await getUploadById(uploadId);
        return uploadId;
      } catch (error) {
        lastError = error;

        if (attempt < UPLOAD_READY_MAX_ATTEMPTS - 1) {
          await new Promise((resolve) => {
            setTimeout(resolve, UPLOAD_READY_POLL_INTERVAL_MS);
          });
        }
      }
    }

    throw lastError || new Error("Upload is not ready yet.");
  };

  const normalizeReuseUploads = (reuseUpload) => {
    if (!reuseUpload) return [];

    return Array.isArray(reuseUpload)
      ? reuseUpload.map((it) =>
          it && typeof it === "object" ? Number(it.id) : Number(it)
        )
      : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const body = { location: { url: urlData.url, name: urlData.name } };
    const folderId = uploadUrlData.folderId;

    const validateReuseFolder = () => {
      const reuseForFile = scanFileData.reuse || {};
      const hasReuseSelection =
        reuseForFile.reuseUpload &&
        (!Array.isArray(reuseForFile.reuseUpload) ||
          reuseForFile.reuseUpload.length > 0);

      if (!hasReuseSelection) {
        return Promise.resolve();
      }

      let candidateId = null;
      if (Array.isArray(reuseForFile.reuseUpload)) {
        const first = reuseForFile.reuseUpload[0];
        candidateId = first && typeof first === "object" ? first.id : first;
      } else if (typeof reuseForFile.reuseUpload === "object") {
        candidateId = reuseForFile.reuseUpload.id;
      } else {
        candidateId = reuseForFile.reuseUpload;
      }

      candidateId = candidateId ? Number(candidateId) : null;

      if (!candidateId) {
        return Promise.resolve();
      }

      return getUploadById(candidateId).then((uploadRes) => {
        const folderKeys = ["folderId", "folder", "folder_id", "parent"];
        let uploadFolder = null;
        for (const k of folderKeys) {
          if (Object.prototype.hasOwnProperty.call(uploadRes, k)) {
            uploadFolder = uploadRes[k];
            break;
          }
        }

        if (
          uploadFolder != null &&
          Number(uploadFolder) !== Number(folderId)
        ) {
          throw new Error(
            "The selected reuse upload belongs to a different folder. Please choose a matching folder or a different upload."
          );
        }
      });
    };

    validateReuseFolder()
      .then(() => createUploadUrl(uploadUrlData, body))
      .then((res) => {
        window.scrollTo({ top: 0 });

        setMessage({
          type: "success",
          text: `${messages.queuedUpload} #${res.message}`,
        });

        return res.message;
      })
      .then((uploadId) => waitForUploadReady(uploadId))
      .then((uploadId) => {
        const scheduleData = deepClone(scanFileData);
        scheduleData.reuse = scheduleData.reuse || {};
        scheduleData.reuse.reuseUpload =
          normalizeReuseUploads(scheduleData.reuse.reuseUpload);

        return scheduleAnalysis(folderId, uploadId, scheduleData);
      })
      .then(() => {
        window.scrollTo({ top: 0 });

        setMessage({
          type: "success",
          text: messages.scheduledAnalysis,
        });

        setUploadUrlData(initialStateUrl);
        setUrlData(initialUrlData);
        dispatchScan({
          type: "RESET",
          payload: initialScanFileDataFile,
        });
      })
      .catch((error) => handleError(error, setMessage))
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;

    setUploadUrlData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;

    setUrlData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScanChange = (
    checked,
    name,
    type,
    value
  ) => {
    const scanSections = ["analysis", "decider", "scancode"];

    const section = scanSections.find(
      (key) => name in scanFileData[key]
    );

    if (section) {
      dispatchScan({
        type: "UPDATE_SECTION",
        section,
        name,
        value: checked,
      });
      return;
    }

    if (name === "reuseUpload" && type === "checkbox") {
      dispatchScan({
        type: "TOGGLE_REUSE",
        value,
        checked,
      });
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

  const isButtonDisabled = !isUrlValid;
  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="max-w-4xl mx-40 my-6 px-4">
      {/* Alert */}
      {showMessage && (
        <div className="mb-4">
          <AlertBanner
            type={alertType}
            description={
              message.type === "info" ? (
                <>
                  To manage your own group permissions go into{" "}
                  <span className="font-semibold">
                    Admin &gt; Groups &gt; Manage Group Users
                  </span>
                  . To manage permissions for this one upload, go to{" "}
                  <span className="font-semibold">
                    Admin &gt; Upload Permissions
                  </span>
                  .
                </>
              ) : (
                message.text
              )
            }
            showClose
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Upload from URL
      </h1>

      <p className="text-base font-semibold mb-6">
        This option permits uploading files from a URL.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* 1. Folder Selection */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder for storing the uploaded
            files:
          </label>

          <Select
            value={uploadUrlData.folderId?.toString()}
            onValueChange={(value) =>
              setUploadUrlData({
                ...uploadUrlData,
                folderId: Number(value),
              })
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Folder" />
            </SelectTrigger>

            <SelectContent>{folderOptions}</SelectContent>
          </Select>
        </div>

        {/* 2. URL */}
        <div>
          <label className="block font-normal mb-3">
            2. Enter the URL to the file or directory:
          </label>

          <div className="flex items-baseline gap-3">
            <Input
              type="text"
              name="url"
              value={urlData.url}
              onChange={handleUrlChange}
              placeholder="https://example.com/file.zip"
              className="w-[320px] border-neutral-800"
            />

            <span
              className={`self-end text-sm ${
                isUrlValid
                  ? "text-info-500"
                  : "text-error-600"
              }`}
            >
              {isUrlValid ? "URL valid" : "No file chosen"}
            </span>
          </div>
        </div>

        {/* 3. Viewable Name */}
        <div>
          <label className="block font-normal mb-3">
            3. (Optional) Enter a viewable name for this
            file or directory:
          </label>

          <Input
            type="text"
            name="name"
            value={urlData.name}
            onChange={handleUrlChange}
            placeholder="Enter viewable name"
            className="w-[320px] border-neutral-800"
          />

          <p className="text-sm text-gray-600 mt-2">
            Note: If no name is provided, then the uploaded
            file (directory) name will be used.
          </p>
        </div>

        {/* 4. Description */}
        <div>
          <label className="block font-normal mb-1">
            4. Description
          </label>

          <p
            className={`text-sm mb-2 ${
              isUrlValid
                ? "text-info-500"
                : "text-error-600"
            }`}
          >
            {displayName}
          </p>

          <p
            className={`text-sm mb-1 ${
              isUrlValid
                ? "text-foreground"
                : "text-gray-600"
            }`}
          >
            (Optional) Enter a description of this file:
          </p>

          <Textarea
            name="uploadDescription"
            value={uploadUrlData.uploadDescription}
            onChange={handleChange}
            placeholder="Type your description here"
            disabled={!isUrlValid}
            className="min-w-[320px] resize"
          />
        </div>

        {/* 5. Ignore SCM */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">
            5.
          </span>

          <div className="flex-1">
            <CommonFields
              ignoreScm={uploadUrlData.ignoreScm}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 6. Access */}
        <div className="flex gap-2 mb-3">
          <span className="text-base font-normal text-foreground">
            6.
          </span>

          <div className="flex-1">
            <CommonFields
              accessLevel={uploadUrlData.accessLevel}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 7. Analysis */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">
            7.
          </span>

          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 8. Decider */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">
            8.
          </span>

          <div className="flex-1">
            <CommonFields
              decider={scanFileData.decider}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 9. Reuse */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground inline-flex items-center gap-1">
            9. (Optional) Reuse
            <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={!isUrlValid}
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
            >
              Set the Reuse Information
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[600px] sm:max-w-[700px] p-6"
          >
            <SheetHeader className="pb-6">
              <SheetTitle className="text-xl font-semibold">
                Reuse Configuration
              </SheetTitle>
            </SheetHeader>

            <Tabs value={TAB_REUSE} className="w-full p-0">
              <TabsList>
                <TabsTrigger value={TAB_REUSE}>
                  {displayName}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={TAB_REUSE} className="pt-6">
                <CommonFields
                  reuse={scanFileData.reuse}
                  handleChange={handleChange}
                  handleScanChange={handleScanChange}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-center gap-2">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="px-28 font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
                >
                  Cancel
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  variant="default" size="default" className="px-28"
                >
                  Apply
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        {/* Scancode */}
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="scancode">
            <AccordionTrigger className="flex w-full items-center justify-between text-lg font-semibold transition-all">
              Scancode:
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pb-2">
              <CommonFields
                scancode={scanFileData.scancode}
                handleChange={handleChange}
                handleScanChange={handleScanChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Upload Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || isButtonDisabled}
            variant="default" size="default"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFromUrlPage;