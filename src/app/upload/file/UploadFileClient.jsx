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
  Alert,
  AlertTitle,
  AlertDescription,
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
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import {Tooltip} from "@/components/Widgets";

// Required functions for calling APIs
import { createUploadFile } from "@/services/upload";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileSelected) return;

    setLoading(true);
    createUploadFile(uploadFileData)
      .then((res) => {
        window.scrollTo({ top: 0 });
        setMessage({ type: "success", text: messages.uploadSuccess });
        return res.message;
      })
      .then((uploadId) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            scheduleAnalysis(uploadFileData.folderId, uploadId, scanFileData)
              .then(resolve)
              .catch(reject);
          }, 1200);
        });
      })
      .then(() => {
        window.scrollTo({ top: 0 });
        setMessage({
          type: "success",
          text: messages.scheduledAnalysis,
        });
        setUploadFileData(initialStateFile);
        setScanFileData(initialScanFileDataFile);
        setFileSelected(false);
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

      setFileSelected(true);
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


    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    const onFileChange = (e) => {
      handleChange(e);
      if (e.target.files.length > 0) {
        setFileName(
          Array.from(e.target.files)
            .map((file) => file.name)
            .join(", ")
        );
      } else {
        setFileName("");
      }
    };


  useEffect(() => {
    getAllFolders().then((res) => {
      setFolderList(res);
    });
  }, []);

  const isButtonDisabled = !fileSelected;

  return (
    <div className="max-w-4xl mx-40 my-6 px-4">
      {showMessage && (
        <div className="mb-4">
        <Alert
          variant={message.type}
          message={message.text}
          className="relative flex items-start gap-2 rounded border-0 bg-info-100 px-4 py-2 text-sm text-info-500 pr-10 "
        >
        {/* Close Button */}
        <button
          onClick={() => setShowMessage(false)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-black/10"
          aria-label="Close"
        >
          <span
            className="block w-5 h-5 bg-info-500 [mask-image:url('/assets/icons/Close/Close_20px.svg')] [mask-size:contain] [mask-repeat:no-repeat]"
          />
        </button>
        {/* Icon */}
        <img
          src="/assets/icons/Alert/InfoFilled.svg"
          alt="Info"
          width={24}
          height={24}
          className="mt-1"
        />
        {/* Top Info Alert */}
        <div>
          <AlertDescription className="text-sm text-info-500">
            <span>To manage your own group permissions go into <strong>Admin &gt; Groups &gt; Manage Group Users</strong> To manage permissions for this one upload, go to <strong>Admin &gt; Upload Permissions</strong>.</span>
          </AlertDescription>
        </div>
      </Alert>
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
              setUploadFileData({ ...uploadFileData, folderId: value })
            }
          >
            <SelectTrigger className="w-[282px]">
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

          {!fileSelected ? (
            <>
              <p className="text-sm mb-2 text-error-600">
                No file chosen
              </p>

              <p className="text-sm mb-1 text-gray-600">
                Enter a description of this file (Optional):
              </p>

              <Textarea
                disabled
                placeholder="Type your description here"
                className={
                  !fileName
                    ? "border-border text-neutral-600 cursor-not-allowed resize"
                    : "resize"
                }
              />
            </>
          ) : (
            <div className="flex flex-wrap gap-6">
              {uploadFileData.fileInput.map((file, index) => (
                <div key={index}>
                  {/* File name */}
                  <p className="text-sm mb-2 text-info-500">
                    {file.name}
                  </p>

                  {/* Sub-label */}
                  <p className="text-sm mb-1 text-foreground">
                    Enter a description for this file (Optional):
                  </p>

                  {/* Textarea */}
                  <Textarea
                    name={`description-${index}`}
                    placeholder="Type your description here"
                    className="resize"
                  />
                </div>
              ))}
            </div>
          )}
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

    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
        >
          Set the Reuse Information
        </Button>
      </SheetTrigger>

      {/* Right-side Overlay */}
      <SheetContent side="right" className="w-[600px] sm:max-w-[700px] p-6">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="font-semibold text-xl">
            Reuse Configuration
          </SheetTitle>
        </SheetHeader>

        {/* Tabs */}
        <Tabs defaultValue="file1" className="w-full p-6">
          <TabsList className="flex bg-tertiary2-200 rounded-t h-10">
            <TabsTrigger
              value="file1"
              className="flex-1 text-sm font-medium py-2 px-4
                        data-[state=active]:bg-tertiary2-900
                        data-[state=active]:text-white
                        data-[state=inactive]:text-foreground
                        rounded
                        transition-colors"
            >
              File Name
            </TabsTrigger>
            <TabsTrigger
              value="file2"
              className="flex-1 text-sm font-medium py-2 px-4
                        data-[state=active]:bg-tertiary2-900
                        data-[state=active]:text-white
                        data-[state=inactive]:text-foreground
                        rounded
                        transition-colors"
            >
              File Name
            </TabsTrigger>
            <TabsTrigger
              value="file3"
              className="flex-1 text-sm font-medium py-2 px-4
                        data-[state=active]:bg-tertiary2-900
                        data-[state=active]:text-white
                        data-[state=inactive]:text-foreground
                        rounded
                        transition-colors"
            >
              File Name
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 Content */}
          <TabsContent value="file1" className="space-y-6 pt-6">
            {/* Section 1 */}
            <div>
                <CommonFields
                  reuse={scanFileData.reuse}
                  handleChange={handleChange}
                  handleScanChange={handleScanChange}
                />
            </div>
          </TabsContent>

          {/* Tab 2 Content */}
          <TabsContent value="file2" className="p-6">
            {/* You can reuse the same structure or customize */}
            <p className="text-sm text-gray-600">Content for File 2</p>
          </TabsContent>

          {/* Tab 3 Content */}
          <TabsContent value="file3" className="p-6">
            <p className="text-sm text-gray-600">Content for File 3</p>
          </TabsContent>
        </Tabs>

        {/* Footer buttons */}
        <div className="mt-6 flex justify-center gap-2">
          <SheetClose asChild>
            <Button variant="outline"
            className="px-28 font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground">Cancel</Button>
          </SheetClose>
          <Button variant="default" 
          className="px-28 bg-primary text-white rounded hover:bg-tertiary1-900">
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
            className="bg-primary text-white h-10 px-8 py-2 rounded text-base font-medium hover:bg-tertiary1-900 disabled:bg-tertiary1-400 disabled:text-white"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFileClient;
