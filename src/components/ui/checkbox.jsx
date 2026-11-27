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

"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const checkboxFieldVariants = cva("inline-flex", {
  variants: {
    labelPosition: {
      right: "flex-row items-center gap-3",
      left: "flex-row-reverse items-center gap-3",
      top: "flex-col-reverse items-start gap-2",
      bottom: "flex-col items-start gap-2",
      none: "",
    },
  },
  defaultVariants: {
    labelPosition: "right",
  },
})

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base size + shape
        "peer size-4.5 shrink-0 rounded border-2 border-neutral-800",
        // Colors & backgrounds
        "bg-white data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        // Transitions & disabled state
        "transition-colors duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white"
      >
        <CheckIcon className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

function CheckboxField({
  id,
  label,
  labelPosition = "right",
  className,
  labelClassName,
  ...props
}) {
  return (
    <div className={cn(checkboxFieldVariants({ labelPosition }), className)}>
      <Checkbox id={id} {...props} />
      {labelPosition !== "none" && label && (
        <Label htmlFor={id} className={cn("text-base font-normal", labelClassName)}>
          {label}
        </Label>
      )}
    </div>
  )
}

export { Checkbox, CheckboxField }
