/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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

import PropTypes from "prop-types";
import React from "react";

const Alert = ({ message, type, setShow }) => {
  return (
    <div className="main-container d-flex justify-content-end mt-3">
      <div
        className={`alert bg-${type} alert-dismissible fade show font-medium text-white alert-fix-position`}
        role="alert"
      >
        <div className="d-flex">
          {type === "danger" && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="white"
              />
              <path
                d="M14.5 25H17.5V22H14.5V25ZM14.5 6V19H17.5V6H14.5Z"
                fill="#DC4146"
              />
            </svg>
          )}
          {type === "success" && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                fill="white"
              />
              <path
                d="M38 15L22 33L12 25"
                stroke="#28A745"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
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
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default Alert;
