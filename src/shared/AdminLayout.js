/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
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
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "./authHelper";
import { routes } from "../constants/routes";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdmin() ? (
        <React.Fragment>
          <div className="wrapper">
            <Header />
            <Component {...props} />
          </div>
          <Footer />
        </React.Fragment>
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

AdminLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  location: PropTypes.object.isRequired,
};

export default withRouter(AdminLayout);
