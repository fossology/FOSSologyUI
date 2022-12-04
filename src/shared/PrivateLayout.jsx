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
// Header
import Header from "components/Header";
// Helper Functions
import routes from "constants/routes";
import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { isAuth } from "./authHelper";

const PrivateLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <>
          <div className="wrapper">
            <Header />
            <Component {...props} />
          </div>
        </>
      ) : (
        <Redirect
          to={{
            pathname: routes.home,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(PrivateLayout);
