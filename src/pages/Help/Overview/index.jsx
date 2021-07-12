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
import Image from "../../../components/Widgets/Image";
import microscope from "../../../assets/images/microscope.svg";
import fossologyFlow from "../../../assets/images/fossologyFlow.svg";
import externalLinks from "../../../constants/externalLinks";

const Overview = () => {
  return (
    <div className="main-container my-3">
      <div>
        <h2 className="text-primary-color font-size-sub-heading">
          The FOSSology Toolset
        </h2>
        <p>
          FOSSology is a framework for software analysis tools. The current
          FOSSology tools can:
        </p>
        <ul className="triangle-bullets">
          <li>Find license references in software</li>
          <li>Browse uploaded file hierarchies</li>
          <li>Find copyrights, url's and email addresses</li>
          <li>
            Classify licenses into user definable categories (aka buckets)
          </li>
          <li>Browse package (rpm, apt) metadata</li>
        </ul>
      </div>
      <div className="row m-0 justify-content-end">
        <div className="col-md-3 p-md-0">
          <Image
            src={microscope}
            alt="woman using microscope"
            width="222"
            height="216"
            align="right"
            className="mx-auto mx-md-0"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6 p-md-0">
          <h2 className="text-primary-color font-size-sub-heading">
            FOSSology's Graphical User Interface
          </h2>
          <p>
            FOSSology is a framework for software analysis tools. The current
            FOSSology tools can:
          </p>
          <ul className="triangle-bullets">
            <li>Find license references in software</li>
            <li>Browse uploaded file hierarchies</li>
            <li>Find copyrights, url's and email addresses</li>
            <li>
              Classify licenses into user definable categories (aka buckets)
            </li>
            <li>Browse package (rpm, apt) metadata</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-primary-color font-size-sub-heading">
          How to Begin
        </h2>
        <p>
          The menu at the top contains all the primary capabilities of
          FOSSology. Most functions require you to log in before they can be
          accessed. The following functions are available without logging in:
          <br /> <br />
          <b>Login:</b> If you log in, you can access additional capabilities.
          Depending on your account's access rights, you may be able to upload
          files, schedule analysis tasks, or even add new users.
        </p>
      </div>
      <div className="row m-0">
        <div className="col-md-6 col-lg-6 p-md-0">
          <h2 className="text-primary-color font-size-sub-heading">
            Inside FOSSology
          </h2>
          <p>
            Some parts of FOSSology helpful to know about are:
            <br /> <br />
            <b>Software Repository</b> - Stores files uploaded for analysis.{" "}
            <br />
            <b>Database</b> - Stores user accounts, file information, and
            analysis results.
            <br />
            <b>Agents</b> - Perform analysis of files and data found in the
            Software Repository and Database.
            <br />
            <b>Scheduler</b> - Runs the agents, making efficient use of
            available resources. <br />
            <b>Web GUI</b> ­ - Provides user access to FOSSology. <br />
            <b>Command line utilities</b> ­ - Provides scripting access to
            FOSSology.{" "}
          </p>
        </div>
        <div className="col p-md-0">
          <Image
            src={fossologyFlow}
            alt="fossology flow"
            width="173"
            height="259"
            className="mx-auto mx-md-0"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div>
        <h2 className="text-primary-color font-size-sub-heading">
          Need Some Help?
        </h2>
        <p>
          Now that you have been introduced to Fossology, try exploring it!{" "}
          <br />
          The following resources will provide additional help and information:{" "}
          <br /> <br />
          <a
            href={externalLinks.fossologyWebsite}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            FOSSology web site
          </a>{" "}
          - Where you can find more information and get help on FOSSology.
        </p>
      </div>
    </div>
  );
};

export default Overview;
