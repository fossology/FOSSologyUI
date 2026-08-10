/*
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import routes from "@/constants/routes";

import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
importObligationCsv,
importObligationJson,
} from "@/services/obligation";

export default function ObligationImportClient() {
const router = useRouter();

const [files, setFiles] = useState([]);
const [delimiter, setDelimiter] = useState("");
const [enclosure, setEnclosure] = useState("");
const [message, setMessage] = useState(null);
const [showMessage, setShowMessage] = useState(false);
const [importResults, setImportResults] = useState([]);
const [uploading, setUploading] = useState(false);

const fileInputRef = useRef(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (files.length === 0) return;

  try {
    setUploading(true);

    const uploadableFiles = files.filter((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      return ext === "csv" || ext === "json";
    });

    if (uploadableFiles.length === 0) {
      setMessage({
        type: "error",
        text: "Only CSV and JSON files are supported.",
      });
      setShowMessage(true);
      return;
    }

    const results = [];

    for (const file of uploadableFiles) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const formData = new FormData();

      let response;

      if (ext === "csv") {
        formData.append("fileInput", file);
        formData.append("delimiter", delimiter || ",");
        formData.append("enclosure", enclosure || '"');

        response = await importObligationCsv(formData);
      } else {
        formData.append("fileInput", file);

        response = await importObligationJson(formData);
      }

      results.push({
        fileName: file.name,
        message: response?.message || "Imported successfully",
      });
    }

    setImportResults(results);

    setMessage({
      type: "success",
      text: `${uploadableFiles.length} file(s) imported successfully.`,
    });

    setShowMessage(true);
  } catch (error) {
    console.error(error);

    setImportResults([]);

    setMessage({
      type: "error",
      text:
        error?.message ||
        error?.body?.message ||
        "Obligation import failed",
    });

    setShowMessage(true);
  } finally {
    setUploading(false);
  }
};

const handleBack = () => {
    router.push(routes.admin.obligation.operations);
};

return (
    <div>
        {showMessage && message && (
        <div className="mb-4">
            <AlertBanner
            type={
                message.type === "error"
                ? "Error"
                : message.type === "success"
                ? "Success"
                : "Info"
            }
            description={message.text}
            showClose
            onClose={() => setShowMessage(false)}
            />
        </div>
        )}
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Operations
    </h1>

    <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Obligation Import
    </h2>

    <p className="mb-6 max-w-5xl text-base text-gray-900">
        This option permits uploading a CSV or JSON file from your computer to FOSSology.
        <br />
        Your FOSSology server has imposed a maximum upload file size of 700Mbytes
    </p>

    <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <Label className="block mb-3">
                Select the CSV-file or JSON-file to upload:
            </Label>

            <div className="flex items-end gap-3">
            <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            multiple
            disabled={uploading}
            className="hidden"
            onChange={(e) =>
                setFiles(Array.from(e.target.files || []))
            }
            />

            <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
            onClick={() => fileInputRef.current?.click()}
            >
            Choose Files
            </Button>

            <span
            className={`self-end text-sm ${
                files.length > 0
                ? "text-info-500"
                : "text-error-600"
            }`}
            >
            {files.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                {files.map((file) => (
                    <span key={file.name}>
                    {file.name}
                    </span>
                ))}
                </div>
            ) : (
                "No file chosen"
            )}
            </span>
        </div>

        <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
            <Label className="min-w-[100px]">
                Delimiter:
            </Label>

            <Input
                type="text"
                name="delimiter"
                placeholder=","
                value={delimiter}
                onChange={(e) =>
                setDelimiter(e.target.value)
                }
                className="w-[160px]"
            />
            </div>

            <div className="flex items-center gap-4">
            <Label className="min-w-[100px]">
                Enclosure:
            </Label>

            <Input
                type="text"
                name="enclosure"
                placeholder={'"'}
                value={enclosure}
                onChange={(e) =>
                setEnclosure(e.target.value)
                }
                className="w-[160px]"
            />
            </div>
        </div>
        </div>

        <div className="flex gap-6">
        <Button
            type="button"
            variant="outline"
            onClick={handleBack}
        >
            Back
        </Button>

        <Button
        type="submit"
        disabled={files.length === 0 || uploading}
        >
        {uploading ? "Uploading..." : "Upload"}
        </Button>
        </div>

        {importResults.length > 0 && (
            <div className="mt-8">
                <div className="mb-4">
                <h3 className="font-normal text-foreground mb-4">
                    Import Results
                </h3>

                <div className="space-y-6">
                    {importResults.map((result) => (
                    <div key={result.fileName}>
                        <p className="font-medium text-foreground mb-2">
                        {result.fileName}
                        </p>

                        <div className="whitespace-pre-line text-sm text-foreground">
                        {result.message}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            )}
    </form>
    </div>
);
}
