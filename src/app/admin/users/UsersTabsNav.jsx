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
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import routes from "@/constants/routes";

const usersTabs = [
  { label: "Create", href: routes.admin.users.add},
  { label: "Edit", href: routes.admin.users.edit},
  { label: "Delete", href: routes.admin.users.delete},
  { label: "Operations", href: routes.admin.users.operations},
];

export default function UsersTabsNav() {
  const pathname = usePathname();

    const activeTab =
    pathname.startsWith(routes.admin.users.operations)
        ? routes.admin.users.operations
        : pathname.startsWith(routes.admin.users.delete)
        ? routes.admin.users.delete
        : pathname.startsWith(routes.admin.users.edit)
            ? routes.admin.users.edit
            : routes.admin.users.add;

  return (
    <Tabs value={activeTab}>
      <TabsList>
        {usersTabs.map((tab) => (
          <TabsTrigger key={tab.href} value={tab.href} asChild>
            <Link href={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
