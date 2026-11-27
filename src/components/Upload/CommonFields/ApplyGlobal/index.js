/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

function ApplyGlobal({ applyGlobal, handleChange }) {
  return (
    <div id="upload-apply-global" className="mt-1">
      <InputContainer
        type="checkbox"
        checked={applyGlobal}
        name="applyGlobal"
        id="upload-apply-global"
        onChange={(checked) =>
          handleChange({
            target: {
              type: "checkbox",
              name: "applyGlobal",
              checked,
            },
          })
        }
      >
        Apply global decisions for current upload
        <Tooltip title="Apply existing global decisions to this upload during analysis." />
      </InputContainer>
    </div>
  );
}

ApplyGlobal.propTypes = {
  applyGlobal: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
};

export default ApplyGlobal;
