/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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

import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InputContainer = ({
  type,
  name,
  value,
  id,
  className,
  onChange,
  children,
  checked = false,
  placeholder = null,
  disabled = false,
  options = null,
  multiple = false,
  property,
  valueProperty,
  noDataMessage = "No Data Found",
}) => {
if (type === "radio") {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-2"
    >
      <div className="flex items-start gap-2">
        <RadioGroupItem
          value={value}
          id={id}
          checked={checked}
          disabled={disabled}
          className="w-4 h-4 mt-1"
        />
        <Label htmlFor={id} className="text-base font-normal">
          {children}
        </Label>
      </div>
    </RadioGroup>
  );
}
  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-3">
        <Checkbox
          className={className}
          name={name}
          value={value}
          onCheckedChange={onChange}
          checked={checked}
          disabled={disabled}
          id={id}
        />
        <Label htmlFor={id} className="text-base font-normal">{children} </Label>
      </div>
    );
  }
  if (type === "select") {
    return (
      <div className="my-1">
        <div className="flex items-center gap-3">
          {children && (
            <label htmlFor={id} className="font-base whitespace-nowrap">
              {children}
            </label>
          )}
          <Select
            name={name}
            value={value === null ? "" : value}
            onValueChange={(val) => onChange(val)}
            id={id}
          >
            <SelectTrigger className="h-8 text-sm flex items-center">
              <SelectValue placeholder="All uploads" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <SelectItem
                    key={option.id || index}
                    value={valueProperty ? option[valueProperty] : option.id}
                    disabled={option.disabled}
                  >
                    {property ? option[property] : option}
                  </SelectItem>
                ))
              ) : (
                <SelectItem className="font-demi" disabled>
                  {noDataMessage}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="my-2">
      <label htmlFor={id} className="font-demi">
        {children}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className={
          type === "file" ? `ml-3 ${className}` : `form-control ${className}`
        }
        onChange={onChange}
        checked={checked}
        placeholder={placeholder}
        id={id}
      />
    </div>
  );
};

InputContainer.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string,
      description: PropTypes.string,
      parent: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ),
  multiple: PropTypes.bool,
  property: PropTypes.string,
  valueProperty: PropTypes.string,
  noDataMessage: PropTypes.string,
};

export default InputContainer;
