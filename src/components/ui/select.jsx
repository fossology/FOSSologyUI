/*
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
        "flex w-full items-center justify-between gap-2 rounded border border-[#616161] bg-white px-3 py-2 text-sm text-black transition focus:border-[#616161] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-[#BDBDBD]",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Image
          src={
            open
              ? "/assets/icons/chevron_up/chevron_up_20px.svg"
              : "/assets/icons/chevron_down/chevron_down_20px.svg"
          }
          alt="Chevron"
          width={20}
          height={20}
          className="ml-2"
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
          "w-[var(--radix-select-trigger-width)] overflow-hidden rounded border border-[#E1E1E1] bg-white text-black shadow-md z-50",
          position === "popper" && "data-[side=bottom]:translate-y-1",
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
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "focus:bg-[#004494] focus:text-white",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center"></span>
      {/* <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item> */}
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
