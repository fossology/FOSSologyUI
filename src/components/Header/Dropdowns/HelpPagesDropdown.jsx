/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 Copyright (C) 2022 Raunak Kumar (raunakk728@gmail.com)

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
import { Dropdown } from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";

// Routes for all the pages
import routes from "constants/routes";

// External Link for documention
import externalLinks from "constants/externalLinks";

const HelpPagesDropdown = () => {
  return (
    <>
      <Dropdown drop="left">
        <Dropdown.Toggle variant="link" bsPrefix="p-0">
          <QuestionCircleFill color="#fff" size={40} className="m-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={routes.help.about}>
            About
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.help.overview}>
            Getting Started
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.help.licenseBrowser}>
            License Browser
          </Dropdown.Item>
          <Dropdown.Item
            href={externalLinks.fossologyWiki}
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.help.thirdPartyLicenses}>
            Third Party Licenses
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default HelpPagesDropdown;
