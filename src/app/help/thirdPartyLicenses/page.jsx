/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
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

// Routes
import routes from "@/constants/routes";

// CSS Imports
import "./index.css";

export const metadata = {
    title: "Third Party Licenses | FOSSology",
};

const ThirdPartyLicenses = () => {
  return (
    <>
      <div className="mx-auto my-3">
        {/* Loading thirdPartLicenses.html with iframe */}
        <iframe
          src={routes.thirdPartyLicensesHTML}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          scrolling="auto"
          className="thirdPartyIframe"
          title="third party licenses"
        >
          Your browser does not support iframe. Visit the
          <a href={routes.thirdPartyLicensesHTML}>
            {" "}
            third party licenses page
          </a>
        </iframe>
      </div>
    </>
  );
};

export default ThirdPartyLicenses;
