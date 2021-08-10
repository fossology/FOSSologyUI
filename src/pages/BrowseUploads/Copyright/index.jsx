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
import styled from "styled-components";

// Title
import Title from "components/Title";

// Header
import BrowseUploadsHeader from "components/BrowseUploadsHeader";
import { randomString } from "shared/helper";
import makeData from "shared/makeData";
import Table from "components/Table";

const schema = () => {
  return {
    count: Math.floor(Math.random() * 100),
    agentFindings: randomString(30),
  };
};

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .paginationTable {
    padding: 0.5rem;
  }
`;

const CopyrightBrowser = () => {
  const columns = [
    {
      Header: "Count",
      accessor: "count",
    },
    {
      Header: "Agent Findings",
      accessor: "agentFindings",
    },
    {
      Header: "",
      accessor: "delete",
    },
  ];
  const data = makeData(schema, 500);
  return (
    <>
      <Title title="Copyright Browser" />
      <div className="main-container my-3">
        <h1 className="font-size-main-heading">Copyright Browser</h1>
      </div>
      <BrowseUploadsHeader />
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </>
  );
};

export default CopyrightBrowser;
