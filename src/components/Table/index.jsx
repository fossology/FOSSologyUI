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

"use client";

import React from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
} from "react-table";
import Image from "next/image";
import CloseIcon from "public/assets/icons/Close/Close_16px.svg";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import "./index.css";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columnList) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columnList,
      ]);
    }
  );

  return (
    <>
      <table
        className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === "delete") {
                    return (
                      <td key={cell.column.id} {...cell.getCellProps()}>
                        <input
                          type="checkbox"
                          className="delete-checkbox"
                          id={cell.row.id}
                          name={cell.row.id}
                        />
                        <label htmlFor={cell.row.id}>
                          <Image src={CloseIcon} alt="cross" />
                          <span>
                            <b>
                              deactivated <br />
                              <u>[Undo]</u>
                            </b>
                          </span>
                        </label>
                      </td>
                    );
                  }
                  return (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="paginationTable">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>

        <span>
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "100px" }}
          />
        </span>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
