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
import { NavDropdown } from "react-bootstrap";

// Routes for all the pages
import routes from "constants/routes";

const JobsNavDropdown = () => {
  return (
    <>
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
    </>
  );
};

export default JobsNavDropdown;
