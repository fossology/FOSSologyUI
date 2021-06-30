/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)

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
import PropTypes from "prop-types";

const Alert = ({ heading, message, type, setShow }) => {
  return (
    <>
      <div
        className={`alert alert-${type} alert-dismissible fade show font-medium`}
        role="alert"
      >
        <h4>{heading}</h4>
        {message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => setShow(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string,
  message: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default Alert;
