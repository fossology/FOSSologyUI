/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)

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

// Header
import BrowseUploadsHeader from "components/BrowseUploadsHeader";
// Title
import Title from "components/Title";
// Widgets
import { Alert } from "components/Widgets";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Required functions for calling APIs
import { getUploadLicense, getUploadSummary } from "services/upload";
// Helper function for error handling
import { handleError } from "shared/helper";

const LicenseBrowser = () => {
  // Setting the upload Id
  const [uploadId, setuploadId] = useState();

  // Setting the browse data to the table
  const [summaryData, setSummaryData] = useState();

  // Setting the browse data to the table
  const [filesData, setFilesData] = useState();

  // State Variables for handling Error Boundaries
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();

  // Getting a upload Id
  const { uploadID } = useParams();
  useEffect(() => {
    setMessage({
      type: "success",
      text: "Loading...",
    });
    setShowMessage(true);
    if (uploadID) {
      setuploadId(uploadID);
    }
    if (uploadId) {
      getUploadSummary(uploadId)
        .then((res) => {
          setSummaryData(res);
          setShowMessage(false);
        })
        .catch((error) => {
          handleError(error, setMessage);
          setShowMessage(true);
        });
      getUploadLicense(uploadId, ["ojo,nomos,monk"])
        .then((res) => {
          setFilesData(res);
          setShowMessage(false);
        })
        .catch((error) => {
          handleError(error, setMessage);
          setShowMessage(true);
        });
    } else {
      setMessage({
        type: "danger",
        text: "UploadId should be an integer",
      });
    }
  }, [uploadId]);

  return (
    <>
      <Title title="License Browser" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">License Browser</h1>
      </div>
      <BrowseUploadsHeader />
      <div className="main-container my-4">
        <div className="row">
          <div className="col-12 col-lg-12 col-xl-9">
            <table className="table table-striped text-primary-color font-size-medium table-responsive table-bordered">
              <thead>
                <tr className="font-bold font-size-sub-heading">
                  <th>Files</th>
                  <th>Scanner Results</th>
                  <th>Edited Results</th>
                  <th>Clearing Status</th>
                  <th>Cleared/ Open/ Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filesData &&
                  filesData.length > 0 &&
                  filesData.map((data) => {
                    const filteredScanner = [...new Set(data.findings.scanner)];
                    const filteredConclusion = [
                      ...new Set(data.findings.conclusion),
                    ];

                    return (
                      <>
                        <tr key={data.id}>
                          <td>{data.filePath}</td>
                          <td>
                            {filteredScanner !== null
                              ? filteredScanner.map((dataScanner, index) => {
                                  return `${dataScanner}${
                                    index + 1 === filteredScanner.length
                                      ? ""
                                      : ", "
                                  }`;
                                })
                              : null}
                          </td>
                          <td>
                            {filteredConclusion !== null
                              ? filteredConclusion.map((dataScanner, index) => {
                                  return `${dataScanner}${
                                    index + 1 === filteredConclusion.length
                                      ? ""
                                      : ", "
                                  }`;
                                })
                              : null}
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-12 col-xl-3">
            {summaryData && (
              <>
                <h4 className="font-bold font-size-sub-heading text-primary-color">
                  Summary
                </h4>
                <table className="table table-bordered text-primary-color mt-3">
                  <tbody>
                    <tr>
                      <td>Main License</td>
                      <td>{summaryData.mainLicense}</td>
                    </tr>
                    <tr>
                      <td>Unique Licenses</td>
                      <td>{summaryData.uniqueLicenses}</td>
                    </tr>
                    <tr>
                      <td>Unique Concluded Licenses</td>
                      <td>{summaryData.uniqueConcludedLicenses}</td>
                    </tr>
                    <tr>
                      <td>Total Concluded Licenses</td>
                      <td>{summaryData.totalConcludedLicenses}</td>
                    </tr>
                    <tr>
                      <td>Files Cleared</td>
                      <td>{summaryData.filesCleared}</td>
                    </tr>
                    <tr>
                      <td>Copyright Count</td>
                      <td>{summaryData.copyrightCount}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LicenseBrowser;
