/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
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

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getAdminLicenseCandidates,
  deleteAdminLicenseCandidate,
} from "@/services/licenses";

const entriesOptions = [
  { entry: 10 },
  { entry: 25 },
  { entry: 50 },
  { entry: 100 },
];

const CandidatesClient = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("50");
  const [currentPage, setCurrentPage] =
    useState("1");

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminLicenseCandidates();

        setCandidates(
          Array.isArray(response)
            ? response
            : response?.data ?? []
        );
      } catch (err) {
        console.error(
          "Failed to fetch license candidates:",
          err
        );

        setError(
          "Failed to load license candidates."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleEdit = (candidate) => {
    router.push(
      `/admin/licenseAdmin/candidates/candidatesEdit?shortname=${encodeURIComponent(
        candidate.shortname
      )}`
    );
  };

  const handleDelete = async (candidate) => {
    try {
      await deleteAdminLicenseCandidate(
        candidate.id
      );

      setCandidates((previous) =>
        previous.filter(
          (item) =>
            item.id !== candidate.id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete license candidate:",
        err
      );
    }
  };

  const filteredCandidates = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return candidates;
    }

    return candidates.filter(
      (candidate) =>
        String(candidate.spdxid ?? "")
          .toLowerCase()
          .includes(searchValue) ||
        String(candidate.shortname ?? "")
          .toLowerCase()
          .includes(searchValue) ||
        String(candidate.fullname ?? "")
          .toLowerCase()
          .includes(searchValue) ||
        String(candidate.text ?? "")
          .toLowerCase()
          .includes(searchValue) ||
        String(candidate.groupName ?? "")
          .toLowerCase()
          .includes(searchValue)
    );
  }, [candidates, search]);

  const totalEntries =
    filteredCandidates.length;

  const entriesPerPage =
    Number(limit);

  const totalPages =
    totalEntries === 0
      ? 1
      : Math.ceil(
          totalEntries /
            entriesPerPage
        );

  useEffect(() => {
    const page =
      Number(currentPage);

    if (page > totalPages) {
      setCurrentPage(
        String(totalPages)
      );
    }
  }, [
    currentPage,
    totalPages,
  ]);

  useEffect(() => {
    setCurrentPage("1");
  }, [search]);

  const handleLimitChange = (
    value
  ) => {
    setLimit(value);
    setCurrentPage("1");
  };

  const page =
    Number(currentPage);

  const startIndex =
    (page - 1) *
    entriesPerPage;

  const endIndex = Math.min(
    startIndex +
      entriesPerPage,
    totalEntries
  );

  const paginatedCandidates =
    filteredCandidates.slice(
      startIndex,
      endIndex
    );

  const pageOptions =
    Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

  const displayStart =
    totalEntries === 0
      ? 0
      : startIndex + 1;

  const displayEnd =
    totalEntries === 0
      ? 0
      : endIndex;

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Candidates
      </h1>

      <div className="space-y-6">
        {/* Search and entries */}
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="relative">
            <img
              src="/assets/icons/Search_20px.svg"
              alt=""
              width={20}
              height={20}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
            />

            <Input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search"
              className="h-10 w-full pl-10 text-sm placeholder:text-neutral-500"
            />
          </div>

          {/* Entries dropdown */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Show</span>

            <Select
              value={limit}
              onValueChange={
                handleLimitChange
              }
            >
              <SelectTrigger className="h-8 w-fit py-1 text-sm">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {entriesOptions.map(
                  (option) => (
                    <SelectItem
                      key={
                        option.entry
                      }
                      value={String(
                        option.entry
                      )}
                    >
                      {
                        option.entry
                      }
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <span>entries</span>
          </div>
        </div>

        {/* Candidates table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                Edit
              </TableHead>

              <TableHead>
                SPDX ID
              </TableHead>

              <TableHead>
                Shortname
              </TableHead>

              <TableHead>
                Fullname
              </TableHead>

              <TableHead>
                Text
              </TableHead>

              <TableHead className="w-[120px]">
                Group
              </TableHead>

              <TableHead className="w-[80px]">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  Loading candidates...
                </TableCell>
              </TableRow>
            )}

            {!loading && error && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-sm text-red-600"
                >
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              paginatedCandidates.map(
                (candidate) => (
                <TableRow
                  key={candidate.id}
                  className="h-[80px]"
                >
                  {/* Edit */}
                  <TableCell className="align-middle">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleEdit(candidate)
                      }
                      aria-label={`Edit candidate ${candidate.spdxid}`}
                    >
                        <img
                        src="/assets/icons/EditFile_20px.svg"
                        alt="Edit"
                        className="h-5 w-5 cursor-pointer [filter:invert(17%)_sepia(99%)_saturate(2306%)_hue-rotate(204deg)_brightness(91%)_contrast(104%)]"
                        />
                    </Button>
                  </TableCell>

                  {/* SPDX ID */}
                  <TableCell className="h-[80px] max-h-[80px] overflow-hidden whitespace-normal break-words px-4 py-2 align-middle text-sm">
                    {candidate.spdxid}
                  </TableCell>

                  {/* Shortname */}
                  <TableCell className="h-[80px] max-h-[80px] overflow-hidden whitespace-normal break-words px-4 py-2 align-middle text-sm">
                    {candidate.shortname}
                  </TableCell>

                  {/* Fullname */}
                  <TableCell className="h-[80px] max-h-[80px] overflow-hidden whitespace-normal break-words px-4 py-2 align-middle text-sm">
                    {candidate.fullname}
                  </TableCell>

                  {/* Text */}
                  <TableCell className="h-[80px] max-h-[80px] overflow-hidden px-4 py-2 align-middle text-sm">
                    <div className="max-h-[64px] w-full overflow-y-auto overflow-x-hidden whitespace-normal break-words pr-1">
                      {candidate.text}
                    </div>
                  </TableCell>

                  {/* Group */}
                  <TableCell className="h-[80px] max-h-[80px] overflow-hidden whitespace-normal break-words px-4 py-2 align-middle text-sm">
                    {candidate.groupName}
                  </TableCell>

                  {/* Delete */}
                  <TableCell className="align-middle">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDelete(
                          candidate
                        )
                      }
                      aria-label={`Delete candidate ${candidate.spdxid}`}
                    >
                      <img
                        src="/assets/icons/Close/Close_24px.svg"
                        alt="Delete"
                        className="h-6 w-6 cursor-pointer [filter:invert(36%)_sepia(90%)_saturate(1427%)_hue-rotate(338deg)_brightness(94%)_contrast(91%)]"
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}

            {!loading &&
              !error &&
              paginatedCandidates.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-sm text-gray-500"
                  >
                    No candidates found.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>

        {/* Table footer */}
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>
            Showing{" "}
            {displayStart} to{" "}
            {displayEnd} of{" "}
            {totalEntries} entries
          </span>

          <div className="flex items-center gap-2">
            <span>Page</span>

            <Select
              value={String(page)}
              onValueChange={
                setCurrentPage
              }
            >
              <SelectTrigger className="h-8 w-fit py-1 text-sm">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {pageOptions.map(
                  (pageNumber) => (
                    <SelectItem
                      key={
                        pageNumber
                      }
                      value={String(
                        pageNumber
                      )}
                    >
                      {
                        pageNumber
                      }
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <span>
              of{" "}
              {totalPages}
            </span>
          </div>
        </div>

        {/* Find button */}
        <div className="pt-4">
          <Button
            type="button"
            variant="default"
            onClick={() => {
              // Find functionality will be connected later.
            }}
          >
            Find
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidatesClient;