/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Gaurav Mishra (mishra.gaurav@siemens.com), Aman Dwivedi(aman.dwivedi5@gmail.com)

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

// eslint-disable-next-line import/no-extraneous-dependencies
import csv from "csv-parser";
import { createReadStream, writeFile } from "fs";

const copyrights = [];

createReadStream("scripts/copyrights.csv")
  .pipe(csv())
  .on("data", (data) => {
      copyrights.push(data.copyright);
  })
  .on("end", () => {
    const uniqueCopyrights = [...new Set(copyrights)].sort();
    writeFile(
      "scripts/copyrights.json",
      JSON.stringify(uniqueCopyrights),
      (err) => {
        if (err) {
          /* eslint-disable-next-line no-console */
          console.log("Unable to parse the CSV to generate copyrights array");
        }
      }
    );
  });
