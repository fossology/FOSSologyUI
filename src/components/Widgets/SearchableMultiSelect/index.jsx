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

import { useMemo, useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";

import Chip from "@/components/ui/chip";
import { InputGroup } from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SearchableMultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Search...",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const toggleOption = (option) => {
    const exists = value.some((item) => item.value === option.value);

    if (exists) {
      onChange(value.filter((item) => item.value !== option.value));
    } else {
      onChange([...value, option]);
    }
      setSearch("");
  };

  const removeOption = (option) => {
    onChange(value.filter((item) => item.value !== option.value));
  };

  useEffect(() => {
    function handleClickOutside(event) {
        if (
        inputRef.current &&
        !inputRef.current.closest(".search-input-container")?.contains(event.target)
        ) {
        setOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

  return (
    <div className="search-input-container relative w-[800px]">
        <InputGroup
        onClick={() => inputRef.current?.focus()}
        className="min-h-9 h-auto"
        >
        <div className="flex flex-wrap items-center gap-2 flex-1">
            {value.map((item) => (
            <Chip
                key={item.value}
                label={item.label}
                onRemove={() => removeOption(item)}
            />
            ))}

            <input
            ref={inputRef}
            data-slot="input-group-control"
            value={search}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
                setSearch(e.target.value);
                setOpen(true);
            }}
            onKeyDown={(e) => {
            if (e.key === "Escape") {
                setOpen(false);
                return;
            }

            if (e.key === "Enter") {
                e.preventDefault();

                if (filteredOptions.length > 0) {
                toggleOption(filteredOptions[0]);
                }
                return;
            }

            if (e.key === "Backspace" && search === "" && value.length > 0) {
                e.preventDefault();

                const lastSelected = value[value.length - 1];
                removeOption(lastSelected);
            }
            }}
            placeholder={value.length === 0 ? placeholder : ""}
            className="
                flex-1
                min-w-[120px]
                bg-transparent
                border-0
                outline-none
                text-sm
                placeholder:text-neutral-800
            "
            />
        </div>
        </InputGroup>

    {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-b border-x border-b border-neutral-300 border-t-0 bg-white shadow-[0px_4px_6px_0px_#00000017]">
        <ScrollArea className="max-h-64">
            {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
                No results found.
            </div>
            ) : (
            filteredOptions.map((option) => {
                const selected = value.some(
                (item) => item.value === option.value
                );

                return (
                <button
                    key={option.value}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => toggleOption(option)}
                    className={cn(
                    "relative flex h-[36px] w-full items-center justify-between px-3 text-[14px] leading-[20px]",
                    "hover:bg-neutral-100",
                    selected && "bg-accent"
                    )}
                >
                    {option.label}

                    {selected && (
                    <Check className="h-4 w-4 text-primary" />
                    )}
                </button>
                );
            })
            )}
        </ScrollArea>
        </div>
    )}
    </div>
    );
};

export default SearchableMultiSelect;