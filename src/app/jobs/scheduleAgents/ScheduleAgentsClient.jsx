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

import React, { useState, useEffect } from "react";
import messages from "@/constants/messages";
import CommonFields from "@/components/Upload/CommonFields";
import { getAllFolders } from "@/services/folders";
import { scheduleAnalysis } from "@/services/jobs";
import getBrowseData from "@/services/browse";
import { defaultAgentsList, getLocalStorage } from "@/shared/storageHelper";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ScheduleAgentsPage = () => {
  const initialScheduleAnalysisData = {
    folderId: "",
    uploadId: "",
  };

  const initialScanFileData = {
    analysis: defaultAgentsList(),
    decider: {
      nomosMonk: false,
      bulkReused: false,
      newScanner: false,
      ojoDecider: false,
      autoConclude: false,
      autoConcludeType: "permissive",
      copyrightDeactivation: false,
      copyrightClutterRemoval: false,
    },
    reuse: {
      reuseUpload: [],
      reuseGroup: "",
      reuseMain: false,
      reuseEnhanced: false,
      reuseReport: false,
      reuseCopyright: false,
      reuseChecked: false,
    },
    scancode: {
      license: false,
      copyright: false,
      email: false,
      url: false,
    }
  };

  const initialFolderList = [
    {
      id: 1,
      name: "Software Repository",
      description: "Top Folder",
      parent: null,
    },
  ];

  const initialBrowseData = {
    page: 1,
    limit: 100,
    recursive: false,
  };

  const [scheduleAnalysisData, setScheduleAnalysisData] = useState(initialScheduleAnalysisData);
  const [uploadList, setUploadList] = useState([]);
  const [folderList, setFolderList] = useState(initialFolderList);
  const [scanFileData, setScanFileData] = useState(initialScanFileData);

  useEffect(() => {
    const defaultGroup = getLocalStorage("user")?.defaultGroup;
    if (defaultGroup) {
      setScanFileData((prev) => ({
        ...prev,
        reuse: { ...prev.reuse, reuseGroup: defaultGroup },
      }));
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await scheduleAnalysis(
        scheduleAnalysisData.folderId,
        scheduleAnalysisData.uploadId,
        scanFileData
      );
      setMessage({ type: "success", text: messages.jobsAdded });
      setScheduleAnalysisData(initialScheduleAnalysisData);
      setScanFileData(initialScanFileData);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleChange = (e) => {
    setScheduleAnalysisData({
      ...scheduleAnalysisData,
      [e.target.name]: e.target.value,
    });
  };


  const handleScanChange = (checked, name, type, value) => {
    // const { name, type, checked, value } = e.target;
    if (name in scanFileData.analysis) {
      setScanFileData((prev) => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          [name]: checked,
        },
      }));
    } else if (name in scanFileData.decider) {
      setScanFileData((prev) => ({
        ...prev,
        decider: {
          ...prev.decider,
          [name]: checked,
        },
      }));
    } else if (name in scanFileData.scancode) {
      setScanFileData((prev) => ({
        ...prev,
        scancode: {
          ...prev.scancode,
          [name]: checked,
        },
      }));
    } else {
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
                : current.filter((item) => item.id !== value.id),
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

  useEffect(() => {
    getAllFolders().then(setFolderList);
  }, []);

  useEffect(() => {
    if (scheduleAnalysisData.folderId) {
      getBrowseData({
        ...initialBrowseData,
        folderId: scheduleAnalysisData.folderId,
      }).then((res) => {
        setUploadList(res.res);
      });
    }
  }, [scheduleAnalysisData.folderId]);

  const isButtonDisabled =
    !scheduleAnalysisData.folderId || !scheduleAnalysisData.uploadId;
  const alertType = message?.type === "success" ? "Success" : "Error";

  return (
    <div className="max-w-5xl mx-40 px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Schedule an Analysis</h1>
      <p className="text-lg font-semibold text-foreground mb-4">
        Select an uploaded file for additional analysis.
      </p>
      {showMessage && message && (
      <div className="mb-4">
        <AlertBanner
          type={alertType}
          title={message?.type === "success" ? "Success" : "Error"}
          description={message?.text}
          showClose
          onClose={() => setShowMessage(false)}
        />
      </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Folder selection */}
        <div>
          <Label
            htmlFor="folderId"
            className="block mb-3"
          >
            1. Select the folder containing the upload you wish to analyze:
          </Label>
          <Select
            name="folderId"
            value={scheduleAnalysisData.folderId.toString()}
            onValueChange={(value) =>
              setScheduleAnalysisData((prev) => ({
                ...prev,
                folderId: value ? parseInt(value) : "",
              }))
            }
          >
            <SelectTrigger className="w-[282px]">
              <SelectValue placeholder="Select folder" />
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

        {/* Upload selection */}
        <div>
          <Label
            htmlFor="uploadId"
            className="block mb-3"
          >
            2. Select the upload to analyze:
          </Label>
          <Select
            name="uploadId"
            value={scheduleAnalysisData.uploadId?.toString() || ""}
            onValueChange={(value) =>
              setScheduleAnalysisData((prev) => ({
                ...prev,
                uploadId: value ? parseInt(value) : "",
              }))
            }
          >
            <SelectTrigger className="w-[282px]">
              <SelectValue placeholder="Select Upload" />
            </SelectTrigger>
            <SelectContent>
              {uploadList && uploadList.length > 0 ? (
                uploadList.map((upload) => (
                  <SelectItem key={upload.id} value={upload.id.toString()}>
                    {upload.uploadname}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">{messages.noUploads}</div>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
        <span className="text-base font-medium text-foreground mb-3">3.</span>
          <div className="flex-1">
            <CommonFields
              analysis={scanFileData.analysis}
              handleScanChange={handleScanChange}
            />
          </div>
        </div>

        <p className="text-lg font-semibold text-foreground mb-4 mt-4">
        Reuser:
        </p>

        <CommonFields
          reuse={scanFileData.reuse}
          handleScanChange={handleScanChange}
        />    

        <div>
          <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="search-criteria">
            <AccordionTrigger className="flex w-full items-center justify-between text-lg font-semibold mb-2 transition-all">
                Advanced Options
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pb-2">
                <p className="text-lg font-semibold text-foreground mb-4">
                Decider:
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                <span className="text-base font-medium text-foreground mb-3">1.</span>
                  <div className="flex-1">
                <CommonFields
                  decider={scanFileData.decider}
                  handleScanChange={handleScanChange}
                />
                </div>
                </div> 
            </AccordionContent>
            <AccordionContent className="space-y-4 pb-2">
                <p className="text-lg font-semibold text-foreground mb-4">
                Scancode:
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                <span className="text-base font-medium text-foreground mb-3">2.</span>
                  <div className="flex-1">
                <CommonFields
                  scancode={scanFileData.scancode}
                  handleScanChange={handleScanChange}
                />
                </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="border-t border-gray-300 my-4"></div>
        </div>
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || isButtonDisabled}
            variant="default" size="default"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAgentsPage;
