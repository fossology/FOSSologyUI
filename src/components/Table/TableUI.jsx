/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 Copyright (C) 2022 Raunak Kumar (raunakk728@gmail.com)

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
import CloseIcon from "assets/images/close.png";
import "./index.css";
import { PropTypes } from "prop-types";

const TableUI = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
}) => {
  return (
    <>
      <table
        className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {/* eslint-disable no-nested-ternary */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === "delete") {
                    return (
                      <td {...cell.getCellProps()}>
                        <input
                          type="checkbox"
                          className="delete-checkbox"
                          id={cell.row.id}
                          name={cell.row.id}
                        />
                        <label htmlFor={cell.row.id}>
                          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
                          <img src={CloseIcon} alt="cross" />
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

TableUI.propTypes = {
  getTableProps: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  headerGroups: PropTypes.arrayOf(PropTypes.object),
  prepareRow: PropTypes.func,
  page: PropTypes.arrayOf(PropTypes.object),
};

export default TableUI;
