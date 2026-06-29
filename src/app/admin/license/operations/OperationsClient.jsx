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
} from "@/services/licenses";

const OperationsClient = () => {
    const router = useRouter();

    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const handleImport = () => {
        router.push(routes.admin.license.licenseImport);
    };

    const downloadFile = async (apiCall, id, extension, filenamePrefix) => {
    try {
        const response = await apiCall(id);

        const blob = await response.blob();
        const disposition = response.headers.get("content-disposition");

        const now = new Date();

        const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        let filename =
        `${filenamePrefix}-${now.getFullYear()}${
            months[now.getMonth()]
        }${String(now.getDate()).padStart(2, "0")}${
            String(now.getHours()).padStart(2, "0")
        }${String(now.getMinutes()).padStart(2, "0")}${
            String(now.getSeconds()).padStart(2, "0")
        }.${extension}`;

        if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) filename = match[1];
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setMessage({
        type: "success",
        text: `${extension.toUpperCase()} export completed successfully.`,
        });
        setShowMessage(true);

    } catch (error) {
        console.error(error);

        setMessage({
        type: "error",
        text: error?.message || "Export failed",
        });
        setShowMessage(true);
    }
    };

    const handleJsonExportAll = () =>
        downloadFile(
            exportLicenseJson,
            0,
            "json",
            "fossology-license-export"
        );

        const handleCsvExportAll = () =>
        downloadFile(
            exportLicenseCsv,
            0,
            "csv",
            "fossology-license-export"
        );

        const handleJsonExportMarydone = () => {
            setMessage({
                type: "info",
                text: "Marydone JSON export is not available in OpenAPI v2 yet.",
            });
            setShowMessage(true);
        };

        const handleCsvExportMarydone = () => {
            setMessage({
                type: "info",
                text: "Marydone CSV export is not available in OpenAPI v2 yet.",
            });
            setShowMessage(true);
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
            >
            JSON export all
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleJsonExportMarydone}
            >
            JSON export marydone
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleCsvExportAll}
            >
            CSV export all
            </Button>

            <Button
            type="button"
            variant="default"
            onClick={handleCsvExportMarydone}
            >
            CSV export marydone
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
