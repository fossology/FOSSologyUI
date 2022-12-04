/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)

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

// css
import "./index.css";

import PropTypes from "prop-types";
import React from "react";

import { Button } from "..";

const Modal = ({ show, setShow, children }) => {
  return (
    show && (
      <div className="modal-container">
        <div className="modal-body">
          {children}
          <Button
            className="bg-light border text-dark"
            type="button"
            onClick={() => setShow(false)}
          >
            Close
          </Button>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
