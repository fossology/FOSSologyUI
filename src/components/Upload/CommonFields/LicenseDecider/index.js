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
  decider: PropTypes.object,
  handleChange: PropTypes.func,
};

export default LicenseDecider;
