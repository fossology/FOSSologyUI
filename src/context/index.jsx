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

"use client"; // Ensure client context

import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

// Helper functions to persist theme
import { setLocalStorage, getLocalStorage } from "@/shared/storageHelper";

// Initial state
const initialState = {
  theme: getLocalStorage("theme") || "light",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setTheme = (theme) => {
    setState({ theme });
    setLocalStorage("theme", theme);
  };

  return (
    <GlobalContext.Provider value={{ state, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
