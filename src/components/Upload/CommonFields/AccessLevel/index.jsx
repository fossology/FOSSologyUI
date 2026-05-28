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
import { Tooltip } from "@/components/Widgets";

// ShadCN
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

function AccessLevel({ accessLevel, handleChange }) {
  return (
    <div id="upload-access-level">
      <RadioGroup
        value={accessLevel}
        onValueChange={(value) =>
          handleChange({
            target: {
              name: "accessLevel",
              value,
              type: "radio",
            },
          })
        }
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="private"
            id="upload-access-level-private"
          />

          <Label
            htmlFor="upload-access-level-private"
            className="text-base font-normal"
          >
            Visible only for active group{" "}
            <Tooltip title="which is the currently selected group" />
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="protected"
            id="upload-access-level-protected"
          />

          <Label
            htmlFor="upload-access-level-protected"
            className="text-base font-normal"
          >
            Visible for all groups{" "}
            <Tooltip title="which are accessible by you now" />
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="public"
            id="upload-access-level-public"
          />

          <Label
            htmlFor="upload-access-level-public"
            className="text-base font-normal"
          >
            Make Public{" "}
            <Tooltip title="visible for all users" />
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

AccessLevel.propTypes = {
  accessLevel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AccessLevel;
