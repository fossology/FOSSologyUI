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

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Widgets
import { InputContainer, Tooltip } from "@/components/Widgets";

// Required services for calling APIs
import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId } from "@/services/organizeUploads";
import { getAllGroups } from "@/services/groups";

import messages from "@/constants/messages";

const UploadReuse = ({ reuse, handleChange }) => {
  const initialGroupList = [{ id: 3, name: "fossy" }];
  const initialFolderList = [
    {
      id: 1,
      name: "Software Repository",
      description: "Top Folder",
      parent: null,
    },
  ];
  const initialUploadList = [
    {
      folderId: 1,
      uploadId: null,
      uploadName: "",
      uploadDescription: "",
    },
  ];
  const [reuseData, setReuseData] = useState({
    groupList: initialGroupList,
    folderList: initialFolderList,
    uploadList: initialUploadList,
    reuseFolder: 1,
  });
  useEffect(() => {
    getAllFolders(reuse.reuseGroup)
      .then((res) => {
        setReuseData((prevData) => ({ ...prevData, folderList: res }));
      })
      .catch(() => {});
  }, [reuse.reuseGroup]);

  useEffect(() => {
    getUploadsFolderId(reuseData.reuseFolder, reuse.reuseGroup)
      .then((res) => {
        setReuseData((prevData) => ({ ...prevData, uploadList: res }));
      })
      .catch(() => {});
  }, [reuse.reuseGroup, reuseData.reuseFolder]);

  const handleReuseDataChange = (e) => {
    setReuseData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div id="upload-optional-reuse" className="mt-4 space-y-2">
      <p className="font-semibold text-base inline-flex items-center gap-1">
        1. (Optional) Reuse
        <Tooltip title="Copy clearing decisions if there is the same file hash between two files" />
      </p>
      <div className="flex items-center gap-4">
        <InputContainer
          type="checkbox"
          name="reuseGroupCheckbox"
          id="reuse-group-checkbox"
          checked={reuse.groupChecked}
          onChange={(checked) => handleChange(checked, "groupChecked", "checkbox")}
        >
          Select the reuse group:
        </InputContainer>

      <InputContainer
        type="select"
        name="reuseGroup"
        id="upload-file-reuse-group"
        onChange={handleChange}
        options={reuseData.groupList}
        value={reuse.reuseGroup}
        property="name"
        valueProperty="name"
        noDataMessage={messages.noGroup}
      />
      </div>

      <div className="flex items-center gap-4">
        <InputContainer
          type="checkbox"
          name="reuseFolderCheckbox"
          id="reuse-folder-checkbox"
          checked={reuse.folderChecked}
          onChange={(checked) => handleChange(checked, "folderChecked", "checkbox")}
        >
          Select the reuse folder:
        </InputContainer>

        <InputContainer
          type="select"
          name="reuseFolder"
          id="upload-file-reuse-folder"
          onChange={handleReuseDataChange}
          options={reuseData.folderList}
          value={reuseData.reuseFolder}
          property="name"
          noDataMessage={messages.noFolder}
        />
      </div>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseEnhanced}
        name="reuseEnhanced"
        id="upload-file-reuse-enhanced"
        onChange={(checked) => handleChange(checked, "reuseEnhanced", "checkbox")}
      >
        Enhanced reuse (slower)
        <Tooltip title="will copy a clearing decision if the two files differ by one line determined by a diff tool" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseMain}
        name="reuseMain"
        id="upload-file-reuse-main"
        onChange={(checked) => handleChange(checked, "reuseMain", "checkbox")}
      >
        Reuse main license/s
        <Tooltip title="will copy a main license decision if any" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseReport}
        name="reuseReport"
        id="upload-file-reuse-report"
        onChange={(checked) => handleChange(checked, "reuseReport", "checkbox")}
      >
        Reuse report configuration settings
        <Tooltip title="use to copy all the information from conf page(if any)" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseCopyright}
        name="reuseCopyright"
        id="upload-file-reuse-copyright"
        onChange={(checked) => handleChange(checked, "reuseCopyright", "checkbox")}
      >
        Reuse edited and deactivated copyrights
        <Tooltip title="use to copy edited and deactivated copyrights from the reused package" />
      </InputContainer>
      <div className="mt-4 space-y-4">
        <p className="font-semibold text-base">
          2. Upload to reuse:
        </p>

        {reuseData.uploadList && reuseData.uploadList.length > 0 ? (
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
        )}
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
    reuseUpload: PropTypes.number.isRequired,
    reuseGroup: PropTypes.string.isRequired,
    reuseMain: PropTypes.bool.isRequired,
    reuseEnhanced: PropTypes.bool.isRequired,
    reuseReport: PropTypes.bool.isRequired,
    reuseCopyright: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func,
};

export default UploadReuse;
