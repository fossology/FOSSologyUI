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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ContentBox } from "@/components/ui/content-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    getUploadById,
    getUploadCopyrights,
    getUploadLicense,
} from "@/services/upload";

const CopyrightListClient = ({ uploadId }) => {
    const [exportOption, setExportOption] = useState("allFiles");
    const [exclude, setExclude] = useState("");
    const [downloadCsv, setDownloadCsv] = useState(false);
    const [uploadName, setUploadName] = useState("");

    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [copying, setCopying] = useState(false);
    const [copyrights, setCopyrights] = useState([]);
    const [hasGenerated, setHasGenerated] = useState(false);

    const normalizePath = (filePath) => {
        return (filePath || "")
            .replace(/\\/g, "/")
            .replace(/^\/+|\/+$/g, "");
    };

    const buildCopyrightLines = (copyrightList) => {
        const lines = [];

        copyrightList.forEach((entry) => {
            const paths = Array.isArray(entry.filePath)
                ? entry.filePath
                : entry.filePath
                    ? [entry.filePath]
                    : [];

            const copyrights = Array.isArray(entry.copyright)
                ? entry.copyright
                : entry.copyright
                    ? [entry.copyright]
                    : [];

            paths.forEach((filePath) => {
                const normalizedPath = normalizePath(filePath);

                if (
                    exclude &&
                    normalizedPath.toLowerCase().includes(
                        exclude.toLowerCase()
                    )
                ) {
                    return;
                }

                copyrights.forEach((copyright) => {
                    lines.push(`${normalizedPath}: ${copyright}`);
                });
            });
        });

        return lines;
    };

    const isPathCoveredByLicense = (filePath, licensePaths) => {
        const normalizedFilePath = normalizePath(filePath);

        return licensePaths.some(
            (licensePath) => {
                const normalizedLicensePath = normalizePath(licensePath);

                return (
                    normalizedFilePath === normalizedLicensePath ||
                    normalizedFilePath.startsWith(
                        `${normalizedLicensePath}/`
                    )
                );
            }
        );
    };

    const downloadCopyrightResults = (lines) => {
        if (!Array.isArray(lines) || lines.length === 0) {
            return;
        }

        const csvContent = [
            ["File Path", "Copyright"],
            ...lines.map((line) => {
                const separatorIndex = line.indexOf(": ");
                if (separatorIndex === -1) {
                    return [line, ""];
                }

                return [
                    line.slice(0, separatorIndex),
                    line.slice(separatorIndex + 2),
                ];
            }),
        ]
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value || "").replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const now = new Date();
        const dateStr = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0"),
        ].join("");

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${uploadName || "upload"}-${dateStr}-copyrights.csv`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    const loadCopyrights = async (selectedOption = exportOption) => {
        if (!uploadId) {
            setError("Unable to determine the upload.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("Selected option:", selectedOption);

            const copyrightResponse = await getUploadCopyrights(uploadId);

            console.log(
                "Copyright API response:",
                copyrightResponse
            );

            let result = Array.isArray(copyrightResponse)
                ? copyrightResponse
                : [];

            if (selectedOption === "withoutLicenses") {
                const licenseResponse = await getUploadLicense(
                    uploadId,
                    "monk",
                    false
                );

                console.log(
                    "License API response:",
                    licenseResponse
                );

                const licensePaths = Array.isArray(licenseResponse)
                    ? licenseResponse
                        .map((item) => item?.filePath)
                        .filter(Boolean)
                    : [];

                console.log("Licensed paths:", licensePaths);

                result = result
                    .map((entry) => {
                        const filePaths = Array.isArray(entry.filePath)
                            ? entry.filePath.filter(
                                (filePath) =>
                                    !isPathCoveredByLicense(
                                        filePath,
                                        licensePaths
                                    )
                            )
                            : [];

                        return {
                            ...entry,
                            filePath: filePaths,
                        };
                    })
                    .filter(
                        (entry) => entry.filePath.length > 0
                    );
            }

            setCopyrights(result);

            const lines = buildCopyrightLines(result);
            setPreview(lines.join("\n"));
            setHasGenerated(true);

            if (downloadCsv) {
                downloadCopyrightResults(lines);
            }
        } catch (error) {
            console.error(
                "Unable to generate the copyright list",
                error
            );

            setError(
                error?.message ||
                    "Unable to generate the copyright list."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateList = () => {
        loadCopyrights(exportOption);
    };

    useEffect(() => {
        if (uploadId) {
            loadCopyrights("allFiles");

            getUploadById(uploadId)
                .then((upload) => {
                    setUploadName(
                        upload?.uploadName || upload?.uploadname || "upload"
                    );
                })
                .catch(() => {
                    setUploadName("upload");
                });
        }
    }, [uploadId]);

    const handleCopyPreview = async () => {
        if (!preview || copying) {
            return;
        }

        setCopying(true);

        try {
            await navigator.clipboard.writeText(preview);

            setCopying("copied");

            setTimeout(() => {
                setCopying(false);
            }, 2000);
        } catch (error) {
            setCopying(false);
        }
    };

    return (
        <div className="pb-10">
            <div className="space-y-8">
                {/* Copyrights to export */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        1. Which copyrights to export?
                    </Label>

                    <RadioGroup
                        value={exportOption}
                        onValueChange={setExportOption}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="allFiles"
                                id="copyright-all-files"
                            />

                            <Label
                                htmlFor="copyright-all-files"
                                className="cursor-pointer font-normal"
                            >
                                All files
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="withoutLicenses"
                                id="copyright-without-licenses"
                            />

                            <Label
                                htmlFor="copyright-without-licenses"
                                className="cursor-pointer font-normal"
                            >
                                Files without licenses
                            </Label>
                        </div>
                    </RadioGroup>

                    <div className="flex items-center gap-2">
                        <Label
                            htmlFor="exclude"
                            className="font-normal"
                        >
                            Exclude:
                        </Label>

                        <Input
                            id="exclude"
                            value={exclude}
                            onChange={(event) =>
                                setExclude(event.target.value)
                            }
                            placeholder="Path substring"
                            className="h-8 w-[260px]"
                        />
                    </div>
                </div>

                {/* Path exclusion */}
                <div>
                    <p className="text-base">
                        2. Exclude files containing some substring in the path.
                        &quot;mac&quot; and it should exclude all files and
                        directories containing the substring &quot;mac&quot;.
                    </p>
                </div>

                {/* Download CSV */}
                <div className="flex items-center gap-2">
                    <span className="text-base">3.</span>

                    <Checkbox
                        id="download-csv"
                        checked={downloadCsv}
                        onCheckedChange={(checked) =>
                            setDownloadCsv(checked === true)
                        }
                    />

                    <Label
                        htmlFor="download-csv"
                        className="cursor-pointer"
                    >
                        Download CSV after creation?
                    </Label>
                </div>

                {/* Generate */}
                <Button
                    onClick={handleGenerateList}
                    disabled={loading || !uploadId}
                >
                    {loading ? "Generating..." : "Generate List"}
                </Button>

                {/* Actual errors only */}
                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                {/* Information */}
                <p className="max-w-4xl text-base leading-6">
                    With this tool you will only be able to obtain a list with
                    at maximum 2200 entries. For a full list run
                    fo_nomos_license_list from the command line. This Limit can
                    be modified by the administrator.
                </p>

                {/* Preview */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Preview
                    </h2>

                    <ContentBox className="relative w-full min-h-[260px] max-h-[400px] whitespace-pre-wrap text-base">
                        {/* Copy button */}
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleCopyPreview}
                                disabled={!preview || copying === true}
                                className="flex cursor-pointer items-center gap-1 px-2 py-1 text-primary hover:text-primary disabled:cursor-not-allowed"
                                aria-label="Copy preview"
                                title="Copy preview"
                            >
                                <Image
                                    src="/assets/icons/Copy_16px.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                    aria-hidden="true"
                                    className={
                                        copying === "copied"
                                            ? "opacity-50"
                                            : "[filter:invert(17%)_sepia(99%)_saturate(2306%)_hue-rotate(204deg)_brightness(91%)_contrast(104%)]"
                                    }
                                />

                                <span
                                    className={
                                        copying === "copied"
                                            ? "text-muted-foreground"
                                            : "text-primary"
                                    }
                                >
                                    {copying === true
                                        ? "Copying"
                                        : copying === "copied"
                                            ? "Copied"
                                            : "Copy"}
                                </span>
                            </Button>
                        </div>

                        {/* Preview content */}
                        <div className="pr-20">
                            {preview ? (
                                preview
                            ) : hasGenerated ? (
                                <span>Result: Empty</span>
                            ) : (
                                <span>
                                    Generate a list to see the preview.
                                </span>
                            )}
                        </div>
                    </ContentBox>
                </div>
            </div>
        </div>
    );
};

export default CopyrightListClient;