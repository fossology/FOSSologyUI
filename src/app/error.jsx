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

import Link from "next/link";
import routes from "@/constants/routes";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">Error</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Something went wrong
      </h2>
      <p className="text-base text-gray-500 mb-8 max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={reset}
          variant="default"
          size="default"
        >
          Try Again
        </Button>
        <Button
          asChild
          variant="outline"
          size="default"
        >
          <Link href={routes.home}>Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
