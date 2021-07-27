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
import IgnoreScm from "./IgnoreScm";
import AccessLevel from "./AccessLevel";
import OptionalAnalysis from "./OptionalAnalysis";
import LicenseDecider from "./LicenseDecider";
import UploadReuse from "./UploadReuse";

function CommonFields({
  accessLevel,
  ignoreScm,
  analysis,
  decider,
  reuse,
  handleChange,
  handleScanChange,
}) {
  return (
    <>
      {ignoreScm && (
        <IgnoreScm ignoreScm={ignoreScm} handleChange={handleChange} />
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
      {reuse && <UploadReuse reuse={reuse} handleChange={handleScanChange} />}
    </>
  );
}

CommonFields.propTypes = {
  accessLevel: PropTypes.string,
  ignoreScm: PropTypes.bool,
  analysis: PropTypes.shape({
    bucket: PropTypes.bool.isRequired,
    copyrightEmailAuthor: PropTypes.bool.isRequired,
    ecc: PropTypes.bool.isRequired,
    keyword: PropTypes.bool.isRequired,
    mime: PropTypes.bool.isRequired,
    monk: PropTypes.bool.isRequired,
    nomos: PropTypes.bool.isRequired,
    ojo: PropTypes.bool.isRequired,
    package: PropTypes.bool.isRequired,
  }).isRequired,
  decider: PropTypes.shape({
    nomosMonk: PropTypes.bool.isRequired,
    bulkReused: PropTypes.bool.isRequired,
    newScanner: PropTypes.bool.isRequired,
    ojoDecider: PropTypes.bool.isRequired,
  }).isRequired,
  reuse: PropTypes.shape({
    reuseUpload: PropTypes.number.isRequired,
    reuseGroup: PropTypes.string.isRequired,
    reuseMain: PropTypes.bool.isRequired,
    reuseEnhanced: PropTypes.bool.isRequired,
    reuseReport: PropTypes.bool.isRequired,
    reuseCopyright: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleScanChange: PropTypes.func.isRequired,
};

export default CommonFields;
