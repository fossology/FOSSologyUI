/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

import React, { useState, useEffect } from "react";
import { getFossologyVersion } from "services/info";
import { getSessionStorage, setSessionStorage } from "shared/storageHelper";

const Footer = () => {
  const [version, setVersion] = useState(
    getSessionStorage("fossologyVersion") || null
  );
  const fetchVersion = () => {
    return getFossologyVersion()
      .then((res) => {
        setSessionStorage("fossologyVersion", res);
        setVersion(res);
        return res;
      })
      .catch(() => null);
  };
  useEffect(() => {
    if (!version) {
      fetchVersion();
    }
  }, []);
  return (
    <footer
      className="primary-color-wrapper text-center font-size-small py-3"
      id="footer"
    >
      Version: [{version?.version === "unknown" ? "4.1.0.84" : version?.version}], Branch: [{version?.branchName === "unknown" ? "Branch you are working on" : version?.branchName}], Commit: [
      {`#${version?.commitHash === "unknown" ? "Your commit" : version?.commitHash}`}] {version?.commitDate} built @{" "}
      {version?.buildDate}
    </footer>
  );
};

export default Footer;
