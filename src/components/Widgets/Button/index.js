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
import styles from "styled-components";

const Button = ({ type, onClick, className, children }) => {
  return (
    <ButtonContainer
      type={type}
      onClick={onClick}
      className={`bg-primary-color text-secondary-color font-demi text-center hover-primary-color ${className}`}
    >
      {children}
    </ButtonContainer>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const ButtonContainer = styles.button`
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 3rem;
    transition: all 0.5s ease-in;
`;

export default Button;
