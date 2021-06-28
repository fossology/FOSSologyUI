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

import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { QuestionCircleFill, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Image from "../../components/Widgets/Image";
import { routes } from "../../constants/routes";
import { logout, isAuth } from "../../shared/authHelper";
import logo from "../../assets/images/logo.svg";
import { externalLinks } from "../../constants/externalLinks";

const Header = () => {
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
                  <NavDropdown.Item
                    as={Link}
                    to={routes.organize.folders.delete}
                  >
                    Folders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={routes.organize.licenses}>
                    Licenses
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={routes.organize.uploads.delete}
                  >
                    Uploads
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <NavDropdown title="Admin" id="admin">
                  <NavDropdown.Item as={Link} to="">Agent</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Buckets</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Customize</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Dashboards</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Fossdash</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Groups</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">License Admin</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Maintenance</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Obligation Admin</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Scheduler</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="">Tag</NavDropdown.Item>
                </NavDropdown> */}
              </>
            )}
          </Nav>
          <Dropdown drop="left">
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <QuestionCircleFill color="#fff" size={40} />
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
              <PersonCircle color="#fff" size={40} className="ml-3" />
            </Dropdown.Toggle>
            {isAuth() ? (
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogin}>Log in</Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
