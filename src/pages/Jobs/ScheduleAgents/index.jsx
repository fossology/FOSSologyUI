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

// Title
import Title from "components/Title";

// Common Fields for all the Uploads
import CommonFields from "components/Upload/CommonFields";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Required functions for calling APIs
import { getAllFolders } from "services/folders";
import { scheduleAnalysis } from "services/upload";
import getBrowseData from "services/browse";

// Loading the default agents list
import { defaultAgentsList, getLocalStorage } from "shared/storageHelper";

const ScheduleAgents = () => {
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
  const initialUploadList = [
    {
      folderid: 0,
      foldername: "string",
      id: 0,
      description: "string",
      uploadname: "string",
      uploaddate: "string",
      hash: {
        sha1: "81fe8bfe87576c3ecb22426f8e57847382917acf",
        md5: "e2fc714c4727ee9395f324cd2e7f331f",
        sha256:
          "88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589",
        size: 0,
      },
    },
  ];
  const [scheduleAnalysisData, setScheduleAnalysisData] = useState(
    initialScheduleAnalysisData
  );
  const [uploadList, setUploadList] = useState(initialUploadList);
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
          text: "Your jobs have been added to job queue",
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
    const { name } = e.target;
    if (
      Object.keys(scanFileData.analysis).find((analysis) => analysis === name)
    ) {
      setScanFileData({
        ...scanFileData,
        analysis: {
          ...scanFileData.analysis,
          [e.target.name]: e.target.checked,
        },
      });
    } else if (
      Object.keys(scanFileData.decider).find((decider) => decider === name)
    ) {
      setScanFileData({
        ...scanFileData,
        decider: {
          ...scanFileData.decider,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setScanFileData({
        ...scanFileData,
        reuse: {
          ...scanFileData.reuse,
          [e.target.name]:
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

  useEffect(() => {
    getBrowseData({
      ...initialBrowseData,
      folderId: scheduleAnalysisData.folderId,
    }).then((res) => {
      setUploadList(res.res);
    });
  }, [scheduleAnalysisData.folderId]);

  return (
    <>
      <Title title="Schedule an Analysis" />
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}
      <div className="main-container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <h1 className="font-size-main-heading">Schedule an Analysis</h1>
            <br />
            <p>Select an uploaded file for additional analysis</p>
            <form className="my-3">
              <InputContainer
                type="select"
                name="folderId"
                id="jobs-schedule-agents-folder-id"
                onChange={handleChange}
                options={folderList}
                property="name"
                value={folderList?.id}
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
                value={uploadList?.id}
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
              <Button type="submit" onClick={handleSubmit} className="mt-4">
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
    </>
  );
};

export default ScheduleAgents;
