import React from "react";
import PropTypes from "prop-types";
import InputContainer from "../../../Widgets/Input";

function UploadReuse({ reuse, handleChange }) {
  return (
    <div id="upload-reuse" className="mt-4">
      <p className="font-demi">(Optional) Reuse</p>
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
    </div>
  );
}

UploadReuse.propTypes = {
  reuse: PropTypes.object,
  handleChange: PropTypes.func,
};

export default UploadReuse;
