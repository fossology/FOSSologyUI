/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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

// query-string library to sanitize url
import queryString from "query-string";
// Routes
import routes from "@/constants/routes";

// Helper Functions
import {
  getCookie,
  getLocalStorage,
  removeCookie,
  removeLocalStorage,
} from "./storageHelper";

// Access user info from localstorage
export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user") && localStorage.getItem("groups")) {
        return true;
      }
      return false;
    }
  }
  return false;
};

// Logging out the user
export const logout = (message) => {
  removeCookie("token");
  removeLocalStorage("user");
  removeLocalStorage("groups");
  removeLocalStorage("currentGroup");
  let Url = routes.home;
  if (message) {
    Url = `${routes.home}?${queryString.stringify(message)}`;
  }
  window.location.href = Url;
};

// Updating the user info
export const updateUser = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

// Getting the Bearer Token for Authorization
export const getToken = () => {
  return getCookie("token");
};

// Getting the user info
export const getUser = () => {
  return getLocalStorage("user");
};

// Getting the user name
export const getUserName = () => {
  return getLocalStorage("user").name;
};

// Checking the role of a user
export const isAdmin = () => {
  return getLocalStorage("user")?.accessLevel === "admin";
};
