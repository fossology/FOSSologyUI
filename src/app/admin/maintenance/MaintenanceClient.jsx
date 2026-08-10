/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)
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

import React, { useEffect, useState } from "react";

// External Links
import externalLinks from "@/constants/externalLinks";

import { createMaintenance, getMaintenanceInfo } from "@/services/maintenance";
import {
  maintenanceOptions,
  initialMaintenanceFields,
  initialMessage,
} from "@/constants/constants";

import { AlertBanner } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Button,
  InputContainer,
  Spinner,
} from "@/components/Widgets";


const ManageMaintenance = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(initialMaintenanceFields);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [lastRun, setLastRun] = useState(null);

  useEffect(() => {
    getMaintenanceInfo()
      .then((res) => setLastRun(res?.lastRun ?? null))
      .catch(() => setLastRun(null));
  }, []);

  const formatLastRun = (date) =>
    new Date(date).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });

  const handleChange = (value, name) => {
    if (name === "logsDate" || name === "goldDate") {
      setFields((prev) => ({
        ...prev,
        [name]: value.target.value,
      }));
      return;
    }

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasSelection = maintenanceOptions.some(
    ({ key }) => fields[key]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  const req = {
    options: maintenanceOptions
      .map(({ key }) => key)
      .filter((key) => fields[key]),
    logsDate: fields.logsDate,
    goldDate: fields.goldDate,
  };

    try {
      const res = await createMaintenance(req);
      setMessage({ type: "success", text: res.message });
      setFields(initialMaintenanceFields);
    } catch (error) {
      setMessage({ type: "error", text:
        error?.message ||
        "Failed to queue maintenance agent.", });
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const alertType =
    message.type === "success"
      ? "Success"
      : message.type === "error"
        ? "Error"
        : "Info";

  return (
    <div className="max-w-5xl mx-40 my-6 px-4">
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
            FOSSology Maintenance
          </h1>
          {lastRun && (
            <div className="mb-4">
              <AlertBanner
                type="Info"
                description={`Last maintenance job was executed on ${formatLastRun(lastRun)}`}
                showClose={false}
              />
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            <div className="space-y-7">
              {maintenanceOptions
                .filter(({ key }) => key !== "o" && key !== "l")
                .map(({ key, label }) => (
                  <InputContainer
                    key={key}
                    type="checkbox"
                    checked={fields[key]}
                    name={key}
                    id={`maintenance-${key}`}
                    onChange={(checked) => handleChange(checked, key)}
                  >
                    {label}
                  </InputContainer>
              ))}
            </div>

            <div className="space-y-4">
            <InputContainer
              type="checkbox"
              checked={fields.o}
              name="o"
              id="maintenance-o"
              onChange={(checked) => handleChange(checked, "o")}
            >
              Remove older gold files from repository.
            </InputContainer>

            <div className="w-80 ml-8">
              <Input
                type="date"
                name="goldDate"
                value={fields.goldDate}
                onChange={(e) => handleChange(e, "goldDate")}
              />
            </div>
            </div>

            <div className="space-y-4">
            <InputContainer
              type="checkbox"
              checked={fields.l}
              name="l"
              id="maintenance-l"
              onChange={(checked) => handleChange(checked, "l")}
            >
              Remove older log files from repository.
            </InputContainer>

            <div className="w-80 ml-8">
              <Input
                type="date"
                name="logsDate"
                value={fields.logsDate}
                onChange={(e) => handleChange(e, "logsDate")}
              />
            </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !hasSelection}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Queue Maintenance Agent"
              )}
            </Button>
          </form>

          <div className="mt-8 text-sm">
            More information about these operations can be found{" "}
            <a
              href={externalLinks.maintenanceAgent}
              target="_blank"
              rel="noopener noreferrer"
              className= "text-primary hover:text-accent-foreground underline"
            >
              here
            </a>
            .
          </div>
    </div>
  );
};

export default ManageMaintenance;
