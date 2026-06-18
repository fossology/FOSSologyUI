/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

"use client";

import React from "react";
import Link from "next/link";

// Routes
import routes from "@/constants/routes";

// External Links
import externalLinks from "@/constants/externalLinks";

// UI
import { Button } from "@/components/ui/button";

const InstructionsPage = () => {
  return (
    <div className="max-w-5xl mx-40 my-6 px-4">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          Upload Instructions
        </h1>

        <p className="text-base font-semibold mb-4">
          Select optional analysis FOSSology has many options for importing and
          uploading files for analysis. The options vary based on{" "}
          <i>where</i> the data to upload is located. The data may be located:
        </p>

        <ul className="space-y-8">
          {/* Upload File */}
          <li>
            <h2 className="text-base font-medium mb-2">
              1. On your browser system
            </h2>

            <p className="text-sm mb-3">
              Use the Upload File option to select and upload the file.
            </p>

            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>
                Very convenient if the file is not readily accessible online.
              </li>

              <li>
                Uploading large files through the browser may be slow,
                and files larger than 650 MB may not be uploadable.
              </li>
            </ul>

            <Link href={routes.upload.file}>
              <Button
                type="button"
                variant="outline"
                className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              >
                Upload File
              </Button>
            </Link>
          </li>

          {/* Upload URL */}
          <li>
            <h2 className="text-base font-medium mb-2">
              2. On a remote server
            </h2>

            <p className="text-sm mb-3">
              Use the Upload from URL option to specify a remote server.
            </p>

            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>
                This is the most flexible option, but the URL must denote a publicly accessible HTTP, HTTPS, or FTP location. 
              </li>

              <li>
                URLs that require authentication or human interactions cannot be downloaded through this automated system.
              </li>
            </ul>

            <Link href={routes.upload.url}>
              <Button
                type="button"
                variant="outline"
                className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              >
                Upload from URL
              </Button>
            </Link>
          </li>

          {/* Upload Server */}
          <li>
            <h2 className="text-base font-medium mb-2">
              3. On the FOSSology web server
            </h2>

            <p className="text-sm mb-3">
              Use the Upload from Server option to specify a file or path on the server.
            </p>

            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>
                This option is intended for developers who have mounted directories containing source trees. 
              </li>

              <li>
                The directory must be accessible via the web server's user. 
              </li>
              <li>
                The list of allowed folders can be modified in{" "}
                <a
                  href={routes.admin.customize}
                  className="text-primary hover:text-accent-foreground underline"
                >
                  Configuration Variables
                </a>
                {"."}
              </li> 
            </ul>

            <Link href={routes.upload.server}>
              <Button
                type="button"
                variant="outline"
                className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              >
                Upload from Server
              </Button>
            </Link>
          </li>

          {/* Upload VCS */}
          <li>
            <h2 className="text-base font-medium mb-2">
              4. On the version control system
            </h2>

            <p className="text-sm mb-3">
              Use the Upload from Version Control System option to specify URL of a repo.
            </p>

            <Link href={routes.upload.vcs}>
              <Button
                type="button"
                variant="outline"
                className="font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              >
                Upload from Version Control System
              </Button>
            </Link>
          </li>
        </ul>

        <div className="mt-10 border-t border-gray-300 pt-5">
          <p className="text-sm leading-6">
            If your system is configured to use multiple agent servers,
            the data area must be mounted and accessible to the
            FOSSology user (fossy) on every agent system.
          </p>

          <p className="text-sm mt-3">
            See the section{" "}
            <em>Configuring the Scheduler</em> in the{" "}
            <a
              href={externalLinks.jobSchedulerWiki}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-accent-foreground underline"
            >
              Scheduler documentation
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
