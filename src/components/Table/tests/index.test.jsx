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
import ReactDOM from "react-dom";
import { randomString } from "shared/helper";
import makeData from "shared/makeData";
import Table from "../index";

const columns = [
  {
    Header: "Count",
    accessor: "count",
  },
  {
    Header: "Agent Findings",
    accessor: "agentFindings",
  },
];

const schema = () => {
  return {
    count: Math.floor(Math.random() * 100),
    agentFindings: randomString(10),
  };
};

const data = makeData(500, schema);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Table columns={columns} data={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
