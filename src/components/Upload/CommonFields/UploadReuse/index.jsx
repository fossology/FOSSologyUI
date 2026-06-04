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
import PropTypes from "prop-types";

// Widgets
import { InputContainer, Tooltip } from "@/components/Widgets";
import Chip from "@/components/ui/chip";
import { Input } from "@/components/ui/input";

// Required services for calling APIs
import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId } from "@/services/organizeUploads";

import messages from "@/constants/messages";

const UploadReuse = ({ reuse, handleScanChange }) => {
  const [reuseData, setReuseData] = useState({
    combinedOptions: [],
    uploadList: [],
    reuseFolder: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUploads = reuseData.uploadList.filter((item) =>
    item.uploadname?.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // Load folders for the current group and build combined "Folder (group:id)" options
  useEffect(() => {
    if (!reuse.reuseGroup) return;
    getAllFolders(reuse.reuseGroup)
      .then((folders) => {
        const opts = (folders || []).map((f) => ({
          id: `${f.id}|${reuse.reuseGroup}`,
          name: `${f.name} (${reuse.reuseGroup}:${f.id})`,
        }));
        setReuseData((prev) => ({
          ...prev,
          combinedOptions: opts,
          // Auto-select first folder so the dropdown always shows a real value
          reuseFolder: prev.reuseFolder ?? (opts.length > 0 ? parseInt(opts[0].id.split('|')[0], 10) : null),
        }));
      })
      .catch(() => {});
  }, [reuse.reuseGroup]);

  // Load uploads whenever selected folder+group change
  useEffect(() => {
    if (reuseData.reuseFolder && reuse.reuseGroup) {
      getUploadsFolderId(reuseData.reuseFolder, reuse.reuseGroup)
        .then((res) => {
          setReuseData((prev) => ({ ...prev, uploadList: res || [] }));
        })
        .catch(() => {});
    }
  }, [reuse.reuseGroup, reuseData.reuseFolder]);

  const handleCombinedSelect = (value) => {
    const separatorIndex = value.indexOf("|");
    if (separatorIndex === -1) return;
    const folderId = parseInt(value.slice(0, separatorIndex), 10);
    const groupName = value.slice(separatorIndex + 1);
    // Persist both the reuse group and the selected folder into scanData.reuse
    handleScanChange(null, "reuseGroup", "text", groupName);
    handleScanChange(null, "reuseFolder", "text", folderId);
    setReuseData((prev) => ({ ...prev, reuseFolder: folderId }));
  };

  const handleSelectUpload = (item) => {
    // Ensure the selected folder is stored alongside the selected upload
    handleScanChange(null, "reuseFolder", "text", reuseData.reuseFolder);
    handleScanChange(true, "reuseUpload", "checkbox", item);
    setSearchTerm("");
  };

  const handleRemoveUpload = (item) => {
    handleScanChange(false, "reuseUpload", "checkbox", item);
  };

  const currentCombinedValue =
    reuseData.reuseFolder && reuse.reuseGroup
      ? `${reuseData.reuseFolder}|${reuse.reuseGroup}`
      : "";

  return (
    <div id="upload-optional-reuse" className="mt-4 space-y-2">
      <p className="font-semibold text-base inline-flex items-center gap-1">
        1. (Optional) Reuse
        <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
      </p>

      <div className="flex items-center gap-4">
        <InputContainer
          type="checkbox"
          name="reuseChecked"
          id="reuse-checked-checkbox"
          checked={reuse.reuseChecked}
          onChange={(checked) =>
            handleScanChange(checked, "reuseChecked", "checkbox")
          }
        >
          Select an already uploaded package for reuse in specific folder
        </InputContainer>
      </div>

      <div className="w-[282px]">
        <InputContainer
          type="select"
          name="reuseFolder"
          id="upload-file-reuse-folder-group"
          onChange={handleCombinedSelect}
          options={reuseData.combinedOptions}
          value={currentCombinedValue}
          property="name"
          valueProperty="id"
          noDataMessage={messages.noFolder}
          disabled={!reuse.reuseChecked}
          placeholder=""
        />
      </div>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseEnhanced}
        name="reuseEnhanced"
        id="upload-file-reuse-enhanced"
        onChange={(checked) => handleScanChange(checked, "reuseEnhanced", "checkbox")}
      >
        Enhanced reuse (slower)
        <Tooltip title="will copy a clearing decision if the two files differ by one line determined by a diff tool" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseMain}
        name="reuseMain"
        id="upload-file-reuse-main"
        onChange={(checked) => handleScanChange(checked, "reuseMain", "checkbox")}
      >
        Reuse main license/s
        <Tooltip title="will copy a main license decision if any" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseReport}
        name="reuseReport"
        id="upload-file-reuse-report"
        onChange={(checked) => handleScanChange(checked, "reuseReport", "checkbox")}
      >
        Reuse report configuration settings
        <Tooltip title="use to copy all the information from conf page(if any)" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseCopyright}
        name="reuseCopyright"
        id="upload-file-reuse-copyright"
        onChange={(checked) => handleScanChange(checked, "reuseCopyright", "checkbox")}
      >
        Reuse edited and deactivated copyrights
        <Tooltip title="use to copy edited and deactivated copyrights from the reused package" />
      </InputContainer>
      <div className="mt-4 space-y-4">
        <p className="font-semibold text-base">
          2. Upload to reuse:
        </p>
          {reuse.reuseChecked && reuseData.reuseFolder ? (
            <div className="w-[282px] relative">
            {/* Input */}
            <Input
              type="text"
              placeholder="Search to upload"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[32px] pt-2 pb-2 pr-2 pl-3 rounded-[4px] text-[14px]"
            />

            {/* Dropdown */}
            {searchTerm && filteredUploads.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                {filteredUploads.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectUpload(item)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  >
                    {item.uploadname} ({item.uploadDate})
                  </div>
                ))}
              </div>
            )}

            {/* Chips */}
            <div className="mt-2 space-y-2">
              {Array.isArray(reuse.reuseUpload) &&
                reuse.reuseUpload.map((item) => (
                  <Chip
                    key={item.id}
                    label={`${item.uploadname} (${item.uploadDate})`}
                    onRemove={() => handleRemoveUpload(item)}
                  />
                ))}
            </div>
          </div>
          ) : (
          <p className="text-error-600 text-sm">
            No repository chosen
          </p>
          )}
        {/* {reuseData.uploadList && reuseData.uploadList.length > 0 ? (
          reuseData.uploadList.map((item, index) => (
            <InputContainer
              key={`${item.id ?? "no-id"}-${index}`}
              type="checkbox"
              name="reuseUpload"
              value={item.id}
              checked={Array.isArray(reuse.reuseUpload) ? reuse.reuseUpload.includes(item.id) : false}
              onChange={(checked) => handleChange(checked, "reuseUpload", "checkbox", item.id)}
            >
              {item.uploadname} ({item.uploadDate})
            </InputContainer>
          ))
        ) : (
          <p>{messages.noUploads}</p>
        )} */}
      </div>

            {/* <InputContainer
        type="select"
        name="reuseUpload"
        id="upload-file-reuse-upload"
        onChange={handleChange}
        options={reuseData.uploadList}
        value={parseInt(reuse.reuseUpload, 10)}
        property="uploadname"
        valueProperty="id"
        noDataMessage={messages.noUploads}
      >
        Select the reuse upload:
      </InputContainer> */}
    </div>
  );
};

UploadReuse.propTypes = {
  reuse: PropTypes.shape({
    reuseUpload: PropTypes.array.isRequired,
    reuseGroup: PropTypes.string.isRequired,
    reuseChecked: PropTypes.bool.isRequired,
    reuseMain: PropTypes.bool.isRequired,
    reuseEnhanced: PropTypes.bool.isRequired,
    reuseReport: PropTypes.bool.isRequired,
    reuseCopyright: PropTypes.bool.isRequired,
  }).isRequired,
  handleScanChange: PropTypes.func,
};

export default UploadReuse;
