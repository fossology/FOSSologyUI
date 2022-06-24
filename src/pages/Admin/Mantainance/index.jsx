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
import { Button, InputContainer, Spinner } from "components/Widgets";
import { initialMantainanceFields } from "constants/constants";

const ManageMantainance = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(initialMantainanceFields);

  const handleChange = (e) => {
    const { name } = e.target;

    if (Object.keys(fields).find((field) => field === name)) {
      setFields({ ...fields, [e.target.name]: e.target.checked });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      <Title title="FOSSology Maintenance" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-size-main-heading mt-4">
              FOSSology Maintenance
            </h1>
          </div>
          <div className="col-12">
            <form className="my-3">
              <InputContainer
                type="checkbox"
                checked={fields.allNonSlow}
                name="allNonSlow"
                className="my-3"
                id="all-non-slow"
                onChange={(e) => handleChange(e)}
              >
                Run all non slow maintenance operations.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.allOperations}
                name="allOperations"
                className="my-3"
                id="all-operations"
                onChange={(e) => handleChange(e)}
              >
                Run all maintenance operations.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.validateFolderContents}
                name="validateFolderContents"
                className="my-3"
                id="validate-folder-contents"
                onChange={(e) => handleChange(e)}
              >
                Validate folder contents.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvGoldFiles}
                name="rmvGoldFiles"
                className="my-3"
                id="remove-gold-files"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned gold files.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvOrphanedRows}
                name="rmvOrphanedRows"
                className="my-3"
                id="remove-orphaned-rows"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned rows from database.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvLogFiles}
                name="rmvLogFiles"
                className="my-3"
                id="remove-log-files"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned log files from file system.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.normalizePriority}
                name="normalizePriority"
                className="my-3"
                id="normalize-priority"
                onChange={(e) => handleChange(e)}
              >
                Normalize priority
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvUploads}
                name="rmvUploads"
                className="my-3"
                id="remove-uploads"
                onChange={(e) => handleChange(e)}
              >
                Remove uploads with no pfiles.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvTokens}
                name="rmvTokens"
                className="my-3"
                id="remove-tokens"
                onChange={(e) => handleChange(e)}
              >
                Remove expired personal access tokens.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvTempTables}
                name="rmvTempTables"
                className="my-3"
                id="remove-temp-tables"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned temp tables.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.analyseDb}
                name="analyseDb"
                className="my-3"
                id="analyse-db"
                onChange={(e) => handleChange(e)}
              >
                Vacuum Analyze the database.
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvRepoFiles}
                name="rmvRepoFiles"
                className="my-3"
                id="remove-repo-files"
                onChange={(e) => handleChange(e)}
              >
                Remove orphaned files from the repository (slow).
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.dbReindexing}
                name="dbReindexing"
                className="my-3"
                id="database-reindexing"
                onChange={(e) => handleChange(e)}
              >
                Reindexing of database (This activity may take 5-10 mins.
                Execute only when system is not in use).
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.verbose}
                name="verbose"
                className="my-3"
                id="verbose"
                onChange={(e) => handleChange(e)}
              >
                Verbose (turns on debugging output).
              </InputContainer>

              <InputContainer
                type="checkbox"
                checked={fields.rmvRepoOldFiles1}
                name="rmvRepoOldFiles1"
                className="mt-3"
                id="rmv-repo-old-files-1"
                onChange={(e) => handleChange(e)}
              >
                Remove older gold files from repository.
              </InputContainer>

              <InputContainer
                type="date"
                className="col-3"
                name="rmvRepoOldFiles1Date"
                id="remove-repo-old-files-1-date"
              />

              <InputContainer
                type="checkbox"
                checked={fields.rmvRepoOldFiles2}
                name="rmvRepoOldFiles2"
                className="mt-3"
                id="rmv-repo-old-files-2"
                onChange={(e) => handleChange(e)}
              >
                Remove older gold files from repository.
              </InputContainer>

              <InputContainer
                type="date"
                className="col-3"
                name="rmvRepoOldFiles1Date"
                id="remove-repo-old-files-1-date"
              />

              <Button type="submit" onClick={handleSubmit} className="mt-4">
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Queue the maintanance agent"
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
