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
import Alert from './index';

describe('Alert', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(<Alert type="success" message="Test message" setShow={() => {}} />);
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('renders the correct message', () => {
    const { getByText } = render(<Alert type="success" message="Test message" setShow={() => {}} />);
    expect(getByText('Test message')).toBeInTheDocument();
  });

  it('renders the correct icon for success', () => {
    const { container } = render(<Alert type="success" message="Test message" setShow={() => {}} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the correct icon for danger', () => {
    const { container } = render(<Alert type="danger" message="Test message" setShow={() => {}} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('calls setShow when close button is clicked', () => {
    const setShow = jest.fn();
    const { getByLabelText } = render(<Alert type="success" message="Test message" setShow={setShow} />);
    fireEvent.click(getByLabelText('Close'));
    expect(setShow).toHaveBeenCalledWith(false);
  });
});