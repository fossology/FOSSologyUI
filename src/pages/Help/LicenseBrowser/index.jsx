/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
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

const LicenseBrowser = () => {
  return (
    <div className="main-container my-3">
      <p>On the top, you see for each scanner ...</p>
      <ul className="triangle-bullets">
        <li>if it ever run on this upload</li>
        <li>the revision of the latest results</li>
        <li>the newest revision</li>
        <li>
          a link to restart the scanner if latest results are not from newest
          revision
        </li>
      </ul>
      <p>
        If there are results from different revisions, you can select the
        results of these runs.
      </p>
      <p>
        On the left side, you see a list of all found licenses. The counters
        show how often a license is found by scanners and how often it was
        concluded. Click on the license name to search for where the license is
        found in the file listing.
      </p>
      <p>
        On the right side, you see a list of all files or directories in the
        current directory. You also the licenses found by any scanner and what
        scanners found it. Also old results may be included if they differ from
        current revision of the scanner. Results from an older version are
        marked. You can search for any string in the file names or license
        names.
      </p>
    </div>
  );
};

export default LicenseBrowser;
