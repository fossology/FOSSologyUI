/*
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

 SPDX-License-Identifier: GPL-2.0-only

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2.0-only

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import routes from "@/constants/routes";
import { getJob, getJobLog, downloadJobLog } from "@/services/jobs";

const JobDetailsClient = ({ jobId }) => {
    const [job, setJob] = useState(null);
    const [selectedQueue, setSelectedQueue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [jobLog, setJobLog] = useState("");
    const [jobLogTruncated, setJobLogTruncated] = useState(false);


    const searchParams = useSearchParams();
    const queueId = searchParams.get("queue");

    useEffect(() => {
        const fetchJob = async () => {
        setLoading(true);
        setError("");
        setJob(null);
        setSelectedQueue(null);

        try {
            const response = await getJob(jobId);

            if (!response) {
            throw new Error("Job not found.");
            }

            const queues = response.jobQueue ?? [];

            if (queues.length === 0) {
            throw new Error("No job queue information found.");
            }

            /*
            * When a queue id is supplied in the URL, show that queue.
            * Otherwise, use the first queue belonging to the job.
            */
            const queue = queueId
            ? queues.find(
                (item) =>
                    String(item.jobQueueId) === String(queueId)
                )
            : queues[0];

            if (!queue) {
            throw new Error(
                `Job queue ${queueId} not found.`
            );
            }

            setJob(response);
            setSelectedQueue(queue);
        } catch (err) {
            console.error("Failed to fetch job:", err);

            setError(
            err?.message ||
                "Failed to load job details."
            );
        } finally {
            setLoading(false);
        }
        };

        if (!jobId) {
        setError("Job id is missing.");
        setLoading(false);
        return;
        }

        fetchJob();
    }, [jobId, queueId]);

    useEffect(() => {
        if (!jobId || !selectedQueue?.jobQueueId) {
            setJobLog("");
            setJobLogTruncated(false);
            return;
        }

        const fetchJobLog = async () => {
            try {
                const response = await getJobLog(
                    jobId,
                    selectedQueue.jobQueueId
                );

                setJobLog(response?.log ?? "");
                setJobLogTruncated(response?.truncated ?? false);
            } catch (error) {
                console.error("Failed to fetch job log:", error);
                setJobLog("");
                setJobLogTruncated(false);
            }
        };

        fetchJobLog();
    }, [jobId, selectedQueue]);

    const getUploadJobsHref = () => {
        const uploadId = getUploadId();

        return uploadId
            ? `${routes.jobs.showJobs}?upload=${uploadId}`
            : "#";
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) {
            return "";
        }

        const date = new Date(dateTime);

        if (Number.isNaN(date.getTime())) {
            return String(dateTime);
        }

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        const hours = String(
            date.getHours()
        ).padStart(2, "0");

        const minutes = String(
            date.getMinutes()
        ).padStart(2, "0");

        const seconds = String(
            date.getSeconds()
        ).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

    const formatElapsed = (startTime, endTime) => {
        if (!startTime || !endTime) {
            return "";
        }

        const parseTimestamp = (timestamp) => {
            const match = String(timestamp).match(
                /^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,6}))?/
            );

            if (!match) {
                return null;
            }

            const [
                ,
                date,
                hours,
                minutes,
                seconds,
                fraction = "",
            ] = match;

            return {
                date,
                hours: Number(hours),
                minutes: Number(minutes),
                seconds: Number(seconds),
                microseconds: Number(
                    fraction.padEnd(6, "0")
                ),
            };
        };

        const start = parseTimestamp(startTime);
        const end = parseTimestamp(endTime);

        if (!start || !end) {
            return "";
        }

        const toMicroseconds = (timestamp) => {
            const [year, month, day] =
                timestamp.date.split("-").map(Number);

            return (
                Date.UTC(
                    year,
                    month - 1,
                    day,
                    timestamp.hours,
                    timestamp.minutes,
                    timestamp.seconds
                ) * 1000 +
                timestamp.microseconds
            );
        };

        const elapsedMicroseconds =
            toMicroseconds(end) -
            toMicroseconds(start);

        if (elapsedMicroseconds < 0) {
            return "";
        }

        const totalSeconds = Math.floor(
            elapsedMicroseconds / 1_000_000
        );

        const microseconds =
            elapsedMicroseconds % 1_000_000;

        const hours = Math.floor(
            totalSeconds / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const seconds =
            totalSeconds % 60;

        return `${String(hours).padStart(
            2,
            "0"
        )}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(
            2,
            "0"
        )}.${String(microseconds).padStart(
            6,
            "0"
        )}`;
    };

    const formatValue = (value) => {
        if (
        value === null ||
        value === undefined ||
        value === ""
        ) {
        return "";
        }

        if (typeof value === "object") {
        return JSON.stringify(value);
        }

        return String(value);
    };

    const getUploadName = () => {
        return (
            job?.uploadName ||
            job?.upload?.name ||
            job?.upload ||
            job?.name ||
            ""
        );
    };

    const getUploadId = () => {
        return (
            job?.uploadId ??
            job?.jobUploadFk ??
            job?.job_upload_fk ??
            job?.upload?.id ??
            job?.upload?.uploadId ??
            job?.upload?.uploadPk
        );
    };

    const isDeletedUploadJob = () =>
    job?.jobQueue?.some(
        (queue) =>
            String(queue.jobQueueType || "").toLowerCase() ===
            "delagent"
    );

    const getBrowseUploadHref = () => {
        const uploadId = getUploadId();

        return uploadId
            ? `/browseUploads/browse?upload=${uploadId}`
            : "#";
    };

    const handleDownloadJobLog = async () => {
        if (!jobId || !selectedQueue?.jobQueueId) {
            return;
        }

        try {
            const response = await downloadJobLog(
                jobId,
                selectedQueue.jobQueueId
            );

            if (!response?.blob) {
                throw new Error("Job log download failed.");
            }

            const url = window.URL.createObjectURL(response.blob);
            const link = document.createElement("a");

            link.href = url;
            link.download =
                response.filename ||
                `job-${jobId}-queue-${selectedQueue.jobQueueId}.log`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download job log:", error);
        }
    };

    const details =
        job && selectedQueue
        ? [
            {
                field: "jq_pk",
                value: (
                    <div className="flex items-center gap-2">
                        <Link
                            href={getUploadJobsHref()}
                            className="text-tertiary1-800 hover:underline"
                        >
                            {selectedQueue.jobQueueId}
                        </Link>

                        <span>
                            (Click to view jobs for this upload)
                        </span>
                    </div>
                ),
            },
            {
                field: "job_pk",
                value:
                jobId,
            },
            {
                field: "Job Name",
                value:
                job.name,
            },
            {
                field: "Agent Name",
                value: selectedQueue.jobQueueType,
            },
            {
                field: "Priority",
                value:
                selectedQueue.priority,
            },
            {
                field: "Args",
                value: getUploadId(),
            },
            {
                field: "jq_runonpfile",
                value:
                selectedQueue.jq_runonpfile ??
                selectedQueue.jqRunonpfile ??
                job.jq_runonpfile ??
                job.jqRunonpfile,
            },
            {
                field: "Queued",
                value: formatDateTime(
                    selectedQueue.startTime
                ),
            },
            {
                field: "Started",
                value: formatDateTime(
                selectedQueue.startTime
                ),
            },
            {
                field: "Ended",
                value: formatDateTime(
                selectedQueue.endTime
                ),
            },
            {
                field: "Elapsed HH:MM:SS",
                value: formatElapsed(
                    selectedQueue.startTime,
                    selectedQueue.endTime
                ),
            },
            {
                field: "Status",
                value:
                selectedQueue.status,
            },
            {
                field: "Items processed",
                value:
                selectedQueue.itemsProcessed,
            },
            {
                field: "Submitter",
                value:
                job.userName,
            },
            {
                field: "Upload",
                value: getUploadId() ? (
                    <div className="flex items-center gap-2">
                        <Link
                            href={getBrowseUploadHref()}
                            className="text-tertiary1-800 hover:underline"
                        >
                            {getUploadId()}
                        </Link>

                        <span>
                            (Click to browse upload)
                        </span>
                    </div>
                ) : isDeletedUploadJob() ? (
                    `${getUploadId()} (deleted)`
                ) : "",
            },
            {
                field: "Log",
                value: (
                    <div className="flex flex-col gap-2">
                        <pre className="whitespace-pre-wrap wrap-break-word">
                            {jobLog}
                        </pre>

                        {jobLogTruncated && (
                            <button
                                type="button"
                                onClick={handleDownloadJobLog}
                                className="text-left text-tertiary1-800 hover:underline"
                            >
                                Download full log
                            </button>
                        )}
                    </div>
                ),
            },
            ]
        : [];

    return (
    <div className="mx-5 py-6">
        <h1 className="text-3xl font-semibold text-gray-900">
        Show Jobs
        </h1>

        {loading && (
        <div className="py-8 text-center text-sm text-gray-500">
            Loading job details...
        </div>
        )}

        {!loading && error && (
        <div className="py-8 text-center text-sm text-red-600">
            {error}
        </div>
        )}

        {!loading &&
        !error &&
        job &&
        selectedQueue && (
            <div className="mt-6">
            {/* Job name subheading */}
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Geeky Scan Details
            </h2>

            <Table className="table-fixed">
                <colgroup>
                    <col style={{ width: "190px" }} />
                    <col />
                </colgroup>

                <TableHeader>
                    {/* Upload name header */}
                    <TableRow>
                    <TableHead
                        colSpan={2}
                        className="
                        relative
                        h-8
                        px-4
                        py-1
                        border
                        border-neutral-300
                        bg-neutral-100
                        text-left
                        align-middle
                        "
                    >
                        {isDeletedUploadJob() ? (
                            <span className="text-medium font-bold text-tertiary1-800">
                            {getUploadName()} (deleted)
                            </span>
                        ) : (
                            <Link
                                href={getBrowseUploadHref()}
                                className="text-medium font-bold text-tertiary1-800 hover:underline"
                            >
                                {getUploadName()}
                            </Link>
                        )}
                    </TableHead>
                    </TableRow>

                    {/* Field / Value header */}
                    <TableRow>
                    <TableHead
                        className="
                        h-6
                        px-4
                        py-0
                        border-y
                        border-neutral-300
                        bg-neutral-200
                        text-left
                        align-middle
                        font-medium
                        "
                    >
                        Field
                    </TableHead>

                    <TableHead
                        className="
                        h-6
                        px-4
                        py-0
                        border-y
                        border-neutral-300
                        bg-neutral-200
                        text-left
                        align-middle
                        font-medium
                        "
                    >
                        Value
                    </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {details.map(({ field, value }) => (
                    <TableRow key={field}>
                        <TableCell
                        className="
                            h-6
                            px-4
                            py-0
                            border-y
                            border-neutral-300
                            align-middle
                        "
                        >
                        {field}
                        </TableCell>

                        <TableCell
                        className="
                            h-6
                            px-4
                            py-0
                            border-y
                            border-neutral-300
                            align-middle
                            whitespace-pre-wrap
                            wrap-break-word
                        "
                        >
                        {typeof value === "string" || typeof value === "number"
                            ? formatValue(value)
                            : value}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>

            <div className="mt-3 text-sm text-gray-700">
                Showing 1 to {details.length} of{" "}
                {details.length} entries
            </div>
            </div>
        )}
    </div>
    );
};

export default JobDetailsClient;