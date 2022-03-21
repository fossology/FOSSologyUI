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
import React, { useContext } from "react";

// Theme Provider
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styles/theme";

// GlobalContext
import { GlobalContext, GlobalProvider } from "context";

// Routes
import Routes from "Routes";

// Global CSS (Bootstrap, Tree View of Folders, Custom Styling)
import "bootstrap/dist/css/bootstrap.min.css";
import "react-virtualized-tree/lib/main.css";
import "styles/global.css";
import GlobalStyles from "styles/globalStyle";

// useAlert hook provider
import AlertProvider from "components/Widgets/AlertProvider";

function App() {
  const { theme } = useContext(GlobalContext);
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <AlertProvider>
          <GlobalStyles />
          <Routes />
        </AlertProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
