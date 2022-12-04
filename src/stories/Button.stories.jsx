/*
 Copyright (C) 2021 Jacob Moore (c.jacob.moore92@gmail.com)

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

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/global.css";

import { Button } from "components/Widgets";
import { GlobalProvider } from "context";
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/globalStyle";
import { darkTheme, lightTheme } from "styles/theme";

export default {
  title: "Components/Widgets/Button",
  component: Button,
};

const Template = (args) => {
  return (
    <GlobalProvider>
      <ThemeProvider {...args}>
        <GlobalStyles />
        <Button {...args}>Click Me</Button>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export const Light = Template.bind({});
Light.args = {
  type: "button",
  theme: lightTheme,
};

export const Dark = Template.bind({});
Dark.args = {
  type: "button",
  theme: darkTheme,
};
