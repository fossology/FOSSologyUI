/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)
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

import React, { useState } from "react";

import { Alert, Button, InputContainer, Spinner } from "@/components/Widgets";
import { initialMantainanceFields, initialMessage } from "@/constants/constants";
import createMaintenance from "@/services/maintenance";

const ManageMantainance = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(initialMantainanceFields);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    const { name } = e.target;

    if (Object.keys(fields).includes(name)) {
      if (name === "logsDate" || name === "goldDate") {
        setFields({ ...fields, [name]: e.target.value });
      } else {
        setFields({ ...fields, [name]: e.target.checked });
      }
    }
  };

  const getSelectedKeys = () => {
    return Object.keys(fields).filter((key) => fields[key] === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const req = {
      options: getSelectedKeys(),
      logsDate: fields.logsDate,
      goldDate: fields.goldDate,
    };

    try {
      const res = await createMaintenance(req);
      setMessage({ type: "success", text: res.message });
      setFields(initialMantainanceFields);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {showMessage && (
            <Alert
              type={message.type}
              setShow={setShowMessage}
              message={message.text}
            />
          )}
          <h1 className="font-size-main-heading mt-4">
            FOSSology Maintenance
          </h1>
        </div>
        <div className="col-12">
          <form className="my-3">
            {[
              ["a", "Run all non slow maintenance operations."],
              ["A", "Run all maintenance operations."],
              ["F", "Validate folder contents."],
              ["g", "Remove orphaned gold files."],
              ["E", "Remove orphaned rows from database."],
              ["L", "Remove orphaned log files from file system."],
              ["N", "Normalize priority"],
              ["R", "Remove uploads with no pfiles."],
              ["t", "Remove expired personal access tokens."],
              ["T", "Remove orphaned temp tables."],
              ["D", "Vacuum Analyze the database."],
              ["Z", "Remove orphaned files from the repository (slow)."],
              [
                "I",
                "Reindexing of database (This activity may take 5-10 mins. Execute only when system is not in use).",
              ],
              ["v", "Verbose (turns on debugging output)."],
              ["o", "Remove older gold files from repository."],
            ].map(([key, label]) => (
              <InputContainer
                key={key}
                type="checkbox"
                checked={fields[key]}
                name={key}
                className="my-3"
                id={`maintain-${key}`}
                onChange={handleChange}
              >
                {label}
              </InputContainer>
            ))}

            <InputContainer
              type="date"
              className="col-3"
              name="logsDate"
              id="logs-date"
              onChange={handleChange}
            />

            <InputContainer
              type="checkbox"
              checked={fields.l}
              name="l"
              className="mt-3"
              id="rmv-repo-old-files-2"
              onChange={handleChange}
            >
              Remove older gold files from repository.
            </InputContainer>

            <InputContainer
              type="date"
              className="col-3"
              name="goldDate"
              id="gold-date"
              onChange={handleChange}
            />

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={getSelectedKeys().length === 0}
              className="mt-4"
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
                "Queue the maintenance agent"
              )}
            </Button>
          </form>
          <div className="my-3">
            <span className="mr-2">
              More information about these operations can be found
            </span>
            <a href="https://github.com/fossology/fossology/wiki/Maintenance-Agent">
              here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMantainance;
