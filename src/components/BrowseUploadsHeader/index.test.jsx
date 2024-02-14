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
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './index';

const { isAuth } = require('shared/authHelper');

jest.mock('shared/authHelper', () => ({
  isAuth: jest.fn(),
}));

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Router><Header /></Router>);
  });

  it('displays links when user is authenticated', () => {
    isAuth.mockReturnValue(true);

    render(<Router><Header /></Router>);

    expect(screen.getByText('Software Heritage')).toBeInTheDocument();
    expect(screen.getByText('License Browser')).toBeInTheDocument();
    expect(screen.getByText('File Browser')).toBeInTheDocument();
    expect(screen.getByText('Copyright Browser')).toBeInTheDocument();
    expect(screen.getByText('ECC')).toBeInTheDocument();
  });

  it('does not display links when user is not authenticated', () => {
    isAuth.mockReturnValue(false);

    render(<Router><Header /></Router>);

    expect(screen.queryByText('Software Heritage')).not.toBeInTheDocument();
    expect(screen.queryByText('License Browser')).not.toBeInTheDocument();
    expect(screen.queryByText('File Browser')).not.toBeInTheDocument();
    expect(screen.queryByText('Copyright Browser')).not.toBeInTheDocument();
    expect(screen.queryByText('ECC')).not.toBeInTheDocument();
  });
});
