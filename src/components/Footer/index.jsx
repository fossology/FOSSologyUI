/* eslint-disable prettier/prettier */
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
    getSessionStorage("fossologyVersion") || {
      version: "Unknown",
      branchName: "Unknown",
      commitHash: "Unknown",
      commitDate: "",
      buildDate: ""
    }
  );
 
  const fetchVersion = () => {
    return getFossologyVersion()
      .then((res) => {
        if (res && typeof res === "object") {
          // Make sure we have a valid response object before saving
          const versionData = {
            version: res.version || "Unknown",
            branchName: res.branchName || "Unknown",
            commitHash: res.commitHash || "Unknown",
            commitDate: res.commitDate || "",
            buildDate: res.buildDate || ""
          };
          setSessionStorage("fossologyVersion", versionData);
          setVersion(versionData);
        } else {
          console.error("Invalid version data received:", res);
        }
        return res;
      })
      .catch((error) => {
        console.error("Error fetching version:", error);
        return null;
      });
  };
 
  useEffect(() => {
    // Always fetch version on component mount to ensure we have the latest
    fetchVersion();
  }, []);
 
  return (
    <footer
      className="primary-color-wrapper text-center font-size-small py-3"
      id="footer"
    >
      Version: [{version.version || "Unknown"}], Branch: [{version.branchName || "Unknown"}], Commit: [
      {`#${version.commitHash || "Unknown"}`}] {version.commitDate || ""} built @{" "}
      {version.buildDate || ""}
    </footer>
  );
};

export default Footer;