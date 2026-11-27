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
import routes from "@/constants/routes";
// UI Component
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
// API Services
import {
  exportUsersCsv,
  exportUsersJson,
} from "@/services/users";

const OperationsClient = () => {
    const router = useRouter();

    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [exporting, setExporting] = useState(null);

    const downloadFile = ({ blob, filename }) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        link.remove();
        URL.revokeObjectURL(url);
        };

        const createFilename = (extension) => {
        const now = new Date();

        const year = now.getFullYear();
        const month = now.toLocaleString("en-US", { month: "short" });
        const day = now.getDate();

        const random = Math.floor(10000 + Math.random() * 90000);

        return `fossology-users-export-${year}${month}${day}-${random}.${extension}`;
        };

    const handleImport = () => {
        router.push(routes.admin.users.userImport);
    };

    const handleJsonExport = async () => {
    try {
        setExporting("json");

        const file = await exportUsersJson();

        downloadFile({
        blob: file.blob,
        filename: file.filename ?? createFilename("json"),
        });

        setMessage({
        type: "success",
        text: "JSON exported successfully.",
        });
    } catch (error) {
        setMessage({
        type: "error",
        text:
            error?.body?.message ||
            error?.message ||
            "Failed to export JSON.",
        });
    } finally {
        setExporting(null);
        setShowMessage(true);
    }
    };

    const handleCsvExport = async () => {
    try {
        setExporting("csv");

        const file = await exportUsersCsv();

        downloadFile({
        blob: file.blob,
        filename: file.filename ?? createFilename("csv"),
        });

        setMessage({
        type: "success",
        text: "CSV exported successfully.",
        });
    } catch (error) {
        setMessage({
        type: "error",
        text:
            error?.body?.message ||
            error?.message ||
            "Failed to export CSV.",
        });
    } finally {
        setExporting(null);
        setShowMessage(true);
    }
    };

    const alertType =
    message?.type === "danger" || message?.type === "error"
        ? "Error"
        : message?.type === "success"
        ? "Success"
        : "Info";

    return (
        <div>
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
            <h1 className="mb-6 text-2xl font-semibold text-gray-900">
                Operations
            </h1>

            <div className="flex gap-6">
                <Button
                    type="button"
                    variant="default"
                    onClick={handleImport}
                >
                    User Import
                </Button>
                <Button
                    type="button"
                    variant="default"
                    onClick={handleJsonExport}
                    disabled={exporting === "json"}
                    >
                    {exporting === "json"
                        ? "Exporting..."
                        : "JSON Export"}
                </Button>

                <Button
                    type="button"
                    variant="default"
                    onClick={handleCsvExport}
                    disabled={exporting === "csv"}
                    >
                    {exporting === "csv"
                        ? "Exporting..."
                        : "CSV Export"}
                </Button>
            </div>
        </div>
    );
};

export default OperationsClient;