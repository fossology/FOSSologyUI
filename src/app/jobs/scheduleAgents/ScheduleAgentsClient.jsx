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

// Common Fields for all the Uploads
import CommonFields from "@/components/Upload/CommonFields";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "@/components/Widgets";

// Required functions for calling APIs
import { getAllFolders } from "@/services/folders";
import { scheduleAnalysis } from "@/services/jobs";
import getBrowseData from "@/services/browse";

// Helpers
import { defaultAgentsList, getLocalStorage } from "@/shared/storageHelper";

const ScheduleAgentsPage = () => {
  const initialScheduleAnalysisData = {
    folderId: 1,
    uploadId: 1,
  };

  const initialScanFileData = {
    analysis: defaultAgentsList(),
    decider: {
      nomosMonk: false,
      bulkReused: false,
      newScanner: false,
      ojoDecider: false,
    },
    reuse: {
      reuseUpload: 0,
      reuseGroup: getLocalStorage("user")?.default_group,
      reuseMain: false,
      reuseEnhanced: false,
      reuseReport: false,
      reuseCopyright: false,
    },
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
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    scheduleAnalysis(
      scheduleAnalysisData.folderId,
      scheduleAnalysisData.uploadId,
      scanFileData
    )
      .then(() => {
        setMessage({
          type: "success",
          text: messages.jobsAdded,
        });
        setScheduleAnalysisData(initialScheduleAnalysisData);
        setScanFileData(initialScanFileData);
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const handleChange = (e) => {
    setScheduleAnalysisData({
      ...scheduleAnalysisData,
      [e.target.name]: e.target.value,
    });
  };

  const handleScanChange = (e) => {
    const { name, type, checked, value } = e.target;

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
    } else {
      setScanFileData((prev) => ({
        ...prev,
        reuse: {
          ...prev.reuse,
          [name]: type === "checkbox" ? checked : parseInt(value, 10) || value,
        },
      }));
    }
  };

  useEffect(() => {
    getAllFolders().then((res) => {
      setFolderList(res);
    });
  }, []);

  useEffect(() => {
    getBrowseData({
      ...initialBrowseData,
      folderId: scheduleAnalysisData.folderId,
    }).then((res) => {
      setUploadList(res.res);
    });
  }, [scheduleAnalysisData.folderId]);

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}

      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <h1 className="font-size-main-heading">Schedule an Analysis</h1>
          <br />
          <p>Select an uploaded file for additional analysis</p>
          <form className="my-3" onSubmit={handleSubmit}>
            <InputContainer
              type="select"
              name="folderId"
              id="jobs-schedule-agents-folder-id"
              onChange={handleChange}
              options={folderList}
              property="name"
              value={scheduleAnalysisData.folderId}
            >
              Select the folder containing the upload you wish to analyze:
            </InputContainer>

            <InputContainer
              type="select"
              name="uploadId"
              id="jobs-schedule-agents-upload-id"
              onChange={handleChange}
              options={uploadList}
              property="uploadname"
              value={scheduleAnalysisData.uploadId}
            >
              Select the upload to analyze:
            </InputContainer>

            <CommonFields
              analysis={scanFileData.analysis}
              decider={scanFileData.decider}
              reuse={scanFileData.reuse}
              handleChange={handleChange}
              handleScanChange={handleScanChange}
            />

            <Button type="submit" className="mt-4">
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
      </div>
    </div>
  );
};

export default ScheduleAgentsPage;

