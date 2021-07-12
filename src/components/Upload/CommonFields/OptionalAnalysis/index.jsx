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

function OptionalAnalysis({ analysis, handleChange }) {
  return (
    <div id="uplod-optional-analysis" className="mt-4">
      <p className="font-demi">Select optional analysis</p>
      <InputContainer
        type="checkbox"
        checked={analysis.bucket}
        name="bucket"
        id="upload-file-bucket"
        onChange={(e) => handleChange(e)}
      >
        Bucket Analysis
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.copyrightEmailAuthor}
        name="copyrightEmailAuthor"
        id="upload-file-copyright-email-author"
        onChange={(e) => handleChange(e)}
      >
        Copyright/Email/URL/Author Analysis
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.ecc}
        name="ecc"
        id="upload-file-ecc"
        onChange={(e) => handleChange(e)}
      >
        ECC Analysis, scanning for text fragments potentially relevant for
        export control
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.keyword}
        name="keyword"
        id="upload-file-keyword"
        onChange={(e) => handleChange(e)}
      >
        Keyword Analysis
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.mime}
        name="mime"
        id="upload-file-mime"
        onChange={(e) => handleChange(e)}
      >
        MIME-type Analysis (Determine mimetype of every file. Not needed for
        licenses or buckets)
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.monk}
        name="monk"
        id="upload-file-monk"
        onChange={(e) => handleChange(e)}
      >
        Monk License Analysis, scanning for licenses performing a text
        comparison
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.nomos}
        name="nomos"
        id="upload-file-nomos"
        onChange={(e) => handleChange(e)}
      >
        Nomos License Analysis, scanning for licenses using regular expressions
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.ojo}
        name="ojo"
        id="upload-file-ojo"
        onChange={(e) => handleChange(e)}
      >
        Ojo License Analysis, scanning for licenses using
        SPDX-License-Identifier
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.package}
        name="package"
        id="upload-file-package"
        onChange={(e) => handleChange(e)}
      >
        Package Analysis (Parse package headers)
      </InputContainer>
    </div>
  );
}

OptionalAnalysis.propTypes = {
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
  handleChange: PropTypes.func,
};

export default OptionalAnalysis;
