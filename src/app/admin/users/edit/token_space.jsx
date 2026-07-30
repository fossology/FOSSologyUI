/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
// widgets
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// utils
import formatDate from "@/utils";

import {
  createToken,
  getTokens,
  revokeToken,
} from "@/services/users";

const TokenSpace = ({ setMessage, setShowMessage }) => {
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [newlyCreatedToken, setNewlyCreatedToken] = useState("");
  const [newTokenInfo, setNewTokenInfo] = useState({
    tokenName: "",
    accessScope: "read",
    tokenExpDate: undefined,
  });

  const [revealedTokenId, setRevealedTokenId] = useState(null);
  const [revealedTokenValue, setRevealedTokenValue] = useState("");
  const [revokingTokenId, setRevokingTokenId] = useState(null);
  const [activeAccessTokens, setActiveAccessTokens] = useState([]);
  const [expiredAccessTokens, setExpiredAccessTokens] = useState([]);

  const handleChange = (e) => {
    if (e.target.type === "date") {
      setNewTokenInfo((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.type === "date"
            ? formatDate(e.target.valueAsDate)
            : e.target.value,
      }));
    } else {
      setNewTokenInfo({
        ...newTokenInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const fetchTokens = async () => {
    try {
      const res1 = await getTokens("active");
      const res2 = await getTokens("expired");

      setActiveAccessTokens(
        Array.isArray(res1?.activeTokens)
          ? res1.activeTokens
          : []
      );

      setExpiredAccessTokens(
        Array.isArray(res2?.expiredTokens)
          ? res2.expiredTokens
          : []
      );

    } catch (error) {
      setActiveAccessTokens([]);
      setExpiredAccessTokens([]);

      setMessage({
        type: "error",
        text: error.message,
      });

      setShowMessage(true);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTokenInfo.tokenName.trim()) {
      setMessage({
        type: "error",
        text: "Token name is required.",
      });
      setShowMessage(true);
      return;
    }

    if (newTokenInfo.tokenName.length > 40) {
      setMessage({
        type: "error",
        text: "Token name cannot exceed 40 characters.",
      });
      setShowMessage(true);
      return;
    }

    setLoading(true);
    try {
      const finalTokenDetails = {
        tokenName: newTokenInfo.tokenName,
        tokenScope: newTokenInfo.accessScope,
        tokenExpire: newTokenInfo.tokenExpDate
          ? format(newTokenInfo.tokenExpDate, "yyyy-MM-dd")
          : null,
      };
      const res = await createToken(finalTokenDetails);

      if (res?.token) {
        setRevealedTokenId(null);
        setRevealedTokenValue("");
        setNewlyCreatedToken(res.token);
        await fetchTokens();
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setShowMessage(true);
    } finally {
      setNewTokenInfo({
        tokenName: "",
        accessScope: "read",
        tokenExpDate: undefined,
      });
      setLoading(false);
    }
  };

  const handleRevoke = async (id) => {
    try {
      // Show temporary message row
      setRevokingTokenId(id);

      // Close revealed textarea if this token is open
      if (revealedTokenId === id) {
        setRevealedTokenId(null);
        setRevealedTokenValue("");
      }

      await revokeToken(id);

      // Keep the message visible briefly
      setTimeout(async () => {
        await fetchTokens();
        setRevokingTokenId(null);
      }, 1500);

    } catch (error) {
      setRevokingTokenId(null);

      setMessage({
        type: "error",
        text: error.message,
      });
      setShowMessage(true);
    }
  };

  return (
    <>
      <div className="mt-8">
        <h2 className="font-size-main-heading mb-3">
          REST API Tokens
        </h2>

        <p className="mb-8">
          You can create/manage your tokens here for using FOSSology&apos;s REST API.
        </p>

        {newlyCreatedToken && (
          <div className="mb-8 space-y-2">
            <h3 className="font-size-main-heading font-semibold">
              New token
            </h3>
            <Label className="font-medium mb-3">
              New token for Bearer authentication
            </Label>

            <div className="relative">
              <Textarea
                value={newlyCreatedToken}
                readOnly
                className="w-full resize pr-10 text-neutral-800"
              />

              <img
                src="/assets/icons/Copy_16px.svg"
                alt="Copy token"
                role="button"
                tabIndex={0}
                className="absolute top-3 right-3 h-4 w-4 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => navigator.clipboard.writeText(newlyCreatedToken)}
              />
            </div>
          </div>
        )}

        <h4 className="font-size-main-heading font-semibold mb-6">
          Create a New Token
        </h4>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="tokenName"
              className="font-semibold"
            >
              Name
            </Label>

            <Input
              id="tokenName"
              name="tokenName"
              value={newTokenInfo.tokenName}
              maxLength={40}
              onChange={handleChange}
              placeholder="Friendly name for new token"
              className="h-10 w-[390px]"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="tokenExpDate"
              className="font-semibold"
            >
              Expires at
            </Label>

            <Popover
              open={calendarOpen}
              onOpenChange={setCalendarOpen}
            >
              <PopoverTrigger asChild>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setCalendarOpen(true);
                    }
                  }}
                  className={cn(
                    "flex h-10 w-[390px] cursor-pointer items-center justify-between",
                    "px-3 py-2 bg-white border border-neutral-800 placeholder:text-neutral-800 rounded text-sm transition-colors caret-primary",
                    "focus-visible:border-primary focus-visible:shadow-[0px_0_3px_2px_#00449440] focus-visible:outline-none",
                    calendarOpen
                      ? "border-primary shadow-[0px_0_3px_2px_#00449440]"
                      : ""
                  )}
                >
                  <span
                    className={
                      newTokenInfo.tokenExpDate
                        ? ""
                        : "text-neutral-500"
                    }
                  >
                    {newTokenInfo.tokenExpDate
                      ? format(newTokenInfo.tokenExpDate, "yyyy-MM-dd")
                      : "YYYY-MM-DD"}
                  </span>

                  <img
                    src="/assets/icons/Calendar_20px.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-60"
                  />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 animate-none">
                <Calendar
                  mode="single"
                  selected={newTokenInfo.tokenExpDate}
                  onSelect={(date) => {
                    setNewTokenInfo((prev) => ({
                      ...prev,
                      tokenExpDate: date,
                    }));

                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <Label className="font-semibold">
              Access scope
            </Label>

            <RadioGroup
              value={newTokenInfo.accessScope}
              onValueChange={(value) =>
                setNewTokenInfo((prev) => ({
                  ...prev,
                  accessScope: value,
                }))
              }
              className="space-y-3"
            >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="read"
                id="read_only_scope"
              />
              <Label
                htmlFor="read_only_scope"
                className="font-normal cursor-pointer"
              >
                Read only access (Limited only to "GET" calls)
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="write"
                id="read_write_scope"
              />
              <Label
                htmlFor="read_write_scope"
                className="font-normal cursor-pointer"
              >
                Read/Write access (Required for calls other than "GET")
              </Label>
            </div>

            </RadioGroup>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                )}
                {loading ? "Creating..." : "Create New Token"}
              </Button>
            </div>
          </div>
        </form>
        <AccessTokenTable
          title="Active access tokens"
          tokens={activeAccessTokens}
          showRevoke={true}
          onReveal={(token) => {
            if (revealedTokenId === token.id) {
              setRevealedTokenId(null);
              setRevealedTokenValue("");
            } else {
              setRevealedTokenId(token.id);
              setRevealedTokenValue(token.token);
            }
          }}
          onRevoke={handleRevoke}
          revealedTokenId={revealedTokenId}
          revealedTokenValue={revealedTokenValue}
          revokingTokenId={revokingTokenId}
        />

        <AccessTokenTable
          title="Expired access tokens"
          tokens={expiredAccessTokens}
          onReveal={(token) => {
            if (revealedTokenId === token.id) {
              setRevealedTokenId(null);
              setRevealedTokenValue("");
            } else {
              setRevealedTokenId(token.id);
              setRevealedTokenValue(token.token);
            }
          }}
          showRevoke={false}
          revealedTokenId={revealedTokenId}
          revealedTokenValue={revealedTokenValue}
        />
      </div>
    </>
  );
};

const AccessTokenTable = ({
  title,
  tokens,
  onReveal,
  onRevoke,
  showRevoke,
  revealedTokenId,
  revealedTokenValue,
  revokingTokenId,
}) => (
  <div className="mt-12">
    <h3 className="text-2xl font-semibold mb-4">
      {title} ({tokens.length})
    </h3>

    <Table className="w-full table-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Token name</TableHead>
          <TableHead className="w-[15%]">Created on</TableHead>
          <TableHead className="w-[15%]">Expiry</TableHead>
          <TableHead className="w-[15%]">Scope</TableHead>
          <TableHead className="w-[15%] text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

    <TableBody className="text-neutral-800">
      {tokens.length > 0 ? (
        tokens.map((token) => {
          if (revokingTokenId === token.id) {
            return (
              <TableRow key={token.id}>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground"
                >
                  This token is revoked.
                </TableCell>
              </TableRow>
            );
          }

          return (
            <React.Fragment key={token.id}>

            <TableRow>
              <TableCell className="break-all whitespace-normal">
                {token.name}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {token.created}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {token.expire}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {token.scope === "write" || token.scope === "w"
                  ? "Read/Write"
                  : "Read Only"}
              </TableCell>

              <TableCell className="text-center whitespace-nowrap">
                <div className="flex justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => onReveal(token)}
                  >
                    Reveal
                  </Button>

                  {showRevoke && (
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => onRevoke(token.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>

            {revealedTokenId === token.id && (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="relative">
                    <Textarea
                      value={revealedTokenValue}
                      readOnly
                      className="w-full resize pr-10 border-neutral-400 text-neutral-800"
                    />

                    <img
                      src="/assets/icons/Copy_16px.svg"
                      alt="Copy token"
                      role="button"
                      tabIndex={0}
                      className="absolute top-3 right-3 h-4 w-4 cursor-pointer opacity-70 hover:opacity-100"
                      onClick={() =>
                        navigator.clipboard.writeText(revealedTokenValue)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigator.clipboard.writeText(revealedTokenValue);
                        }
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
            </React.Fragment>
          );
        })
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No tokens found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

TokenSpace.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setShowMessage: PropTypes.func.isRequired,
};

AccessTokenTable.propTypes = {
  title: PropTypes.string.isRequired,
  tokens: PropTypes.array,
  onReveal: PropTypes.func.isRequired,
  onRevoke: PropTypes.func,
  showRevoke: PropTypes.bool,
  revealedTokenId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  revokingTokenId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  revealedTokenValue: PropTypes.string,
};

export default TokenSpace;
