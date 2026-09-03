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

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";

const getPages = (
  currentPage,
  totalPages,
  siblingCount = 1
) => {
  // Show all pages if they fit
  if (
    totalPages <=
    siblingCount * 2 + 5
  ) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  const pages = [];

  const leftSibling = Math.max(
    currentPage - siblingCount,
    2
  );

  const rightSibling = Math.min(
    currentPage + siblingCount,
    totalPages - 1
  );

  pages.push(1);

  if (leftSibling > 2) {
    pages.push("...");
  } else {
    for (let i = 2; i < leftSibling; i++) {
      pages.push(i);
    }
  }

  for (
    let i = leftSibling;
    i <= rightSibling;
    i++
  ) {
    pages.push(i);
  }

  if (rightSibling < totalPages - 1) {
    pages.push("...");
  } else {
    for (
      let i = rightSibling + 1;
      i < totalPages;
      i++
    ) {
      pages.push(i);
    }
  }

  pages.push(totalPages);

  return pages;
};

const PaginationControl = ({
totalPages,
currentPage,
onPageChange,
siblingCount = 1,
}) => {
    const pages = getPages(
    currentPage,
    totalPages,
    siblingCount
    );

    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                <PaginationPrevious
                    disabled={currentPage === 1}
                    onClick={() =>
                    onPageChange(currentPage - 1)
                    }
                />
                </PaginationItem>

                {pages.map((page, index) => {

                if (page === "...") {
                    return (
                    <PaginationItem
                        key={`ellipsis-${index}`}
                    >
                        <PaginationEllipsis />
                    </PaginationItem>
                    );
                }

                return (
                    <PaginationItem key={page}>
                    <PaginationLink
                        isActive={
                        page === currentPage
                        }
                        onClick={() =>
                        onPageChange(page)
                        }
                    >
                        {page}
                    </PaginationLink>
                    </PaginationItem>
                );
                })}

                <PaginationItem>
                <PaginationNext
                    disabled={
                    currentPage === totalPages
                    }
                    onClick={() =>
                    onPageChange(currentPage + 1)
                    }
                />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControl;