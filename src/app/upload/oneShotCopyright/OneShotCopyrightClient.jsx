/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import React, { useRef, useState } from "react";

// Widgets
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";

import { oneShotCEU } from "@/services/jobs";

const OneShotCopyright = () => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select a file first" });
      setShowMessage(true);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fileInput", selectedFile);

      const res = await oneShotCEU(formData);

      setResult({
        copyrights: res?.copyrights || [],
        highlights: res?.highlights || [],
      });

      setMessage({
        type: "success",
        text: "Analysis completed successfully",
      });
      setShowMessage(true);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Analysis failed",
      });
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const isButtonDisabled = !selectedFile;

  const alertType =
    message?.type === "danger" || message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="max-w-5xl mx-40 my-6 px-4">
      {showMessage && message && (
        <div className="mb-4">
          <AlertBanner
            type={alertType}
            description={message.text}
            showClose
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        One-Shot Copyright/Email/URL Analysis
      </h1>

      <div className="text-base text-foreground space-y-2 mb-8">
        <p>
          This analyzer allows you to upload a single file for
          copyright/email/url analysis.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>The analysis is done in real-time.</li>

          <li>
            Files that contain files are not unpacked. If you upload a
            container like a gzip file, then only that binary file will be
            scanned.
          </li>

          <li>
            Results are not stored. As soon as you get your results,
            your uploaded file is removed from the system.
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File Upload */}
        <div>
          <label className="block font-normal mb-3">
            Select the file to upload:
          </label>

          <div className="flex items-end gap-3">
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              className="hidden"
              onChange={handleChange}
              disabled={loading}
            />

            <Button
              type="button"
              disabled={loading}
              variant="outline"
              className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </Button>

            <span
              className={`self-end text-sm ${
                selectedFile
                  ? "text-info-500"
                   : "text-error-600"
              }`}
            >
              {selectedFile
                ? selectedFile.name
                : "No file chosen"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isButtonDisabled || loading}
            variant="default"
            size="default"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </form>
{result && (
  <div className="mt-8">
    <div className="mb-4">
      <h3 className="font-normal text-foreground mb-4">Analysis Result</h3>

      {result?.highlights?.length > 0 ? (
        <ul className="list-disc text-foreground pl-6 text-sm space-y-2">
          {result.highlights.map((h, idx) => (
            <li key={idx}>
              {h.infoText}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          No results found
        </p>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default OneShotCopyright;
