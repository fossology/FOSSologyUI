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

// React Imports
import React from "react";

// Features Images Report
import upload from "../../assets/images/upload.svg";
import scan from "../../assets/images/scan.svg";
import report from "../../assets/images/report.svg";

const Home = () => {
  // Features Array
  const features = [
    {
      id: 1,
      img: upload,
      heading: "Upload Files",
      description:
        "Upload files into the fossology repository and get information.",
    },
    {
      id: 2,
      img: scan,
      heading: "Scan Documents",
      description:
        "Scan for software licenses, copyrights and other author information.",
    },
    {
      id: 3,
      img: report,
      heading: "Generate Reports",
      description:
        "Report files based on your own custom classification scheme.",
    },
  ];
  return (
    <React.Fragment>
      <div className="main-container my-5">
        <b className="font-size-medium">FOSSology</b> is a framework for
        software analysis tools. With it, you can:
        <ul className="my-3">
          <li>Upload files into the fossology repository.</li>
          <li>
            Unpack files (zip, tar, bz2, iso's, and many others) into its
            component files.
          </li>
          <li>Browse upload file trees.</li>
          <li>View file contents and meta data.</li>
          <li>Scan for software licenses.</li>
          <li>Scan for copyrights and other author information.</li>
          <li>
            View side-by-side license and bucket differences between file trees.
          </li>
          <li>Tag and attach notes to files.</li>
          <li>Report files based on your own custom classification scheme.</li>
        </ul>
        <div className="my-5">
          <b className="font-size-medium">Where to begin...</b>
          <ul className="my-3">
            <li>
              The menu at the top contains all the primary capabilities of
              FOSSology.
            </li>
            <li>
              Depending on your account's access rights, you may be able to
              upload files, schedule analysis tasks, or even add new users.
            </li>
          </ul>
        </div>
        <div className="row mt-5">
          {features.map((feature) => (
            <div
              className="col-lg-4 col-md-12 col-sm-12 col-12"
              key={feature.id}
            >
              <div className="box">
                <div className="d-flex">
                  <img src={feature.img} alt={feature.heading} />
                  <div className="pl-3">
                    <h4 className="font-size-sub-heading">{feature.heading}</h4>
                    <p className="mt-2">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
