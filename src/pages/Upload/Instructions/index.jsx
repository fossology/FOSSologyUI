/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
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
import { Link } from "react-router-dom";
import routes from "../../../constants/routes";
import externalLinks from "../../../constants/externalLinks";

const Instructions = () => {
  return (
    <div className="main-container my-3">
      Select optional analysis FOSSology has many options for importing and
      uploading files for analysis. The options vary based on <i>where</i> the
      data to upload is located. The data may be located:
      <ul>
        <li>
          <b>On your browser system</b>. Use the{" "}
          <Link to={routes.upload.file}> Upload File </Link>
          option to select and upload the file.
          <ul>
            <li>
              While this can be very convenient (particularly if the file is not
              readily accessible online), uploading via your web browser can be
              slow for large files, and files larger than 650 Megabytes may not
              be uploadable.
            </li>
          </ul>
        </li>
        <li>
          <b>On a remote server</b>. Use the{" "}
          <Link to={routes.upload.url}> Upload from URL </Link>
          option to specify a remote server.
          <ul>
            <li>
              This is the most flexible option, but the URL must denote a
              publicly accessible HTTP, HTTPS, or FTP location.
            </li>
            <li>
              URLs that require authentication or human interactions cannot be
              downloaded through this automated system.
            </li>
          </ul>
        </li>
        <li>
          <b>On the FOSSology web server</b>. Use the{" "}
          <Link to={routes.upload.server}> Upload from Server </Link>
          option to specify a file or path on the server.
          <ul>
            <li>
              This option is intended for developers who have mounted
              directories containing source trees.
            </li>
            <li>The directory must be accessible via the web server's user.</li>
            {/* <li>
              The list of allowed folders can be modified in
              <a href="/repo/?mod=foconfig"> Configuration Variables </a>.
            </li> */}
          </ul>
        </li>
        <li>
          <b>On the version control system</b>. Use the{" "}
          <Link to={routes.upload.vcs}>
            {" "}
            Upload from Version Control System{" "}
          </Link>
          option to specify URL of a repo.
        </li>
      </ul>
      If your system is configured to use multiple agent servers, the data area
      must be mounted and accessible to the FOSSology user (fossy) on every
      agent system. See the section
      <em>Configuring the Scheduler in the</em>{" "}
      <a href={externalLinks.jobSchedulerWiki} target="_blank" rel="noreferrer">
        Scheduler documentation
      </a>
      .
    </div>
  );
};

export default Instructions;
