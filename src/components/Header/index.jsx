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
import { Navbar, Nav } from "react-bootstrap";

// Widgets
import Image from "components/Widgets/Image";

// Assets
import logo from "assets/images/logo.svg";

// Routes for all the pages
import routes from "constants/routes";

// Helper Functions
import { isAuth, isAdmin } from "shared/authHelper";

// Custom Dropdowns
import UploadNavDropdown from "./NavDropdowns/UploadNavDropdown";
import JobsNavDropdown from "./NavDropdowns/JobsNavDropdown";
import OrganizeNavDropdown from "./NavDropdowns/OrganizeNavDropdown";
import AdminNavDropdown from "./NavDropdowns/AdminNavDropdown";
import HelpPagesDropdown from "./Dropdowns/HelpPagesDropdown";
import UserInfoDropdown from "./Dropdowns/UserInfoDropdown";
import HeaderNavLink from "./HeaderNavLink";
import ThemeToggleDropdown from "./Dropdowns/ThemeToggleDropdown";

const Header = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-primary-color py-0 pl-0 text-white"
        sticky="top"
      >
        <Navbar.Brand as={Link} to={routes.home} className="py-0">
          <Image
            src={logo}
            className="img-fluid bg-white py-1 px-2"
            alt="FOSSology"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <HeaderNavLink route={routes.home} name="Home" />

            {/* Checking whether the user is authenticated */}
            {isAuth() && (
              <>
                {/* NavLinks */}
                <HeaderNavLink route={routes.search} name="Search" />
                <HeaderNavLink route={routes.browse} name="Browse" />

                {/* Nav Dropdowns */}
                <UploadNavDropdown />
                <JobsNavDropdown />
                <OrganizeNavDropdown />

                {/* Checking whether user is having the role of admin */}
                {isAdmin() && <AdminNavDropdown />}
              </>
            )}
          </Nav>

          {/* Toggle Theme Dropdown */}
          <ThemeToggleDropdown />

          {/* Help Pages */}
          <HelpPagesDropdown />

          {/* User Info */}
          <UserInfoDropdown />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
