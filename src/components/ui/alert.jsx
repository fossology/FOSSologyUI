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
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Low-level primitives (shadcn-compatible)
// ---------------------------------------------------------------------------

const alertVariants = cva(
  "relative w-full rounded border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default:     "bg-card text-card-foreground",
        destructive: "bg-error-100 text-error-500 border-0",
        // Semantic type variants
        error:       "bg-error-100   text-error-500   border-0",
        warning:     "bg-warning-100 text-warning-500 border-0",
        info:        "bg-info-100    text-info-500    border-0",
        success:     "bg-success-100 text-success-500 border-0",
        // Legacy aliases used by existing pages
        danger:      "bg-error-100   text-error-500   border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({ className, variant, ...props }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// AlertBanner — full-featured component matching the design-system storybook
//
// Types  : 'Error' | 'Warning' | 'Info' | 'Success'
// Layout versions (auto-detected from props):
//   V1 — title + description + button   (title given, showButton=true)
//   V2 — title + description            (title given, showButton=false)
//   V3 — description + button           (no title,   showButton=true)
//   V4 — description only               (no title,   showButton=false)
// ---------------------------------------------------------------------------

const ALERT_TYPE_CONFIG = {
  Error: {
    bg:       "bg-error-100",
    text:     "text-error-500",
    closeBg:  "bg-error-500",
    btnBorder:"border-error-500",
    icon:     "/assets/icons/Alert/ErrorFilled.svg",
  },
  Warning: {
    bg:       "bg-warning-100",
    text:     "text-warning-500",
    closeBg:  "bg-warning-500",
    btnBorder:"border-warning-500",
    icon:     "/assets/icons/Alert/WarningFilled.svg",
  },
  Info: {
    bg:       "bg-info-100",
    text:     "text-info-500",
    closeBg:  "bg-info-500",
    btnBorder:"border-info-500",
    icon:     "/assets/icons/Alert/InfoFilled.svg",
  },
  Success: {
    bg:       "bg-success-100",
    text:     "text-success-500",
    closeBg:  "bg-success-500",
    btnBorder:"border-success-500",
    icon:     "/assets/icons/Alert/SuccessFilled.svg",
  },
};

function AlertBanner({
  type = "Info",
  title,
  description,
  showButton = false,
  buttonLabel = "Button text",
  showClose = true,
  onClose,
  onButtonClick,
  className,
}) {
  const tone = ALERT_TYPE_CONFIG[type] ?? ALERT_TYPE_CONFIG.Info;

  return (
    <div
      role="alert"
      className={cn(
        "relative flex gap-3 rounded border-0 px-4 py-3 text-sm",
        "items-start",
        tone.bg,
        tone.text,
        showClose && "pr-10",
        className
      )}
    >
      {/* Type icon */}
      <img
        src={tone.icon}
        alt={type}
        width={24}
        height={24}
        className="shrink-0 mt-0"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1">
        {title && (
          <span className="font-semibold leading-snug">{title}</span>
        )}
        {description && (
          <span className="leading-relaxed">{description}</span>
        )}
        {showButton && (
          <button
            type="button"
            onClick={onButtonClick}
            className={cn(
              "mt-1 self-start rounded border px-3 py-1 text-xs font-medium transition-colors hover:bg-black/5",
              tone.btnBorder
            )}
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Close button */}
      {showClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 hover:bg-black/10"
          aria-label="Close"
        >
          <span
            className={cn(
              "block h-6 w-6",
              tone.closeBg,
              "[mask-image:url('/assets/icons/Close/Close_20px.svg')] [mask-repeat:no-repeat] [mask-size:contain]"
            )}
          />
        </button>
      )}
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription, AlertBanner }
