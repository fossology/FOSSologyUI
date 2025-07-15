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

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Widgets
import { Alert, Button, InputContainer } from "@/components/Widgets";

// Constants
import { initialMessage, initialStateImportReport } from "@/constants/constants";

// Services
import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId } from "@/services/organizeUploads";
import { importReport } from "@/services/jobs";

const ImportReportPage = () => {
  const [folderlist, setFolderlist] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [importReportData, setImportReportData] = useState(initialStateImportReport);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

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
          : temp[0]?.id;

        if (defaultFolder) {
          setImportReportData((prev) => ({ ...prev, folder: defaultFolder }));
        }
      } catch (error) {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      }
    };

    fetchFolders();
  }, [searchParams]);

  // Fetch uploads based on folder
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const uploads = await getUploadsFolderId(importReportData.folder);
        const temp = uploads.map((u) => ({
          id: u.id,
          name: `${u.uploadname}, ${u.uploaddate}`,
          disabled: false,
        }));
        setUploadList(temp);

        const uploadQuery = searchParams.get("upload");
        const defaultUpload = uploadQuery
          ? temp.find((u) => String(u.id) === uploadQuery)?.id
          : temp[0]?.id;

        setImportReportData((prev) => ({
          ...prev,
          upload: defaultUpload || "",
        }));
      } catch (error) {
        setMessage({ type: "danger", text: error.message });
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
      [name]: type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!importReportData.report) {
      setMessage({ type: "danger", text: "Choose a report" });
      setShowMessage(true);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(importReportData).forEach((key) => {
        formData.append(key, importReportData[key]);
      });

      const res = await importReport(importReportData.upload, formData);
      setMessage({ type: "success", text: res.message });
      setShowMessage(true);

      setTimeout(() => {
        setMessage({ type: "success", text: "Redirecting...." });
      }, 1000);

      setTimeout(() => {
        router.push("/jobs/myRecentJobs");
      }, 2000);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  return (
    <>
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
                          checked={importReportData.addNewLicensesAs === "candidate"}
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
                          checked={importReportData.addNewLicensesAs === "license"}
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
                          name="addLicenseInfoFromInfoInFile"
                          id="upload-report-license-info-file"
                          checked={importReportData.addLicenseInfoFromInfoInFile}
                          onChange={handleChange}
                        >
                          SPDX tag of type licenseInfoInFile
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="checkbox"
                          name="addLicenseInfoFromConcluded"
                          id="upload-report-license-concluded"
                          checked={importReportData.addLicenseInfoFromConcluded}
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
                      name="addConcludedAsDecisions"
                      id="upload-report-license-decisions"
                      checked={importReportData.addConcludedAsDecisions}
                      onChange={handleChange}
                    >
                      Add concluded licenses as decisions
                    </InputContainer>
                    <ul>
                      <li>
                        <InputContainer
                          type="checkbox"
                          name="addConcludedAsDecisionsOverwrite"
                          id="upload-report-existing-decisions"
                          checked={importReportData.addConcludedAsDecisionsOverwrite}
                          onChange={handleChange}
                          disabled
                        >
                          Also overwrite existing decisions
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="checkbox"
                          name="addConcludedAsDecisionsTBD"
                          id="upload-report-import-discussed"
                          checked={importReportData.addConcludedAsDecisionsTBD}
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
                      name="addCopyrights"
                      id="upload-report-existing-copyright"
                      checked={importReportData.addCopyrights}
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

export default ImportReportPage;

