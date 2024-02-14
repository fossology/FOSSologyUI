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
import InputContainer from './index';

describe('InputContainer', () => {
  const onChange = jest.fn();
  it('renders a text input correctly', () => {
    const { getByLabelText } = render(
      <InputContainer type="text" name="test" id="test" children="test"  onChange={onChange} />
    );
    const input = getByLabelText('test');
    expect(input).toBeInTheDocument();
  });

  it('handles change event correctly', () => {
    const { getByLabelText } = render(
      <InputContainer type="text" name="test" id="test" children="test"  onChange={onChange} />
    );
    const input = getByLabelText('test');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders a select input correctly', () => {
    const options = [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }];
    const { getByLabelText } = render(
      <InputContainer type="select" name="test" id="test" children="test" options={options} property="name" onChange={onChange} />
    );
    const select = getByLabelText('test');
    expect(select).toBeInTheDocument();
    expect(select.children.length).toBe(2);
    expect(select.children[0].value).toBe('1');
    expect(select.children[0].textContent).toBe('Option 1');
    expect(select.children[1].value).toBe('2');
    expect(select.children[1].textContent).toBe('Option 2');
  });

  it('renders a checkbox input correctly', () => {
    const { getByLabelText } = render(
      <InputContainer type="checkbox" name="test" id="test" children="test" onChange={onChange}/>
    );
    const checkbox = getByLabelText('test');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders a radio input correctly', () => {
    const { getByLabelText } = render(
      <InputContainer type="radio" name="test" id="test" children="test" onChange={onChange}/>
    );
    const radio = getByLabelText('test');
    expect(radio).toBeInTheDocument();
  });
});