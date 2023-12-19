/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)
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

import React, { useState } from "react";

// Title
import Title from "components/Title";
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";
import { initialMantainanceFields, initialMessage } from "constants/constants";
import createMaintenance from "services/maintenance";

const ManageMantainance = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(initialMantainanceFields);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    const { name } = e.target;

    if (Object.keys(fields).find((field) => field === name)) {
      if (name === "logsDate" || name === "goldDate") {
        setFields({ ...fields, [name]: e.target.value });
      } else {
        setFields({ ...fields, [name]: e.target.checked });
      }
    }
  };

  const getSelectedKeys = () => {
    // eslint-disable-next-line func-names
    return Object.keys(fields).filter(function (key) {
      return fields[key] === true;
    });
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
      setMessage({
        type: "success",
        text: res.message,
      });
      setFields(initialMantainanceFields);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.message,
      });
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };
  return (
    <>
      <Title title="FOSSology Maintenance" />
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
              <InputContainer
                type="checkbox"
                checked={fields.a}
                name="a"
                className="my-3"
                id="all-non-slow"
                onChange={(e) => handleChange(e)}
              >
                Run all non slow maintenance operations.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.A}
                name="A"
                className="my-3"
                id="all-operations"
                onChange={(e) => handleChange(e)}
              >
                Run all maintenance operations.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.F}
                name="F"
                className="my-3"
                id="validate-folder-contents"
                onChange={(e) => handleChange(e)}
              >
                Validate folder contents.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.g}
                name="g"
                className="my-3"
                id="remove-gold-files"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned gold files.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.E}
                name="E"
                className="my-3"
                id="remove-orphaned-rows"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned rows from database.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.L}
                name="L"
                className="my-3"
                id="remove-log-files"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned log files from file system.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.N}
                name="N"
                className="my-3"
                id="normalize-priority"
                onChange={(e) => handleChange(e)}
              >
                Normalize priority
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.R}
                name="R"
                className="my-3"
                id="remove-uploads"
                onChange={(e) => handleChange(e)}
              >
                Remove uploads with no pfiles.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.t}
                name="t"
                className="my-3"
                id="remove-tokens"
                onChange={(e) => handleChange(e)}
              >
                Remove expired personal access tokens.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.T}
                name="T"
                className="my-3"
                id="remove-temp-tables"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned temp tables.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.D}
                name="D"
                className="my-3"
                id="analyse-db"
                onChange={(e) => handleChange(e)}
              >
                Vacuum Analyze the database.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.Z}
                name="Z"
                className="my-3"
                id="remove-repo-files"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned files from the repository (slow).
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.I}
                name="I"
                className="my-3"
                id="database-reindexing"
                onChange={(e) => handleChange(e)}
              >
                Reindexing of database (This activity may take 5-10 mins.
                Execute only when system is not in use).
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.v}
                name="v"
                className="my-3"
                id="verbose"
                onChange={(e) => handleChange(e)}
              >
                Verbose (turns on debugging output).
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.o}
                name="o"
                className="mt-3"
                id="rmv-repo-old-files-1"
                onChange={(e) => handleChange(e)}
              >
                Remove older gold files from repository.
              </InputContainer>

              <InputContainer
                type="date"
                className="col-3"
                name="logsDate"
                id="logs-date"
                onChange={(e) => handleChange(e)}
              />

              <InputContainer
                type="checkbox"
                checked={fields.l}
                name="l"
                className="mt-3"
                id="rmv-repo-old-files-2"
                onChange={(e) => handleChange(e)}
              >
                Remove older gold files from repository.
              </InputContainer>

              <InputContainer
                type="date"
                className="col-3"
                name="goldDate"
                id="gold-date"
                onChange={(e) => handleChange(e)}
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
    </>
  );
};

export default ManageMantainance;
