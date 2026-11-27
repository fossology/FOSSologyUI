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
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { handleError } from "@/shared/helper";
import {
  getCompatibilityLicenseOptions,
  getCustomiseData,
} from "@/services/licenses";

const entriesOptions = [
  { entry: 10 },
  { entry: 25 },
  { entry: 50 },
  { entry: 100 },
];

const SelectCompatibilityClient = () => {
  const [search, setSearch] = useState("");

  const [limit, setLimit] =
    useState("10");

  const [currentPage, setCurrentPage] =
    useState("1");

  const [rules, setRules] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState(null);

  const [showMessage, setShowMessage] =
    useState(false);

  const [licenseOptions, setLicenseOptions] =
  useState([]);

  const [licenseOptionsLoading, setLicenseOptionsLoading] =
    useState(false);

  const [licenseTypeOptions, setLicenseTypeOptions] =
  useState([]);

  const [licenseTypeOptionsLoading, setLicenseTypeOptionsLoading] =
    useState(false);

  const loadCompatibilityRules =
    async () => {
      setLoading(true);

      try {
        /*
         * TODO:
         * Replace this with the actual API call.
         *
         * Example:
         *
         * const response =
         *   await getCompatibilityRules();
         */

        const response = [];

        const data = Array.isArray(
          response
        )
          ? response
          : [];

        setRules(
          data.map((rule) => ({
            id:
              rule.id ??
              rule.ruleId ??
              `rule-${Date.now()}`,

            firstLicenseName:
              rule.firstLicenseName ??
              "",

            secondLicenseName:
              rule.secondLicenseName ??
              "",

            firstLicenseType:
              rule.firstLicenseType ??
              "",

            secondLicenseType:
              rule.secondLicenseType ??
              "",

            compatible:
              rule.compatible ??
              false,

            description:
              rule.description ??
              "",

            isNew: false,
          }))
        );
      } catch (error) {
        handleError(
          error,
          setMessage
        );

        setShowMessage(true);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadCompatibilityRules();
  }, []);

  const handleRuleChange = (
    id,
    field,
    value
  ) => {
    setRules(
      (previousRules) =>
        previousRules.map(
          (rule) =>
            rule.id === id
              ? {
                  ...rule,
                  [field]: value,
                }
              : rule
        )
    );
  };

  const compatibilityOptions = [
    {
      id: "yes",
      name: "Yes",
      value: true,
    },
    {
      id: "no",
      name: "No",
      value: false,
    },
  ];

  const handleAddRule = () => {
    setRules((previousRules) => [
      ...previousRules,
      {
        id: `new-${Date.now()}`,

        firstLicenseName: "---",
        secondLicenseName: "---",

        firstLicenseType: "---",
        secondLicenseType: "---",

        compatible: false,

        description: "",

        isNew: true,
      },
    ]);
  };

  const handleDeleteRule = async (id) => {
    try {
      const rule = rules.find(
        (item) => item.id === id
      );

      // New unsaved row: just remove it locally
      if (rule?.isNew) {
        setRules((previousRules) =>
          previousRules.filter(
            (item) => item.id !== id
          )
        );

        return;
      }

      // Existing rule:
      // TODO: Call DELETE API here
      // await deleteCompatibilityRule(id);

      // Remove from UI after successful deletion
      setRules((previousRules) =>
        previousRules.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const payload =
        rules.map(
          (rule) => {
            const payloadItem = {
              firstLicenseName:
                rule.firstLicenseName,

              secondLicenseName:
                rule.secondLicenseName,

              firstLicenseType:
                rule.firstLicenseType,

              secondLicenseType:
                rule.secondLicenseType,

              compatible:
                rule.compatible,

              description:
                rule.description,
            };

            /*
             * Existing rules contain an ID.
             * New rules do not.
             */
            if (
              !rule.isNew
            ) {
              payloadItem.id =
                rule.id;
            }

            return payloadItem;
          }
        );

      /*
       * TODO:
       * Replace with the actual API call.
       *
       * Example:
       *
       * await mutateCompatibilityRules(
       *   payload
       * );
       */

      console.log(
        "Compatibility rules payload:",
        payload
      );

      setMessage({
        type: "success",
        text:
          "Compatibility rules saved successfully.",
      });

      setShowMessage(true);

      /*
       * Reload the data after saving
       * once the actual API is connected.
       */
      // await loadCompatibilityRules();
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    } finally {
      setSaving(false);
    }
  };

  /*
   * Search
   */
  const filteredRules =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      if (!searchValue) {
        return rules;
      }

      return rules.filter(
        (rule) => {
          const firstLicenseName =
            rule.firstLicenseName
              ?.toLowerCase() ||
            "";

          const secondLicenseName =
            rule.secondLicenseName
              ?.toLowerCase() ||
            "";

          const firstLicenseType =
            rule.firstLicenseType
              ?.toLowerCase() ||
            "";

          const secondLicenseType =
            rule.secondLicenseType
              ?.toLowerCase() ||
            "";

          const description =
            rule.description
              ?.toLowerCase() ||
            "";

          return (
            firstLicenseName.includes(
              searchValue
            ) ||
            secondLicenseName.includes(
              searchValue
            ) ||
            firstLicenseType.includes(
              searchValue
            ) ||
            secondLicenseType.includes(
              searchValue
            ) ||
            description.includes(
              searchValue
            )
          );
        }
      );
    }, [
      rules,
      search,
    ]);

  const totalEntries =
    filteredRules.length;

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
    const loadLicenseOptions = async () => {
      setLicenseOptionsLoading(true);

      try {
        const response =
          await getCompatibilityLicenseOptions();

        const options = [
          {
            id: "---",
            name: "---",
          },
          ...response.map((license) => ({
            id: String(license.id),
            name: license.shortName,
          })),
        ];

        setLicenseOptions(options);
      } catch (error) {
        handleError(
          error,
          setMessage
        );

        setShowMessage(true);
      } finally {
        setLicenseOptionsLoading(false);
      }
    };

    loadLicenseOptions();
  }, []);

  useEffect(() => {
    const loadLicenseTypeOptions = async () => {
      setLicenseTypeOptionsLoading(true);

      try {
        const response = await getCustomiseData();

        const licenseTypesConfig = response.find(
          (item) => item.key === "LicenseTypes"
        );

        const licenseTypes =
          licenseTypesConfig?.value
            ?.split(",")
            .map((type) => type.trim())
            .filter(Boolean) ?? [];

        const options = [
          {
            id: "---",
            name: "---",
          },
          ...licenseTypes.map((type) => ({
            id: type,
            name: type,
          })),
        ];

        setLicenseTypeOptions(options);
      } catch (error) {
        handleError(
          error,
          setMessage
        );

        setShowMessage(true);
      } finally {
        setLicenseTypeOptionsLoading(false);
      }
    };

    loadLicenseTypeOptions();
  }, []);

  useEffect(() => {
    const page =
      Number(currentPage);

    if (
      page > totalPages
    ) {
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
  }, [
    search,
  ]);

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

  const endIndex =
    Math.min(
      startIndex +
        entriesPerPage,
      totalEntries
    );

  const paginatedRules =
    filteredRules.slice(
      startIndex,
      endIndex
    );

  const pageOptions =
    Array.from(
      {
        length: totalPages,
      },
      (_, index) =>
        index + 1
    );

  const displayStart =
    totalEntries === 0
      ? 0
      : startIndex + 1;

  const displayEnd =
    totalEntries === 0
      ? 0
      : endIndex;

  const alertType =
    message?.type ===
      "danger" ||
    message?.type ===
      "error"
      ? "Error"
      : message?.type ===
          "success"
      ? "Success"
      : "Info";

  return (
    <div>
      {/* Alert */}
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

      {/* Page title */}
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Select Compatibility Rules
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
              onChange={(
                event
              ) =>
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

            Loading compatibility rules…
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[1500px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">
                    Rule No.
                  </TableHead>

                  <TableHead className="w-[187px]">
                    First license name
                  </TableHead>

                  <TableHead className="w-[187px]">
                    Second license name
                  </TableHead>

                  <TableHead className="w-[187px]">
                    First license type
                  </TableHead>

                  <TableHead className="w-[187px]">
                    Second license type
                  </TableHead>

                  <TableHead className="w-[100px]">
                    Compatible
                  </TableHead>

                  <TableHead className="w-[175px]">
                    Rule Description
                  </TableHead>

                  <TableHead className="w-[80px]">
                    Delete
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedRules.map(
                  (
                    rule,
                    index
                  ) => (
                    <TableRow
                      key={
                        rule.id
                      }
                    >
                      {/* Rule No. */}
                      <TableCell className="align-top">
                        {startIndex +
                          index +
                          1}
                      </TableCell>

                      {/* First license name */}
                      <TableCell className="h-[120px] w-[187px] align-top">
                        <Select
                          value={rule.firstLicenseName}
                          onValueChange={(value) =>
                            handleRuleChange(
                              rule.id,
                              "firstLicenseName",
                              value
                            )
                          }
                          disabled={licenseOptionsLoading}
                        >
                          <SelectTrigger className="h-10 w-[187px]">
                            <SelectValue
                              placeholder={
                                licenseOptionsLoading
                                  ? "Loading licenses..."
                                  : "---"
                              }
                            />
                          </SelectTrigger>

                          <SelectContent>
                            {licenseOptions.map(
                              (license) => (
                                <SelectItem
                                  key={license.id}
                                  value={license.id}
                                >
                                  {license.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Second license name */}
                      <TableCell className="h-[120px] w-[187px] align-top">
                        <Select
                          value={rule.secondLicenseName}
                          onValueChange={(value) =>
                            handleRuleChange(
                              rule.id,
                              "secondLicenseName",
                              value
                            )
                          }
                          disabled={licenseOptionsLoading}
                        >
                          <SelectTrigger className="h-10 w-[187px]">
                            <SelectValue
                              placeholder={
                                licenseOptionsLoading
                                  ? "Loading licenses..."
                                  : "---"
                              }
                            />
                          </SelectTrigger>

                          <SelectContent>
                            {licenseOptions.map(
                              (
                                license
                              ) => (
                                <SelectItem
                                  key={
                                    license.id
                                  }
                                  value={
                                    license.id
                                  }
                                >
                                  {
                                    license.name
                                  }
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* First license type */}
                      <TableCell className="h-[120px] w-[187px] align-top">
                          <Select
                            value={rule.firstLicenseType}
                            onValueChange={(value) =>
                              handleRuleChange(
                                rule.id,
                                "firstLicenseType",
                                value
                              )
                            }
                            disabled={licenseTypeOptionsLoading}
                          >
                          <SelectTrigger className="h-10 w-[187px]">
                            <SelectValue
                              placeholder={
                                licenseTypeOptionsLoading
                                  ? "Loading types..."
                                  : "---"
                              }
                            />
                          </SelectTrigger>

                          <SelectContent>
                            {licenseTypeOptions.map((type) => (
                              <SelectItem
                                key={type.id}
                                value={type.id}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Second license type */}
                      <TableCell className="h-[120px] w-[187px] align-top">
                          <Select
                            value={rule.secondLicenseType}
                            onValueChange={(value) =>
                              handleRuleChange(
                                rule.id,
                                "secondLicenseType",
                                value
                              )
                            }
                            disabled={licenseTypeOptionsLoading}
                          >
                          <SelectTrigger className="h-10 w-[187px]">
                            <SelectValue
                              placeholder={
                                licenseTypeOptionsLoading
                                  ? "Loading types..."
                                  : "---"
                              }
                            />
                          </SelectTrigger>

                          <SelectContent>
                            {licenseTypeOptions.map((type) => (
                              <SelectItem
                                key={type.id}
                                value={type.id}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Compatible */}
                      <TableCell className="align-top">
                        <RadioGroup
                          value={rule.compatible ? "yes" : "no"}
                          onValueChange={(value) =>
                            handleRuleChange(
                              rule.id,
                              "compatible",
                              compatibilityOptions.find(
                                (option) => option.id === value
                              )?.value ?? false
                            )
                          }
                          className="flex flex-col gap-3"
                        >
                          {compatibilityOptions.map(
                            (option) => (
                              <div
                                key={option.id}
                                className="flex items-center gap-2"
                              >
                                <RadioGroupItem
                                  value={option.id}
                                  id={`${option.id}-${rule.id}`}
                                  className="h-4 w-4"
                                />

                                <Label
                                  htmlFor={`${option.id}-${rule.id}`}
                                  className="cursor-pointer"
                                >
                                  {option.name}
                                </Label>
                              </div>
                            )
                          )}
                        </RadioGroup>
                      </TableCell>

                      {/* Rule Description */}
                      <TableCell className="align-top">
                        <Textarea
                          value={
                            rule.description
                          }
                          onChange={(
                            event
                          ) =>
                            handleRuleChange(
                              rule.id,
                              "description",
                              event.target
                                .value
                            )
                          }
                          placeholder="Enter rule description"
                          className="min-h-[80px] min-w-[175px] resize"
                        />
                      </TableCell>

                      {/* Delete */}
                      <TableCell className="align-top text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDeleteRule(
                              rule.id
                            )
                          }
                          disabled={
                            saving
                          }
                          className="h-8 w-8 cursor-pointer"
                          aria-label="Delete compatibility rule"
                        >
                          <img
                            src="/assets/icons/Close/Close_24px.svg"
                            alt="Delete"
                            width={24}
                            height={24}
                            className="h-6 w-6 [filter:invert(36%)_sepia(90%)_saturate(1427%)_hue-rotate(338deg)_brightness(94%)_contrast(91%)]"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}

                {/* Add new rule */}
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-4 text-center"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={
                        handleAddRule
                      }
                      disabled={
                        saving
                      }
                      className="text-tertiary1-800"
                    >
                      <img
                        src="/assets/icons/Plus/Plus_16px.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="[filter:invert(25%)_sepia(19%)_saturate(1375%)_hue-rotate(166deg)_brightness(92%)_contrast(89%)]"
                      />

                      Add a new rule
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
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
                  (
                    pageNumber
                  ) => (
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

export default SelectCompatibilityClient;