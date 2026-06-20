/*
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

import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-3 py-2 bg-white border border-neutral-800 placeholder:text-neutral-800 rounded text-sm transition-colors caret-primary",
        "focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:text-neutral-600 disabled:placeholder:text-neutral-600",
        className
      )}
      {...props}
    />
  );
}

export { Input }
