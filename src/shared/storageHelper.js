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

import cookie from "js-cookie";

// Set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
      sameSite: "strict",
      secure: true,
    });
  }
};

// Remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
  return null;
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Get from localstorage
export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const defaultAgentsList = () => {
  if (getLocalStorage("user")?.agents) {
    const agentsList = getLocalStorage("user")?.agents;
    agentsList.copyrightEmailAuthor = agentsList.copyright_email_author;
    delete agentsList.copyright_email_author;
    agentsList.mime = agentsList.mimetype;
    delete agentsList.mimetype;
    return agentsList;
  }
  return {
    compatibility: false,
    copyrightEmailAuthor: false,
    ecc: false,
    ipra: false,
    keyword: false,
    mime: false,
    monk: false,
    nomos: false,
    ojo: false,
    package: false,
    softwareAnalysis: false,
    scanoss: false,
    heritage: false,
  };
};

// Get from session storage
export const getSessionStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem(key));
  }
  return null;
};

// Set in session storage
export const setSessionStorage = (key, value) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};
