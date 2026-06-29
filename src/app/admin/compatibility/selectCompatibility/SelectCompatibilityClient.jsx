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

export default function SelectCompatibilityClient() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Select Compatibility Rules
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          License compatibility rule management will be implemented here.
        </p>
      </div>

      <div className="rounded-md border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          This page will contain:
        </p>

        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Compatibility Rules table</li>
          <li>Rule search and filtering</li>
          <li>Add Rule functionality</li>
          <li>Edit Rule functionality</li>
          <li>Delete Rule functionality</li>
          <li>Pagination support</li>
        </ul>
      </div>
    </div>
  );
}
