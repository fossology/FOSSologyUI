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

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertBanner } from "@/components/ui/alert";

const TagClient = () => {
  const searchParams = useSearchParams();

  const uploadId =
    searchParams.get("upload");

  const [tagName, setTagName] =
    useState("");

  const [
    tagDescription,
    setTagDescription,
  ] = useState("");

  const [message, setMessage] =
    useState(null);

  const [
    showMessage,
    setShowMessage,
  ] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!uploadId) {
      setMessage({
        type: "error",
        text: "Upload ID is missing.",
      });

      setShowMessage(true);
      return;
    }

    /*
     * TODO: Replace after Upload Tag API
     * integration.
     */
    console.log({
      uploadId,
      tagName,
      tagDescription,
    });

    setMessage({
      type: "error",
      text: "Upload Tag API has not been implemented yet.",
    });

    setShowMessage(true);
  };

  const isFormValid =
    tagName.trim() !== "" &&
    uploadId;

  const alertType =
    message?.type === "danger" ||
    message?.type === "error"
      ? "Error"
      : message?.type === "success"
        ? "Success"
        : "Info";

    return (
    <div className="mx-10 min-h-screen py-8">
        {showMessage &&
        message && (
            <div className="mb-4">
            <AlertBanner
                type={alertType}
                description={message.text}
                showClose
                onClose={() =>
                setShowMessage(false)
                }
            />
            </div>
        )}

        {/* Main page heading */}
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">
        Tag
        </h1>

        {/* Create Tag section */}
        <section>
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Create Tag
        </h2>

        <form
            onSubmit={handleSubmit}
            className="mb-10 space-y-6"
        >
            <div className="space-y-2">
            <Label htmlFor="tag-name">
                Tag:
            </Label>

            <Input
                id="tag-name"
                value={tagName}
                placeholder="Software Repository"
                onChange={(event) =>
                setTagName(event.target.value)
                }
                className="w-[320px]"
            />
            </div>

            <div className="space-y-2">
            <Label htmlFor="tag-description">
                Tag description:
            </Label>

            <Textarea
                id="tag-description"
                value={tagDescription}
                placeholder="Type your description here"
                onChange={(event) =>
                setTagDescription(
                    event.target.value
                )
                }
                className="min-w-[320px] resize"
            />
            </div>

            <Button
            type="submit"
            disabled={!isFormValid}
            >
            Create
            </Button>
        </form>
        </section>

        {/* Current Tags section */}
        <section>
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Current Tags:
        </h2>

        {/* TODO: Replace with upload tags after API integration */}
        <div className="text-sm text-muted-foreground">
            No tags available
        </div>
        </section>
    </div>
    );
};

export default TagClient;