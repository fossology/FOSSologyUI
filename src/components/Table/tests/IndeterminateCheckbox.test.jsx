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
import IndeterminateCheckbox from '../IndeterminateCheckbox';

describe('IndeterminateCheckbox', () => {
  it('renders without crashing', () => {
    render(<IndeterminateCheckbox />);
  });

  it('sets the indeterminate property when indeterminate prop is true', () => {
    const { getByRole } = render(<IndeterminateCheckbox indeterminate={true} />);
    expect(getByRole('checkbox').indeterminate).toBe(true);
  });

  it('does not set the indeterminate property when indeterminate prop is false', () => {
    const { getByRole } = render(<IndeterminateCheckbox indeterminate={false} />);
    expect(getByRole('checkbox').indeterminate).toBe(false);
  });

  it('toggles the checked property when clicked', () => {
    const { getByRole } = render(<IndeterminateCheckbox />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});