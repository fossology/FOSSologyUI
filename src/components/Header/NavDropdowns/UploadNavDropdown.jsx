/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

// React Imports
import React from "react";
import { Link } from "react-router-dom";

// React Bootstrap Imports
import { NavDropdown } from "react-bootstrap";

// Routes for all the pages
import routes from "constants/routes";

const UploadNavDropdown = () => {
  return (
    <>
      <NavDropdown title="Upload" id="uploads">
        <NavDropdown.Item as={Link} to={routes.upload.file}>
          From File
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.server}>
          From Server
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.url}>
          From URL
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.vcs}>
          From VCS
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.report}>
          Import Report
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.instructions}>
          Instructions
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.oneShotAnalysis}>
          One-Shot Analysis
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.oneShotCopyright}>
          One-Shot Copyright/Email/URL
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={routes.upload.oneShotMonk}>
          One-Shot Monk
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default UploadNavDropdown;
