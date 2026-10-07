/*
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

"use client"

import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button";

const buttonSwitchVariants = cva(
  "inline-flex",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-8",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      disabled: false,
    },
  }
)

function ButtonSwitch({
  options = [],
  value,
  onValueChange,
  size = "default",
  disabled = false,
  className,
}) {
  return (
    <ButtonGroup
      role="radiogroup"
      className={cn(buttonSwitchVariants({ size, disabled }), className)}
      aria-disabled={disabled}
    >
    {options.map((option, index) => {
      const optionValue = option.value ?? option.label;
      const isActive = value === optionValue;

      return (
        <Button
          key={optionValue}
          size={size}
          variant={isActive ? "outline" : "inactive"}
          onClick={() => onValueChange?.(optionValue)}
          className={cn(
            index === 0
              ? isActive
                ? "rounded-md"
                : "rounded-l-md rounded-r-none"
              : isActive
                ? "rounded-md"
                : "rounded-r-md rounded-l-none"
          )}
        >
          {option.label}
        </Button>
      );
    })}
    </ButtonGroup>
  );
}

export { ButtonSwitch }
