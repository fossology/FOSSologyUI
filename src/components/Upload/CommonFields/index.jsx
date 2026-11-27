/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
import IgnoreScm from "./IgnoreScm";
import ApplyGlobal from "./ApplyGlobal";
import AccessLevel from "./AccessLevel";
import OptionalAnalysis from "./OptionalAnalysis";
import LicenseDecider from "./LicenseDecider";
import UploadReuse from "./UploadReuse";
import Scancode from "./Scancode";

function CommonFields({
  accessLevel,
  ignoreScm,
  applyGlobal,
  analysis,
  decider,
  reuse,
  scancode,
  handleChange,
  handleScanChange,
}) {
  return (
    <>
      {typeof ignoreScm === "boolean" && (
        <IgnoreScm
          ignoreScm={ignoreScm}
          handleChange={handleChange}
        />
      )}
      {typeof applyGlobal === "boolean" && (
        <ApplyGlobal
          applyGlobal={applyGlobal}
          handleChange={handleChange}
        />
      )}
            {accessLevel && (
        <AccessLevel accessLevel={accessLevel} handleChange={handleChange} />
      )}
      {analysis && (
        <OptionalAnalysis analysis={analysis} handleChange={handleScanChange} />
      )}
      {decider && (
        <LicenseDecider decider={decider} handleChange={handleScanChange} />
      )}
      {reuse && <UploadReuse reuse={reuse} handleScanChange={handleScanChange} />}
      {scancode && (
        <Scancode scancode={scancode} handleChange={handleScanChange} />
      )}
    </>
  );
}

CommonFields.propTypes = {
  accessLevel: PropTypes.string,
  ignoreScm: PropTypes.bool,
  applyGlobal: PropTypes.bool,
  analysis: PropTypes.shape({
    compatibility: PropTypes.bool.isRequired,
    copyrightEmailAuthor: PropTypes.bool.isRequired,
    ecc: PropTypes.bool.isRequired,
    ipra: PropTypes.bool.isRequired,
    keyword: PropTypes.bool.isRequired,
    mime: PropTypes.bool.isRequired,
    monk: PropTypes.bool.isRequired,
    nomos: PropTypes.bool.isRequired,
    ojo: PropTypes.bool.isRequired,
    package: PropTypes.bool.isRequired,
    softwareAnalysis: PropTypes.bool.isRequired,
    scanoss: PropTypes.bool.isRequired,
    heritage: PropTypes.bool.isRequired,
  }),
  decider: PropTypes.shape({
    nomosMonk: PropTypes.bool.isRequired,
    bulkReused: PropTypes.bool.isRequired,
    newScanner: PropTypes.bool.isRequired,
    ojoDecider: PropTypes.bool.isRequired,
    autoConclude: PropTypes.bool.isRequired,
    autoConcludeType: PropTypes.string.isRequired,
  }),
  reuse: PropTypes.shape({
    reuseChecked: PropTypes.bool.isRequired,
    reuseGroup: PropTypes.string.isRequired,
    reuseUpload: PropTypes.array.isRequired,
    reuseEnhanced: PropTypes.bool.isRequired,
    reuseMain: PropTypes.bool.isRequired,
    reuseReport: PropTypes.bool.isRequired,
    reuseCopyright: PropTypes.bool.isRequired,
  }),
  handleChange: PropTypes.func,
  handleScanChange: PropTypes.func,
};

export default CommonFields;
