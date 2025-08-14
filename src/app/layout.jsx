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

"use client";

import React from "react";
import { GlobalProvider } from "@/context";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Global CSS
import "react-virtualized-tree/lib/main.css";
import "@/styles/global.css";

import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-white text-black font-inter">
        <GlobalProvider>
          <Header />
          <main className="flex-grow px-page">{children}</main>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
