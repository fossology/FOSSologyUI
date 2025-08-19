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

import React from "react";
import PropTypes from "prop-types";

// Widgets
import { InputContainer, Tooltip } from "@/components/Widgets";

function AccessLevel({ accessLevel, handleChange }) {
  return (
    <div id="upload-access-level">
      <InputContainer
        type="radio"
        value="private"
        name="accessLevel"
        id="upload-access-level-private"
        checked={accessLevel === "private"}
        onChange={(checked) => handleChange(checked, "private")}
      >
        Visible only for active group
        <Tooltip title="which is the currently selected group" />
      </InputContainer>
      <InputContainer
        type="radio"
        value="protected"
        name="accessLevel"
        id="upload-access-level-protected"
        checked={accessLevel === "protected"}
        onChange={(checked) => handleChange(checked, "protected")}
      >
        Visible for all groups
        <Tooltip title="which are accessible by you now" />
      </InputContainer>
      <InputContainer
        type="radio"
        value="public"
        name="accessLevel"
        id="upload-access-level-public"
        checked={accessLevel === "public"}
        onChange={(checked) => handleChange(checked, "public")}
      >
        Make Public
        <Tooltip title="visible for all users" />
      </InputContainer>
    </div>
  );
}

AccessLevel.propTypes = {
  accessLevel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AccessLevel;
