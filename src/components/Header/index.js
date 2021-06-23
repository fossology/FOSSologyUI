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
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { QuestionCircleFill, PersonCircle } from "react-bootstrap-icons";
import Image from "../../components/Widgets/Image";
import { routes } from "../../constants/routes";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-primary-color py-0 pl-0 text-white">
        <Navbar.Brand href="/" className="py-0">
          <Image src={logo} className="img-fluid bg-white" alt="FOSSology" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/browse">Browse</Nav.Link>
            <NavDropdown title="Upload" id="uploads">
              <NavDropdown.Item href="">From File</NavDropdown.Item>
              <NavDropdown.Item href="">From Server</NavDropdown.Item>
              <NavDropdown.Item href="">From URL</NavDropdown.Item>
              <NavDropdown.Item href="">From VCS</NavDropdown.Item>
              <NavDropdown.Item href="">Import Report</NavDropdown.Item>
              <NavDropdown.Item href="">Instructions</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Jobs" id="jobs">
              <NavDropdown.Item href="">My Recent Jobs</NavDropdown.Item>
              <NavDropdown.Item href="">All Recent Jobs</NavDropdown.Item>
              <NavDropdown.Item href="">Schedule Agents</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Organize" id="organize">
              <NavDropdown.Item href="">Folders</NavDropdown.Item>
              <NavDropdown.Item href="">Licenses</NavDropdown.Item>
              <NavDropdown.Item href="">Uploads</NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown title="Admin" id="admin">
              <NavDropdown.Item href="">Agent</NavDropdown.Item>
              <NavDropdown.Item href="">Buckets</NavDropdown.Item>
              <NavDropdown.Item href="">Customize</NavDropdown.Item>
              <NavDropdown.Item href="">Dashboards</NavDropdown.Item>
              <NavDropdown.Item href="">Fossdash</NavDropdown.Item>
              <NavDropdown.Item href="">Groups</NavDropdown.Item>
              <NavDropdown.Item href="">License Admin</NavDropdown.Item>
              <NavDropdown.Item href="">Maintenance</NavDropdown.Item>
              <NavDropdown.Item href="">Obligation Admin</NavDropdown.Item>
              <NavDropdown.Item href="">Scheduler</NavDropdown.Item>
              <NavDropdown.Item href="">Tag</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Dropdown drop="left">
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <QuestionCircleFill color="#fff" size={40} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={routes.help.overview}>
                Getting Started
              </Dropdown.Item>
              <Dropdown.Item href={routes.help.licenseBrowser}>
                License Browser
              </Dropdown.Item>
              <Dropdown.Item href={routes.help.thirdPartyLicense}>
                Third Party License
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <PersonCircle color="#fff" size={40} className="ml-3" />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
