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

import React, { useEffect, useState } from "react";
import externalLinks from "@/constants/externalLinks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AlertBanner } from "@/components/ui/alert";
import { Spinner } from "@/components/Widgets";

// import {
//   getAllBucketPools,
//   duplicateBucketPool,
// } from "@/services/buckets";

import { handleError } from "@/shared/helper";

const DuplicateBucketpoolPage = () => {
    const [bucketPools, setBucketPools] = useState([]);
    const [selectedBucketPool, setSelectedBucketPool] =
    useState("");

    const [updateDefault, setUpdateDefault] =
    useState(true);

    const [loadingBucketPools, setLoadingBucketPools] =
    useState(false);

    const [duplicating, setDuplicating] =
    useState(false);

    const [message, setMessage] =
    useState(null);

    const [showMessage, setShowMessage] =
    useState(false);

    useEffect(() => {
    const loadBucketPools = async () => {
        setLoadingBucketPools(true);

        try {
        // TODO: Enable when duplicate bucketpool API is exposed.
        // const response = await getAllBucketPools();

        setBucketPools([]);
        } catch (error) {
        handleError(error, setMessage);
        setShowMessage(true);
        } finally {
        setLoadingBucketPools(false);
        }
    };

    loadBucketPools();
    }, []);

    const handleSubmit = async () => {
        if (!selectedBucketPool) {
            return;
        }

        setDuplicating(true);

        try {
            // TODO: Enable when duplicate bucketpool API is exposed.
            // const response = await duplicateBucketPool({
            //   bucketpoolPk: Number(selectedBucketPool),
            //   updateDefault,
            // });

            setMessage({
            type: "info",
            text: "Duplicate bucketpool functionality is not yet available in the REST API.",
            });

            setShowMessage(true);
        } finally {
            setDuplicating(false);
        }
    };

    const alertType =
    message?.type === "danger" ||
    message?.type === "error"
        ? "Error"
        : message?.type === "success"
        ? "Success"
        : "Info";

    return (
    <div className="min-h-screen mx-40 py-8">
        {showMessage && message && (
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

        <h1 className="mb-6 text-2xl font-semibold">
        Buckets
        </h1>

        <h2 className="mb-6 text-xl font-semibold">
        Duplicate Bucketpool
        </h2>

        <div className="space-y-6">
        <div className="text-sm leading-6">
            <p>
            The purpose of this is to facilitate
            editing an existing bucketpool. Make sure
            you understand{" "}
            <a
                href={externalLinks.createBucketPools}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold"
            >
                Creating Bucket Pools
            </a>{" "}
            before continuing. It will explain why
            you should create a new bucketpool rather
            than edit an old one that has already
            recorded results.
            </p>

            <p className="mt-4">
            Steps to modify a bucketpool:
            </p>

            <ol className="list-decimal pl-6">
            <li>
                Create a baseline with your current
                bucketpool. In other words, run a bucket
                scan on something. If you do this before
                creating a new modified bucketpool, you
                can compare the old results with the new
                to verify it is working as you expect.
            </li>

            <li>
                Duplicate the bucketpool (this will
                increment the bucketpool version and its
                bucketdef records). You should also check
                'Update my default bucketpool' since new
                bucket jobs only use your default
                bucketpool.
            </li>

            <li>
                Duplicate any bucket scripts that you
                defined in /var/local/lib/fossology.
            </li>

            <li>
                Manually edit the new bucketpool record,
                if desired.
            </li>

            <li>
                Manually insert/update/delete the new
                bucketdef records.
            </li>

            <li>
                Manually insert a new buckets record in
                the agent table.
            </li>

            <li>
                Queue up the new bucket job in Jobs &gt;
                Schedule Agents.
            </li>

            <li>
                Use Buckets &gt; Compare to compare the
                new and old runs. Verify the results.
            </li>

            <li>
                If you still need to edit the buckets,
                use Buckets &gt; Remove Bucket Results to
                remove the previous runs results and
                repeat starting with editing the
                bucketpool or def records.
            </li>

            <li>
                When the bucket results are what you
                want, then you can reset all the users
                of the old bucketpool to the new one
                (manual sql step).
            </li>
            </ol>
        </div>

        <hr className="border-neutral-400" />

        <div className="space-y-8">
            <div className="flex items-center gap-4">
            <Label
                htmlFor="bucketpool"
                className="w-[280px] shrink-0"
            >
                Choose the bucketpool to duplicate:
            </Label>

            <Select
                value={selectedBucketPool}
                onValueChange={
                setSelectedBucketPool
                }
                disabled={
                loadingBucketPools ||
                duplicating
                }
            >
                <SelectTrigger
                id="bucketpool"
                className="h-8 w-[266px]"
                >
                {loadingBucketPools ? (
                    <Spinner />
                ) : (
                    <SelectValue placeholder="Select bucketpool" />
                )}
                </SelectTrigger>

                <SelectContent>
                {bucketPools.map(
                    (bucketPool) => (
                    <SelectItem
                        key={
                        bucketPool.bucketpool_pk
                        }
                        value={String(
                        bucketPool.bucketpool_pk
                        )}
                    >
                        {bucketPool.bucketpool_name}
                        {" "}
                        (v
                        {bucketPool.version})
                    </SelectItem>
                    )
                )}
                </SelectContent>
            </Select>
            </div>

            <div className="flex items-center gap-2">
            <Checkbox
                id="update-default"
                checked={updateDefault}
                onCheckedChange={(checked) =>
                setUpdateDefault(
                    checked === true
                )
                }
                disabled={duplicating}
            />

            <Label
                htmlFor="update-default"
                className="cursor-pointer"
            >
                Update my default bucketpool.
            </Label>
            </div>

            <Button
                type="button"
                variant="default"
                onClick={handleSubmit}
                disabled={
                    !selectedBucketPool ||
                    duplicating ||
                    loadingBucketPools
                }
                className="mt-4"
            >
            {duplicating ? (
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
            ) : (
                "Submit"
            )}
            </Button>
        </div>
        </div>
    </div>
    );
};

export default DuplicateBucketpoolPage;