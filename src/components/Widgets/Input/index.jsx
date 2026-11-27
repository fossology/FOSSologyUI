/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
  helperText,
  cta = false,
  ctaLabel = "Action",
  onCtaClick,
  fullWidth = false,
  labelPosition = "left",
}) => {
if (type === "radio") {
  return (
    <div className="flex items-start gap-2">
      <RadioGroupItem
        value={value}
        id={id}
        disabled={disabled}
        className="w-4 h-4 mt-[2px]"
      />

      <Label
        htmlFor={id}
        className="leading-none cursor-pointer"
      >
        {children}
      </Label>
    </div>
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
        <Label htmlFor={id}>{children} </Label>
      </div>
    );
  }
  if (type === "select") {
    return (
      <div className="my-1">
        <div className={`flex items-center gap-3 ${fullWidth ? "w-full" : ""} ${labelPosition === "top" ? "flex-col items-start" : ""}`}>
          {children && (
            <Label htmlFor={id} className={`whitespace-nowrap ${disabled ? "text-neutral-600" : ""}`}>
              {children}
            </Label>
          )}
          <Select
            name={name}
            value={value === null ? "" : value}
            onValueChange={(val) => onChange(val)}
            id={id}
            disabled={disabled}
          >
            <SelectTrigger className={`h-8 text-sm flex items-center ${fullWidth ? "w-full" : ""}`} disabled={disabled}>
              <SelectValue placeholder={placeholder ?? "Select..."} />
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
                <SelectItem key="__no_data__" value="__no_data__" className="font-demi" disabled>
                  {noDataMessage}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        {helperText ? (
          <p className={`mt-1 text-xs ${disabled ? "text-neutral-600" : "text-neutral-700"}`}>{helperText}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="my-2">
      <div className={`flex items-center gap-3 ${fullWidth ? "w-full" : ""} ${labelPosition === "top" ? "flex-col items-start" : ""}`}>
        <Label htmlFor={id} className={`font-demi ${disabled ? "text-neutral-600" : ""}`}>
          {children}
        </Label>
        <div className={`flex items-center gap-2 ${fullWidth ? "w-full" : ""}`}>
          <input
            type={type}
            name={name}
            value={value}
            className={
              type === "file"
                ? `ml-3 ${className}`
                : `form-control ${fullWidth ? "w-full" : ""} ${className}`
            }
            onChange={onChange}
            checked={checked}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
          />
          {cta ? (
            <button
              type="button"
              onClick={onCtaClick}
              disabled={disabled}
              className="h-8 rounded border border-tertiary1-800 px-3 text-sm text-tertiary1-800 hover:bg-tertiary1-200 disabled:pointer-events-none disabled:opacity-50"
            >
              {ctaLabel}
            </button>
          ) : null}
        </div>
      </div>
      {helperText ? (
        <p className={`mt-1 text-xs ${disabled ? "text-neutral-600" : "text-neutral-700"}`}>{helperText}</p>
      ) : null}
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
  helperText: PropTypes.string,
  cta: PropTypes.bool,
  ctaLabel: PropTypes.string,
  onCtaClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  labelPosition: PropTypes.oneOf(["left", "top"]),
};

export default InputContainer;
