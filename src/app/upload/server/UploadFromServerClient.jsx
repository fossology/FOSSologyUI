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

import CommonFields from "@/components/Upload/CommonFields";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertBanner } from "@/components/ui/alert";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Tooltip } from "@/components/Widgets";

import { getAllFolders } from "@/services/folders";
import { createUploadServer, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";
import { handleError } from "@/shared/helper";

import {
  initialStateUploadFromServer,
  initialScanFileDataFile,
  initialFolderList,
} from "@/constants/constants";

// Polling
const POLL_INTERVAL_MS  = 5_000;
const POLL_MAX_ATTEMPTS = 60;

const waitForUploadReady = async (uploadId) => {
  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    const res = await getUploadById(uploadId);
    if (res?._status503) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      continue;
    }
    return res;
  }
  throw new Error(
    `Upload #${uploadId} was not ready after ${
      (POLL_MAX_ATTEMPTS * POLL_INTERVAL_MS) / 60_000
    } minutes. Check the Jobs panel for status.`
  );
};

const UploadFromServerPage = () => {
  const [uploadServerData, setUploadServerData] = useState(initialStateUploadFromServer);
  const [folderList, setFolderList]             = useState(initialFolderList);
  const [scanFileData, setScanFileData]         = useState(initialScanFileDataFile);
  const [loading, setLoading]                   = useState(false);
  const [showMessage, setShowMessage]           = useState(true);
  const [message, setMessage]                   = useState({
    type: "info",
    text: "To manage your own group permissions go into Admin > Groups > Manage Group Users. To manage permissions for this one upload, go to Admin > Upload Permissions.",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const path = uploadServerData.filePath?.trim();
    const name = uploadServerData.viewableName?.trim();

    if (!path) {
      setMessage({ type: "error", text: "File path is required." });
      setLoading(false);
      return;
    }

    if (path.includes("*") && !name) {
      setMessage({
        type: "error",
        text: "You must provide a viewable name when using wildcard (*) paths.",
      });
      setLoading(false);
      return;
    }

    try {
      // 0. Validate reuse folder match
      const reuseForFile = scanFileData.reuse || {};
      const hasReuse =
        reuseForFile.reuseUpload &&
        (!Array.isArray(reuseForFile.reuseUpload) || reuseForFile.reuseUpload.length > 0);

      if (hasReuse) {
        const first       = Array.isArray(reuseForFile.reuseUpload)
          ? reuseForFile.reuseUpload[0]
          : reuseForFile.reuseUpload;
        const candidateId = Number(first && typeof first === "object" ? first.id : first);

        if (candidateId) {
          const uploadRes = await getUploadById(candidateId);

          if (!uploadRes?._status503) {
            const uploadFolder =
              uploadRes?.folderId ?? uploadRes?.folder ??
              uploadRes?.folder_id ?? uploadRes?.parent ?? null;

            if (
              uploadFolder != null &&
              Number(uploadFolder) !== Number(uploadServerData.folderId)
            ) {
              throw new Error(
                `Selected reuse upload (id ${candidateId}) is in folder ${uploadFolder}; ` +
                "change target folder to match or choose a reuse upload from the target folder."
              );
            }
          }
        }
      }

      // 1. Create the upload
      const res = await createUploadServer({
        header: {
          folderId:          uploadServerData.folderId,
          uploadDescription: uploadServerData.uploadDescription,
          public:            uploadServerData.accessLevel,
          ignoreScm:         uploadServerData.ignoreScm,
          applyGlobal:       uploadServerData.applyGlobal,
        },
        body: {
          uploadType: "server",
          location: { path, name },
        },
      });

      // 2. Extract upload id
      const rawMessage = res?.message ?? res?.uploadId ?? res?.id;
      const uploadId   = Number(String(rawMessage).match(/\d+/)?.[0]);

      if (!Number.isInteger(uploadId) || uploadId <= 0) {
        throw new Error("Could not determine upload ID from server response.");
      }

      setMessage({ type: "info", text: `${messages.queuedUpload} #${uploadId} — waiting for server to process...` });
      setShowMessage(true);

      // 3. Poll until ununpack finishes
      await waitForUploadReady(uploadId);

      // 4. Schedule analysis
      const scheduleData = structuredClone(scanFileData);
      if (Array.isArray(scheduleData.reuse?.reuseUpload)) {
        scheduleData.reuse.reuseUpload = scheduleData.reuse.reuseUpload.map((it) =>
          it && typeof it === "object" ? Number(it.id) : Number(it)
        );
      }

      try {
        await scheduleAnalysis(uploadServerData.folderId, uploadId, scheduleData);
        setMessage({ type: "success", text: messages.scheduledAnalysis });
      } catch (scheduleErr) {
        console.warn("Schedule analysis failed:", scheduleErr);
        setMessage({
          type: "warning",
          text: scheduleErr?.message
            ? `Upload queued but analysis failed: ${scheduleErr.message}`
            : "Upload queued but analysis scheduling failed.",
        });
      }

      // Reset form
      setUploadServerData(initialStateUploadFromServer);
      setScanFileData(initialScanFileDataFile);

    } catch (error) {
      handleError(error, setMessage);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (type === "checkbox") {
      setUploadServerData({ ...uploadServerData, [name]: checked });
    } else if (type === "file") {
      setUploadServerData({ ...uploadServerData, [name]: files[0] });
    } else {
      setUploadServerData({ ...uploadServerData, [name]: value });
    }
  };

  const handleScanChange = (checked, name, type, value) => {
    if (Object.keys(scanFileData.analysis).includes(name)) {
      setScanFileData({ ...scanFileData, analysis: { ...scanFileData.analysis, [name]: checked } });
    } else if (Object.keys(scanFileData.decider).includes(name)) {
      setScanFileData({ ...scanFileData, decider: { ...scanFileData.decider, [name]: checked } });
    } else if (Object.keys(scanFileData.scancode).includes(name)) {
      setScanFileData({ ...scanFileData, scancode: { ...scanFileData.scancode, [name]: checked } });
    } else {
      setScanFileData((prev) => {
        if (name === "reuseUpload" && type === "checkbox") {
          const current = Array.isArray(prev.reuse.reuseUpload) ? prev.reuse.reuseUpload : [];
          const exists  = value ? current.find((item) => item.id === value.id) : false;
          return {
            ...prev,
            reuse: {
              ...prev.reuse,
              reuseUpload: checked
                ? exists ? current : [...current, value]
                : current.filter((item) => item.id !== value?.id),
            },
          };
        }
        return {
          ...prev,
          reuse: { ...prev.reuse, [name]: type === "checkbox" ? checked : value },
        };
      });
    }
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => { handleError(error, setMessage); setShowMessage(true); });
  }, []);

  const isButtonDisabled =
    !uploadServerData.folderId || !uploadServerData.filePath;
  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  const fileName =
    uploadServerData.filePath && uploadServerData.filePath !== "/"
      ? uploadServerData.filePath.split("/").pop()
      : "";

  return (
    <div className="max-w-5xl mx-40 my-6 px-4">
      {showMessage && (
        <div className="mb-4">
          <AlertBanner
            type={alertType}
            description={
              message.type === "info" ? (
                <>
                  To manage your own group permissions go into{" "}
                  <span className="font-semibold">Admin &gt; Groups &gt; Manage Group Users</span>. To
                  manage permissions for this one upload, go to{" "}
                  <span className="font-semibold">Admin &gt; Upload Permissions</span>.
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

      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Upload from Server</h1>
      <p className="text-base font-semibold mb-6">
        This option permits uploading files from the server.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Folder */}
        <div>
          <Label className="block mb-3">
            1. Select the folder for storing the uploaded files:
          </Label>
          <Select
            value={uploadServerData.folderId?.toString()}
            onValueChange={(value) =>
              setUploadServerData({ ...uploadServerData, folderId: Number(value) })
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Folder" />
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

        {/* 2. File Path */}
        <div>
          <Label className="block mb-3">2. Enter the file path:</Label>
          <div className="flex items-center gap-3">
            <Input
              type="text"
              name="filePath"
              value={uploadServerData.filePath}
              onChange={handleChange}
              placeholder="/home/fossology/files/example.zip"
              className="w-[320px] border-neutral-800"
            />
            <span className={`self-end text-sm ${fileName ? "text-info-500" : "text-error-600"}`}>
              {fileName || "No file chosen"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            NOTE: Contents under a directory will be recursively included. "*" is supported to
            select multiple files (e.g. *.txt).
          </p>
        </div>

        {/* 3. Viewable Name */}
        <div>
          <Label className="block mb-3">
            3. (Optional) Enter a viewable name for this file or directory:
          </Label>
          <Input
            type="text"
            name="viewableName"
            value={uploadServerData.viewableName}
            onChange={handleChange}
            placeholder="Enter viewable name"
            className="w-[320px] border-neutral-800"
          />
          <p className="text-sm text-gray-600 mt-2">
            Note: If no name is provided, then the uploaded file (directory) name will be used.
          </p>
        </div>

        {/* 4. Description */}
        <div>
          <Label className="block mb-1">4. Description</Label>
          <p className={`text-sm mb-2 ${fileName ? "text-info-500" : "text-error-600"}`}>
            {fileName || "No file chosen"}
          </p>
          <p className={`text-sm mb-1 ${fileName ? "text-foreground" : "text-neutral-600"}`}>
            (Optional) Enter a description of this file:
          </p>
          <Textarea
            name="uploadDescription"
            value={uploadServerData.uploadDescription}
            onChange={handleChange}
            placeholder="Type your description here"
            disabled={!fileName}
            className={
              !fileName
                ? "border-border text-neutral-600 cursor-not-allowed min-w-[320px] resize"
                : "min-w-[320px] resize"
            }
          />
        </div>

        {/*5. Apply Global Decisions*/}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">5.</span>
          <div className="flex-1">
            <CommonFields
              applyGlobal={uploadServerData.applyGlobal}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 6. Ignore SCM */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">6.</span>
          <div className="flex-1">
            <CommonFields
              ignoreScm={uploadServerData.ignoreScm}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 7. Access Level */}
        <div className="flex gap-2 mb-3">
          <span className="text-base font-normal text-foreground">7.</span>
          <div className="flex-1">
            <CommonFields
              accessLevel={uploadServerData.accessLevel}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 8. Analysis */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">8.</span>
          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 9. Decider */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">9.</span>
          <div className="flex-1">
            <CommonFields
              decider={scanFileData.decider}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 10. Reuse */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground inline-flex items-center gap-1">
            10. (Optional) Reuse
            <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={!fileName}
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
            >
              Set the Reuse Information
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[600px] sm:max-w-[700px] p-6">
            <SheetHeader className="p-6 pb-2">
              <SheetTitle className="text-xl font-semibold">Reuse Configuration</SheetTitle>
            </SheetHeader>

            <div className="p-6">
              <Tabs value={fileName || "file"} className="w-full p-0">
                <TabsList>
                  <TabsTrigger value={fileName || "file"}>
                    {fileName || "No file chosen"}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={fileName || "file"} className="pt-6">
                  <CommonFields
                    reuse={scanFileData.reuse}
                    handleChange={handleChange}
                    handleScanChange={handleScanChange}
                  />
                </TabsContent>
              </Tabs>
            </div>

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
                <Button variant="default" size="default" className="px-28">
                  Apply
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        {/* Scancode */}
        <Accordion type="single" collapsible className="w-full">
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

        <div className="border-t border-gray-300 my-4" />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || isButtonDisabled}
            variant="default"
            size="default"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFromServerPage;
