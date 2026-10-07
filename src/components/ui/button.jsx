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
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded text-sm font-medium transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        // Normal / Blue
        default:
          "bg-tertiary1-800 text-white hover:bg-tertiary1-900 disabled:bg-tertiary1-400 disabled:text-white",
        outline:
          "border border-tertiary1-800 text-tertiary1-800 bg-white hover:bg-tertiary1-200 hover:border-tertiary1-800 disabled:border-tertiary1-400 disabled:text-tertiary1-400 disabled:bg-white disabled:opacity-100",
        inactive: 
        "bg-neutral-200 text-neutral-900 border border-transparent hover:bg-neutral-200 hover:text-neutral-900 active:bg-neutral-200",
          link:
          "text-tertiary1-800 bg-transparent border-none underline-offset-4 hover:underline hover:text-tertiary1-900 hover:decoration-tertiary1-900 disabled:text-tertiary1-400 disabled:underline disabled:decoration-tertiary1-400 disabled:opacity-100",

        // Alert / Red
        alert:
          "bg-alert-500 text-white hover:bg-alert-700 disabled:bg-alert-500 disabled:opacity-40",
        "alert-outline":
          "border border-alert-500 text-alert-500 bg-white hover:bg-alert-100 hover:border-alert-700 hover:text-alert-700 disabled:border-alert-500 disabled:text-alert-500 disabled:bg-white disabled:opacity-40",
        "alert-link":
          "text-alert-500 bg-transparent border-none underline-offset-4 hover:underline hover:text-alert-700 hover:decoration-alert-700 disabled:text-alert-500 disabled:opacity-40",
        
        //Info / Blue
        info:
          "bg-info-500 text-white hover:bg-info-600 disabled:bg-info-500 disabled:opacity-40",
        "info-outline":
          "border border-info-500 text-info-500 bg-white hover:bg-info-100 hover:border-info-600 hover:text-info-600 disabled:border-info-500 disabled:text-info-500 disabled:bg-white disabled:opacity-40",
        "info-link":
          "text-info-500 bg-transparent border-none underline-offset-4 hover:underline hover:text-info-600 hover:decoration-info-600 disabled:text-info-500 disabled:opacity-40",
        
        //Success / Green
        success:
          "bg-success-500 text-white hover:bg-success-700 disabled:bg-success-500 disabled:opacity-40",
        "success-outline":
          "border border-success-500 text-success-500 bg-white hover:bg-success-100 hover:border-success-700 hover:text-success-700 disabled:border-success-500 disabled:text-success-500 disabled:bg-white disabled:opacity-40",
        "success-link":
          "text-sucsess-500 bg-transparent border-none underline-offset-4 hover:underline hover:text-success-700 hover:decoration-success-700 disabled:text-success-500 disabled:opacity-40",
        
        //Warning / Orange
        warning:
          "bg-warning-500 text-white hover:bg-warning-600 disabled:bg-warning-500 disabled:opacity-40",
        "warning-outline":
          "border border-warning-500 text-warning-500 bg-white hover:bg-warning-100 hover:border-warning-600 hover:text-warning-600 disabled:border-warning-500 disabled:text-warning-500 disabled:bg-white disabled:opacity-40",
        "warning-link":
          "text-warning-500 bg-transparent border-none underline-offset-4 hover:underline hover:text-warning-600 hover:decoration-warning-600 disabled:text-warning-500 disabled:opacity-40",
      },
      size: {
        default: "h-10 px-8 py-2",  // 40px — normal
        md:      "h-8  px-4 py-1",  // 32px — medium
        sm:      "h-6  px-3 py-1 text-xs gap-1", // 24px — small
        icon:    "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
