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

export default function RulesImportClient() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // TODO: call Rules Import API
  };

  const handleBack = () => {
    router.push(routes.admin.compatibility.operations);
  };

  const fileInputRef = useRef(null);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Operations
      </h1>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Admin License Rules Import
      </h2>

      <p className="mb-6 max-w-5xl text-base text-gray-900">
        This option permits uploading a YAML file from your computer to
        FOSSology.
        <br />
        Your FOSSology server has imposed a maximum upload file size of
        700Mbytes.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div>
            <label className="block font-normal mb-3">
              Select the YAML-file to upload:
            </label>

            <div className="flex items-end gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".yaml,.yml"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <Button
                type="button"
                variant="outline"
                className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>

              <span
                className={`self-end text-sm ${
                  file
                    ? "text-info-500"
                    : "text-error-600"
                }`}
              >
                {file ? file.name : "No file chosen"}
              </span>
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
            disabled={!file}
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
