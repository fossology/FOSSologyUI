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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap Imports
import { Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

// Routes for all the pages
import routes from "constants/routes";

// List of all accessible groups
import { getAllGroups } from "services/groups";

// Widgets
import TextIcon from "components/Widgets/TextIcon";

// Helper Functions
import { logout, isAuth, getUserName } from "shared/authHelper";
import { getLocalStorage, setLocalStorage } from "shared/storageHelper";
import { getNameInitials } from "shared/helper";

const UserInfoDropdown = () => {
  const [currentGroup, setCurrentGroup] = useState(
    getLocalStorage("currentGroup") || getLocalStorage("user")?.default_group
  );
  const history = useHistory();
  const handleLogin = () => {
    history.push(routes.home);
  };
  const handleGroupChange = (e) => {
    setLocalStorage("currentGroup", e.target.innerText);
    setCurrentGroup(e.target.innerText);
  };
  return (
    <>
      {getAllGroups() && (
        <Dropdown drop="left">
          <Dropdown.Toggle variant="link" bsPrefix="p-0">
            <TextIcon className="m-2" text={getNameInitials(currentGroup)} />
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
            <Dropdown.Item onClick={() => logout(null)}>Log out</Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogin}>Log in</Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown.Menu>
        )}
      </Dropdown>
    </>
  );
};

export default UserInfoDropdown;
