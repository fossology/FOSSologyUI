/*
 Copyright (C) 2024 Nillanshu Saini (nillanshusaini738@gmail.com)
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

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import TextIcon from './index';

describe('TextIcon', () => {
  const theme = {
    primaryColor: '#000000',
  };

  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextIcon text="Test" className="test-class" />
      </ThemeProvider>
    );

    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('test-class');

    const textElement = screen.getByText('Test');
    expect(textElement).toBeInTheDocument();
  });
});