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
import { getUploadLicense, getUploadById } from "@/services/upload";

const agents = [
    { id: "monk", label: "Monk" },
    { id: "nomos", label: "Nomos" },
    { id: "ninka", label: "Ninka" },
    { id: "ojo", label: "Ojo" },
    { id: "reportImport", label: "Report import" },
];

const LicenseListClient = ({ uploadId }) => {
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [doNotIncludeSubdirectories, setDoNotIncludeSubdirectories] = useState(false);
    const [showDirectories, setShowDirectories] = useState(false);
    const [exclude, setExclude] = useState("");
    const [consolidate, setConsolidate] = useState("raw");
    const [downloadOption, setDownloadOption] = useState("none");
    const [preview, setPreview] = useState("");
    const [informationMessage, setInformationMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copying, setCopying] = useState(false);
    const [uploadName, setUploadName] = useState("");
    const [hasGenerated, setHasGenerated] = useState(false);

    const toggleAgent = (agentId) => {
        setSelectedAgents((current) =>
            current.includes(agentId)
                ? current.filter((id) => id !== agentId)
                : [...current, agentId]
        );
    };

    const getAgentInformationMessage = (error) => {
        const message = error?.message || "";

        const match = message.match(
            /Agent\s+([^\s]+)\s+not scheduled for the upload/i
        );

        if (match) {
            return `No information for agent: ${match[1]}`;
        }

        return "";
    };

    const normalizePath = (filePath) => {
        return (filePath || "")
            .replace(/\\/g, "/")
            .replace(/^\.\//, "")
            .replace(/^\/+|\/+$/g, "");
    };

    const filterLicenseResults = (results) => {
        if (!Array.isArray(results)) {
            return results;
        }

        let filteredResults = [...results];

        // Exclude files/directories containing the given substring.
        if (exclude.trim()) {
            const excludeValue = exclude.trim().toLowerCase();

            filteredResults = filteredResults.filter((item) => {
                const filePath = item?.filePath || "";

                return !filePath
                    .toLowerCase()
                    .includes(excludeValue);
            });
        }

        if (doNotIncludeSubdirectories) {
            console.log("Before subdirectory filter:", filteredResults.map(r => r?.filePath));
            
            // Extract first-level containers and deduplicate
            const firstLevelPaths = new Map();
            
            filteredResults.forEach((item) => {
                const path = item?.filePath;
                if (!path) return;
                
                const normalized = normalizePath(path);
                const parts = normalized.split("/").filter(Boolean);
                
                console.log(`Path: "${path}" -> normalized: "${normalized}" -> parts (${parts.length}):`, parts);
                
                // Only extract the first-level container INSIDE the upload
                // For paths like "upload/container/...", take parts[1] (the container)
                if (parts.length >= 2) {
                    const firstLevelPath = parts[1];

                    console.log(`  -> Extracting first level: "${firstLevelPath}"`);

                    if (!firstLevelPaths.has(firstLevelPath)) {
                        firstLevelPaths.set(firstLevelPath, {
                            ...item,
                            filePath: firstLevelPath,
                        });
                    }
                } else {
                    console.log(`  -> Skipping (not enough parts)`);
                }
            });
            
            console.log("Map size:", firstLevelPaths.size);
            console.log("Map keys:", Array.from(firstLevelPaths.keys()));
            console.log("Map values:", Array.from(firstLevelPaths.values()));
            
            filteredResults = Array.from(firstLevelPaths.values());
            console.log("After subdirectory filter:", filteredResults.map(r => r?.filePath));
        }

        return filteredResults;
    };

    const mergeLicenseItems = (existing, item) => {
        const existingScanner = Array.isArray(
            existing?.findings?.scanner
        )
            ? existing.findings.scanner
            : [];

        const itemScanner = Array.isArray(
            item?.findings?.scanner
        )
            ? item.findings.scanner
            : [];

        return {
            ...existing,
            findings: {
                scanner: [
                    ...new Set([
                        ...existingScanner,
                        ...itemScanner,
                    ]),
                ],
                conclusion:
                    existing?.findings?.conclusion ??
                    item?.findings?.conclusion ??
                    null,
                copyright:
                    existing?.findings?.copyright ??
                    item?.findings?.copyright ??
                    null,
            },
            clearingStatus:
                existing?.clearingStatus ??
                item?.clearingStatus ??
                "NOASSERTION",
        };
    };

    const consolidateLicenseResults = (results) => {
        if (!Array.isArray(results)) {
            return results;
        }

        // Raw means keep every result exactly as returned by each agent.
        if (consolidate === "raw") {
            return results;
        }

        const groupedResults = new Map();

        results.forEach((item) => {
            const filePath = item?.filePath;

            if (!filePath) {
                return;
            }

            let key = filePath;

            // Consolidate all agent results for the same file.
            if (consolidate === "perFile") {
                key = filePath;
            }

            // Consolidate results by parent directory.
            if (consolidate === "perDirectory") {
                const pathParts = normalizePath(filePath)
                    .split("/")
                    .filter(Boolean);

                key =
                    pathParts.length > 1
                        ? pathParts.slice(0, -1).join("/")
                        : filePath;
            }

            const existingItem = groupedResults.get(key);

            if (existingItem) {
                groupedResults.set(
                    key,
                    mergeLicenseItems(existingItem, item)
                );
            } else {
                groupedResults.set(key, {
                    ...item,
                    filePath: key,
                    findings: {
                        scanner: Array.isArray(
                            item?.findings?.scanner
                        )
                            ? [...item.findings.scanner]
                            : [],
                        conclusion:
                            item?.findings?.conclusion ?? null,
                        copyright:
                            item?.findings?.copyright ?? null,
                    },
                });
            }
        });

        return Array.from(groupedResults.values());
    };

    const getProcessedLicenseResults = (response) => {
        if (!Array.isArray(response)) {
            return response;
        }

        const filteredResults = filterLicenseResults(response);

        return consolidateLicenseResults(filteredResults);
    };

    const setLicensePreview = (response, alreadyProcessed = false) => {

        const processedResponse = alreadyProcessed
            ? response
            : getProcessedLicenseResults(response);

        setHasGenerated(true);

        if (Array.isArray(processedResponse)) {

            setPreview(
                processedResponse
                    .map((item) => item.filePath)
                    .filter(Boolean)
                    .join("\n")
            );

        } else if (typeof processedResponse === "string") {

            setPreview(processedResponse);

        } else {

            setPreview("");

        }

    };

    const loadLicenseList = async (agentList) => {
        if (!uploadId) {
            return;
        }

        setLoading(true);
        setError("");
        setInformationMessage("");

        try {
            const response = await getUploadLicense(
                uploadId,
                agentList.join(","),
                showDirectories
            );

            console.log("License List response:", response);

            setLicensePreview(response);
        } catch (error) {
            console.error("Unable to load license list", error);

            const agentMessage = getAgentInformationMessage(error);

            if (agentMessage) {
                setInformationMessage(agentMessage);

                if (Array.isArray(error?.body)) {
                    setLicensePreview(error.body);
                } else if (Array.isArray(error?.data)) {
                    setLicensePreview(error.data);
                } else {
                    setPreview((current) => current);
                }

                return;
            }

            setError(
                error?.message ||
                    "Unable to load the license list."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uploadId) {
            loadLicenseList(["monk"]);
            
            // Fetch upload info to get the upload name
            getUploadById(uploadId)
                .then((upload) => {
                    setUploadName(upload?.uploadName || upload?.uploadname || "upload");
                })
                .catch((err) => {
                    console.error("Failed to fetch upload info:", err);
                    setUploadName("upload");
                });
        }
    }, [uploadId]);

    const handleGenerateList = async () => {
        if (!uploadId) {
            setError("Unable to determine the upload.");
            return;
        }

        if (selectedAgents.length === 0) {
            setError("Please select at least one agent.");
            return;
        }

        setLoading(true);
        setError("");
        setInformationMessage("");
        setPreview("");
        setHasGenerated(false);

        try {
            const successfulResults = [];
            const unavailableAgents = [];

            for (const agent of selectedAgents) {
                try {
                    const response = await getUploadLicense(
                        uploadId,
                        agent,
                        showDirectories
                    );

                    console.log(
    "Raw license response:",
    JSON.stringify(response, null, 2)
);

                    if (Array.isArray(response)) {
                        successfulResults.push(...response);
                    } else if (typeof response === "string") {
                        successfulResults.push({
                            filePath: response,
                        });
                    }
                } catch (error) {
                    const agentMessage =
                        getAgentInformationMessage(error);

                    if (agentMessage) {
                        unavailableAgents.push(agentMessage);
                    } else {
                        throw error;
                    }
                }
            }

            if (unavailableAgents.length > 0) {
                setInformationMessage(
                    unavailableAgents.join("\n")
                );
            }

            const processedResults =
                getProcessedLicenseResults(successfulResults);

            setLicensePreview(processedResults, true);

            if (
                downloadOption !== "none" &&
                Array.isArray(processedResults)
            ) {
                downloadLicenseResults(
                    processedResults,
                    downloadOption
                );
            }
        } catch (error) {
            console.error(
                "Unable to generate license list",
                error
            );

            setError(
                error?.message ||
                    "Unable to generate the license list."
            );
        } finally {
            setLoading(false);
        }
    };

    const downloadLicenseResults = (
        results,
        option
    ) => {
        if (option === "none") {
            return;
        }

        const rows = [
            ["File Path"],
            ...results
                .map((item) => [item?.filePath])
                .filter(([filePath]) => filePath),
        ];

        const csvContent = rows
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value || "").replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        // Get current date in YYYYMMDD format
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const dateStr = `${year}${month}${day}`;

        // Use different MIME types and file extensions for CSV vs Spreadsheet
        const isSpreadsheet = option === "spreadsheet";
        const mimeType = isSpreadsheet
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "text/csv;charset=utf-8;";
        const fileName = isSpreadsheet
            ? `${uploadName || "upload"}-${dateStr}.xlsx`
            : `${uploadName || "upload"}-${dateStr}-licenses.csv`;

        const blob = new Blob(
            [csvContent],
            {
                type: mimeType,
            }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    const handleCopyPreview = async () => {
        if (!preview || copying) {
            return;
        }

        setCopying(true);

        try {
            await navigator.clipboard.writeText(preview);

            setCopying(false);

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
                {/* Agents */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        1. Which agents do you want to include?
                    </Label>

                    <div className="space-y-3">
                        {agents.map((agent) => (
                            <div
                                key={agent.id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    id={agent.id}
                                    checked={selectedAgents.includes(agent.id)}
                                    onCheckedChange={() =>
                                        toggleAgent(agent.id)
                                    }
                                />

                                <Label
                                    htmlFor={agent.id}
                                    className="cursor-pointer"
                                >
                                    {agent.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subdirectories */}
                <div className="flex items-center gap-2">
                    <span className="text-base">2.</span>

                    <Checkbox
                        id="do-not-include-subdirectories"
                        checked={doNotIncludeSubdirectories}
                        onCheckedChange={(checked) =>
                            setDoNotIncludeSubdirectories(checked === true)
                        }
                    />

                    <Label
                        htmlFor="do-not-include-subdirectories"
                        className="cursor-pointer"
                    >
                        Do not include subdirectories?
                    </Label>
                </div>

                {/* Directories / Containers */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-base">3.</span>

                        <Checkbox
                            id="show-directories"
                            checked={showDirectories}
                            onCheckedChange={(checked) =>
                                setShowDirectories(checked === true)
                            }
                        />

                        <Label
                            htmlFor="show-directories"
                            className="cursor-pointer"
                        >
                            Show directories and containers?
                        </Label>
                    </div>

                    <div className="flex items-center gap-2 pl-6">
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
                            placeholder="Label"
                            className="w-[260px] h-8"
                        />
                    </div>
                </div>

                {/* Path exclusion description */}
                <div>
                    <p className="text-base">
                        4. Exclude files containing some substring in the path.
                        &quot;mac&quot; and it should exclude all files and
                        directories containing the substring &quot;mac&quot;.
                    </p>
                </div>

                {/* Consolidation */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        5. Consolidate Results?
                    </Label>

                    <RadioGroup
                        value={consolidate}
                        onValueChange={setConsolidate}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="raw"
                                id="consolidate-raw"
                            />

                            <Label
                                htmlFor="consolidate-raw"
                                className="cursor-pointer font-normal"
                            >
                                Print raw result per file.
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="perFile"
                                id="consolidate-file"
                            />

                            <Label
                                htmlFor="consolidate-file"
                                className="cursor-pointer font-normal"
                            >
                                Print consolidated result per file.
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="perDirectory"
                                id="consolidate-directory"
                            />

                            <Label
                                htmlFor="consolidate-directory"
                                className="cursor-pointer font-normal"
                            >
                                Print consolidated result per directory.
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Download */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        6. Download License List after creation?
                    </Label>

                    <RadioGroup
                        value={downloadOption}
                        onValueChange={setDownloadOption}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="none"
                                id="download-none"
                            />

                            <Label
                                htmlFor="download-none"
                                className="cursor-pointer font-normal"
                            >
                                Don&apos;t download license list.
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="csv"
                                id="download-csv"
                            />

                            <Label
                                htmlFor="download-csv"
                                className="cursor-pointer font-normal"
                            >
                                Download license list in CSV.
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="spreadsheet"
                                id="download-spreadsheet"
                            />

                            <Label
                                htmlFor="download-spreadsheet"
                                className="cursor-pointer font-normal"
                            >
                                Download license list in Spreadsheet.
                            </Label>
                        </div>
                    </RadioGroup>
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
                <p className="max-w-4xl leading-6 text-base">
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

                    <ContentBox className="relative w-full min-h-[260px] max-h-[400px] whitespace-pre-wrap p-3 text-base">
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
                            {informationMessage && (
                                <div className="mb-3 whitespace-pre-line font-semibold">
                                    {informationMessage}
                                </div>
                            )}
                            {preview ? (
                                preview
                            ) : hasGenerated ? (
                                <span className="font-semibold">
                                    Result: Empty
                                </span>
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

export default LicenseListClient;
