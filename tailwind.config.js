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

const config = {
    content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
    spacing: {
        'page': '32px',
        'gutter': '24px',
    },
    colors: {
        // Brand (FOSSology red — renamed from "primary" to avoid conflict with ShadCN --color-primary CSS variable)
        brand: {
            900: "#C31730",
            800: "#EC4958",
            700: "#F57B85",
            100: "#FFCED7",
        },
        // Tertiary 1
        tertiary1: {
            900: "#000B54",
            800: "#004494",
            600: "#4D7CB7",
            400: "#B0C4DE",
            200: "#E2EFFF",
        },
        // Tertiary 2
        tertiary2: {
            900: "#513DA8",
            800: "#6D67D9",
            600: "#9BA1F4",
            400: "#D3D6FF",
            200: "#EEEFFF",
        },
        // Neutrals
        neutral: {
            900: "#303030",
            800: "#616161",
            700: "#888888",
            600: "#A9A9A9",
            400: "#CECECE",
            300: "#E1E1E1",
            200: "#EDEDED",
            100: "#F6F6F6",
        },
        // Alerts
        error: {
            100: "#FFEBEE",
            500: "#E03C31",
            600: "#A41411",
            700: "#5F2120",
        },
        warning: {
            100: "#FFF3E0",
            500: "#EF6C00",
            700: "#663C00",
        },
        info: {
            100: "#E1F5FE",
            500: "#0079BA",
            700: "#014361",
        },
        success: {
            100: "#E8F5E9",
            500: "#2E7D32",
            700: "#1E4620",
        },
        },
        fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        },
        fontSize: {
            base: ["14px", "20px"], // 14px font size with ~20px line-height
        },
        letterSpacing: {
            normal: "0px",
        },
        textColor: {
            default: "#101010",
        },
        spacing: {
            13: "3.25rem", // 52px
            18: "4.5rem",  // 72px
        },
        },
    },
    plugins: [],
}
export default config