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

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
import routes from "@/constants/routes";

import {
  exportLicenseCsv,
  exportLicenseJson,
  exportMarydoneJson,
  exportMarydoneCsv
} from "@/services/licenses";

const OperationsClient = () => {
    const router = useRouter();

    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [exporting, setExporting] = useState(null);

    const handleImport = () => {
        router.push(routes.admin.license.licenseImport);
    };

    const downloadFile = ({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    };

    const createFilename = (extension, prefix = "fossology-license-export") => {
        const now = new Date();

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        return `${prefix}-${now.getFullYear()}${
            months[now.getMonth()]
        }${String(now.getDate()).padStart(2, "0")}${
            String(now.getHours()).padStart(2, "0")
        }${String(now.getMinutes()).padStart(2, "0")}${
            String(now.getSeconds()).padStart(2, "0")
        }.${extension}`;
    };

    const handleJsonExportAll = async () => {
    try {
        setExporting("json-all");

        const file = await exportLicenseJson(0);
        downloadFile({
        blob: file.blob,
        filename:
            file.filename || createFilename("json", "fossology-license-export"),
        });

        setMessage({
        type: "success",
        text: "JSON exported successfully.",
        });
    } catch (err) {
        setMessage({
        type: "error",
        text:
            err?.body?.message ||
            err?.message ||
            "Failed to export JSON.",
        });
    } finally {
        setExporting(null);
        setShowMessage(true);
    }
    };

    const handleCsvExportAll = async () => {
    try {
        setExporting("csv-all");

        const file = await exportLicenseCsv(0);

        downloadFile({
        blob: file.blob,
        filename:
            file.filename || createFilename("csv", "fossology-license-export"),
        });

        setMessage({
        type: "success",
        text: "CSV exported successfully.",
        });
    } catch (err) {
        setMessage({
        type: "error",
        text:
            err?.body?.message ||
            err?.message ||
            "Failed to export CSV.",
        });
    } finally {
        setExporting(null);
        setShowMessage(true);
    }
    };

    const handleJsonExportMarydone = async () => {
    try {
        setExporting("json-marydone");

        const file = await exportMarydoneJson();

        downloadFile({
        blob: file.blob,
        filename:
            file.filename ??
            createFilename("json", "fossology-license-marydone-export"),
        });

        setMessage({
        type: "success",
        text: "Marydone JSON exported successfully.",
        });
    } catch (err) {
        setMessage({
        type: "error",
        text:
            err?.body?.message ||
            err?.message ||
            "Failed to export Marydone JSON.",
        });
    } finally {
        setExporting(null);
        setShowMessage(true);
    }
    };

    const handleCsvExportMarydone = async () => {
    try {
        setExporting("csv-marydone");

        const file = await exportMarydoneCsv();

        downloadFile({
        blob: file.blob,
        filename:
            file.filename ??
            createFilename("csv", "fossology-license-marydone-export"),
        });

        setMessage({
        type: "success",
        text: "Marydone CSV exported successfully.",
        });
    } catch (err) {
        setMessage({
        type: "error",
        text:
            err?.body?.message ||
            err?.message ||
            "Failed to export Marydone CSV.",
        });
    } finally {
        setExporting(null);
        setShowMessage(true);
    }
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

        <div className="flex gap-6">
            <Button
            type="button"
            variant="default"
            onClick={handleJsonExportAll}
            disabled={exporting === "json-all"}
            >
            {exporting === "json-all"
                ? "Exporting..."
                : "JSON export all"}
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleJsonExportMarydone}
            disabled={exporting === "json-marydone"}
            >
            {exporting === "json-marydone"
                ? "Exporting..."
                : "JSON export marydone"}
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleCsvExportAll}
            disabled={exporting === "csv-all"}
            >
            {exporting === "csv-all"
                ? "Exporting..."
                : "CSV export all"}
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleCsvExportMarydone}
            disabled={exporting === "csv-marydone"}
            >
            {exporting === "csv-marydone"
                ? "Exporting..."
                : "CSV export marydone"}
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleImport}
            >
            License Import
            </Button>
        </div>
    </div>
    );
};

export default OperationsClient;
