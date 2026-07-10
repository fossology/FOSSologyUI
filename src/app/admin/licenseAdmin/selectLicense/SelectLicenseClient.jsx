/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import React, { useEffect, useMemo, useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { AlertBanner } from "@/components/ui/alert";
import { Spinner } from "@/components/Widgets";
import { Label } from "@/components/ui/label";

// Services
import { getAllLicense } from "@/services/licenses";

// Helper
import { handleError } from "@/shared/helper";

const SelectLicense = () => {
  const [licenses, setLicenses] = useState([]);
  const [filter, setFilter] = useState("");
  const [familyName, setFamilyName] = useState("");

  const [loading, setLoading] = useState(true);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({
    type: "success",
    text: "",
  });

  useEffect(() => {
    getAllLicense({
      page: 1,
      limit: 1000,
      kind: "all",
    })
      .then((res) => {
        setLicenses(Array.isArray(res) ? res : []);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const familyNames = useMemo(() => {
    const families = new Set();

    licenses.forEach((license) => {
      if (!license.shortName) return;

      if (
        license.shortName === "No_license_found" ||
        license.shortName === "Unknown license"
      ) {
        families.add(license.shortName);
      } else {
        const family = license.shortName.split(/[\s_\-\(\[\/]/)[0];
        families.add(family);
      }
    });

    return ["All", ...Array.from(families).sort()];
  }, [licenses]);

  const handleFind = (e) => {
    e.preventDefault();

    console.log({
      filter,
      familyName,
    });

    // TODO:
    // Navigate to license listing page
    // or filter licenses after table implementation
  };

  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div>
      {showMessage && (
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
        Select License
      </h1>

      <form onSubmit={handleFind} className="space-y-6">
        <p className="text-sm">
          What license family do you wish to view:
        </p>

        <div>
          <Label className="block mb-3">
            Filter:
          </Label>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="done">Checked</SelectItem>
              <SelectItem value="notdone">Not Checked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block mb-3">
            License family name:
          </Label>

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading license families...
            </div>
          ) : (
            <Select
              value={familyName}
              onValueChange={setFamilyName}
            >
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Select license family" />
              </SelectTrigger>

              <SelectContent>
                {familyNames.map((family) => (
                  <SelectItem key={family} value={family}>
                    {family}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="default"
            disabled={
              loading ||
              !filter ||
              !familyName
            }
          >
            Find
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SelectLicense;
