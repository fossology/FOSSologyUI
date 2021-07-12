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

import React, { useState } from "react";
import PropTypes from "prop-types";
import { setLocalStorage, getLocalStorage } from "../shared/storageHelper";

// Initial state
const initialState = {
  theme: getLocalStorage("theme") || "light",
};

// Create context
export const GlobalContext = React.createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Actions
  const setTheme = (theme) => {
    setState(theme);
    setLocalStorage("theme", theme);
    window.location.reload();
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = { children: PropTypes.node.isRequired };
