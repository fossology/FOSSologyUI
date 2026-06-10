/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
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

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Widgets
import { Button } from "@/components/ui/button";
import { InputContainer } from "@/components/Widgets";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  AlertBanner,
} from "@/components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Constants
import {
  initialMessage,
  initialStateImportReport,
} from "@/constants/constants";

// Services
import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId } from "@/services/organizeUploads";
import { importReport } from "@/services/jobs";

const ImportReportPage = () => {
  const [folderlist, setFolderlist] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [importReportData, setImportReportData] = useState(
    initialStateImportReport
  );

  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const fileInputRef = useRef(null);

  // Fetch all folders
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folders = await getAllFolders();

        const temp = folders.map((f) => ({
          id: f.id,
          name: f.name,
          disabled: false,
        }));

        setFolderlist(temp);

        const folderQuery = searchParams.get("folder");

        const defaultFolder = folderQuery
          ? temp.find((f) => String(f.id) === folderQuery)?.id
          : "";

        setImportReportData((prev) => ({
          ...prev,
          folder: defaultFolder || "",
        }));
      } catch (error) {
        setMessage({
          type: "danger",
          text: error.message,
        });

        setShowMessage(true);
      }
    };

    fetchFolders();
  }, [searchParams]);

  // Fetch uploads based on folder
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const uploads = await getUploadsFolderId(
          importReportData.folder
        );

        const temp = uploads.map((u) => ({
          id: u.id,
          name: `${u.name || u.uploadName || "Upload"} (#${u.id})`,
          disabled: false,
        }));

        setUploadList(temp);

        const uploadQuery = searchParams.get("upload");

        const defaultUpload = uploadQuery
          ? temp.find((u) => String(u.id) === uploadQuery)?.id
          : "";

        setImportReportData((prev) => ({
          ...prev,
          upload: defaultUpload || "",
        }));
      } catch (error) {
        setMessage({
          type: "danger",
          text: error.message,
        });

        setShowMessage(true);
      }
    };

    if (importReportData.folder) {
      fetchUploads();
    }
  }, [importReportData.folder, searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (!name) return;

    setImportReportData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!importReportData.report || !importReportData.upload) {
    setMessage({
      type: "danger",
      text: "Select upload and report",
    });
    setShowMessage(true);
    return;
  }

  try {
    const formData = new FormData();

    formData.append("report", importReportData.report);

    formData.append("addNewLicensesAs", importReportData.addNewLicensesAs);

    formData.append(
      "addLicenseInfoFromInfoInFile",
      importReportData.addLicenseInfoFromInfoInFile
    );

    formData.append(
      "addLicenseInfoFromConcluded",
      importReportData.addLicenseInfoFromConcluded
    );

    formData.append(
      "addConcludedAsDecisions",
      importReportData.addConcludedAsDecisions
    );

    formData.append(
      "addConcludedAsDecisionsTBD",
      importReportData.addConcludedAsDecisionsTBD
    );

    formData.append(
      "addCopyrights",
      importReportData.addCopyrights
    );

    const res = await importReport(
      importReportData.upload,
      "spdxrdf",
      formData
    );

    setMessage({ type: "success", text: res.message });
    setShowMessage(true);

    setTimeout(() => router.push("/jobs/myRecentJobs"), 2000);
  } catch (error) {
    console.error(error);
    setMessage({ type: "danger", text: error.message });
    setShowMessage(true);
  }
};

  const isButtonDisabled = !importReportData.report;
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
            description={message.text}
            showClose
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Report Import
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Folder Selection */}
        <div>
          <label className="block font-normal mb-3">
            1. Select the folder that contains the upload:
          </label>

          <Select
            value={
              importReportData.folder
                ? importReportData.folder.toString()
                : ""
            }
            onValueChange={(value) =>
              setImportReportData((prev) => ({
                ...prev,
                folder: value,
              }))
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Folder" />
            </SelectTrigger>

            <SelectContent>
              {folderlist.map((folder) => (
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

        {/* 2. Upload Selection */}
        <div>
          <label className="block font-normal mb-3">
            2. Select the upload you wish to edit:
          </label>

          <Select
            value={
              importReportData.upload
                ? importReportData.upload.toString()
                : ""
            }
            onValueChange={(value) =>
              setImportReportData((prev) => ({
                ...prev,
                upload: value,
              }))
            }
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Upload" />
            </SelectTrigger>

            <SelectContent>
              {uploadList.map((upload) => (
                <SelectItem
                  key={upload.id}
                  value={upload.id.toString()}
                >
                  {upload.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 3. Report Upload */}
        <div>
          <label className="block font-normal mb-3">
            3. Select report to upload:
          </label>

          <div className="flex items-end gap-3">
            <input
              ref={fileInputRef}
              type="file"
              name="report"
              className="hidden"
              onChange={handleChange}
            />

            <Button
              type="button"
              variant="outline"
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </Button>

            <span
              className={`self-end text-sm ${
                importReportData.report
                  ? "text-info-500"
                  : "text-error-600"
              }`}
            >
              {importReportData.report
                ? importReportData.report.name
                : "No file chosen"}
            </span>
          </div>
        </div>

        {/* 4. Import Settings */}
        <div>
          <h2 className="font-semibold text-foreground mb-4">
            4. Select how the information should be imported
          </h2>

          <div className="space-y-5">
            {/* Create licenses */}
            <div>
              <p className="font-medium mb-3">Create new licenses as</p>

              <RadioGroup
                value={importReportData.addNewLicensesAs}
                onValueChange={(value) =>
                  setImportReportData((prev) => ({
                    ...prev,
                    addNewLicensesAs: value,
                  }))
                }
                className="space-y-2 ml-2"
              >
                <InputContainer
                  type="radio"
                  value="candidate"
                  name="addNewLicensesAs"
                  id="import-report-license-candidate"
                >
                  License candidate
                </InputContainer>

                <InputContainer
                  type="radio"
                  value="license"
                  name="addNewLicensesAs"
                  id="import-report-new-license"
                >
                  New License
                </InputContainer>
              </RadioGroup>
            </div>

            {/* Match license using */}
            <div>
              <p className="font-medium mb-3">Match license using</p>

              <RadioGroup
                value={importReportData.matchLicenseUsing}
                onValueChange={(value) =>
                  setImportReportData((prev) => ({
                    ...prev,
                    matchLicenseUsing: value,
                  }))
                }
                className="space-y-2 ml-2"
              >
                <InputContainer
                  type="radio"
                  value="shortname"
                  name="matchLicenseUsing"
                  id="match-license-shortname"
                >
                  Shortname
                </InputContainer>

                <InputContainer
                  type="radio"
                  value="spdxid"
                  name="matchLicenseUsing"
                  id="match-license-spdxid"
                >
                  SPDX ID
                </InputContainer>
              </RadioGroup>
            </div>

            {/* License findings */}
            <div className="space-y-2">
              <p className="font-medium inline-flex items-center gap-1">
                Add the License Info as findings from
              </p>

              <InputContainer
                type="checkbox"
                name="addLicenseInfoFromInfoInFile"
                id="upload-report-license-info-file"
                checked={importReportData.addLicenseInfoFromInfoInFile}
                onChange={(checked) =>
                  setImportReportData((prev) => ({
                    ...prev,
                    addLicenseInfoFromInfoInFile: checked,
                  }))
                }
              >
                SPDX tag of type licenseInfoInFile
              </InputContainer>

              <InputContainer
                type="checkbox"
                name="addLicenseInfoFromConcluded"
                id="upload-report-license-concluded"
                checked={importReportData.addLicenseInfoFromConcluded}
                onChange={(checked) =>
                  setImportReportData((prev) => ({
                    ...prev,
                    addLicenseInfoFromConcluded: checked,
                  }))
                }
              >
                SPDX tag of type licenseConcluded
              </InputContainer>
            </div>

            {/* Decisions */}
            <div className="space-y-2">
              <InputContainer
                type="checkbox"
                name="addConcludedAsDecisions"
                id="upload-report-license-decisions"
                checked={importReportData.addConcludedAsDecisions}
                onChange={(checked) =>
                  setImportReportData((prev) => ({
                    ...prev,
                    addConcludedAsDecisions: checked,
                  }))
                }
              >
                <p className="font-medium">
                  Add concluded licenses as decisions
                </p>
              </InputContainer>

              <div className="ml-6 space-y-2">
                <InputContainer
                  type="checkbox"
                  name="addConcludedAsDecisionsOverwrite"
                  id="upload-report-existing-decisions"
                  checked={importReportData.addConcludedAsDecisionsOverwrite}
                  disabled
                  onChange={(checked) =>
                    setImportReportData((prev) => ({
                      ...prev,
                      addConcludedAsDecisionsOverwrite: checked,
                    }))
                  }
                >
                  Also overwrite existing decisions
                </InputContainer>

                <InputContainer
                  type="checkbox"
                  name="addConcludedAsDecisionsTBD"
                  id="upload-report-import-discussed"
                  checked={importReportData.addConcludedAsDecisionsTBD}
                  onChange={(checked) =>
                    setImportReportData((prev) => ({
                      ...prev,
                      addConcludedAsDecisionsTBD: checked,
                    }))
                  }
                >
                  Import as "to be discussed"
                </InputContainer>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <InputContainer
                type="checkbox"
                name="addCopyrights"
                id="upload-report-existing-copyright"
                checked={importReportData.addCopyrights}
                onChange={(checked) =>
                  setImportReportData((prev) => ({
                    ...prev,
                    addCopyrights: checked,
                  }))
                }
              >
                Add the copyright information as textfindings
              </InputContainer>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            variant="default" size="default"
          >
            Upload and Import
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImportReportPage;
