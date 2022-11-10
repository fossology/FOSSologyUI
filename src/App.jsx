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

// React Imports
// eslint-disable-next-line import/no-extraneous-dependencies
import "popper.js";
// Global CSS (Bootstrap, Tree View of Folders, Custom Styling)
import "bootstrap/dist/css/bootstrap.min.css";
import "react-virtualized-tree/lib/main.css";
import "styles/global.css";

// GlobalContext
import { GlobalContext, GlobalProvider } from "context";
import React, { useContext, useEffect } from "react";
// Routes
import Routes from "Routes";
// Theme Provider
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/globalStyle";
import { darkTheme, lightTheme } from "styles/theme";

function App() {
  const { state } = useContext(GlobalContext);
  return (
    <ThemeProvider theme={state.theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}

function AppWrapper() {
  useEffect(() => {
    import("jquery").then(($) => {
      // jQuery must be installed to the `window`:
      // eslint-disable-next-line no-multi-assign
      window.$ = window.jQuery = $;
      return import("bootstrap");
    });
  }, []);
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
}

export default AppWrapper;
