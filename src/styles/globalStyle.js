/***************************************************************
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
***************************************************************/

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: Mulish-regular;
  }
  .bg-primary-color{
    background: ${({ theme }) => theme.primaryColor};
  }
  .primary-color-wrapper{
    background: ${({ theme }) => theme.primaryColor};
    padding: 1rem;
    color: ${({ theme }) => theme.secondaryText};
  }
  .text-primary-color{
    color: ${({ theme }) => theme.primaryText};
  }
  .text-secondary-color{
    color: ${({ theme }) => theme.secondaryText};
  }
  .navbar-light .navbar-nav .nav-link{
    color: ${({ theme }) => theme.secondaryText};
    &:hover{
      color: ${({ theme }) => theme.secondaryText};
    }
    &:focus{
      color: ${({ theme }) => theme.secondaryText};
    }
    &:active{
      color: ${({ theme }) => theme.secondaryText};
    }
  }
  .dropdown-item{
    color: ${({ theme }) => theme.primaryText};
    &:hover:{
      background: ${({ theme }) => theme.primaryColor};
    }
  }
  .box{
    background: ${({ theme }) => theme.body};
    margin: 1rem 0rem;
    padding: 1.5rem;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    transition: all 0.25s linear;
    &:hover{
      box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
    }
  }
  .hover-primary-color{
    &:hover{
      background: ${({ theme }) => theme.hoverBackgroundColor};
    }
  }
}`;
