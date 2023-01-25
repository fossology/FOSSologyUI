/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)

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

import React, { useEffect, useState } from "react";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer } from "components/Widgets";

// constants
import { initialMessage, initialStateImportReport } from "constants/constants";
import { getAllFolders } from "services/folders";
import { getUploadsFolderId } from "services/organizeUploads";
import { useHistory, useLocation } from "react-router-dom";
import { importReport } from "services/jobs";

const ImportReport = () => {
  // States for setting the folder and upload list
  const [folderlist, setFolderlist] = useState([]);
  const [uploadList, setUploadList] = useState([]);

  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);

  // State Variables for handling Error Boundaries
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  // Data required for importing report
  const [importReportData, setImportReportData] = useState(
    initialStateImportReport
  );

  // getting all the folders from the server
  const fetchFolders = async () => {
    try {
      const folders = await getAllFolders();
      const temp = folders.map((f) => ({
        id: f.id,
        name: f.name,
        disabled: false,
      }));
      setFolderlist(temp);
      if (query.get("folder")) {
        const f = temp.filter(
          (foldr) => String(foldr.id) === query.get("folder")
        );
        setImportReportData({
          ...importReportData,
          folder: f.length ? f[0].id : temp[0].id,
        });
      } else {
        setImportReportData({
          ...importReportData,
          folder: temp[0].id,
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };
  useEffect(async () => {
    await fetchFolders();
  }, []);

  // getting all the uploads based on folder id
  const fetchUploads = async () => {
    const uploads = await getUploadsFolderId(importReportData.folder);
    try {
      const temp = uploads.map((u) => ({
        id: u.id,
        name: `${u.uploadname}, ${u.uploaddate}`,
        disabled: false,
      }));
      setUploadList(temp);
      if (query.get("upload")) {
        const u = temp.filter(
          (upld) => String(upld.id) === query.get("upload")
        );
        setImportReportData({
          ...importReportData,
          upload: u.length ? u[0].id : temp[0].id,
        });
      } else {
        setImportReportData({
          ...importReportData,
          upload: temp.length ? temp[0].id : "",
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };
  useEffect(async () => {
    await fetchUploads();
  }, [importReportData.folder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const importReportFormData = new FormData();
    if (importReportData.report) {
      try {
        Object.keys(importReportData).forEach((key) => {
          importReportFormData.append(key, importReportData[key]);
        });
        const res = await importReport(
          importReportData.upload,
          importReportFormData
        );
        setMessage({ type: "success", text: res.message });
        setShowMessage(true);
        setTimeout(() => {
          setMessage({
            type: "success",
            text: "Redirecting....",
          });
        }, 1000);
        setTimeout(() => {
          history.push("/jobs/myRecentJobs");
        }, 2000);
      } catch (error) {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      }
    } else {
      setMessage({ type: "danger", text: "Choose a report" });
      setShowMessage(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setImportReportData({
        ...importReportData,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.type === "file") {
      setImportReportData({
        ...importReportData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setImportReportData({
        ...importReportData,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <>
      <Title title="Report Import" />
      <div className="main-container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            {showMessage && (
              <Alert
                type={message.type}
                setShow={setShowMessage}
                message={message.text}
              />
            )}
            <h3 className="font-size-main-heading">Report Import</h3>
            <form>
              <InputContainer
                type="select"
                name="folder"
                id="folder"
                onChange={handleChange}
                options={folderlist}
                value={importReportData.folder}
                property="name"
              >
                Select the folder that contains the upload:
              </InputContainer>
              <InputContainer
                type="select"
                name="upload"
                id="upload"
                onChange={handleChange}
                options={uploadList}
                value={importReportData.upload || ""}
                property="name"
              >
                Select the upload you wish to edit:
              </InputContainer>
              <InputContainer
                type="file"
                name="report"
                id="upload-report"
                onChange={handleChange}
              >
                Select report to upload:
              </InputContainer>
              <div className="font-medium">
                Select how the information should be imported:
                <ul>
                  <li className="mt-2">
                    Create new licenses as:
                    <ul>
                      <li>
                        <InputContainer
                          type="radio"
                          value="candidate"
                          name="addNewLicensesAs"
                          id="upload-report-license-candidate"
                          checked={
                            importReportData.addNewLicensesAs === "candidate"
                          }
                          onChange={handleChange}
                        >
                          License candidate
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="radio"
                          value="license"
                          name="addNewLicensesAs"
                          id="upload-report-new-license"
                          checked={
                            importReportData.addNewLicensesAs === "license"
                          }
                          onChange={handleChange}
                        >
                          New License
                        </InputContainer>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    Add the License Info as findings from:
                    <ul>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={
                            importReportData.addLicenseInfoFromInfoInFile
                          }
                          name="addLicenseInfoFromInfoInFile"
                          id="upload-report-license-info-file"
                          onChange={handleChange}
                        >
                          SPDX tag of type licenseInfoInFile
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={importReportData.addLicenseInfoFromConcluded}
                          name="addLicenseInfoFromConcluded"
                          id="upload-report-license-concluded"
                          onChange={handleChange}
                        >
                          SPDX tag of type licenseConcluded
                        </InputContainer>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <InputContainer
                      type="checkbox"
                      checked={importReportData.addConcludedAsDecisions}
                      name="addConcludedAsDecisions"
                      id="upload-report-license-decisions"
                      onChange={handleChange}
                    >
                      Add concluded licenses as decisions
                    </InputContainer>
                    <ul>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={
                            importReportData.addConcludedAsDecisionsOverwrite
                          }
                          name="addConcludedAsDecisionsOverwrite"
                          id="upload-report-existing-decisions"
                          onChange={handleChange}
                          disabled
                        >
                          Also overwrite existing decisions
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={importReportData.addConcludedAsDecisionsTBD}
                          name="addConcludedAsDecisionsTBD"
                          id="upload-report-import-discussed"
                          onChange={handleChange}
                        >
                          Import as "to be discussed"
                        </InputContainer>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <InputContainer
                      type="checkbox"
                      checked={importReportData.addCopyrights}
                      name="addCopyrights"
                      id="upload-report-existing-copyright"
                      onChange={handleChange}
                    >
                      Add the copyright information as textfindings
                    </InputContainer>
                  </li>
                </ul>
              </div>
              <Button type="submit" onClick={handleSubmit} className="mt-4">
                Upload and Import
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportReport;
