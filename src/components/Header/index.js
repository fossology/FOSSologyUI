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

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { QuestionCircleFill, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Image from "../../components/Widgets/Image";
import { routes } from "../../constants/routes";
import { logout, isAuth, getUserName, isAdmin } from "../../shared/authHelper";
import logo from "../../assets/images/logo.svg";
import { externalLinks } from "../../constants/externalLinks";
import { GlobalContext } from "../../context";

const Header = () => {
  const { setTheme } = useContext(GlobalContext);

  const history = useHistory();

  const handleLogout = () => {
    logout(() => {
      history.push(routes.home);
    });
  };

  const handleLogin = () => {
    history.push(routes.home);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-primary-color py-0 pl-0 text-white">
        <Navbar.Brand href="/" className="py-0">
          <Image
            src={logo}
            className="img-fluid bg-white py-1 px-2"
            alt="FOSSology"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={routes.home}>
              Home
            </Nav.Link>
            {isAuth() && (
              <>
                <Nav.Link as={Link} to={routes.search}>
                  Search
                </Nav.Link>
                <Nav.Link as={Link} to={routes.browse}>
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
                  <NavDropdown.Item as={Link} to={routes.upload.report}>
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
                  <NavDropdown.Item as={Link} to={routes.jobs.allRecentJobs}>
                    All Recent Jobs
                  </NavDropdown.Item>
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
                  <NavDropdown.Item as={Link} to={routes.organize.licenses}>
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
                      <div className="bg-secondaryColor text-white font-12 py-2">
                        <NavDropdown.Item
                          as={Link}
                          to={routes.admin.users.delete}
                        >
                          Delete User
                        </NavDropdown.Item>
                      </div>
                    </DropdownButton>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
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
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setTheme("light")}>
                  Light Theme
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTheme("dark")}>
                  Dark Theme
                </Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogin}>Log in</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setTheme("light")}>
                  Light Theme
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTheme("dark")}>
                  Dark Theme
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
