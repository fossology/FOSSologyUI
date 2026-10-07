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
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  getCompatibilityLicenseOptions,
  getSuggestedLicense,
  verifyLicense,
  mergeLicense,
} from "@/services/licenses";

const CandidatesEditClient = () => {
  const searchParams = useSearchParams();

  const shortname =
    searchParams.get("shortname");

  const [candidate, setCandidate] =
    useState({
      id: null,
      spdxId: "",
      shortname: "",
      fullname: "",
      text: "",
    });

  const [reference, setReference] =
    useState({
      spdxId: "",
      shortname: "",
      fullname: "",
      referenceText: "",
      url: "",
      publicNotes: "",
      risk: "0",
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!shortname) {
        setError(
          "No candidate was selected."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminLicenseCandidates();

        const candidates =
          Array.isArray(response)
            ? response
            : response?.data ?? [];

        const selectedCandidate =
          candidates.find(
            (item) =>
              item.shortname === shortname
          );

        if (!selectedCandidate) {
          setError(
            "License candidate not found."
          );
          return;
        }

        setCandidate({
          id: selectedCandidate.id,
          spdxId: selectedCandidate.spdxid ?? "",
          shortname: selectedCandidate.shortname ?? "",
          fullname: selectedCandidate.fullname ?? "",
          text: selectedCandidate.text ?? "",
        });

        try {
          const suggestedResponse =
            await getSuggestedLicense(
              selectedCandidate.text ?? ""
            );

          const suggestedLicense =
            Array.isArray(suggestedResponse)
              ? suggestedResponse[0]
              : suggestedResponse?.data ??
                suggestedResponse;

          if (suggestedLicense) {
            setReference({
              id: suggestedLicense.id,
              spdxId:
                suggestedLicense.spdxName ?? "",
              shortname:
                suggestedLicense.shortname ?? "",
              fullname:
                suggestedLicense.fullname ?? "",
              referenceText:
                suggestedLicense.text ?? "",
              url:
                suggestedLicense.url ?? "",
              publicNotes:
                suggestedLicense.notes ?? "",
              risk:
                suggestedLicense.risk ?? 0,
              highlights:
                suggestedLicense.highlights ?? [],
            });
          } else {
            setReference({
              spdxId: "",
              shortname: "",
              fullname: "",
              referenceText: "",
              url: "",
              publicNotes: "",
              risk: 0,
              highlights: [],
            });
          }
        } catch (err) {
          console.error(
            "Failed to get suggested license:",
            err
          );

          setReference({
            spdxId: "",
            shortname: "",
            fullname: "",
            referenceText: "",
            url: "",
            publicNotes: "",
            risk: 0,
            highlights: [],
          });
        }
      } catch (err) {
        console.error(
          "Failed to fetch candidate:",
          err
        );

        setError(
          "Failed to load license candidate."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [shortname]);

  const [compareWith, setCompareWith] =
    useState("");

  const [licenseOptions, setLicenseOptions] =
    useState([]);

  useEffect(() => {
    const fetchLicenseOptions = async () => {
      try {
        const response =
          await getCompatibilityLicenseOptions();

        const licenses =
          Array.isArray(response)
            ? response
            : response?.data ?? [];

        const uniqueLicenses = Array.from(
          new Map(
            licenses.map((license) => [
              license.shortName,
              license,
            ])
          ).values()
        );

        setLicenseOptions(uniqueLicenses);

        setLicenseOptions(licenses);
      } catch (error) {
        console.error(
          "Failed to load license options:",
          error
        );
      }
    };

    fetchLicenseOptions();
  }, []);

  const handleCandidateChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCandidate(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const handleReferenceChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setReference(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const handleVerify = async () => {
    try {
      await verifyLicense(
        candidate.shortname,
        candidate.shortname
      );

      console.log(
        "License verified as new license."
      );
    } catch (err) {
      console.error(
        "Failed to verify license:",
        err
      );
    }
  };

  const handleVariant = async () => {
    if (!compareWith) {
      return;
    }

    try {
      await verifyLicense(
        candidate.shortname,
        compareWith
      );

      console.log(
        "License verified as variant."
      );
    } catch (error) {
      console.error(
        "Failed to verify license variant:",
        error
      );
    }
  };

  const handleMerge = async () => {
    if (!compareWith) {
      return;
    }

    try {
      await mergeLicense(
        candidate.shortname,
        compareWith
      );

      console.log(
        "License merged successfully."
      );
    } catch (error) {
      console.error(
        "Failed to merge license:",
        error
      );
    }
  };

  const normalTextCell =
    "h-[80px] max-h-[80px] overflow-hidden px-4 py-2 align-middle text-sm whitespace-normal break-words";

  return (
    <div className="w-full pb-[60px]">
      {/* Page heading */}
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Candidates
      </h1>

      {loading && (
        <div className="py-8 text-center text-sm text-gray-500">
          Loading candidate...
        </div>
      )}

      {!loading && error && (
        <div className="py-8 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
        {/* Candidates comparison table */}
        <Table className="w-full table-fixed border-collapse text-left">
        <colgroup>
            <col className="w-[183px]" />
            <col />
            <col />
        </colgroup>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[183px] text-left" />

            <TableHead className="text-left">
              Candidates
            </TableHead>

            <TableHead className="text-left">
              Reference
            </TableHead>
          </TableRow>
        </TableHeader>

          <TableBody>
            {/* SPDX ID */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                SPDX ID
              </TableCell>

              <TableCell className="align-middle">
                <Input
                  name="spdxId"
                  value={
                    candidate.spdxId
                  }
                  onChange={
                    handleCandidateChange
                  }
                  className="h-8 w-full"
                />
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {reference.spdxId}
              </TableCell>
            </TableRow>

            {/* Shortname */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                Shortname
              </TableCell>

              <TableCell className="align-middle">
                <Input
                  name="shortname"
                  value={
                    candidate.shortname
                  }
                  onChange={
                    handleCandidateChange
                  }
                  className="h-8 w-full"
                />
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {reference.shortname}
              </TableCell>
            </TableRow>

            {/* Fullname */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                Fullname
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {candidate.fullname}
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {reference.fullname}
              </TableCell>
            </TableRow>

            {/* Reference text */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                Reference text
              </TableCell>

              <TableCell className="h-[80px] max-h-[80px] overflow-hidden px-4 py-2 align-middle">
              <Textarea
                name="text"
                value={candidate.text}
                onChange={handleCandidateChange}
                className="h-[64px] min-h-[64px] w-full resize-none overflow-y-auto overflow-x-hidden whitespace-normal break-words border-0 bg-transparent p-0 text-sm shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 active:border-0 active:outline-none active:ring-0"
              />
              </TableCell>

              <TableCell className="h-[80px] max-h-[80px] overflow-hidden px-4 py-2 align-middle">
              <Textarea
                  name="text"
                  value={reference.referenceText}
                  onChange={handleReferenceChange}
                  className="h-[64px] min-h-[64px] w-full resize-none overflow-y-auto overflow-x-hidden whitespace-normal break-words border-0 bg-transparent p-0 text-sm shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 active:border-0 active:outline-none active:ring-0"
              />
              </TableCell>
            </TableRow>

            {/* URL */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                URL
              </TableCell>

              <TableCell className={normalTextCell}>
                -
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {reference.url}
              </TableCell>
            </TableRow>

            {/* Public notes */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                Public notes
              </TableCell>

              <TableCell className={normalTextCell}>
                -
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {reference.publicNotes}
              </TableCell>
            </TableRow>

            {/* Risk level */}
            <TableRow className="h-[80px]">
              <TableCell className="align-middle">
                Risk level
              </TableCell>

              <TableCell
                className={normalTextCell}
              >
                -
              </TableCell>

              <TableCell
                className={
                  normalTextCell
                }
              >
                {reference.risk}
              </TableCell>
            </TableRow>

            {/* Action buttons */}
            <TableRow>
              <TableCell />

              <TableCell>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVerify}
                >
                  Verify as new license
                </Button>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleVariant}
                  >
                    Variant of license
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMerge}
                  >
                    Merge
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Compare with */}
        <div className="mt-5 flex items-center gap-3 text-sm text-gray-700">
          <span>
            Compare with:
          </span>

          <Select
            value={compareWith}
            onValueChange={setCompareWith}
          >
            <SelectTrigger className="h-8 w-fit py-1 text-sm">
              <SelectValue placeholder="Select license" />
            </SelectTrigger>

            <SelectContent>
              {licenseOptions.map((license) => (
                <SelectItem
                  key={license.id}
                  value={license.shortName}
                >
                  {license.shortName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </>
      )}
    </div>
  );
};

export default CandidatesEditClient;