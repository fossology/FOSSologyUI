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
import { Link, useLocation } from "react-router-dom";

// React Bootstrap Imports
import { Navbar, Nav } from "react-bootstrap";

// Routes for all the pages
import routes from "constants/routes";

// Helper Functions
import { isAuth } from "shared/authHelper";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <Navbar expand="lg" className="py-0 pl-0 mt-3 bg-primary-color">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* Checking whether the user is authenticated */}
            {isAuth() && (
              <>
                <Nav.Link
                  as={Link}
                  to={routes.browseUploads.softwareHeritage}
                  className={
                    location.pathname ===
                      routes.browseUploads.softwareHeritage && "active-nav-item"
                  }
                >
                  Software Heritage
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={routes.browseUploads.licenseBrowser}
                  className={
                    location.pathname === routes.browseUploads.licenseBrowser &&
                    "active-nav-item"
                  }
                >
                  License Browser
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={routes.browseUploads.fileBrowser}
                  className={
                    location.pathname === routes.browseUploads.fileBrowser &&
                    "active-nav-item"
                  }
                >
                  File Browser
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={routes.browseUploads.copyright}
                  className={
                    location.pathname === routes.browseUploads.copyright &&
                    "active-nav-item"
                  }
                >
                  Copyright Browser
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={routes.browseUploads.ecc}
                  className={
                    location.pathname === routes.browseUploads.ecc &&
                    "active-nav-item"
                  }
                >
                  ECC
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
