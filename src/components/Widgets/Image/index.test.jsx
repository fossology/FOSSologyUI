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
import '@testing-library/jest-dom/extend-expect';
import Image from './index';

describe('Image component', () => {
  it('renders correctly', () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'test.jpg');
  });

  it('applies style correctly', () => {
    render(<Image src="test.jpg" alt="Test Image" style={{ color: 'red' }} />);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toHaveStyle('color: red');
  });

  it('applies className correctly', () => {
    render(<Image src="test.jpg" alt="Test Image" className="test-class" />);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toHaveClass('test-class');
  });

  it('applies width and height correctly', () => {
    render(<Image src="test.jpg" alt="Test Image" width="100px" height="100px" />);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toHaveAttribute('width', '100px');
    expect(imgElement).toHaveAttribute('height', '100px');
  });

  it('applies align correctly', () => {
    render(<Image src="test.jpg" alt="Test Image" align="center" />);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toHaveAttribute('align', 'center');
  });
});