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
import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";

// React Bootstrap Imports
import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { QuestionCircleFill, PersonCircle } from "react-bootstrap-icons";

// List of all accessible groups
import { getAllGroups } from "services/groups";

// Widgets
import Image from "components/Widgets/Image";
import TextIcon from "components/Widgets/TextIcon";

// Assets
import logo from "assets/images/logo.svg";

// Routes for all the pages
import routes from "constants/routes";

// External Link for documention
import externalLinks from "constants/externalLinks";

// Helper Functions
import { logout, isAuth, getUserName, isAdmin } from "shared/authHelper";
import { getLocalStorage, setLocalStorage } from "shared/storageHelper";
import { getNameInitials } from "shared/helper";

// Dark Theme Toggle Button
import DarkThemeToggle from "../DarkThemeToggle/DarkThemeToggle";

// custom css
import "./index.css";

const Header = () => {
  const [currentGroup, setCurrentGroup] = useState(
    getLocalStorage("currentGroup") || getLocalStorage("user")?.default_group
  );
  const history = useHistory();
  const location = useLocation();
  const handleLogin = () => {
    history.push(routes.home);
  };
  const handleGroupChange = (e) => {
    setLocalStorage("currentGroup", e.target.innerText);
    setCurrentGroup(e.target.innerText);
  };
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
            <Nav.Link
              as={Link}
              to={routes.home}
              className={location.pathname === routes.home && "active-nav-item"}
            >
              Home
            </Nav.Link>

            {/* Checking whether the user is authenticated */}
            {isAuth() && (
              <>
                <Nav.Link
                  as={Link}
                  to={routes.search}
                  className={
                    location.pathname === routes.search && "active-nav-item"
                  }
                >
                  Search
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={routes.browse}
                  className={
                    location.pathname === routes.browse && "active-nav-item"
                  }
                >
                  Browse
                </Nav.Link>
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
                  <NavDropdown.Item as={Link} to={routes.upload.importReport}>
                    Import Report
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={routes.upload.instructions}>
                    Instructions
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={routes.upload.oneShotAnalysis}
                  >
                    One-Shot Analysis
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={routes.upload.oneShotCopyright}
                  >
                    One-Shot Copyright/Email/URL
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={routes.upload.oneShotMonk}>
                    One-Shot Monk
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Jobs" id="jobs">
                  <NavDropdown.Item as={Link} to={routes.jobs.myRecentJobs}>
                    My Recent Jobs
                  </NavDropdown.Item>
                  {isAdmin() ? (
                    <NavDropdown.Item as={Link} to={routes.jobs.allRecentJobs}>
                      All Recent Jobs
                    </NavDropdown.Item>
                  ) : null}

                  <NavDropdown.Item as={Link} to={routes.jobs.scheduleAgents}>
                    Schedule Agents
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Organize" id="organize">
                  <DropdownButton
                    variant=""
                    drop="right"
                    title="Folders"
                    className="font-regular dropdown-item-bottom w-100"
                  >
                    <div className="bg-secondaryColor text-white font-12 py-2">
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.folders.create}
                      >
                        Create
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.folders.delete}
                      >
                        Delete Folder
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.folders.edit}
                      >
                        Edit Properties
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.folders.move}
                      >
                        Move or Copy
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.folders.unlinkContent}
                      >
                        Unlink Content
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                  <NavDropdown.Item
                    as={Link}
                    to={routes.organize.licenses.candidate}
                  >
                    Licenses
                  </NavDropdown.Item>
                  <DropdownButton
                    variant=""
                    drop="right"
                    title="Uploads"
                    className="font-regular dropdown-item-bottom w-100"
                  >
                    <div className="bg-secondaryColor text-white font-12 py-2">
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.uploads.delete}
                      >
                        Delete Uploaded File
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.uploads.edit}
                      >
                        Edit Properties
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={routes.organize.uploads.move}
                      >
                        Move or Copy
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                </NavDropdown>

                {/* Checking whether user is having the role of admin */}
                {isAdmin() && (
                  <NavDropdown title="Admin" id="admin">
                    <DropdownButton
                      variant=""
                      drop="right"
                      title="Groups"
                      className="font-regular dropdown-item-bottom w-100"
                    >
                      <div className="bg-secondaryColor text-white font-12 py-2">
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.group.create}
                        >
                          Add Group
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.group.delete}
                        >
                          Delete Group
                        </NavDropdown.Item>
                      </div>
                    </DropdownButton>
                    <DropdownButton
                      variant=""
                      drop="right"
                      title="Users"
                      className="font-regular dropdown-item-bottom w-100"
                    >
                      <div className="bg-secondaryColor text-white font-12">
                        <NavDropdown.Item as={Link} to={routes.admin.users.add}>
                          Add User
                        </NavDropdown.Item>
                      </div>
                      <div className="bg-secondaryColor text-white font-12">
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.users.edit}
                        >
                          Edit User Account
                        </NavDropdown.Item>
                      </div>
                      <div className="bg-secondaryColor text-white font-12">
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.users.delete}
                        >
                          Delete User
                        </NavDropdown.Item>
                      </div>
                    </DropdownButton>

                    <DropdownButton
                      variant=""
                      drop="right"
                      title="License Administration"
                      className="font-regular dropdown-item-bottom w-100"
                    >
                      <div className="bg-secondaryColor text-white font-12 py-2">
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.license.create}
                        >
                          Add License
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href={routes.admin.license.licenseCSV}
                          download={routes.admin.license.licenseCSV}
                        >
                          CSV Export
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.license.selectLicense}
                        >
                          Select License
                        </NavDropdown.Item>
                      </div>
                    </DropdownButton>

                    <NavDropdown.Item as={Link} to={routes.admin.mantainance}>
                      Mantainance
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
          <div className="navIcons">
            <Dropdown drop="left">
              <Dropdown.Toggle variant="link" bsPrefix="p-0">
                <DarkThemeToggle />
              </Dropdown.Toggle>
            </Dropdown>
            {/* Help Pages */}
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

            {/* User Info */}
            {getAllGroups() && (
              <Dropdown drop="left">
                <Dropdown.Toggle variant="link" bsPrefix="p-0">
                  <TextIcon
                    className="m-2"
                    text={getNameInitials(currentGroup)}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {getAllGroups().map((group) => (
                    <Dropdown.Item
                      key={group.id}
                      onClick={handleGroupChange}
                      className={group.name === currentGroup && "active"}
                    >
                      {group.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Dropdown drop="left">
              <Dropdown.Toggle variant="link" bsPrefix="p-0">
                <PersonCircle color="#fff" size={40} className="m-2" />
              </Dropdown.Toggle>
              {isAuth() ? (
                <Dropdown.Menu>
                  <Dropdown.Item>
                    User: <b>{getUserName()}</b>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => logout(null)}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogin}>Log in</Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
