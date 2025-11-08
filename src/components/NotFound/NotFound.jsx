/*
 SPDX-FileCopyrightText: 2025 Arman Thakur (armanthakur200814@gmail.com)

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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] text-center px-4">
      <div className="max-w-2xl mx-auto">
        {/* Creative 404 with error icon */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-[140px] font-bold text-[#2C2C2C] leading-none hover:scale-105 transition-transform duration-300 cursor-default">
            4
          </span>

            <span className="text-[140px] font-bold text-[#2C2C2C] leading-none hover:scale-105 transition-transform duration-300 cursor-default">
              0
            </span>

          <span className="text-[140px] font-bold text-[#2C2C2C] leading-none hover:scale-105 transition-transform duration-300 cursor-default">
            4
          </span>
        </div>
        {/* Error Message */}
        <h2 className="text-3xl font-semibold text-[#2C2C2C] mb-3">
          Oops! You&apos;re lost.
        </h2>

        <p className="text-base text-[#6C6C6C] mb-10">
          The page you are looking for was not found.
        </p>

        {/* Go Home Button */}
        <Link href={routes.home}>
          <Button
            size="lg"
            className="bg-[#2C2C2C] hover:bg-[#1A1A1A] text-white font-medium px-10 py-6 rounded-full text-base h-auto cursor-pointer"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
