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

/**
 * Central color constants for JavaScript usage (inline SVG fills, dynamic logic, etc.)
 *
 * For CSS / Tailwind class usage these same values are expressed as:
 *   - CSS variables defined in src/styles/global.css  (:root block)
 *   - Tailwind color tokens defined in tailwind.config.js
 *
 * Keep all three sources in sync when adding or changing a color.
 */

// ---------------------------------------------------------------------------
// Brand palette — FOSSology brand red (Tailwind token: brand-N)
// ---------------------------------------------------------------------------
export const BRAND_900 = "#C31730"; // FOSSology red — active nav underline, destructive
export const BRAND_800 = "#EC4958";
// Legacy aliases — keep for backwards compat until all call sites are updated
export const PRIMARY_900 = BRAND_900;
export const PRIMARY_800 = BRAND_800;

// ---------------------------------------------------------------------------
// Action palette — FOSSology blue (= CSS --primary)
// ---------------------------------------------------------------------------
export const ACTION_800 = "#004494"; // primary action blue  (= --primary)
export const ACTION_900 = "#000B54"; // dark navy hover       (= --accent-foreground)
export const ACTION_400 = "#B0C4DE"; // disabled / light blue (= tertiary1-400)
export const ACTION_200 = "#E2EFFF"; // outline hover bg      (= --accent)

// ---------------------------------------------------------------------------
// Text / foreground
// ---------------------------------------------------------------------------
export const BODY_TEXT   = "#101010"; // primary body text  (= --foreground)
export const MUTED_TEXT  = "#888888"; // muted/secondary    (= --muted-foreground)
export const NEUTRAL_600 = "#A9A9A9"; // placeholder text   (= neutral-600)

// ---------------------------------------------------------------------------
// Semantic status colors
// ---------------------------------------------------------------------------
export const ERROR_700   = "#5F2120"; // error text         (= error-700)
export const INFO_500    = "#0079BA"; // info / hint text   (= info-500)

// ---------------------------------------------------------------------------
// SVG icon colors (used as element attributes, not CSS classes)
// ---------------------------------------------------------------------------
export const SVG_ERROR_FILL   = "#DC4146"; // alert error icon fill
export const SVG_SUCCESS_STROKE = "#28A745"; // alert success icon stroke
