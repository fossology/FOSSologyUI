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

import { useState } from "react";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";

import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

import {
  generateAndDownloadReport,
  pauseJob,
  cancelJob,
  resumeJob,
} from "@/services/jobs";


const statusCellStyle = {
  Completed: "bg-success-500 text-white",
  Started: "bg-info-500 text-white",
  Queued: "bg-yellow-500",
  Paused: "bg-warning-600 text-white",
  Failed: "bg-alert-500 text-white",
};


const statusRowStyle = {
  Completed: "bg-success-100",
  Started: "bg-info-100",
  Queued: "bg-yellow-100",
  Paused: "bg-warning-100",
  Failed: "bg-alert-100",
};

const REPORT_JOB_TYPES = new Set([
  "clixml",
  "cyclonedx",
  "readmeoss",
  "dep5",
  "decisionexporter",
  "spdx2",
  "spdx2tv",
  "spdx2csv",
  "spdx3",
  "spdx3json",
  "spdx3jsonld",
  "spdx3rdf",
  "spdx3tv",
  "unifiedreport",
]);


const JobsTable = ({
  jobs = [],
  refreshJobs,
  onMessage,
}) => {
  const [activeAction, setActiveAction] =
    useState(null);


  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return "";
    }

    const date = new Date(dateTime);

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

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };


  const formatEta = (eta) => {
    if (eta == null || eta <= 0) {
      return "";
    }

    const hrs = Math.floor(eta / 3600);

    const mins = Math.floor(
      (eta % 3600) / 60
    );

    const secs = eta % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };


  const getDisplayStatus = (status) => {
    if (status === "Processing") {
      return "Started";
    }

    if (
      status?.toLowerCase().startsWith(
        "killed by"
      )
    ) {
      return status;
    }

    return status;
  };


  const getStatusStyleKey = (status) => {
    if (status === "Processing") {
      return "Started";
    }

    if (
      status?.toLowerCase().startsWith(
        "killed by"
      )
    ) {
      return "Failed";
    }

    return status;
  };


  const getQueueEta = (queue) => {
    const status =
      getDisplayStatus(queue.status);

    switch (status) {
      case "Started":
        return formatEta(queue.eta);

      case "Completed":
        return "Scanned";

      case "Queued":
        return "";

      default:
        return "Scanned";
    }
  };


  const getHeaderEta = (job) => {
    const hasRunningJob =
      job.jobQueue?.some(
        (queue) =>
          getDisplayStatus(
            queue.status
          ) === "Started"
      );

    if (hasRunningJob) {
      return formatEta(job.eta);
    }

    return "Scanned";
  };

  const isDeletedUploadJob = (job) =>
    job.jobQueue?.some(
      (queue) =>
        String(queue.jobQueueType || "").toLowerCase() ===
        "delagent"
    );

  const getUploadDisplayName = (job) =>
    job.uploadName || job.name || "";


  const showMessage = (type, text) => {
    onMessage?.({
      type,
      text,
    });
  };


  const handleDownloadReport = async (job) => {
    const actionKey =
      `${job.id}-download`;

    try {
      setActiveAction(actionKey);

      if (!job.uploadId) {
        throw new Error(
          "Upload ID is missing"
        );
      }

      const file =
        await generateAndDownloadReport(
          Number(job.uploadId),
          "unifiedreport"
        );

      if (
        !(file?.blob instanceof Blob)
      ) {
        throw new Error(
          "Report download did not return a file"
        );
      }

      const url =
        window.URL.createObjectURL(
          file.blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        file.filename ||
        `report-${job.id}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Failed to download report:",
        error
      );

      showMessage(
        "error",
        error?.message ||
          "Failed to download report."
      );

    } finally {
      setActiveAction(null);
    }
  };


  const handlePause = async (queue) => {
    const actionKey =
      `${queue.jobQueueId}-pause`;

    try {
      setActiveAction(actionKey);

      await pauseJob(
        queue.jobQueueId
      );

      await refreshJobs?.();

      showMessage(
        "success",
        "Job paused successfully."
      );

    } catch (error) {
      console.error(
        "Failed to pause job:",
        error
      );

      showMessage(
        "error",
        error?.message ||
          "Failed to pause job."
      );

    } finally {
      setActiveAction(null);
    }
  };


  const handleCancel = async (
    queue,
    job
  ) => {
    const actionKey =
      `${queue.jobQueueId}-cancel`;

    try {
      setActiveAction(actionKey);

      await cancelJob(
        job.id,
        queue.jobQueueId
      );

      await refreshJobs?.();

      showMessage(
        "success",
        "Job cancelled successfully."
      );

    } catch (error) {
      console.error(
        "Failed to cancel job:",
        error
      );

      showMessage(
        "error",
        error?.message ||
          "Failed to cancel job."
      );

    } finally {
      setActiveAction(null);
    }
  };


  const handleResume = async (queue) => {
    const actionKey =
      `${queue.jobQueueId}-resume`;

    try {
      setActiveAction(actionKey);

      await resumeJob(
        queue.jobQueueId
      );

      await refreshJobs?.();

      showMessage(
        "success",
        "Job resume request sent successfully."
      );

    } catch (error) {
      console.error(
        "Failed to resume job:",
        error
      );

      showMessage(
        "error",
        error?.message ||
          "Failed to resume job."
      );

    } finally {
      setActiveAction(null);
    }
  };


  const renderJobAction = (
    queue,
    job
  ) => {
    const status =
      getDisplayStatus(queue.status);

    const normalizedStatus =
      status?.toLowerCase();

    const pauseAction =
      `${queue.jobQueueId}-pause`;

    const cancelAction =
      `${queue.jobQueueId}-cancel`;

    const resumeAction =
      `${queue.jobQueueId}-resume`;

    const downloadAction =
      `${job.id}-download`;


    const isPausing =
      activeAction === pauseAction;

    const isCanceling =
      activeAction === cancelAction;

    const isResuming =
      activeAction === resumeAction;

    const isDownloading =
      activeAction === downloadAction;


    const normalizedJobType =
      String(
        queue.jobQueueType || ""
      ).toLowerCase();

    const isReportJob =
      REPORT_JOB_TYPES.has(
        normalizedJobType
      );

    if (
      isReportJob &&
      (
        job.status === "Completed" ||
        normalizedStatus === "killed by user"
      )
    ) {
      return (
        <Button
          variant="link"
          className="w-[120px] p-0 no-underline hover:underline"
          disabled={isDownloading}
          onClick={() =>
            handleDownloadReport(job)
          }
        >
          {isDownloading
            ? "Downloading"
            : "Download Report"}
        </Button>
      );
    }


    if (
      status === "Started" ||
      status === "Queued"
    ) {
      return (
        <ButtonGroup className="w-[120px]">

          <Button
            variant="link"
            className="p-0 no-underline hover:underline"
            disabled={isPausing}
            onClick={() =>
              handlePause(queue)
            }
          >
            {isPausing
              ? "Pausing"
              : "Pause"}
          </Button>

          <ButtonGroupSeparator />

          <Button
            variant="link"
            className="p-0 no-underline hover:underline"
            disabled={isCanceling}
            onClick={() =>
              handleCancel(
                queue,
                job
              )
            }
          >
            {isCanceling
              ? "Canceling"
              : "Cancel"}
          </Button>

        </ButtonGroup>
      );
    }


    if (status === "Paused") {
      return (
        <ButtonGroup className="w-[120px]">

          <Button
            variant="link"
            className="p-0 no-underline hover:underline"
            disabled={isResuming}
            onClick={() =>
              handleResume(queue)
            }
          >
            {isResuming
              ? "Resuming"
              : "Resume"}
          </Button>

          <ButtonGroupSeparator />

          <Button
            variant="link"
            className="p-0 no-underline hover:underline"
            disabled={isCanceling}
            onClick={() =>
              handleCancel(
                queue,
                job
              )
            }
          >
            {isCanceling
              ? "Canceling"
              : "Cancel"}
          </Button>

        </ButtonGroup>
      );
    }

    return null;
  };


  const cellClass =
    "h-6 px-4 py-0 border-y border-neutral-300 align-middle";


  const topHeaderClass = `
    relative
    h-8
    min-w-[87px]
    px-4
    py-1
    border
    border-neutral-300
    bg-neutral-100
    align-middle
  `;


  const headerClass =
    `${cellClass} font-medium`;


  const subHeaderClass = `
    h-6
    px-4
    py-0
    border-y
    border-neutral-300
    bg-neutral-100
    text-center
    align-middle
  `;


  return (
    <div className="space-y-8">

      {jobs.map((job) => (

        <div
          key={job.id}
          className="
            overflow-x-auto
            border-neutral-400
          "
        >

          <Table className="min-w-[1302px] table-fixed">

            <colgroup>
              <col style={{ width: "197px" }} />
              <col style={{ width: "110px" }} />
              <col style={{ width: "154px" }} />
              <col style={{ width: "114px" }} />
              <col style={{ width: "250px" }} />
              <col style={{ width: "180px" }} />
              <col style={{ width: "110px" }} />
              <col style={{ width: "149px" }} />
            </colgroup>


            <TableHeader>

              <TableRow>

                <TableHead
                  colSpan={8}
                  className={topHeaderClass}
                >

                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                    "
                  >

                    {isDeletedUploadJob(job) ? (
                      <span className="font-bold">
                        {getUploadDisplayName(job)} (deleted)
                      </span>
                    ) : (
                      <Link
                        href={
                          job.uploadId
                            ? `${routes.browseUploads.more.fileBrowser}?upload=${job.uploadId}`
                            : "#"
                        }
                        className="text-medium font-bold text-tertiary1-800 hover:underline"
                      >
                        {getUploadDisplayName(job)}
                      </Link>
                    )}

                  </div>

                  <span
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      font-normal
                    "
                  >
                    ETA - {getHeaderEta(job)}
                  </span>

                </TableHead>

              </TableRow>


              <TableRow>

                <TableHead
                  colSpan={8}
                  className={cn(
                    subHeaderClass,
                    "font-medium"
                  )}
                >
                  {isDeletedUploadJob(job)
                    ? `${getUploadDisplayName(job)} (deleted)`
                    : getUploadDisplayName(job)}
                </TableHead>

              </TableRow>


              <TableRow>

                <TableHead className={headerClass}>
                  Job/Dependency
                </TableHead>

                <TableHead className={headerClass}>
                  Status
                </TableHead>

                <TableHead className={headerClass}>
                  Name of agents
                </TableHead>

                <TableHead className={headerClass}>
                  No. of items
                </TableHead>

                <TableHead
                  className={cn(
                    headerClass,
                    "whitespace-nowrap"
                  )}
                >
                  Start time-end time
                </TableHead>

                <TableHead className={headerClass}>
                  Average items/sec
                </TableHead>

                <TableHead className={headerClass}>
                  ETA
                </TableHead>

                <TableHead className={headerClass}>
                  Status
                </TableHead>

              </TableRow>

            </TableHeader>


            <TableBody>

              {job.jobQueue?.map((queue) => {
                const displayStatus =
                  getDisplayStatus(queue.status);

                const styleKey =
                  getStatusStyleKey(queue.status);

                return (
                  <TableRow
                    key={queue.jobQueueId}
                  >
                    <TableCell className={cellClass}>
                      {[
                        queue.jobQueueId,
                        ...(queue.dependencies ?? []),
                      ].map((queueId, index) => {
                        const jobDetailsHref =
                          `/jobs/${job.id}?queue=${queueId}`;

                        return (
                          <span
                            key={`${index}-${queueId}`}
                          >
                            {index > 0 && " / "}

                            <Link
                              href={jobDetailsHref}
                              className="
                                text-tertiary1-800
                                hover:underline
                              "
                            >
                              {queueId}
                            </Link>
                          </span>
                        );
                      })}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusCellStyle[styleKey]
                      )}
                    >
                      {displayStatus}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusRowStyle[styleKey]
                      )}
                    >
                      {queue.jobQueueType}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusRowStyle[styleKey]
                      )}
                    >
                      {queue.itemsProcessed}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusRowStyle[styleKey],
                        "whitespace-nowrap"
                      )}
                    >
                      {formatDateTime(
                        queue.startTime
                      )}

                      {" - "}

                      {queue.endTime
                        ? formatDateTime(
                            queue.endTime
                          )
                        : displayStatus}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusRowStyle[styleKey]
                      )}
                    >
                      {queue.itemsPerSec}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusRowStyle[styleKey]
                      )}
                    >
                      {getQueueEta(queue)}
                    </TableCell>


                    <TableCell
                      className={cn(
                        cellClass,
                        statusRowStyle[styleKey]
                      )}
                    >
                      {renderJobAction(
                        queue,
                        job
                      )}
                    </TableCell>

                  </TableRow>
                );
              })}

            </TableBody>

          </Table>

        </div>

      ))}

    </div>
  );
};


export default JobsTable;
