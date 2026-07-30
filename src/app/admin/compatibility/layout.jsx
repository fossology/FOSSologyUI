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

import CompatibilityTabsNav from "./CompatibilityTabsNav";

export default function CompatibilityLayout({ children }) {
  return (
    <div className="mx-20 px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">License Compatibility Rules</h1>
      <CompatibilityTabsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
