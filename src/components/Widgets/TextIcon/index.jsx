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

import PropTypes from "prop-types";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

const TextIcon = ({ text, className }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className={className}>
      <g>
        <circle
          style={{
            fill: "white",
            stroke: themeContext.primaryColor,
            strokeWidth: 1,
            strokeMiterlimit: 10,
          }}
          cx="20"
          cy="20"
          r="20"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke={themeContext.primaryColor}
          fill={themeContext.primaryColor}
          strokeWidth="0.8px"
          dy=".3em"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

TextIcon.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default TextIcon;
