/*
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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
import { InputContainer, Tooltip } from "@/components/Widgets";

const Scancode = ({ scancode, handleChange }) => {
  return (
    <div id="upload-scancode" className="mt-4 space-y-2">
      <p className="font-semibold text-base inline-flex items-center gap-1">
        ScanCode Toolkit, scan for
        <Tooltip title="To scan code and detect licenses, copyrights, author and more." />
      </p>
      <InputContainer
        type="checkbox"
        checked={scancode.license}
        name="license"
        id="upload-scancode-license"
        onChange={(checked) => handleChange(checked, "license")}
      >
        License
        <Tooltip title="A full comparison between the database of 
        licenses present in ScanCode and the code uploaded by users 
        based approach" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={scancode.copyright}
        name="copyright"
        id="upload-scancode-copyright"
        onChange={(checked) => handleChange(checked, "copyright")}
      >
        Copyright
        <Tooltip title="Copyright along with copyright holder/author information" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={scancode.email}
        name="email"
        id="upload-scancode-email"
        onChange={(checked) => handleChange(checked, "email")}
      >
        Email
        <Tooltip title="Email(s) present in the source files" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={scancode.url}
        name="url"
        id="upload-scancode-url"
        onChange={(checked) => handleChange(checked, "url")}
      >
        URL
        <Tooltip title="URL(s) present in the scan code file" />
      </InputContainer>
    </div>
  );
}

Scancode.propTypes = {
  scancode: PropTypes.shape({
    license: PropTypes.bool.isRequired,
    copyright: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    url: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func,
};

export default Scancode;
