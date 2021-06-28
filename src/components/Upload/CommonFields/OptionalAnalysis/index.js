import React from "react";
import PropTypes from "prop-types";
import InputContainer from "../../../Widgets/Input";

function OptionalAnalysis({ analysis, handleChange }) {
  return (
    <div id="uplod-optional-analysis" className="mt-4">
      <p className="font-demi">Select optional analysis</p>
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
  analysis: PropTypes.object,
  handleChange: PropTypes.func,
};

export default OptionalAnalysis;
