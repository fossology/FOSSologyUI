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
import { NavDropdown, DropdownButton } from "react-bootstrap";

// Routes for all the pages
import routes from "constants/routes";

const AdminNavDropdown = () => {
  return (
    <>
      <NavDropdown title="Admin" id="admin">
        <DropdownButton
          variant=""
          drop="right"
          title="Groups"
          className="font-regular dropdown-item-bottom w-100"
        >
          <div className="bg-secondaryColor text-white font-12 py-2">
            <NavDropdown.Item as={Link} to={routes.admin.group.create}>
              Add Group
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={routes.admin.group.delete}>
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
            <NavDropdown.Item as={Link} to={routes.admin.users.delete}>
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
            <NavDropdown.Item as={Link} to={routes.admin.license.create}>
              Add License
            </NavDropdown.Item>
            <NavDropdown.Item
              href={routes.admin.license.licenseCSV}
              download={routes.admin.license.licenseCSV}
            >
              CSV Export
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={routes.admin.license.selectLicense}>
              Select License
            </NavDropdown.Item>
          </div>
        </DropdownButton>
      </NavDropdown>
    </>
  );
};

export default AdminNavDropdown;
