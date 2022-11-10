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
// Routes for all the pages
import routes from   "constants/routes";
import React from "react";
// React Bootstrap Imports
import { Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// Helper Functions
import { isAuth } from "shared/authHelper";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <Navbar   expand="lg" className="py-0 pl-0 mt-3 bg-browse-uploads-header">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ml-auto py-2">
            {/* Checking whether the user is authenticated */}
            {isAuth() && (
              <>
                <Link
                  to={routes.browseUploads.softwareHeritage}
                  className={
                    location.pathname === routes.browseUploads.softwareHeritage
                      ? "active-browse-nav-item browse-uploads-nav-item"
                      : "browse-uploads-nav-item"
                  }
                >
                  Software Heritage
                </Link>
                <Link
                  to={`${routes.browseUploads.licenseBrowser}/uploadID=:uploadID`}
                  className={
                    location.pathname.includes(
                      routes.browseUploads.licenseBrowser
                    )
                      ? "active-browse-nav-item browse-uploads-nav-item"
                      : "browse-uploads-nav-item"
                  }
                >
                  License Browser
                </Link>
                <Link
                  to={routes.browseUploads.fileBrowser}
                  className={
                    location.pathname === routes.browseUploads.fileBrowser
                      ? "active-browse-nav-item browse-uploads-nav-item"
                      : "browse-uploads-nav-item"
                  }
                >
                  File Browser
                </Link>
                <Link
                  to={routes.browseUploads.copyright}
                  className={
                    location.pathname === routes.browseUploads.copyright
                      ? "active-browse-nav-item browse-uploads-nav-item"
                      : "browse-uploads-nav-item"
                  }
                >
                  Copyright Browser
                </Link>
                <Link
                  to={routes.browseUploads.ecc}
                  className={
                    location.pathname === routes.browseUploads.ecc
                      ? "active-browse-nav-item browse-uploads-nav-item"
                      : "browse-uploads-nav-item"
                  }
                >
                  ECC
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
