/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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

import React, { useRef, useState, useEffect } from "react";
import messages from "@/constants/messages";

// Common Fields for all the Uploads
import CommonFields from "@/components/Upload/CommonFields";

// Widgets
import { Button } from "@/components/ui/button";
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
  AlertBanner,
} from '@/components/ui/alert';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import {Tooltip} from "@/components/Widgets";

// Required functions for calling APIs
import { createUploadFile } from "@/services/upload";
import { getUploadById } from "@/services/upload";
import { scheduleAnalysis } from "@/services/jobs";
import { getAllFolders } from "@/services/folders";

// Helper function for error handling
import { handleError } from "@/shared/helper";

// constants
import {
  initialStateFile,
  initialScanFileDataFile,
  initialFolderListFile,
} from "@/constants/constants";

const defaultReuseConfig =
  structuredClone(initialScanFileDataFile.reuse);

const UploadFileClient = () => {
  // Data required for creating the upload
  const [uploadFileData, setUploadFileData] = useState(initialStateFile);

  // Setting the list for all the folders names
  const [folderList, setFolderList] = useState(initialFolderListFile);

  // Setting the data for scheduling analysis of an uploads
  const [scanFileData, setScanFileData] = useState(initialScanFileDataFile);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [message, setMessage] = useState({
    type: "info",
    text: "To manage your own group permissions go into Admin > Groups > Manage Group Users. To manage permissions for this one upload, go to Admin > Upload Permissions."
  });
  const [fileSelected, setFileSelected] = useState(false);
  const [descriptions, setDescriptions] = useState({});

  const [reuseConfigs, setReuseConfigs] = useState({});
  const [tempReuseConfigs, setTempReuseConfigs] = useState({});
  const [reuseSheetOpen, setReuseSheetOpen] = useState(false);

  const [activeFileTab, setActiveFileTab] = useState("");

  const handleReuseSheetOpenChange = (open) => {
    setReuseSheetOpen(open);

    if (open) {
      setTempReuseConfigs(
        structuredClone(reuseConfigs)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileSelected) return;

    setLoading(true);

    const files = uploadFileData.fileInput || [];

    const uploadChain = files.reduce(
      (chain, file, index) =>
        chain.then(() => {

          const fileKey = `${file.name}-${index}`;

          const scanDataForFile = {
            ...scanFileData,
            reuse:
              reuseConfigs[fileKey] ||
              structuredClone(defaultReuseConfig),
          };
          // Ensure reuse.reuseUpload is an array of numeric ids
          if (
            scanDataForFile.reuse &&
            Array.isArray(scanDataForFile.reuse.reuseUpload)
          ) {
            scanDataForFile.reuse.reuseUpload = scanDataForFile.reuse.reuseUpload.map(
              (it) => (it && typeof it === "object" ? Number(it.id) : Number(it))
            );
          }

          // Validate reuse selection: if a reuse upload was chosen, ensure it actually belongs to the target folder
          const reuseForFile = scanDataForFile.reuse || {};
          if (reuseForFile.reuseUpload) {
            // reuseUpload may be array of objects, array of numbers, or a single number
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

            if (candidateId) {
              return getUploadById(candidateId)
                .then((uploadRes) => {
                  // Try common folder keys on the returned object
                  const folderKeys = ["folderId", "folder", "folder_id", "parent"];
                  let uploadFolder = null;
                  for (const k of folderKeys) {
                    if (Object.prototype.hasOwnProperty.call(uploadRes, k)) {
                      uploadFolder = uploadRes[k];
                      break;
                    }
                  }

                  // If upload folder is known, compare to target folder
                  if (uploadFolder != null) {
                    if (Number(uploadFolder) !== Number(uploadFileData.folderId)) {
                      return Promise.reject(
                        new Error(
                          `Selected reuse upload (id ${candidateId}) is in folder ${uploadFolder}; change target folder to match or choose a reuse upload from target folder.`
                        )
                      );
                    }
                  }

                  // Proceed to create upload and then schedule analysis (mirror normal path)
                  return createUploadFile({
                    ...uploadFileData,
                    fileInput: file,
                    uploadDescription: descriptions[index] || "",
                    uploadType: "file",
                  })
                    .then((res) => {
                      const uploadId = Number(res.id || res.uploadId || res.message);
                      if (!Number.isInteger(uploadId)) {
                        throw new Error("Invalid uploadId returned from API");
                      }
                      return uploadId;
                    })
                    .then(
                      (uploadId) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            scheduleAnalysis(
                              Number(uploadFileData.folderId),
                              Number(uploadId),
                              scanDataForFile
                            )
                              .then(resolve)
                              .catch(reject);
                          }, 1200);
                        })
                    );
                })
                .catch((err) => {
                  // Propagate error to outer chain
                  return Promise.reject(err);
                });
            }
          }

          return createUploadFile({
            ...uploadFileData,
            fileInput: file,
            uploadDescription: descriptions[index] || "",
            uploadType: "file",
          })
            .then((res) => Number(res.message))
            .then(
              (uploadId) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    scheduleAnalysis(
                      Number(uploadFileData.folderId),
                      Number(uploadId),
                      scanDataForFile
                    )
                      .then(resolve)
                      .catch(reject);
                  }, 1200);
                })
            );
        }),
      Promise.resolve()
    );

    uploadChain
      .then(() => {
        window.scrollTo({ top: 0 });
        setMessage({
          type: "success",
          text: messages.scheduledAnalysis,
        });
        setUploadFileData(initialStateFile);
        setScanFileData(initialScanFileDataFile);
        setFileSelected(false);
        setDescriptions({});
        setReuseConfigs({});
        setActiveFileTab("");
        setTempReuseConfigs({});
        setReuseSheetOpen(false);
      })
      .catch((error) => handleError(error, setMessage))
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setUploadFileData({
        ...uploadFileData,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      const newFiles = Array.from(e.target.files);

      setUploadFileData((prev) => ({
        ...prev,
        [e.target.name]: [
          ...(prev[e.target.name] || []),
          ...newFiles,
        ],
      }));

      if (newFiles.length > 0) {
        setFileSelected(true);
      }
    } else {
      setUploadFileData({
        ...uploadFileData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleScanChange = (checked, name, type, value) => {
    if (Object.keys(scanFileData.analysis).includes(name)) {
      setScanFileData({
        ...scanFileData,
        analysis: {
          ...scanFileData.analysis,
          [name]: checked,
        },
      });
    } else if (Object.keys(scanFileData.decider).includes(name)) {
      setScanFileData({
        ...scanFileData,
        decider: {
          ...scanFileData.decider,
          [name]: checked,
        },
      });
    }  else if (Object.keys(scanFileData.scancode).includes(name)) {
      setScanFileData({
        ...scanFileData,
        scancode: {
          ...scanFileData.scancode,
          [name]: checked,
        },
      });
    }  else {
      setScanFileData((prev) => {
        if (name === "reuseUpload" && type === "checkbox") {
          const current = Array.isArray(prev.reuse.reuseUpload)
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
                : current.filter((item) => item.id !== value?.id),
            },
          };
        }

        return {
          ...prev,
          reuse: {
            ...prev.reuse,
            [name]: type === "checkbox" ? checked : value,
          },
        };
      });
    }
  };

  const handleFileReuseChange = (
    fileKey,
    checked,
    name,
    type,
    value
  ) => {
    setTempReuseConfigs((prev) => {
      const current =
        prev[fileKey] || structuredClone(defaultReuseConfig);

      const updated = {
        ...current,
      };

      if (name === "reuseUpload" && type === "checkbox") {
        const uploads = current.reuseUpload || [];

        const exists = uploads.find(
          (item) => item.id === value?.id
        );

        updated.reuseUpload = checked
          ? exists
            ? uploads
            : [...uploads, value]
          : uploads.filter(
              (item) => item.id !== value?.id
            );
      } else {
        updated[name] =
          type === "checkbox"
            ? checked
            : value;
      }

      return {
        ...prev,
        [fileKey]: updated,
      };
    });
  };


    const fileInputRef = useRef(null);

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

const onFileChange = (e) => {
  handleChange(e);

  const files = Array.from(e.target.files);

    if (files.length > 0) {
      setFileSelected(true);

      setReuseConfigs((prev) => {
        const next = { ...prev };

        files.forEach((file, index) => {
          const key = `${file.name}-${Date.now()}-${index}`;

          if (!next[key]) {
            next[key] = structuredClone(defaultReuseConfig);
          }
        });

        return next;
      });

      if (!activeFileTab) {
        setActiveFileTab(`${files[0].name}-0`);
      }
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

  const isButtonDisabled = !fileSelected;
  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="max-w-4xl mx-40 my-6 px-4">
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

      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Upload a New File
      </h1>
      <p className="text-base font-semibold mb-6">
        This option permits uploading a single file (which may be iso, tar, rpm,
        jar, zip, bz2, msi, cab, etc.) from your computer to FOSSology. Your
        FOSSology server has imposed a maximum upload file size of 700Mbytes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Folder Select */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder for storing the uploaded files:
          </label>
          <Select
            onValueChange={(value) =>
              setUploadFileData({ ...uploadFileData, folderId: Number(value) })
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

        {/* 2. File Upload */}
        <div>
          <label className="block font-normal mb-3">
            2. Select the file(s) to upload:
          </label>

          <div className="flex items-end gap-3">
            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              name="fileInput"
              multiple
              className="hidden"
              onChange={onFileChange}
            />

            {/* ShadCN styled button */}
            <Button
              type="button"
              variant="outline"
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              onClick={triggerFileInput}
            >
              Choose Files
            </Button>

            {/* File names */}
            {uploadFileData.fileInput?.length > 0 ? (
              <div className="flex items-end gap-2">
                {uploadFileData.fileInput.map((file, index) => (
                  <span key={index} className="text-sm text-info-500">
                    {file.name}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm text-error-600">
                No file chosen
              </span>
            )}
          </div>
        </div>

        {/* 3. Description(s) */}
        <div>
          <label className="block font-normal mb-3">
            3. Description(s)
          </label>

          <div className="flex flex-wrap gap-6">
            {(fileSelected ? uploadFileData.fileInput : [null]).map((file, index) => (
              <div key={index}>
                <p className={`text-sm mb-2 ${file ? "text-info-500" : "text-error-600"}`}>
                  {file ? file.name : "No file chosen"}
                </p>
                <p className="text-sm mb-1 text-gray-600">
                  Enter a description for this file (Optional):
                </p>
                <Textarea
                  disabled={!file}
                  placeholder="Type your description here"
                  value={descriptions[index] || ""}
                  onChange={(e) =>
                    setDescriptions((prev) => ({ ...prev, [index]: e.target.value }))
                  }
                  className={!file ? "border-border text-neutral-600 cursor-not-allowed min-w-[320px] resize" : "min-w-[320px] resize"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Ignore SCM */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-normal text-foreground">
            4.
          </span>

          <div className="flex-1">
            <CommonFields
              ignoreScm={uploadFileData.ignoreScm}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <span className="text-base font-normal text-foreground">5.</span>
          <div className="flex-1">
            <CommonFields
              accessLevel={uploadFileData.accessLevel}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
        <span className="text-base font-medium text-foreground mb-3">6.</span>
          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground">7.</span>
          <div className="flex-1">
            <CommonFields
              decider={scanFileData.decider}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-foreground inline-flex items-center gap-1">
            8. (Optional) Reuse
            <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
          </span>
        </div>

        <Sheet
          open={reuseSheetOpen}
          onOpenChange={handleReuseSheetOpenChange}
        >
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isButtonDisabled}
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
            >
              Set the Reuse Information
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[600px] sm:max-w-[700px] p-6"
          >
            <SheetHeader className="p-6 pb-2">
              <SheetTitle className="font-semibold text-xl">
                Reuse Configuration
              </SheetTitle>
            </SheetHeader>

            {uploadFileData.fileInput?.length > 0 && (
              <Tabs
                value={activeFileTab}
                onValueChange={setActiveFileTab}
                className="w-full p-6"
              >
                <TabsList>
                  {uploadFileData.fileInput.map((file, index) => (
                    <TabsTrigger
                      key={`${file.name}-${index}`}
                      value={`${file.name}-${index}`}
                    >
                      {file.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {uploadFileData.fileInput.map((file, index) => (
                  <TabsContent
                    key={`${file.name}-${index}`}
                    value={`${file.name}-${index}`}
                    className="pt-6"
                  >
                    <CommonFields
                      reuse={
                        tempReuseConfigs[`${file.name}-${index}`] ||
                        defaultReuseConfig
                      }
                      handleChange={handleChange}
                      handleScanChange={(checked, name, type, value) =>
                        handleFileReuseChange(
                          `${file.name}-${index}`,
                          checked,
                          name,
                          type,
                          value
                        )
                      }
                    />
                  </TabsContent>
                ))}
              </Tabs>
            )}

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
                size="default"
                className="px-28"
                onClick={() => {
                  setReuseConfigs(
                    structuredClone(tempReuseConfigs)
                  );

                  setReuseSheetOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Scancode Accordion */}
        <Accordion type="single" collapsible="w-full">
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

export default UploadFileClient;