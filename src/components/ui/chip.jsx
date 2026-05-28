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

const Chip = ({
  label,
  onRemove,
  className = "",
  removable = true,
}) => {
  return (
    <div
      className={`
        w-full h-[28px]
        flex items-center justify-between
        gap-1 px-2 py-1
        rounded
        bg-gray-200
        text-sm text-foreground
        ${className}
      `}
    >
      {/* Label */}
      <span className="truncate">{label}</span>

      {/* Close Button */}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center hover:opacity-80 transition"
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
};

export default Chip;