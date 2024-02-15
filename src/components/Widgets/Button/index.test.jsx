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
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './index';

describe('Button', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Button type="button" onClick={() => {}} >Test</Button>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button type="button" onClick={handleClick} >Test</Button>);
    fireEvent.click(getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    const { getByText } = render(<Button type="button" onClick={() => {}} disabled >Test</Button>);
    expect(getByText('Test')).toBeDisabled();
  });
});