/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)

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

export default function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
}
export const getEquivalentPermVals = (permId) => {
  switch (permId) {
    case 0:
      return "none";
    case 1:
      return "read_only";
    case 3:
      return "read_write";
    case 5:
      return "clearing_admin";
    case 10:
      return "admin";
    default:
      return "none";
  }
};

export function getEquivalentValueForPermission(perm) {
  switch (perm) {
    case "none":
      return 0;
    case "read_only":
      return 1;
    case "read_write":
      return 3;
    case "clearing_admin":
      return 5;
    case "admin":
      return 10;
    default:
      return 0;
  }
}
