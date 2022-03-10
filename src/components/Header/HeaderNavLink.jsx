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
import { Link, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

// React Bootstrap Imports
import { Nav } from "react-bootstrap";

const HeaderNavLink = ({ route, name }) => {
  const location = useLocation();
  return (
    <>
      <Nav.Link
        as={Link}
        to={route}
        className={location.pathname === route && "active-nav-item"}
      >
        {name}
      </Nav.Link>
    </>
  );
};

HeaderNavLink.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default HeaderNavLink;
