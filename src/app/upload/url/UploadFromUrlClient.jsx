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
import { createUploadUrl, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";

import { handleError } from "@/shared/helper";

import {
  initialScanFileDataFile,
  initialFolderList,
  initialStateUrl,
  initialUrlData,
} from "@/constants/constants";

// ─── Polling constants
const POLL_INTERVAL_MS  = 5_000;
const POLL_MAX_ATTEMPTS = 60;

const scanReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return action.payload;

    case "UPDATE_SECTION":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.name]: action.value,
        },
      };

    case "TOGGLE_REUSE": {
      const current = state.reuse?.reuseUpload || [];
      const exists = current.find((item) => item.id === action.value?.id);
      return {
        ...state,
        reuse: {
          ...state.reuse,
          reuseUpload: action.checked
            ? exists ? current : [...current, action.value]
            : current.filter((i) => i.id !== action.value?.id),
        },
      };
    }

    default:
      return state;
  }
};

// Wait for upload to leave the 503 "processing" state
const waitForUploadReady = async (uploadId) => {
  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    const res = await getUploadById(uploadId);

    // Still processing — keep waiting
    if (res?._status503) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      continue;
    }

    // Got a real upload object
    return res;
  }

  throw new Error(
    `Upload #${uploadId} was not ready after ${
      (POLL_MAX_ATTEMPTS * POLL_INTERVAL_MS) / 60_000
    } minutes. Check the Jobs panel for status.`
  );
};

const normalizeReuseUploads = (reuseUpload) => {
  if (!reuseUpload) return [];
  return Array.isArray(reuseUpload)
    ? reuseUpload.map((it) =>
        it && typeof it === "object" ? Number(it.id) : Number(it)
      )
    : [];
};

const UploadFromUrlPage = () => {
  const [uploadUrlData, setUploadUrlData] = useState(initialStateUrl);
  const [urlData, setUrlData]             = useState(initialUrlData);
  const [folderList, setFolderList]       = useState(initialFolderList);
  const [scanFileData, dispatchScan]      = useReducer(scanReducer, initialScanFileDataFile);
  const [loading, setLoading]             = useState(false);
  const [showMessage, setShowMessage]     = useState(true);
  const [message, setMessage]             = useState({
    type: "info",
    text: "To manage your own group permissions go into Admin > Groups > Manage Group Users. To manage permissions for this one upload, go to Admin > Upload Permissions.",
  });

  const [reuseConfig, setReuseConfig]         = useState(structuredClone(initialScanFileDataFile.reuse));
  const [tempReuseConfig, setTempReuseConfig] = useState(structuredClone(initialScanFileDataFile.reuse));

  const isUrlValid = Boolean(urlData.url?.trim());
  const TAB_REUSE  = "reuse";

  const getFileNameFromUrl = (url) => {
    if (!url || url === "/") return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const fileName    = getFileNameFromUrl(urlData.url);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const folderId = Number(uploadUrlData.folderId);
    const url      = urlData.url?.trim();
    const name     = urlData.name?.trim();

    if (!Number.isInteger(folderId) || folderId <= 0) {
      setMessage({ type: "error", text: "Please select a valid folder before uploading." });
      setShowMessage(true);
      setLoading(false);
      return;
    }

    if (!url) {
      setMessage({ type: "error", text: "Please enter a URL." });
      setShowMessage(true);
      setLoading(false);
      return;
    }

    try {
      // 1. Create the upload
      const res = await createUploadUrl({
        header: {
          folderId,
          public: uploadUrlData.accessLevel,
          ignoreScm: uploadUrlData.ignoreScm,
          uploadDescription: uploadUrlData.uploadDescription,
        },
        body: {
          location: {
            url,
            name: name || url,
          },
        },
      });

      // 2. Extract upload id
      const rawMessage = res?.message ?? res?.uploadId ?? res?.upload_id ?? res;
      const uploadId   = Number(String(rawMessage).match(/\d+/)?.[0]);

      if (!Number.isInteger(uploadId) || uploadId <= 0) {
        throw new Error("Could not determine upload ID from server response.");
      }

      setMessage({ type: "info", text: `${messages.queuedUpload} #${uploadId} — waiting for server to process...` });
      setShowMessage(true);

      // 3. Poll until ununpack finishes
      await waitForUploadReady(uploadId);

      // 4. Schedule analysis
      try {
        const scheduleData = {
          ...scanFileData,
          reuse: {
            ...reuseConfig,
            reuseUpload: normalizeReuseUploads(reuseConfig.reuseUpload),
          },
        };

        await scheduleAnalysis(folderId, uploadId, scheduleData);

        setMessage({ type: "success", text: messages.scheduledAnalysis || "Analysis scheduled successfully." });
      } catch (scheduleErr) {
        console.warn("Schedule analysis failed:", scheduleErr);
        setMessage({
          type: "warning",
          text: scheduleErr?.message
            ? `Upload queued but analysis failed: ${scheduleErr.message}`
            : "Upload queued but analysis scheduling failed.",
        });
      }

      // 5. Reset form
      setUploadUrlData(initialStateUrl);
      setUrlData(initialUrlData);
      dispatchScan({ type: "RESET", payload: initialScanFileDataFile });
      setReuseConfig(structuredClone(initialScanFileDataFile.reuse));
      setTempReuseConfig(structuredClone(initialScanFileDataFile.reuse));

    } catch (err) {
      console.error("Upload from URL error:", err);
      handleError(err, setMessage);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    setUploadUrlData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrlData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScanChange = (checked, name, type, value) => {
    const scanSections = ["analysis", "decider", "scancode"];
    const section = scanSections.find((key) => name in scanFileData[key]);

    if (section) {
      dispatchScan({ type: "UPDATE_SECTION", section, name, value: checked });
      return;
    }

    if (name === "reuseUpload" && type === "checkbox") {
      dispatchScan({ type: "TOGGLE_REUSE", value, checked });
    }
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => { handleError(error, setMessage); setShowMessage(true); });
  }, []);

  const isButtonDisabled = !isUrlValid;
  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

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

      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Upload from URL</h1>

      <p className="text-base font-semibold mb-6">
        This option permits uploading files from a URL.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Folder */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder for storing the uploaded files:
          </label>
          <Select
            value={uploadUrlData.folderId?.toString()}
            onValueChange={(value) =>
              setUploadUrlData({ ...uploadUrlData, folderId: Number(value) })
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
              type="text" name="url" value={urlData.url}
              onChange={handleUrlChange}
              placeholder="https://example.com/file.zip"
              className="w-[320px] border-neutral-800"
            />
            <span className={`self-end text-sm ${isUrlValid ? "text-info-500" : "text-error-600"}`}>
              {isUrlValid ? displayName : "No file chosen"}
            </span>
          </div>
        </div>

        {/* 3. Viewable Name */}
        <div>
          <label className="block font-normal mb-3">
            3. (Optional) Enter a viewable name for this file or directory:
          </label>
          <Input
            type="text" name="name" value={urlData.name}
            onChange={handleUrlChange} placeholder="Enter viewable name"
            className="w-[320px] border-neutral-800"
          />
          <p className="text-sm text-gray-600 mt-2">
            Note: If no name is provided, then the uploaded file (directory) name will be used.
          </p>
        </div>

        {/* 4. Description */}
        <div>
          <label className="block font-normal mb-1">4. Description</label>
          <p className={`text-sm mb-2 ${isUrlValid ? "text-info-500" : "text-error-600"}`}>
            {displayName}
          </p>
          <p className={`text-sm mb-1 ${isUrlValid ? "text-foreground" : "text-gray-600"}`}>
            (Optional) Enter a description of this file:
          </p>
          <Textarea
            name="uploadDescription" value={uploadUrlData.uploadDescription}
            onChange={handleChange} placeholder="Type your description here"
            disabled={!isUrlValid} className="min-w-[320px] resize"
          />
        </div>

        {/*5. Apply Global Decisions*/}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">5.</span>
          <div className="flex-1">
            <CommonFields
              applyGlobal={uploadUrlData.applyGlobal}
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
              ignoreScm={uploadUrlData.ignoreScm}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 7. Access */}
        <div className="flex gap-2 mb-3">
          <span className="text-base font-normal text-foreground">7.</span>
          <div className="flex-1">
            <CommonFields
              accessLevel={uploadUrlData.accessLevel}
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
              type="button" variant="outline" disabled={!isUrlValid}
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
            >
              Set the Reuse Information
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[600px] sm:max-w-[700px] p-6">
            <SheetHeader className="pb-6">
              <SheetTitle className="text-xl font-semibold">Reuse Configuration</SheetTitle>
            </SheetHeader>

            <Tabs value={TAB_REUSE} className="w-full p-0">
              <TabsList>
                <TabsTrigger value={TAB_REUSE}>{displayName}</TabsTrigger>
              </TabsList>
              <TabsContent value={TAB_REUSE} className="pt-6">
                <CommonFields
                  reuse={tempReuseConfig}
                  handleScanChange={(checked, name, type, value) => {
                    setTempReuseConfig((prev) => {
                      const updated = { ...prev };
                      if (name === "reuseUpload" && type === "checkbox") {
                        const current = updated.reuseUpload || [];
                        const exists = current.find((item) => item.id === value?.id);
                        updated.reuseUpload = checked
                          ? exists ? current : [...current, value]
                          : current.filter((item) => item.id !== value?.id);
                      } else {
                        updated[name] = type === "checkbox" ? checked : value;
                      }
                      return updated;
                    });
                  }}
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
                  onClick={() => setReuseConfig(structuredClone(tempReuseConfig))}
                >
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
            variant="default" size="default"
          >
            {loading ? "Uploading…" : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFromUrlPage;
