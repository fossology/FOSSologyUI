/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
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

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Components
import { Alert } from "@/components/Widgets";
import SecondaryNavBar from "@/components/SecondaryNavBar";

// Services
import { getUploadSummary, getUploadLicense } from "@/services/upload";

// Helpers
import { handleError } from "@/shared/helper";

export default function LicenseBrowser() {
  const [uploadId, setUploadId] = useState();
  const [summaryData, setSummaryData] = useState();
  const [filesData, setFilesData] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();

  const params = useParams();
  const uploadID = params?.uploadID;

  useEffect(() => {
    if (uploadID) {
      setUploadId(uploadID);
    }
  }, [uploadID]);

  useEffect(() => {
    if (!uploadId) return;

    setMessage({ type: "success", text: "Loading..." });
    setShowMessage(true);

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
  }, [uploadId]);

  return (
    <>
      <SecondaryNavBar title="License Browser" />
        <div className="main-container my-4 mx-8">
        {showMessage && (
          <Alert
            type={message?.type}
            setShow={setShowMessage}
            message={message?.text}
          />
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          <div className="xl:col-span-3 overflow-x-auto">
            <table className="min-w-full table-auto border text-sm text-primary border-collapse">
              <thead>
                <tr className="bg-gray-200 font-semibold">
                  <th className="border px-3 py-2">Files</th>
                  <th className="border px-3 py-2">Scanner Results</th>
                  <th className="border px-3 py-2">Edited Results</th>
                  <th className="border px-3 py-2">Clearing Status</th>
                  <th className="border px-3 py-2">Cleared/ Open/ Total</th>
                  <th className="border px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filesData?.length > 0 &&
                  filesData.map((data) => {
                    const filteredScanner = [...new Set(data.findings.scanner)];
                    const filteredConclusion = [...new Set(data.findings.conclusion)];

                    return (
                      <tr key={data.id}>
                        <td className="border px-3 py-2">{data.filePath}</td>
                        <td className="border px-3 py-2">
                          {filteredScanner?.join(", ")}
                        </td>
                        <td className="border px-3 py-2">
                          {filteredConclusion?.join(", ")}
                        </td>
                        <td className="border px-3 py-2">-</td>
                        <td className="border px-3 py-2">-</td>
                        <td className="border px-3 py-2">-</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="xl:col-span-1">
            {summaryData && (
              <>
                <h4 className="text-lg font-bold text-primary mb-2">Summary</h4>
                <table className="w-full border text-sm text-primary">
                  <tbody>
                    <tr><td className="border px-2 py-1">Main License</td><td className="border px-2 py-1">{summaryData.mainLicense}</td></tr>
                    <tr><td className="border px-2 py-1">Unique Licenses</td><td className="border px-2 py-1">{summaryData.uniqueLicenses}</td></tr>
                    <tr><td className="border px-2 py-1">Unique Concluded Licenses</td><td className="border px-2 py-1">{summaryData.uniqueConcludedLicenses}</td></tr>
                    <tr><td className="border px-2 py-1">Total Concluded Licenses</td><td className="border px-2 py-1">{summaryData.totalConcludedLicenses}</td></tr>
                    <tr><td className="border px-2 py-1">Files Cleared</td><td className="border px-2 py-1">{summaryData.filesCleared}</td></tr>
                    <tr><td className="border px-2 py-1">Copyright Count</td><td className="border px-2 py-1">{summaryData.copyrightCount}</td></tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
