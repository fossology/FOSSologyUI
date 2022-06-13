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

import React, { useState } from "react";

// Title
import Title from "components/Title";

// Widgets
import { Button, InputContainer } from "components/Widgets";

// constants
import { initialStateImportReport } from "../../../constants/constants";

const ImportReport = () => {
  // Data required for importing report
  const [importReportData, setImportReportData] = useState(
    initialStateImportReport
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setImportReportData({
        ...importReportData,
        [e.target.name]: e.target.checked,
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
            <h3 className="font-size-main-heading">Report Import</h3>
            <br />
            <form>
              <InputContainer
                type="text"
                value={importReportData.folder}
                name="folder"
                id="upload-report"
                onChange={(e) => handleChange(e)}
              >
                Select the folder that contains the upload:
              </InputContainer>
              <InputContainer
                type="text"
                value={importReportData.editUpload}
                name="editUpload"
                id="upload-report"
                onChange={(e) => handleChange(e)}
              >
                Select the upload you wish to edit:
              </InputContainer>
              <InputContainer
                type="file"
                value={importReportData.reportUpload}
                name="reportUpload"
                id="upload-report"
                onChange={(e) => handleChange(e)}
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
                          value="licenseCanditate"
                          name="newLicense"
                          id="upload-report-license-candidate"
                          checked={
                            importReportData.newLicense === "licenseCanditate"
                          }
                          onChange={(e) => handleChange(e)}
                        >
                          License candidate
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="radio"
                          value="newLicense"
                          name="newLicense"
                          id="upload-report-new-license"
                          checked={importReportData.newLicense === "newLicense"}
                          onChange={(e) => handleChange(e)}
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
                          checked={importReportData.licenseInfoInFile}
                          name="licenseInfoInFile"
                          id="upload-report-license-info-file"
                          onChange={(e) => handleChange(e)}
                        >
                          SPDX tag of type licenseInfoInFile
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={importReportData.licenseConcluded}
                          name="licenseConcluded"
                          id="upload-report-license-concluded"
                          onChange={(e) => handleChange(e)}
                        >
                          SPDX tag of type licenseConcluded
                        </InputContainer>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <InputContainer
                      type="checkbox"
                      checked={importReportData.licenseDecision}
                      name="licenseDecision"
                      id="upload-report-license-decisions"
                      onChange={(e) => handleChange(e)}
                    >
                      Add concluded licenses as decisions
                    </InputContainer>
                    <ul>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={importReportData.existingDecisions}
                          name="existingDecisions"
                          id="upload-report-existing-decisions"
                          onChange={(e) => handleChange(e)}
                          disabled
                        >
                          Also overwrite existing decisions
                        </InputContainer>
                      </li>
                      <li>
                        <InputContainer
                          type="checkbox"
                          checked={importReportData.importDiscussed}
                          name="importDiscussed"
                          id="upload-report-import-discussed"
                          onChange={(e) => handleChange(e)}
                        >
                          Import as "to be discussed"
                        </InputContainer>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <InputContainer
                      type="checkbox"
                      checked={importReportData.copyright}
                      name="copyright"
                      id="upload-report-existing-copyright"
                      onChange={(e) => handleChange(e)}
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
