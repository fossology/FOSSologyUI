/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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

import React from "react";

// Title
import Title from "components/Title";

// Widgets
import { Button, InputContainer } from "components/Widgets";

const OneShotAnalysis = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {};
  return (
    <>
      <Title title="One-Shot License Analysis" />
      <div className="main-container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <h1 className="font-size-main-heading">
              One-Shot License Analysis
            </h1>
            <br />
            <div className="font-size-medium">
              This analyzer allows you to upload a single file for license
              analysis. The limitations:
              <ul>
                <li>
                  The analysis is done in real-time. Large files may take a
                  while. This method is not recommended for files larger than a
                  few hundred kilobytes.
                </li>
                <li>
                  Files that contain files are not unpacked. If you upload a
                  'zip' or 'deb' file, then the binary file will be scanned for
                  licenses and nothing will likely be found.
                </li>
                <li>
                  Results are not stored. As soon as you get your results, your
                  uploaded file is removed from the system.
                </li>
              </ul>
            </div>
            <InputContainer
              type="file"
              name="folderId"
              id="upload-one-shot-analysis"
              onChange={(e) => handleChange(e)}
            >
              Select the file to upload:
            </InputContainer>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="mt-4"
            >
              Analyze
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneShotAnalysis;
