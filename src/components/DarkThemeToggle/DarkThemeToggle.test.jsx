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

import { render, fireEvent } from '@testing-library/react';
import { GlobalContext } from 'context';
import DarkThemeToggle from './DarkThemeToggle';

describe('DarkThemeToggle', () => {
  it('should toggle dark theme on click', () => {
    const setTheme = jest.fn();
    const state = { theme: 'light' };

    const { getByRole } = render(
      <GlobalContext.Provider value={{ state, setTheme }}>
        <DarkThemeToggle />
      </GlobalContext.Provider>
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle light theme on click', () => {
    const setTheme = jest.fn();
    const state = { theme: 'dark' };

    const { getByRole } = render(
      <GlobalContext.Provider value={{ state, setTheme }}>
        <DarkThemeToggle />
      </GlobalContext.Provider>
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('should display correct icon for each theme', () => {
    const setTheme = jest.fn();

    const { rerender, getByLabelText } = render(
      <GlobalContext.Provider value={{ state: { theme: 'light' }, setTheme }}>
        <DarkThemeToggle />
      </GlobalContext.Provider>
    );

    expect(getByLabelText("checkbox")).toHaveClass('light toggle-button--label');

    rerender(
      <GlobalContext.Provider value={{ state: { theme: 'dark' }, setTheme }}>
        <DarkThemeToggle />
      </GlobalContext.Provider>
    );

    expect(getByLabelText("checkbox")).toHaveClass('dark toggle-button--label');
  });
});
