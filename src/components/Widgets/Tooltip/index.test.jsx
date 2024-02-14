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
import Tooltip from './index';

describe('Tooltip', () => {
  it('renders the tooltip with the correct title', () => {
    render(<Tooltip title="Test Tooltip" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('title', 'Test Tooltip');
  });

  it('renders the info icon', () => {
    render(<Tooltip title="Test Tooltip" />);

    const svg = screen.getByRole('img', { name: /info-circle-fill/i });
    expect(svg).toBeInTheDocument();
  });
});