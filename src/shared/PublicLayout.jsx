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
import { withRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";

// Header
import Header from "components/Header";

const PublicLayout = ({ component: Component, ...rest }) => {
  // State to trigger re-renders
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback to handle Header updates
  const handleHeaderUpdate = () => {
    setRefreshKey((prev) => prev + 1); // Increment refresh key to force re-render
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <div className="wrapper" key={refreshKey}>
            <Header onUpdate={handleHeaderUpdate} refreshKey={refreshKey} />
            <Component {...props} refreshKey={refreshKey} />
          </div>
        </>
      )}
    />
  );
};

PublicLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
};

export default withRouter(PublicLayout);
