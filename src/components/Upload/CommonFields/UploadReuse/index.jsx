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

// Widgets
import { Tooltip } from "components/Widgets";

import SelectInputContainers from "./Containers/SelectInputContainers";
import CheckboxInputContainers from "./Containers/CheckboxInputContainers";

const UploadReuse = ({ reuse, handleChange }) => {
  return (
    <div id="upload-reuse" className="mt-4">
      <p className="font-demi">
        (Optional) Reuse
        <Tooltip title="copy clearing decisions if there is the same file hash between two files" />
      </p>
      <SelectInputContainers reuse={reuse} handleChange={handleChange} />
      <CheckboxInputContainers reuse={reuse} handleChange={handleChange} />
    </div>
  );
};

UploadReuse.propTypes = {
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

export default UploadReuse;
