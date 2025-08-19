/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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

const LicenseDecider = ({ decider, handleChange }) => {
  return (
    <div id="upload-concluded-license-decider" className="mt-4 space-y-2">
      <p className="font-semibold text-base inline-flex items-center gap-1">
        Automatic Concluded License Decider, based on 
        <Tooltip title="Only for relevant files" />
      </p>
      <InputContainer
        type="checkbox"
        checked={decider.nomosMonk}
        name="nomosMonk"
        id="upload-decider-nomos-monk"
        onChange={(checked) => handleChange(checked, "nomosMonk")}
      >
        Scanners matches if all Nomos findings are within the Monk findings
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={decider.ojoDecider}
        name="ojoDecider"
        id="upload-decider-ojo-decider"
        onChange={(checked) => handleChange(checked, "ojoDecider")}
      >
        Scanners matches if Ojo or REUSE.Software findings are no contradiction with other findings
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={decider.bulkReused}
        name="bulkReused"
        id="upload-decider-bulk-reused"
        onChange={(checked) => handleChange(checked, "bulkReused")}
      >
        Bulk phrases from reused packages
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={decider.newScanner}
        name="newScanner"
        id="upload-decider-new-scanner"
        onChange={(checked) => handleChange(checked, "newScanner")}
      >
        New scanner results, i.e., decisions were marked as work in progress if new scanner finds additional licenses
      </InputContainer>
    </div>
  );
}

LicenseDecider.propTypes = {
  decider: PropTypes.shape({
    nomosMonk: PropTypes.bool.isRequired,
    bulkReused: PropTypes.bool.isRequired,
    newScanner: PropTypes.bool.isRequired,
    ojoDecider: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func,
};

export default LicenseDecider;
