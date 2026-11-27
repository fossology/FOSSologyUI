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

import React, { useEffect, useMemo, useRef, useState } from "react";

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
  getAdminLicenseAcknowledgements,
  mutateAdminLicenseAcknowledgement,
} from "@/services/licenses";

import { handleError } from "@/shared/helper";

const entriesOptions = [
  { entry: 10 },
  { entry: 25 },
  { entry: 50 },
  { entry: 100 },
];

const AcknowledgementsPage = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("10");
  const [currentPage, setCurrentPage] = useState("1");

  const [acknowledgements, setAcknowledgements] =
    useState([]);
  
  const originalAcknowledgements = useRef([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState(null);

  const [showMessage, setShowMessage] =
    useState(false);

  const loadAcknowledgements = async () => {
    setLoading(true);

    try {
      const response =
        await getAdminLicenseAcknowledgements();

      const data = Array.isArray(response)
        ? response
        : [];

    const mapped = data.map((acknowledgement) => ({
      id:
        acknowledgement.id ??
        acknowledgement.laPk,
      name:
        acknowledgement.name ?? "",
      acknowledgement:
        acknowledgement.acknowledgement ?? "",
      enabled:
        acknowledgement.enabled ??
        acknowledgement.isEnabled ??
        false,
      isNew: false,
    }));

    setAcknowledgements(mapped);
    originalAcknowledgements.current = mapped;
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAcknowledgements();
  }, []);

  const handleAcknowledgementChange = (
    id,
    field,
    value
  ) => {
    setAcknowledgements((previousAcknowledgements) =>
      previousAcknowledgements.map((acknowledgement) =>
        acknowledgement.id === id
          ? {
              ...acknowledgement,
              [field]: value,
            }
          : acknowledgement
      )
    );
  };

  const handleAddComment = () => {
    setAcknowledgements((previousAcknowledgements) => [
      ...previousAcknowledgements,
      {
        id: `new-${Date.now()}`,
        name: "",
        acknowledgement: "",
        enabled: false,
        isNew: true,
      },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const payload = acknowledgements
        .filter((ack) => {
          if (ack.isNew) return true;

          const original = originalAcknowledgements.current.find(
            (item) => item.id === ack.id
          );

          if (!original) return true;

          return (
            original.name !== ack.name ||
            original.acknowledgement !== ack.acknowledgement ||
            original.enabled !== ack.enabled
          );
        })
        .map((acknowledgement) => {
          const payloadItem = {
            name: acknowledgement.name,
            ack: acknowledgement.acknowledgement,
            toggle: acknowledgement.enabled,
            update: !acknowledgement.isNew,
          };

          if (!acknowledgement.isNew) {
            payloadItem.id = acknowledgement.id;
          }

          return payloadItem;
        });
      
      if (payload.length === 0) {
        setSaving(false);
        return;
      }

      await mutateAdminLicenseAcknowledgement(
        payload
      );

      setMessage({
        type: "success",
        text:
          "Acknowledgements saved successfully.",
      });

      setShowMessage(true);

      await loadAcknowledgements();
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
  const filteredAcknowledgements =
    useMemo(() => {
      const searchValue =
        search.trim().toLowerCase();

      if (!searchValue) {
        return acknowledgements;
      }

      return acknowledgements.filter(
        (acknowledgement) => {
          const name =
            acknowledgement.name
              ?.toLowerCase() || "";

          const reference =
            acknowledgement.acknowledgement
              ?.toLowerCase() || "";

          return (
            name.includes(searchValue) ||
            reference.includes(searchValue)
          );
        }
      );
    }, [acknowledgements, search]);

  /*
   * Pagination
   */
  const totalEntries =
    filteredAcknowledgements.length;

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
   * Make sure the current page is
   * always within the valid range.
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
   * Reset pagination when the
   * search value changes.
   */
  useEffect(() => {
    setCurrentPage("1");
  }, [search]);

  /*
   * Reset pagination when the
   * number of entries changes.
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

  const paginatedAcknowledgements =
    filteredAcknowledgements.slice(
      startIndex,
      endIndex
    );

  /*
   * Generate page options dynamically.
   *
   * Example:
   * 7 entries with limit 10
   * => Page 1 of 1
   *
   * 35 entries with limit 10
   * => Page 1 of 4
   */
  const pageOptions =
    Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

  /*
   * Display range.
   *
   * Empty result:
   * Showing 0 to 0 of 0 entries
   *
   * Non-empty result:
   * Showing 1 to 10 of 25 entries
   */
  const displayStart =
    totalEntries === 0
      ? 0
      : startIndex + 1;

  const displayEnd =
    totalEntries === 0
      ? 0
      : endIndex;

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
        Acknowledgements
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
            Loading acknowledgements…
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
                  Reference
                </TableHead>

                <TableHead className="w-[120px]">
                  Enabled
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedAcknowledgements.map(
                (
                  acknowledgement,
                  index
                ) => (
                  <TableRow
                    key={
                      acknowledgement.id
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
                          acknowledgement.name
                        }
                        placeholder="Please enter a name"
                        onChange={(
                          event
                        ) =>
                          handleAcknowledgementChange(
                            acknowledgement.id,
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
                          acknowledgement.acknowledgement
                        }
                        placeholder="Please enter a acknowledgement statement"
                        onChange={(
                          event
                        ) =>
                          handleAcknowledgementChange(
                            acknowledgement.id,
                            "acknowledgement",
                            event.target.value
                          )
                        }
                        className="min-h-[56px] w-full"
                      />
                    </TableCell>

                    <TableCell>
                      <Checkbox
                        checked={
                          acknowledgement.enabled
                        }
                        onCheckedChange={(
                          checked
                        ) =>
                          handleAcknowledgementChange(
                            acknowledgement.id,
                            "enabled",
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

export default AcknowledgementsPage;