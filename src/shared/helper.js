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

// Random string generator
export const randomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Get date in YYYY-MM-DD format
export const getDate = (day) => {
  // eslint-disable-next-line no-extend-native, func-names
  Date.prototype.addDays = function (days) {
    const currentDate = new Date(this.valueOf());
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  };
  const date = new Date();
  return date.addDays(day).toISOString().split("T")[0];
};

// Returns the initials of given name
export const getNameInitials = (name) => {
  // Convert name into array of words
  const nameList = name.split(" ");
  // For single word name return first 2 characters
  if (nameList.length === 1) {
    return nameList[0].substring(0, 2).toUpperCase();
  }
  // Return the first 3 characters of the initials
  return nameList
    .map((n, index) => {
      if (index < 3) {
        return n[0];
      }
      return null;
    })
    .join("")
    .toUpperCase();
};

// Common handle error component
export const handleError = (error, setMessage) => {
  setMessage({
    type: "danger",
    text: error.message,
  });
};
