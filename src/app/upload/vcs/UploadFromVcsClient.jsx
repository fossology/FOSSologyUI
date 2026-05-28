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
  Alert,
  AlertDescription,
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
import { createUploadVcs, getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";

// Constants
import {
  initialScanFileDataFile,
  initialFolderList,
  initialStateVcs,
  initialVcsData,
  typeVcs,
} from "@/constants/constants";

// Helpers
import { handleError } from "@/shared/helper";

const UploadFromVcsPage = () => {
  const [uploadVcsData, setUploadVcsData] =
    useState(initialStateVcs);

  const [vcsData, setVcsData] =
    useState(initialVcsData);

  const [folderList, setFolderList] =
    useState(initialFolderList);

  const [scanFileData, setScanFileData] =
    useState(initialScanFileDataFile);

  const [loading, setLoading] = useState(false);

  const [showMessage, setShowMessage] =
    useState(true);

  const [message, setMessage] = useState({
    type: "info",
    text:
      "To manage your own group permissions go into Admin > Groups > Manage Group Users. To manage permissions for this one upload, go to Admin > Upload Permissions.",
  });

  const getRepoName = (url) => {
    if (!url) return "";

    const cleanedUrl = url.replace(/\/$/, "");
    const parts = cleanedUrl.split("/");

    return parts[parts.length - 1];
  };

  const repoName = getRepoName(vcsData.vcsUrl);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createUploadVcs(uploadVcsData, vcsData)
      .then((res) => {
        window.scrollTo({ top: 0 });

        setMessage({
          type: "success",
          text: `${messages.queuedUpload} #${res.message}`,
        });

        return res.message;
      })
      .then((uploadId) => getUploadById(uploadId, 10).then(() => uploadId))
      .then((uploadId) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            scheduleAnalysis(
              uploadVcsData.folderId,
              uploadId,
              scanFileData
            )
              .then(resolve)
              .catch(reject);
          }, 200000);
        })
      )
      .then(() => {
        window.scrollTo({ top: 0 });

        setMessage({
          type: "success",
          text: messages.scheduledAnalysis,
        });

        setUploadVcsData(initialStateVcs);
        setVcsData(initialVcsData);
        setScanFileData(initialScanFileDataFile);
      })
      .catch((error) =>
        handleError(error, setMessage)
      )
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } =
      e.target;

    setUploadVcsData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleVcsChange = (e) => {
    const { name, value } = e.target;

    setVcsData((prev) => ({
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
    if (Object.keys(scanFileData.analysis).includes(name)) {
      setScanFileData({
        ...scanFileData,
        analysis: {
          ...scanFileData.analysis,
          [name]: checked,
        },
      });
    } else if (
      Object.keys(scanFileData.decider).includes(name)
    ) {
      setScanFileData({
        ...scanFileData,
        decider: {
          ...scanFileData.decider,
          [name]: checked,
        },
      });
    } else if (
      Object.keys(scanFileData.scancode).includes(name)
    ) {
      setScanFileData({
        ...scanFileData,
        scancode: {
          ...scanFileData.scancode,
          [name]: checked,
        },
      });
    } else {
      setScanFileData((prev) => {
        if (name === "reuseUpload" && type === "checkbox") {
          const current = Array.isArray(
            prev.reuse.reuseUpload
          )
            ? prev.reuse.reuseUpload
            : [];

          const exists = value
            ? current.find((item) => item.id === value.id)
            : false;

          return {
            ...prev,
            reuse: {
              ...prev.reuse,
              reuseUpload: checked
                ? exists
                  ? current
                  : [...current, value]
                : current.filter(
                    (item) => item.id !== value?.id
                  ),
            },
          };
        }

        return {
          ...prev,
          reuse: {
            ...prev.reuse,
            [name]:
              type === "checkbox" ? checked : value,
          },
        };
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

  const isButtonDisabled = !vcsData.vcsUrl;

  return (
    <div className="max-w-4xl mx-40 my-6 px-4">
      {/* Info Alert */}
      {showMessage && (
        <div className="mb-4">
          <Alert className="relative flex items-start gap-2 rounded border-0 bg-info-100 px-4 py-2 text-sm text-info-500 pr-10">
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-2 right-2 p-1 rounded hover:bg-black/10"
              aria-label="Close"
            >
              <span
                className="block w-5 h-5 bg-info-500 [mask-image:url('/assets/icons/Close/Close_20px.svg')] [mask-size:contain] [mask-repeat:no-repeat]"
              />
            </button>

            <img
              src="/assets/icons/Alert/InfoFilled.svg"
              alt="Info"
              width={24}
              height={24}
              className="mt-1"
            />

            <div>
              <AlertDescription className="text-sm text-info-500">
                <span>
                  To manage your own group permissions go
                  into{" "}
                  <strong>
                    Admin &gt; Groups &gt; Manage Group
                    Users
                  </strong>{" "}
                  To manage permissions for this one
                  upload, go to{" "}
                  <strong>
                    Admin &gt; Upload Permissions
                  </strong>
                  .
                </span>
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Upload From Version Control System
      </h1>

      <p className="text-base font-semibold mb-2">
        You can upload source code from a version control
        system.
      </p>

      <p className="text-sm text-gray-600 mb-6">
        One risk is that FOSSology will store your
        username/password of a repository in the database
        and use them in command-line operations.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* 1. Folder */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder for storing the uploaded
            files:
          </label>

          <Select
            value={uploadVcsData.folderId?.toString()}
            onValueChange={(value) =>
              setUploadVcsData({
                ...uploadVcsData,
                folderId: value,
              })
            }
          >
            <SelectTrigger className="w-[282px]">
              <SelectValue placeholder="Select Folder" />
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

        {/* 2. VCS Type */}
        <div>
          <label className="block font-normal mb-3">
            2. Select the type of version control system:
          </label>

          <Select
            value={vcsData.vcsType}
            onValueChange={(value) =>
              setVcsData({
                ...vcsData,
                vcsType: value,
              })
            }
          >
            <SelectTrigger className="w-[282px]">
              <SelectValue placeholder="Select VCS Type" />
            </SelectTrigger>

            <SelectContent>
              {typeVcs.map((type) => (
                <SelectItem
                  key={type.id}
                  value={type.id}
                >
                  {type.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 3. Repo URL */}
        <div>
          <label className="block font-normal mb-3">
            3. Enter the URL of the repo:
          </label>

          <div className="flex items-baseline gap-3">
            <Input
              type="text"
              name="vcsUrl"
              value={vcsData.vcsUrl}
              onChange={handleVcsChange}
              placeholder="https://github.com/example/repo.git"
              className="w-[282px] border-foreground"
            />

            <span
              className={`self-end text-sm ${
                repoName
                  ? "text-info-500"
                  : "text-error-600"
              }`}
            >
              {repoName || "No repository chosen"}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Note: The URL can begin with HTTP:// or
            HTTPS://. If HTTPS fails for Git, try HTTP.
          </p>
        </div>

        {/* 4. Branch */}
        <div>
          <label className="block font-normal mb-3">
            4. (Optional for Git) Branch name:
          </label>

          <Input
            type="text"
            name="vcsBranch"
            value={vcsData.vcsBranch}
            onChange={handleVcsChange}
            placeholder="main"
            className="w-[282px] border-foreground"
          />
        </div>

        {/* 5. Username */}
        <div>
          <label className="block font-normal mb-3">
            5. (Optional) Username:
          </label>

          <Input
            type="text"
            name="vcsUsername"
            value={vcsData.vcsUsername}
            onChange={handleVcsChange}
            placeholder="Enter username"
            className="w-[282px] border-foreground"
          />
        </div>

        {/* 6. Password */}
        <div>
          <label className="block font-normal mb-3">
            6. (Optional) Password:
          </label>

          <Input
            type="password"
            name="vcsPassword"
            value={vcsData.vcsPassword}
            onChange={handleVcsChange}
            placeholder="Enter password"
            className="w-[282px] border-foreground"
          />
        </div>

        {/* 7. Viewable Name */}
        <div>
          <label className="block font-normal mb-3">
            7. (Optional) Enter a viewable name for this
            file (directory):
          </label>

          <Input
            type="text"
            name="vcsName"
            value={vcsData.vcsName}
            onChange={handleVcsChange}
            placeholder="Enter viewable name"
            className="w-[282px] border-foreground"
          />

          <p className="text-sm text-gray-600 mt-2">
            Note: If no name is provided, the uploaded
            file (directory) name will be used.
          </p>
        </div>

        {/* 8. Description */}
        <div>
          <label className="block font-normal mb-1">
            8. Description
          </label>

          <p
            className={`text-sm mb-2 ${
              repoName
                ? "text-info-500"
                : "text-error-600"
            }`}
          >
            {repoName || "No repository chosen"}
          </p>

          <p
            className={`text-sm mb-1 ${
              repoName
                ? "text-foreground"
                : "text-gray-600"
            }`}
          >
            (Optional) Enter a description of this file:
          </p>

          <Textarea
            name="uploadDescription"
            value={uploadVcsData.uploadDescription}
            onChange={handleChange}
            placeholder="Type your description here"
            disabled={!repoName}
          />
        </div>

        {/* 9. Ignore SCM */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-base font-normal text-foreground pt-4">
            9.
          </span>

          <div className="flex-1">
            <CommonFields
              ignoreScm={uploadVcsData.ignoreScm}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 10. Access */}
        <div className="flex gap-2 mb-3">
          <span className="text-base font-normal text-foreground">
            10.
          </span>

          <div className="flex-1">
            <CommonFields
              accessLevel={uploadVcsData.accessLevel}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 11. Analysis */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">
            11.
          </span>

          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 12. Decider */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">
            12.
          </span>

          <div className="flex-1">
            <CommonFields
              decider={scanFileData.decider}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        {/* 13. Reuse */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground inline-flex items-center gap-1">
            13. (Optional) Reuse
            <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
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

            <CommonFields
              reuse={scanFileData.reuse}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />

            <div className="mt-6 flex justify-center gap-2">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="px-28 font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
                >
                  Cancel
                </Button>
              </SheetClose>

              <Button
                variant="default"
                className="px-28 bg-primary text-white rounded hover:bg-tertiary1-900"
              >
                Apply
              </Button>
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
            className="bg-primary text-white h-10 px-8 py-2 rounded text-base font-medium hover:bg-tertiary1-900 disabled:bg-tertiary1-400 disabled:text-white"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFromVcsPage;