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

import React from "react";

// Custom imports
import Image from "../../components/Widgets/Image";

// Features images import
import upload from "../../assets/images/upload.svg";
import scan from "../../assets/images/scan.svg";
import report from "../../assets/images/report.svg";

const Features = () => {
  // Features Array
  const features = [
    {
      id: 1,
      img: upload,
      heading: "Upload and Scan files",
      description:
        "Upload and scan files into the fossology server and get information.",
    },
    {
      id: 2,
      img: scan,
      heading: "Review Documents",
      description:
        "Review licenses, copyrights, export control and other information.",
    },
    {
      id: 3,
      img: report,
      heading: "Generate Reports",
      description:
        "Generate report files based on your own custom classification scheme.",
    },
  ];
  return (
    <div className="row mt-3">
      {features.map((feature) => (
        <div className="col-lg-4 col-md-12 col-sm-12 col-12" key={feature.id}>
          <div className="box">
            <div className="d-flex">
              <Image src={feature.img} alt={feature.heading} />
              <div className="pl-3">
                <h4 className="font-size-sub-heading">{feature.heading}</h4>
                <p className="mt-2">{feature.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
