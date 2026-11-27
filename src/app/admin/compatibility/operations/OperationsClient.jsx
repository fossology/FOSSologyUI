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

import { useRouter } from "next/navigation";
// Routes
import routes from "@/constants/routes";
import { useState } from "react";
// UI Components
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
// API services
import { exportLicenseRules } from "@/services/licenses";

const OperationsClient = () => {
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [exporting, setExporting] = useState(false);

  const alertType =
    message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  const handleImport = () => {
    router.push(routes.admin.compatibility.rulesImport);
  };

  const handleExport = async () => {
    try {
      setExporting(true);

      const { blob, filename } = await exportLicenseRules();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "license-rules.yaml";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setMessage({
        type: "success",
        text: "Rules exported successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.body?.message ||
          error?.message ||
          "Failed to export rules.",
      });
    } finally {
      setExporting(false);
      setShowMessage(true);
    }
  };

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
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Operations
      </h1>

      <div className="flex gap-6">
        <Button
          type="button"
          variant="default"
          onClick={handleImport}
        >
          Rules Import
        </Button>

        <Button
          type="button"
          variant="default"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? "Exporting..." : "Rules Export"}
        </Button>
      </div>
    </div>
  );
};

export default OperationsClient;
