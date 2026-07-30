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

/**
 * Two button families, each with 3 variants and 3 sizes.
 *
 * Normal (blue):
 *   variant="default"   — primary blue  (#004494 → #000B54 → disabled #B0C4DE)
 *   variant="outline"   — secondary blue (border #004494, bg white → #E2EFFF → disabled border #B0C4DE)
 *   variant="link"      — tertiary blue  (text #004494 → underline #000B54 → disabled #B0C4DE)
 *
 * Alert (red):
 *   variant="alert"            — primary alert   (#D02216 → #A41411 → disabled #D02216/40%)
 *   variant="alert-outline"    — secondary alert (border #D02216, bg white → #FFEBEE → disabled /40%)
 *   variant="alert-link"       — small/tertiary alert (no border, text #D02216 → #FFEBEE bg + underline → disabled /40%)
 *
 * Sizes:
 *   size="default"  h-10 px-8 py-2    (40px tall, normal button)
 *   size="md"       h-8  px-4 py-1    (32px tall, medium)
 *   size="sm"       h-6  px-3 py-1    (24px tall, small)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded text-sm font-medium transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        // ── Normal / Blue ─────────────────────────────────────────────────
        default:
          "bg-tertiary1-800 text-white hover:bg-tertiary1-900 disabled:bg-tertiary1-400 disabled:text-white",
        outline:
          "border border-tertiary1-800 text-tertiary1-800 bg-white hover:bg-tertiary1-200 hover:border-tertiary1-800 disabled:border-tertiary1-400 disabled:text-tertiary1-400 disabled:bg-white disabled:opacity-100",
        link:
          "text-tertiary1-800 bg-transparent border-none underline-offset-4 hover:underline hover:text-tertiary1-900 hover:decoration-tertiary1-900 disabled:text-tertiary1-400 disabled:underline disabled:decoration-tertiary1-400 disabled:opacity-100",

        // ── Alert / Red ───────────────────────────────────────────────────
        alert:
          "bg-alert text-white hover:bg-alert-hover disabled:bg-alert disabled:opacity-40",
        "alert-outline":
          "border border-alert text-alert bg-white hover:bg-alert-bg hover:border-alert disabled:border-alert disabled:text-alert disabled:bg-white disabled:opacity-40",
        "alert-link":
          "text-alert bg-transparent border-none underline-offset-4 hover:bg-alert-bg hover:underline hover:text-alert hover:decoration-alert disabled:text-alert disabled:opacity-40",

        // ── Legacy aliases (kept for backward compat) ─────────────────────
        destructive:
          "bg-alert text-white hover:bg-alert-hover disabled:bg-alert disabled:opacity-40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "px-8 py-2",  // 40px — normal
        md:      "px-8 py-1",  // 32px — medium
        sm:      "px-8 py-1 text-xs gap-1", // 24px — small
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
