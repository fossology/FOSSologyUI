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

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/global.css";

import { Image } from "components/Widgets";
import { GlobalProvider } from "context";
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/globalStyle";
import { darkTheme, lightTheme } from "styles/theme";

export default {
  title: "Components/Widgets/Image",
  component: Image,
};

const Template = (args) => {
  return (
    <GlobalProvider>
      <ThemeProvider {...args}>
        <GlobalStyles />
        <Image {...args}>Image</Image>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export const Light = Template.bind({});
Light.args = {
  theme: lightTheme,
  src: "https://images.unsplash.com/photo-1644982648791-a010e61aa845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  alt: "Image",
};

export const Dark = Template.bind({});
Dark.args = {
  theme: darkTheme,
  src: "https://images.unsplash.com/photo-1644982648791-a010e61aa845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  alt: "Image",
};
