/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)

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

// React Bootstrap Imports
import { Navbar } from "react-bootstrap";

// Routes for all the pages
import routes from "constants/routes";

// Helper Functions
import { isAuth } from "shared/authHelper";

// Custom Component
import BrowseUploadsLink from "./BrowseUploadsLink";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="py-0 pl-0 mt-3 bg-browse-uploads-header">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ml-auto py-2">
            {/* Checking whether the user is authenticated */}
            {isAuth() && (
              <>
                <BrowseUploadsLink
                  path={routes.browseUploads.softwareHeritage}
                  name="Software Heritage"
                />
                <BrowseUploadsLink
                  path={routes.browseUploads.licenseBrowser}
                  name="License Browser"
                />
                <BrowseUploadsLink
                  path={routes.browseUploads.fileBrowser}
                  name="File Browser"
                />
                <BrowseUploadsLink
                  path={routes.browseUploads.copyright}
                  name="Copyright Browser"
                />
                <BrowseUploadsLink path={routes.browseUploads.ecc} name="ECC" />
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
