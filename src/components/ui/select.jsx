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
import * as SelectPrimitive from "@radix-ui/react-select"
import Image from "next/image"

import { cn } from "@/lib/utils"

function Select({ children, ...props }) {
  const [open, setOpen] = React.useState(false)

  return (
    <SelectPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === SelectTrigger
          ? React.cloneElement(child, { open })
          : child
      )}
    </SelectPrimitive.Root>
  )
}

function SelectGroup({ ...props }) {
  return <SelectPrimitive.Group {...props} />
}

function SelectValue({ ...props }) {
  return <SelectPrimitive.Value {...props} />
}

function SelectTrigger({ className, children, open, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group flex w-full items-center justify-between gap-2 rounded border border-neutral-800 bg-white px-3 py-2 text-sm text-neutral-800 transition outline-none data-[state=open]:border-primary data-[state=open]:text-[#303030] data-[state=open]:rounded-t data-[state=open]:rounded-b-none disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed data-[disabled]:border-border data-[disabled]:bg-white data-[disabled]:text-neutral-600",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Image
          src="/assets/icons/chevron_down/chevron_down_20px.svg"
          alt="Chevron"
          width={20}
          height={20}
          className="ml-2 transition-transform duration-150 group-data-[state=open]:rotate-180 [filter:brightness(0)_invert(1)_brightness(0.38)] group-data-[state=open]:[filter:invert(17%)_sepia(99%)_saturate(2306%)_hue-rotate(204deg)_brightness(91%)_contrast(104%)] group-data-[disabled]:[filter:brightness(0)_invert(1)_brightness(0.808)]"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, position = "popper", ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "w-[var(--radix-select-trigger-width)] overflow-hidden rounded-b bg-white text-foreground border-solid border-t-0 border-x border-b border-neutral-300 shadow-[0px_4px_6px_0px_#00000017] z-50",
          position === "popper" && "data-[side=bottom]:translate-y-0",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-0">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full h-[36px] cursor-pointer select-none items-center gap-2 rounded-sm px-3 py-2 text-[14px] leading-[20px] text-foreground outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[state=checked]:bg-accent",
        "hover:bg-neutral-100",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <SelectPrimitive.ItemText key={index}>{child}</SelectPrimitive.ItemText>
      ))}
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <Image
        src="/assets/icons/chevron_up/chevron_up_20px.svg"
        alt="Scroll Up"
        width={20}
        height={20}
      />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <Image
        src="/assets/icons/chevron_down/chevron_down_20px.svg"
        alt="Scroll Down"
        width={20}
        height={20}
      />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}