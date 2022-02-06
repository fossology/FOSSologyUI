/*
 Copyright (C) 2022 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
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

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-virtualized-tree/lib/main.css";
import "styles/global.css";
import GlobalStyles from "styles/globalStyle";

const initialTheme = {
  theme: "light",
};
const GlobalContext = React.createContext(initialTheme);

const renderComponent = (Component) => {
  const setTheme = jest.fn();
  return render(
    <GlobalContext.Provider
      value={{
        ...initialTheme,
        setTheme,
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Component />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default renderComponent;
