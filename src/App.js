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

// React imports
import React, { useContext } from "react";
import { GlobalContext } from "./context";

// External library imports
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";

// Custom component imports
import Routes from "./Routes";

// Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// react-virtualized-tree imports
import "react-virtualized-tree/lib/main.css";
import "material-icons/css/material-icons.min.css";

// CSS imports
import { GlobalStyles } from "./styles/globalStyle";
import "./styles/global.css";

// Global State Provider
import { GlobalProvider } from "../src/context";

function App() {
  const { theme } = useContext(GlobalContext);
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
