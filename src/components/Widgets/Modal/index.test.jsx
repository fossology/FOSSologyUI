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
import Modal from './index';

describe('Modal', () => {
  it('renders without crashing', () => {
    const mockSetShow = jest.fn();
    render(<Modal show={false} setShow={mockSetShow} />);
  });

  it('renders its children', () => {
    const mockSetShow = jest.fn();
    const { getByText } = render(
      <Modal show={true} setShow={mockSetShow}>
        <div>Test Child</div>
      </Modal>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    const mockSetShow = jest.fn();
    const { queryByText } = render(
      <Modal show={false} setShow={mockSetShow}>
        <div>Test Child</div>
      </Modal>
    );
    expect(queryByText('Test Child')).toBeNull();
  });

  it('calls setShow with false when the close button is clicked', () => {
    const mockSetShow = jest.fn();
    const { getByText } = render(
      <Modal show={true} setShow={mockSetShow}>
        <div>Test Child</div>
      </Modal>
    );
    fireEvent.click(getByText('Close'));
    expect(mockSetShow).toHaveBeenCalledWith(false);
  });
});