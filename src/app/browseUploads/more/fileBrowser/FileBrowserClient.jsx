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


/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025 Kasturi Dnyaneshwar Jadhav

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

"use client";

import React from "react";
import styled from "styled-components";

// Header
import SecondaryNavBar from "@/components/SecondaryNavBar";

// Table
import Table from "@/components/Table";

// Helpers
import { randomString } from "@/shared/helper";
import makeData from "@/shared/makeData";

const schema = () => {
  const extensions = ["js", "jsx", "php", "c", "cpp", "py", "ts", "txt", "md"];
  const ext = extensions[Math.floor(Math.random() * extensions.length)];
  return {
    fileName: `${randomString(8)}.${ext}`,
    filePath: `/src/${randomString(5)}/${randomString(8)}.${ext}`,
    fileSize: `${Math.floor(Math.random() * 500)} KB`,
    license: ["MIT", "GPL-2.0", "Apache-2.0", "No license"][
      Math.floor(Math.random() * 4)
    ],
  };
};

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid #eee;

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
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;

      :last-child {
        border-right: 0;
      }
    }
  }

  .paginationTable {
    padding: 0.5rem;
  }
`;

const FileBrowser = () => {
  const columns = [
    {
      Header: "File Name",
      accessor: "fileName",
    },
    {
      Header: "File Path",
      accessor: "filePath",
    },
    {
      Header: "File Size",
      accessor: "fileSize",
    },
    {
      Header: "License",
      accessor: "license",
    },
  ];

  const data = makeData(schema, 500);

  return (
    <>
      <SecondaryNavBar title="File Browser" />
      <div className="main-container my-3">
        <h1 className="font-size-main-heading">File Browser</h1>
        <p className="font-size-medium mt-2">
          Browse all files in the selected upload. This view shows each file
          along with its path, size, and detected license information.
        </p>
      </div>
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </>
  );
};

export default FileBrowser;
