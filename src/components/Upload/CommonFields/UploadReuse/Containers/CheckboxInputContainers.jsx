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

// Widgets
import { InputContainer, Tooltip } from "components/Widgets";

import { PropTypes } from "prop-types";

const CheckboxInputContainers = ({ reuse, handleChange }) => {
  return (
    <>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseEnhanced}
        name="reuseEnhanced"
        id="upload-file-reuse-enhanced"
        onChange={handleChange}
      >
        Enhanced reuse (slower)
        <Tooltip title="will copy a clearing decision if the two files differ by one line determined by a diff tool" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseMain}
        name="reuseMain"
        id="upload-file-reuse-main"
        onChange={handleChange}
      >
        Reuse main license/s
        <Tooltip title="will copy a main license decision if any" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseReport}
        name="reuseReport"
        id="upload-file-reuse-report"
        onChange={handleChange}
      >
        Reuse report configuration settings
        <Tooltip title="use to copy all the information from conf page(if any)" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={reuse.reuseCopyright}
        name="reuseCopyright"
        id="upload-file-reuse-copyright"
        onChange={handleChange}
      >
        Reuse edited and deactivated copyrights
        <Tooltip title="use to copy edited and deactivated copyrights from the reused package" />
      </InputContainer>
    </>
  );
};

CheckboxInputContainers.propTypes = {
  reuse: PropTypes.shape({
    reuseUpload: PropTypes.number.isRequired,
    reuseGroup: PropTypes.string.isRequired,
    reuseMain: PropTypes.bool.isRequired,
    reuseEnhanced: PropTypes.bool.isRequired,
    reuseReport: PropTypes.bool.isRequired,
    reuseCopyright: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func,
};

export default CheckboxInputContainers;
