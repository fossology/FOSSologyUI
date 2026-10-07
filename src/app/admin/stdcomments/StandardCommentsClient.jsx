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

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { AlertBanner } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/Widgets";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getStandardLicenseComments,
  mutateStandardLicenseComments,
} from "@/services/licenses";

import { handleError } from "@/shared/helper";

const entriesOptions = [
  { entry: 10 },
  { entry: 25 },
  { entry: 50 },
  { entry: 100 },
];

const StandardLicenseCommentsPage = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("10");
  const [currentPage, setCurrentPage] = useState("1");

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] =
    useState(false);

  /*
   * Load standard license comments
   */
  const loadComments = async () => {
    setLoading(true);

    try {
      const response =
        await getStandardLicenseComments();

      const data = Array.isArray(response)
        ? response
        : [];

      setComments(
        data.map((comment) => ({
          id:
            comment.id ??
            comment.lscPk ??
            comment.lscPK,

          name:
            comment.name ?? "",

          comment:
            comment.comment ?? "",

          toggle:
            comment.toggle ??
            comment.enabled ??
            false,

          isNew: false,
        }))
      );
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  /*
   * Handle changes to an existing/new comment
   */
  const handleCommentChange = (
    id,
    field,
    value
  ) => {
    setComments(
      (previousComments) =>
        previousComments.map(
          (comment) =>
            comment.id === id
              ? {
                  ...comment,
                  [field]: value,
                }
              : comment
        )
    );
  };

  /*
   * Add a new comment
   */
  const handleAddComment = () => {
    setComments(
      (previousComments) => [
        ...previousComments,
        {
          id: `new-${Date.now()}`,
          name: "",
          comment: "",
          toggle: false,
          isNew: true,
        },
      ]
    );
  };

  /*
   * Save comments
   *
   * Existing comment:
   * {
   *   id,
   *   name,
   *   comment,
   *   toggle,
   *   update: true
   * }
   *
   * New comment:
   * {
   *   name,
   *   comment,
   *   toggle,
   *   update: false
   * }
   */
  const handleSave = async () => {
    setSaving(true);

    try {
      const payload =
        comments.map((comment) => {
          if (comment.isNew) {
            return {
              name: comment.name,
              comment: comment.comment,
              toggle: comment.toggle,
              update: false,
            };
          }

          return {
            id: comment.id,
            name: comment.name,
            comment: comment.comment,
            toggle: comment.toggle,
            update: true,
          };
        });

      await mutateStandardLicenseComments(
        payload
      );

      setMessage({
        type: "success",
        text:
          "Standard license comments saved successfully.",
      });

      setShowMessage(true);

      await loadComments();
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setSaving(false);
    }
  };

  /*
   * Search
   */
  const filteredComments = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return comments;
    }

    return comments.filter((comment) => {
      const name =
        comment.name?.toLowerCase() || "";

      const commentText =
        comment.comment?.toLowerCase() || "";

      return (
        name.includes(searchValue) ||
        commentText.includes(searchValue)
      );
    });
  }, [comments, search]);

  /*
   * Pagination
   */
  const totalEntries =
    filteredComments.length;

  const entriesPerPage =
    Number(limit);

  const totalPages =
    totalEntries === 0
      ? 1
      : Math.ceil(
          totalEntries /
            entriesPerPage
        );

  /*
   * Keep current page within
   * valid range.
   */
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

  /*
   * Reset pagination when
   * search changes.
   */
  useEffect(() => {
    setCurrentPage("1");
  }, [search]);

  /*
   * Change number of entries
   */
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

  const paginatedComments =
    filteredComments.slice(
      startIndex,
      endIndex
    );

  /*
   * Dynamic page options
   */
  const pageOptions =
    Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

  /*
   * Display range
   */
  const displayStart =
    totalEntries === 0
      ? 0
      : startIndex + 1;

  const displayEnd =
    totalEntries === 0
      ? 0
      : endIndex;

  /*
   * Alert type
   */
  const alertType =
    message?.type === "danger" ||
    message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="min-h-screen mx-40 py-8">
      {showMessage &&
        message && (
          <div className="mb-4">
            <AlertBanner
              type={alertType}
              description={
                message.text
              }
              showClose
              onClose={() =>
                setShowMessage(
                  false
                )
              }
            />
          </div>
        )}

      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Standard License Comments
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
            <span>
              Show
            </span>

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

            <span>
              entries
            </span>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />

            Loading standard license comments…
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">
                  Sl. No.
                </TableHead>

                <TableHead className="w-[260px]">
                  Name
                </TableHead>

                <TableHead className="w-[500px]">
                  Comment
                </TableHead>

                <TableHead className="w-[120px]">
                  Enabled
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedComments.map(
                (
                  comment,
                  index
                ) => (
                  <TableRow
                    key={
                      comment.id
                    }
                  >
                    <TableCell>
                      {startIndex +
                        index +
                        1}
                    </TableCell>

                    <TableCell>
                      <Input
                        value={
                          comment.name
                        }
                        placeholder="Please enter a name"
                        onChange={(
                          event
                        ) =>
                          handleCommentChange(
                            comment.id,
                            "name",
                            event.target.value
                          )
                        }
                        className="h-8 w-full"
                      />
                    </TableCell>

                    <TableCell>
                      <Textarea
                        value={
                          comment.comment
                        }
                        placeholder="Please enter a standard license comment"
                        onChange={(
                          event
                        ) =>
                          handleCommentChange(
                            comment.id,
                            "comment",
                            event.target.value
                          )
                        }
                        className="min-h-[56px] w-full"
                      />
                    </TableCell>

                    <TableCell>
                      <Checkbox
                        checked={
                          comment.toggle
                        }
                        onCheckedChange={(
                          checked
                        ) =>
                          handleCommentChange(
                            comment.id,
                            "toggle",
                            checked ===
                              true
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                )
              )}

              {/* Add new comment */}
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-4 text-center"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={
                      handleAddComment
                    }
                    disabled={saving}
                    className="text-tertiary1-800"
                  >
                    <img
                      src="/assets/icons/Plus/Plus_16px.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="[filter:invert(25%)_sepia(19%)_saturate(1375%)_hue-rotate(166deg)_brightness(92%)_contrast(89%)]"
                    />

                    Add a new comment
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        {/* Table footer */}
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>
            Showing{" "}
            {displayStart} to{" "}
            {displayEnd} of{" "}
            {totalEntries} entries
          </span>

          <div className="flex items-center gap-2">
            <span>
              Page
            </span>

            <Select
              value={String(
                page
              )}
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

        {/* Save button */}
        <div className="pt-4">
          <Button
            type="button"
            variant="default"
            onClick={
              handleSave
            }
            disabled={
              saving ||
              loading
            }
          >
            {saving ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StandardLicenseCommentsPage;