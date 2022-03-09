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

import React, { useState, useEffect } from "react";

// Widgets
import { InputContainer } from "components/Widgets";

// Required services for calling APIs
import { getAllFolders } from "services/folders";
import { getUploadsFolderId } from "services/organizeUploads";
import { getAllGroups } from "services/groups";

import { PropTypes } from "prop-types";

import messages from "constants/messages";

// required data
import {
  initialGroupList,
  initialFolderList,
  initialUploadList,
} from "../data";

const SelectInputContainers = ({ reuse, handleChange }) => {
  const [reuseData, setReuseData] = useState({
    groupList: initialGroupList,
    folderList: initialFolderList,
    uploadList: initialUploadList,
    reuseFolder: 1,
  });

  useEffect(() => {
    setReuseData((prevData) => ({ ...prevData, groupList: getAllGroups() }));
  }, []);

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
    <>
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
      >
        Select the reuse group:
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
      >
        Select the reuse folder:
      </InputContainer>
      <InputContainer
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
      </InputContainer>
    </>
  );
};

SelectInputContainers.propTypes = {
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

export default SelectInputContainers;
