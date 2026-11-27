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

import * as React from "react";

import { cn } from "@/lib/utils";

function ContentBox({
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="content-box"
      className={cn(
        "w-[390px]",
        "h-[300px] max-h-[300px]",
        "overflow-y-auto",
        "rounded",
        "border border-neutral-800",
        "bg-white",
        "p-3",
        "flex flex-col gap-2.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ContentBox };