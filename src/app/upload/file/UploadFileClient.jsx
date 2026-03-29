/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
  // Upload Id required for scheduling Analysis
  let uploadId;

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
        uploadId = res.message;
      })
      .then(() => {
        setTimeout(() => {
          scheduleAnalysis(uploadFileData.folderId, uploadId, scanFileData)
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
            .catch((error) => handleError(error, setMessage));
        }, 1200);
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
      setUploadFileData({
        ...uploadFileData,
        [e.target.name]: e.target.files[0],
      });
      setFileSelected(!!e.target.files.length);
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
      setScanFileData({
        ...scanFileData,
        reuse: {
          ...scanFileData.reuse,
          [name]:
            type === "checkbox"
              ? checked
              : parseInt(value, 10) || value,
        },
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
        setFileName(e.target.files[0].name);
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
          className="relative flex items-start gap-2 rounded border-0 bg-[#E1F5FE] px-4 py-2 text-sm text-[#00669D] pr-10 "
        >
        {/* Close Button */}
        <button
          onClick={() => setShowMessage(false)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-black/10"
        >
          <img
            src="/assets/icons/Close/Close_24px.svg"
            alt="Close"
            width={24}
            height={24}
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
          <AlertDescription className="text-sm text-[#00669D]">
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

          <div className="flex items-center gap-3">
            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              name="fileInput"
              className="hidden"
              onChange={onFileChange}
            />

            {/* ShadCN styled button */}
            <Button
              type="button"
              variant="outline"
              className="font-medium text-[#004494] rounded border-[#004494] hover:bg-[#DEE7F2] hover:text-[#000B54]"
              onClick={triggerFileInput}
            >
              Choose Files
            </Button>

            {/* File name / default text */}
            <span
              className={`text-sm ${
                fileName ? "text-gray-800" : "text-red-600"
              }`}
            >
              {fileName || "No file chosen"}
            </span>
          </div>
        </div>

        {/* 3. Description */}
        <div>
          {/* Main label */}
          <label className="block font-normal mb-1">3. Description(s)</label>

          {/* File name or No file chosen */}
          <p
            className={`text-sm mb-2 ${
              fileSelected ? "text-gray-800" : "text-red-600"
            }`}
          >
            {fileSelected && uploadFileData.fileInput
              ? uploadFileData.fileInput.name
              : "No file chosen"}
          </p>

          {/* Sub-label */}
          <p
            className={`text-sm mb-1 ${
              fileSelected ? "text-[#101010]" : "text-gray-600"
            }`}
          >
            Enter a description of this file (Optional):
          </p>

          {/* Textarea */}
          <Textarea
            name="uploadDescription"
            rows={3}
            value={uploadFileData.uploadDescription}
            onChange={handleChange}
            placeholder="Type your description here"
            className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 
              ${fileSelected ? "border border-[#101010]" : "border border-gray-300"}`}
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-normal text-[#101010]">4.</span>
          <CommonFields
            ignoreScm={uploadFileData.ignoreScm}
            handleChange={handleChange}
            handleScanChange={handleScanChange}
          />
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-normal text-[#101010]">5.</span>
          <div className="flex-1">
            <CommonFields
              accessLevel={uploadFileData.accessLevel}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
        <span className="text-base font-medium text-[#101010] mb-3">6.</span>
          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-[#101010]">7.</span>
          <div className="flex-1">
            <CommonFields
              decider={scanFileData.decider}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-[#101010] inline-flex items-center gap-1">
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
          className="font-medium text-[#004494] rounded border-[#004494] hover:bg-[#DEE7F2] hover:text-[#000B54]"
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
          <TabsList className="flex bg-[#EEEFFF] rounded-t h-10">
            <TabsTrigger
              value="file1"
              className="flex-1 text-sm font-medium py-2 px-4
                        data-[state=active]:bg-[#513DA8]
                        data-[state=active]:text-white
                        data-[state=inactive]:text-[#101010]
                        rounded
                        transition-colors"
            >
              File Name
            </TabsTrigger>
            <TabsTrigger
              value="file2"
              className="flex-1 text-sm font-medium py-2 px-4
                        data-[state=active]:bg-[#513DA8]
                        data-[state=active]:text-white
                        data-[state=inactive]:text-[#101010]
                        rounded
                        transition-colors"
            >
              File Name
            </TabsTrigger>
            <TabsTrigger
              value="file3"
              className="flex-1 text-sm font-medium py-2 px-4
                        data-[state=active]:bg-[#513DA8]
                        data-[state=active]:text-white
                        data-[state=inactive]:text-[#101010]
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
            className="px-28 font-medium text-[#004494] rounded border-[#004494] hover:bg-[#DEE7F2] hover:text-[#000B54]">Cancel</Button>
          </SheetClose>
          <Button variant="default" 
          className="px-28 bg-[#004494] text-white rounded hover:bg-[#00095C]">
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
            className="bg-[#004494] text-white h-10 px-8 py-2 rounded text-base font-medium hover:bg-[#00095C] disabled:bg-[#9EB9D3] disabled:text-white"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFileClient;
