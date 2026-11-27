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
import { Search, X } from "lucide-react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

const searchBarVariants = cva("w-full", {
  variants: {
    size: {
      default: "h-10",
      sm: "h-8",
    },
    fullWidth: {
      true: "w-full",
      false: "w-[320px]",
    },
  },
  defaultVariants: {
    size: "default",
    fullWidth: false,
  },
})

function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search",
  size = "default",
  fullWidth = false,
  disabled = false,
  className,
}) {
  return (
    <InputGroup className={cn(searchBarVariants({ size, fullWidth }), className)} data-disabled={disabled}>
      <InputGroupAddon align="inline-start">
        <Search className="size-4" aria-hidden="true" />
      </InputGroupAddon>

      <InputGroupInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch?.(e)
        }}
        placeholder={placeholder}
        disabled={disabled}
      />

      <InputGroupAddon align="inline-end">
        {!!value && (
          <InputGroupButton
            type="button"
            variant="ghost"
            size={size === "sm" ? "icon-xs" : "icon-sm"}
            onClick={onClear}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </InputGroupButton>
        )}
        <InputGroupButton
          type="button"
          variant="ghost"
          size={size === "sm" ? "icon-xs" : "icon-sm"}
          onClick={onSearch}
          aria-label="Run search"
          disabled={disabled}
        >
          <Search className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { SearchBar }
