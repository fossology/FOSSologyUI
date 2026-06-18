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

import React, { useState, useEffect, useReducer, useMemo, useRef } from "react";
import messages from "@/constants/messages";

import CommonFields from "@/components/Upload/CommonFields";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertBanner } from "@/components/ui/alert";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetClose,
} from "@/components/ui/sheet";
import { Tooltip } from "@/components/Widgets";

import { getAllFolders } from "@/services/folders";
import { createUploadVcs, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";

import {
  initialScanFileDataFile,
  initialFolderList,
  initialStateVcs,
  initialVcsData,
  typeVcs,
} from "@/constants/constants";

import { handleError } from "@/shared/helper";

// Polling constants
const POLL_INTERVAL_MS       = 5_000;   
const POLL_MAX_ATTEMPTS      = 60;      

const extractReuseId = (reuseUpload) => {
  if (Array.isArray(reuseUpload)) {
    const first = reuseUpload[0];
    return first && typeof first === "object" ? first.id : first;
  }
  if (reuseUpload && typeof reuseUpload === "object") return reuseUpload.id;
  return reuseUpload;
};

const normalizeReuse = (data) => {
  const reuse = data?.reuse || {};
  return {
    ...data,
    reuse: {
      ...reuse,
      reuseUpload: Array.isArray(reuse.reuseUpload)
        ? reuse.reuseUpload.map((it) => Number(it.id ?? it))
        : [],
    },
  };
};

const getUploadFolderId = (uploadRes) =>
  uploadRes?.folderId ?? uploadRes?.folder ?? uploadRes?.folder_id ?? uploadRes?.parent ?? null;

const scanReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return action.payload;

    case "UPDATE_SECTION": {
      const sectionState = state[action.section] || {};
      return {
        ...state,
        [action.section]: { ...sectionState, [action.name]: action.value },
      };
    }

    case "TOGGLE_REUSE_UPLOAD": {
      const current = Array.isArray(state.reuse?.reuseUpload) ? state.reuse.reuseUpload : [];
      const id = Number(action.value?.id ?? action.value);
      const exists = current.map((i) => Number(i?.id ?? i)).includes(id);
      return {
        ...state,
        reuse: {
          ...state.reuse,
          reuseUpload: action.checked
            ? exists ? current : [...current, action.value]
            : current.filter((i) => Number(i?.id ?? i) !== id),
        },
      };
    }

    case "UPDATE_REUSE_FIELD":
      return { ...state, reuse: { ...state.reuse, [action.name]: action.value } };

    default:
      return state;
  }
};

const waitForUploadReady = async (uploadId) => {
  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    const res = await getUploadById(uploadId);

    // Still being processed — keep waiting
    if (res?._status503) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      continue;
    }

    return res;
  }

  throw new Error(
    `Upload #${uploadId} was not ready after ${(POLL_MAX_ATTEMPTS * POLL_INTERVAL_MS) / 60_000} minutes. ` +
    "Please check the job status in the Jobs panel."
  );
};

const UploadFromVcsPage = () => {
  const [uploadVcsData, setUploadVcsData] = useState(initialStateVcs);
  const [vcsData, setVcsData]             = useState(initialVcsData);
  const [folderList, setFolderList]       = useState(initialFolderList);
  const [scanFileData, dispatchScan]      = useReducer(scanReducer, initialScanFileDataFile);
  const [loading, setLoading]             = useState(false);
  const [showMessage, setShowMessage]     = useState(true);
  const [message, setMessage]             = useState({
    type: "info",
    text: "To manage your own group permissions go into Admin > Groups > Manage Group Users. To manage permissions for this one upload, go to Admin > Upload Permissions.",
  });

  const isCancelledRef = useRef(false);
  const TAB_REUSE      = "repo";

  const getRepoName = (url) => {
    if (!url) return "";
    const clean = url.replace(/\/$/, "");
    const parts = clean.split("/");
    return parts[parts.length - 1]?.replace(/\.git$/, "") || "";
  };

  const repoName    = useMemo(() => getRepoName(vcsData.vcsUrl), [vcsData.vcsUrl]);
  const vcsUrl      = vcsData.vcsUrl?.trim() || "";
  const isRepoValid = /^((https?:\/\/)|(git@)).+/.test(vcsUrl);

  const folderOptions = useMemo(
    () =>
      folderList.map((folder) => (
        <SelectItem key={folder.id} value={folder.id.toString()}>
          {folder.name}
        </SelectItem>
      )),
    [folderList]
  );

  const validateReuseFolder = async (folderId) => {
    const reuseForFile    = scanFileData?.reuse ?? {};
    const hasReuseSelection =
      reuseForFile.reuseUpload &&
      (!Array.isArray(reuseForFile.reuseUpload) || reuseForFile.reuseUpload.length > 0);

    if (!hasReuseSelection) return;

    const candidateId = Number(extractReuseId(reuseForFile.reuseUpload));
    if (!candidateId) return;

    const uploadRes = await getUploadById(candidateId);
    if (uploadRes?._status503) return;

    const uploadFolder = getUploadFolderId(uploadRes);
    if (uploadFolder != null && Number(uploadFolder) !== Number(folderId)) {
      throw new Error(
        `Selected reuse upload (id ${candidateId}) is in folder ${uploadFolder}; ` +
        "change target folder to match or choose a reuse upload from the target folder."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const folderId = Number(uploadVcsData.folderId);
    const vcsType  = vcsData.vcsType?.trim() || "";
    const url      = vcsData.vcsUrl?.trim() || "";

    if (!Number.isInteger(folderId) || folderId <= 0) {
      setMessage({ type: "error", text: "Please select a valid folder before uploading." });
      return;
    }

    if (!vcsType || !url) {
      setMessage({ type: "error", text: "Please select VCS type and provide repository URL." });
      return;
    }

    setLoading(true);
    isCancelledRef.current = false;

    try {
      await validateReuseFolder(folderId);

      // 1. Create the upload
      const res = await createUploadVcs({
        header: {
          folderId,
          public: uploadVcsData.accessLevel,
          ignoreScm: uploadVcsData.ignoreScm,
        },
        body: {
          location: {
            vcsType,
            vcsUrl: url,
            vcsBranch:   vcsData.vcsBranch?.trim()   || "",
            vcsName:     vcsData.vcsName?.trim()     || "",
            vcsUsername: vcsData.vcsUsername?.trim() || "",
            vcsPassword: vcsData.vcsPassword         || "",
          },
        },
      });

      // Extract upload id from the response message
      const uploadId = Number(String(res?.message || "").match(/\d+/)?.[0]);
      if (!Number.isInteger(uploadId) || uploadId <= 0) {
        throw new Error("Invalid uploadId received from backend");
      }

      setMessage({ type: "info", text: `${messages.queuedUpload} #${uploadId} — waiting for server to process...` });
      setShowMessage(true);

      // 2. Poll until ununpack finishes
      await waitForUploadReady(uploadId);

      if (isCancelledRef.current) return;

      // 3. Schedule analysis
      try {
        const scheduleData = normalizeReuse(scanFileData);
        await scheduleAnalysis(folderId, uploadId, scheduleData);

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

      setShowMessage(true);

      // Reset form
      setUploadVcsData(initialStateVcs);
      setVcsData(initialVcsData);
      dispatchScan({ type: "RESET", payload: initialScanFileDataFile });

    } catch (err) {
      console.error("FULL ERROR:", err);
      handleError(err, setMessage);
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    setUploadVcsData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleVcsChange = (e) => {
    const { name, value } = e.target;
    setVcsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScanChange = (checked, name, type, value) => {
    const sections = ["analysis", "decider", "scancode"];
    const section  = sections.find((key) =>
      Object.prototype.hasOwnProperty.call(scanFileData[key], name)
    );

    if (section) {
      dispatchScan({ type: "UPDATE_SECTION", section, name, value: checked });
      return;
    }

    if (name === "reuseUpload") {
      dispatchScan({ type: "TOGGLE_REUSE_UPLOAD", value, checked });
      return;
    }

    dispatchScan({ type: "UPDATE_REUSE_FIELD", name, value: checked });
  };

  useEffect(() => {
    getAllFolders()
      .then((res) => setFolderList(res))
      .catch((error) => { handleError(error, setMessage); setShowMessage(true); });
  }, []);

  useEffect(() => {
    return () => { isCancelledRef.current = true; };
  }, []);

  const isButtonDisabled =
    !uploadVcsData.folderId || !isRepoValid || !vcsData.vcsType;

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

      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Upload From Version Control System
      </h1>

      <p className="text-base font-semibold mb-2">
        You can upload source code from a version control system.
      </p>

      <p className="text-sm text-gray-600 mb-6">
        One risk is that FOSSology will store your username/password of a repository in the database
        and use them in command-line operations.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Folder */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder for storing the uploaded files:
          </label>
          <Select
            value={uploadVcsData.folderId?.toString()}
            onValueChange={(value) =>
              setUploadVcsData({ ...uploadVcsData, folderId: Number(value) })
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Folder" />
            </SelectTrigger>
            <SelectContent>{folderOptions}</SelectContent>
          </Select>
        </div>

        {/* 2. VCS Type */}
        <div>
          <label className="block font-normal mb-3">
            2. Select the type of version control system:
          </label>
          <Select
            value={vcsData.vcsType}
            onValueChange={(value) => setVcsData({ ...vcsData, vcsType: value })}
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select VCS Type" />
            </SelectTrigger>
            <SelectContent>
              {typeVcs.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 3. Repo URL */}
        <div>
          <label className="block font-normal mb-3">3. Enter the URL of the repo:</label>
          <div className="flex items-baseline gap-3">
            <Input
              type="text"
              name="vcsUrl"
              value={vcsData.vcsUrl}
              onChange={handleVcsChange}
              placeholder="https://github.com/example/repo.git"
              className="w-[320px] border-neutral-800"
            />
            <span className={`self-end text-sm ${isRepoValid ? "text-info-500" : "text-error-600"}`}>
              {repoName || "No repository chosen"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Note: The URL can begin with HTTP:// or HTTPS://. If HTTPS fails for Git, try HTTP.
          </p>
        </div>

        {/* 4. Branch */}
        <div>
          <label className="block font-normal mb-3">4. (Optional for Git) Branch name:</label>
          <Input
            type="text" name="vcsBranch" value={vcsData.vcsBranch}
            onChange={handleVcsChange} placeholder="main"
            className="w-[320px] border-neutral-800"
          />
        </div>

        {/* 5. Username */}
        <div>
          <label className="block font-normal mb-3">5. (Optional) Username:</label>
          <Input
            type="text" name="vcsUsername" value={vcsData.vcsUsername}
            onChange={handleVcsChange} placeholder="Enter username"
            className="w-[320px] border-neutral-800"
          />
        </div>

        {/* 6. Password */}
        <div>
          <label className="block font-normal mb-3">6. (Optional) Password:</label>
          <Input
            type="password" name="vcsPassword" value={vcsData.vcsPassword}
            onChange={handleVcsChange} placeholder="Enter password"
            className="w-[320px] border-neutral-800"
          />
        </div>

        {/* 7. Viewable Name */}
        <div>
          <label className="block font-normal mb-3">
            7. (Optional) Enter a viewable name for this file (directory):
          </label>
          <Input
            type="text" name="vcsName" value={vcsData.vcsName}
            onChange={handleVcsChange} placeholder="Enter viewable name"
            className="w-[320px] border-neutral-800"
          />
          <p className="text-sm text-gray-600 mt-2">
            Note: If no name is provided, the uploaded file (directory) name will be used.
          </p>
        </div>

        {/* 8. Description */}
        <div>
          <label className="block font-normal mb-1">8. Description</label>
          <p className={`text-sm mb-2 ${isRepoValid ? "text-info-500" : "text-error-600"}`}>
            {repoName || "No repository chosen"}
          </p>
          <p className={`text-sm mb-1 ${isRepoValid ? "text-foreground" : "text-gray-600"}`}>
            (Optional) Enter a description of this file:
          </p>
          <Textarea
            name="uploadDescription" value={uploadVcsData.uploadDescription}
            onChange={handleChange} placeholder="Type your description here"
            disabled={!isRepoValid} className="min-w-[320px] resize"
          />
        </div>

        {/*9. Apply Global Decisions*/}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">9.</span>
          <div className="flex-1">
            <CommonFields
              applyGlobal={uploadVcsData.applyGlobal}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 10. Ignore SCM */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">10.</span>
          <div className="flex-1">
            <CommonFields
              ignoreScm={uploadVcsData.ignoreScm}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 11. Access */}
        <div className="flex gap-2 mb-3">
          <span className="text-base font-normal text-foreground">11.</span>
          <div className="flex-1">
            <CommonFields
              accessLevel={uploadVcsData.accessLevel}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 12. Analysis */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">12.</span>
          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 13. Decider */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">13.</span>
          <div className="flex-1">
            <CommonFields
              decider={scanFileData.decider}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 14. Reuse */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground inline-flex items-center gap-1">
            14. (Optional) Reuse
            <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button" variant="outline" disabled={!isRepoValid}
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
                <TabsTrigger value={TAB_REUSE}>{repoName || "No repository chosen"}</TabsTrigger>
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
                  onClick={() => {
                    setMessage({ type: "success", text: "Reuse configuration saved." });
                    setShowMessage(true);
                  }}
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
          <Button type="submit" disabled={loading || isButtonDisabled} variant="default" size="default">
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFromVcsPage;
