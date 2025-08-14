/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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

// Widgets
import { Alert, Spinner } from "@/components/Widgets";
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
  let uploadId;

  const [uploadFileData, setUploadFileData] = useState(initialStateFile);
  const [folderList, setFolderList] = useState(initialFolderListFile);
  const [scanFileData, setScanFileData] = useState(initialScanFileDataFile);

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();
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

  const handleScanChange = (e) => {
    const { name } = e.target;
    if (Object.keys(scanFileData.analysis).includes(name)) {
      setScanFileData({
        ...scanFileData,
        analysis: {
          ...scanFileData.analysis,
          [name]: e.target.checked,
        },
      });
    } else if (Object.keys(scanFileData.decider).includes(name)) {
      setScanFileData({
        ...scanFileData,
        decider: {
          ...scanFileData.decider,
          [name]: e.target.checked,
        },
      });
    } else {
      setScanFileData({
        ...scanFileData,
        reuse: {
          ...scanFileData.reuse,
          [name]:
            e.target.type === "checkbox"
              ? e.target.checked
              : parseInt(e.target.value, 10) || e.target.value,
        },
      });
    }
  };

  useEffect(() => {
    getAllFolders().then((res) => {
      setFolderList(res);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-40 my-6 px-4">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}

      {/* Top Info Alert */}
      <div className="flex items-start gap-3 p-4 mb-6 text-sm text-blue-900 bg-blue-50 rounded-md border border-blue-200">
        <svg
          className="w-5 h-5 mt-0.5 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9h2v6H9V9zm0-4h2v2H9V5z" />
        </svg>
        <p>
          To manage your own group permissions go into{" "}
          <strong>Admin &gt; Groups &gt; Manage Group Users</strong>. To manage
          permissions for this one upload, go to{" "}
          <strong>Admin &gt; Upload Permissions</strong>.
        </p>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Upload a New File
      </h1>
      <p className="text-gray-700 mb-2">
        This option permits uploading a single file (which may be iso, tar, rpm,
        jar, zip, bz2, msi, cab, etc.) from your computer to FOSSology. Your
        FOSSology server has imposed a maximum upload file size of{" "}
        <strong>700Mbytes</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Folder Select */}
        <div>
          <label className="block font-medium mb-1">
            1. Select the folder for storing the uploaded files:
          </label>
          <Select
            onValueChange={(value) =>
              setUploadFileData({ ...uploadFileData, folderId: value })
            }
            value={uploadFileData.folderId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a folder" />
            </SelectTrigger>
            <SelectContent>
              {folderList.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 2. File Upload */}
        <div>
          <label className="block font-medium mb-1">
            2. Select the file(s) to upload:
          </label>
          <Input type="file" name="fileInput" onChange={handleChange} />
        </div>

        {/* 3. Description */}
        <div>
          <label className="block font-medium mb-1">3. Description(s)</label>
          <Textarea
            name="uploadDescription"
            rows={3}
            value={uploadFileData.uploadDescription}
            onChange={handleChange}
            placeholder="Enter a description of this file (Optional)"
          />
        </div>

        {/* Scancode Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="scancode">
            <AccordionTrigger className="text-blue-600">
              Scancode
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-3 space-y-2 pl-4">
                {["License", "Copyright", "Email", "URL"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={item.toLowerCase()}
                      onChange={handleScanChange}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Upload Button */}
        <Button
          type="submit"
          disabled={!fileSelected || loading}
          className="mt-4"
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Upload"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UploadFileClient;
