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

import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalContext, GlobalProvider } from "./context";
import { lightTheme, darkTheme } from "./styles/theme";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-virtualized-tree/lib/main.css";
// import "material-icons/css/material-icons.min.css";
import GlobalStyles from "./styles/globalStyle";
import "./styles/global.css";

function App() {
  const { theme } = useContext(GlobalContext);
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
