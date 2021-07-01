import React from "react";
import PropTypes from "prop-types";
import InputContainer from "../../../Widgets/Input";

function IgnoreScm({ ignoreScm, handleChange }) {
  return (
    <div id="upload-ignore-files" className="mt-4">
      <InputContainer
        type="checkbox"
        checked={ignoreScm}
        name="ignoreScm"
        id="upload-report-license-concluded"
        onChange={(e) => handleChange(e)}
      >
        Ignore SCM files (Git, SVN, TFS) and files with particular Mimetype
      </InputContainer>
    </div>
  );
}

IgnoreScm.propTypes = {
  ignoreScm: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
};

export default IgnoreScm;
