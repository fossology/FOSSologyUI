import React from "react";
import PropTypes from "prop-types";
import InputContainer from "../../../Widgets/Input";
import Tooltip from "../../../Widgets/Tooltip";

function UploadReuse({ reuse, handleChange }) {
  return (
    <div id="upload-reuse" className="mt-4">
      <p className="font-demi">
        (Optional) Reuse
        <Tooltip title="copy clearing decisions if there is the same file hash between two files" />
      </p>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseEnhanced}
        name="reuseEnhanced"
        id="upload-file-reuse-enhanced"
        onChange={(e) => handleChange(e)}
      >
        Enhanced reuse (slower)
        <Tooltip title="will copy a clearing decision if the two files differ by one line determined by a diff tool" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseMain}
        name="reuseMain"
        id="upload-file-reuse-main"
        onChange={(e) => handleChange(e)}
      >
        Reuse main license/s
        <Tooltip title="will copy a main license decision if any" />
      </InputContainer>
    </div>
  );
}

UploadReuse.propTypes = {
  reuse: PropTypes.object,
  handleChange: PropTypes.func,
};

export default UploadReuse;
