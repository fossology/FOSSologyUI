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

"use client";

import React from "react";
import PropTypes from "prop-types";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-between gap-1 rounded px-2 py-1 text-sm leading-5 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-tertiary1-200 text-tertiary1-900",
        secondary: "bg-neutral-200 text-neutral-900",
      },
      interactive: {
        true: "hover:bg-neutral-300",
        false: "",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "secondary",
      interactive: true,
      disabled: false,
    },
  }
);

const Chip = ({
  label,
  onRemove,
  className = "",
  removable = true,
  variant = "secondary",
  interactive = true,
  disabled = false,
}) => {
  return (
    <div
      className={cn(chipVariants({ variant, interactive, disabled }), className)}
      aria-disabled={disabled}
    >
      <span className="truncate">{label}</span>

      {removable && !disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center hover:opacity-80 transition"
          aria-label={`Remove ${label}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 text-primary"
          >
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  className: PropTypes.string,
  removable: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  interactive: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Chip;