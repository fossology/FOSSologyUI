import React from "react";
import PropTypes from "prop-types";
import InputContainer from "../../../Widgets/Input";

function UploadReuse({ reuse, handleChange }) {
  return (
    <div id="upload-reuse" className="mt-4">
      <p className="font-demi">(Optional) Reuse</p>
      {/* <InputContainer
        type="checkbox"
        checked={reuse.main}
        name="licenseConcluded"
        id="upload-file"
        onChange={(e) => handleChange(e)}
      >
        Select an already uploaded package for reuse in specific folder
      </InputContainer>
      <select>
        <option value="Software Repository">Software Repository</option>
      </select> */}
      <InputContainer
        type="checkbox"
        checked={reuse.reuseEnhanced}
        name="reuseEnhanced"
        id="upload-file-reuse-enhanced"
        onChange={(e) => handleChange(e)}
      >
        Enhanced reuse (slower)
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseMain}
        name="reuseMain"
        id="upload-file-reuse-main"
        onChange={(e) => handleChange(e)}
      >
        Reuse main license/s
      </InputContainer>
      {/* <InputContainer
        type="checkbox"
        checked={reuse.main}
        name="licenseConcluded"
        id="upload-file"
        onChange={(e) => handleChange(e)}
      >
        Reuse report configuration settings
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.main}
        name="licenseConcluded"
        id="upload-file"
        onChange={(e) => handleChange(e)}
      >
        Reuse deactivated copyright when agent version changes
      </InputContainer> */}
    </div>
  );
}

UploadReuse.propTypes = {
  reuse: PropTypes.object,
  handleChange: PropTypes.func,
};

export default UploadReuse;
