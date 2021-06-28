import React from "react";
import PropTypes from "prop-types";
import InputContainer from "../../../Widgets/Input";

function AccessLevel({ accessLevel, handleChange }) {
  return (
    <div id="upload-access-level" className="mt-4">
      <InputContainer
        type="radio"
        value="private"
        name="accessLevel"
        id="upload-report-license-candidate"
        checked={accessLevel === "private"}
        onChange={(e) => handleChange(e)}
      >
        Visible only for active group
      </InputContainer>
      <InputContainer
        type="radio"
        value="protected"
        name="accessLevel"
        id="upload-report-new-license"
        checked={accessLevel === "protected"}
        onChange={(e) => handleChange(e)}
      >
        Visible for all groups
      </InputContainer>
      <InputContainer
        type="radio"
        value="public"
        name="accessLevel"
        id="upload-report-new-license"
        checked={accessLevel === "public"}
        onChange={(e) => handleChange(e)}
      >
        Make Public
      </InputContainer>
    </div>
  );
}

AccessLevel.propTypes = {
  accessLevel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AccessLevel;
