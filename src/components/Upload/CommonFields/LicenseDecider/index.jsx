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
import InputContainer from "../../../Widgets/Input";
import Tooltip from "../../../Widgets/Tooltip";

function LicenseDecider({ decider, handleChange }) {
  return (
    <div id="upload-concluded-license-decider" className="mt-4">
      <p className="font-demi">
        Automatic Concluded License Decider,
        <Tooltip title="only for relevant files" /> based on
      </p>
      <InputContainer
        type="checkbox"
        checked={decider.nomosMonk}
        name="nomosMonk"
        id="upload-file-nomos-monk"
        onChange={(e) => handleChange(e)}
      >
        ... scanners matches if all Nomos findings are within the Monk findings
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={decider.ojoDecider}
        name="ojoDecider"
        id="upload-file-ojo-decider"
        onChange={(e) => handleChange(e)}
      >
        .. scanners matches if Ojo findings are no contradiction with other
        findings
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={decider.bulkReused}
        name="bulkReused"
        id="upload-file-bulk-reused"
        onChange={(e) => handleChange(e)}
      >
        ... bulk phrases from reused packages
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={decider.newScanner}
        name="newScanner"
        id="upload-file-new-scanner"
        onChange={(e) => handleChange(e)}
      >
        ... new scanner results, i.e., decisions were marked as work in progress
        if new scanner finds additional licenses
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
