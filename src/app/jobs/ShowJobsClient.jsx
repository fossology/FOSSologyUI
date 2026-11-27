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

import {
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";

import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AlertBanner } from "@/components/ui/alert";

import {
  PaginationControl,
  Spinner,
} from "@/components/Widgets";

import JobsTable from "@/components/JobsTable";

import {
  getAllJob,
  getAllAdminJob,
  downloadReport,
} from "@/services/jobs";

import { getLocalStorage } from "@/shared/storageHelper";


const entriesOptions = [
  10,
  25,
  50,
  100,
];


const REPORT_LABELS = {
  clixml: "CLIXML",
  cyclonedx: "CycloneDX",
  readmeoss: "ReadME_OSS",
  dep5: "DEP5",
  decisionexporter: "Decision Exporter",
  spdx2: "SPDX2",
  spdx2tv: "SPDX2 Tag/Value",
  spdx2csv: "SPDX2 CSV",
  spdx3: "SPDX3",
  spdx3json: "SPDX3 JSON",
  spdx3jsonld: "SPDX3 JSON-LD",
  spdx3rdf: "SPDX3 RDF",
  spdx3tv: "SPDX3 Tag/Value",
  unifiedreport: "Unified Report",
};


const getReportDisplayName = (format) =>
  REPORT_LABELS[
    String(format || "").toLowerCase()
  ] ||
  format ||
  "Report";

const AUTO_DOWNLOADED_REPORTS_COOKIE =
  "fossologyAutoDownloadedReports";

const rememberAutoDownloadedReport = (reportId) => {
  const cookie = document.cookie
    .split("; ")
    .find((entry) =>
      entry.startsWith(
        `${AUTO_DOWNLOADED_REPORTS_COOKIE}=`
      )
    );
  const reportIds = new Set(
    cookie
      ? decodeURIComponent(cookie.split("=")[1])
          .split(",")
          .filter(Boolean)
      : []
  );

  reportIds.add(String(reportId));
  document.cookie = `${AUTO_DOWNLOADED_REPORTS_COOKIE}=${encodeURIComponent(
    [...reportIds].join(",")
  )}; path=/; SameSite=Lax`;
};


const ShowJobsClient = ({ autoDownloadedReportIds = [] }) => {

  const searchParams =
    useSearchParams();

  const scope =
    searchParams.get("scope") === "all"
      ? "all"
      : "my";

  const uploadIdsParam =
    searchParams.get("uploads") ||
    searchParams.get("upload") ||
    "";


  const reportIdsParam =
    searchParams.get("reports") ||
    "";


  const reportFormat =
    searchParams.get("reportFormat") ||
    "";

  const reportFormatsParam =
    searchParams.get("reportFormats") ||
    "";

  const reportFormats = useMemo(
    () =>
      reportFormatsParam
        .split(",")
        .map((format) => format.trim())
        .filter(Boolean),
    [reportFormatsParam]
  );

  const getReportFormat = (index) => {
    if (reportFormats.length > 0) {
      return reportFormats[index] || "";
    }

    return reportFormat;
  };

  const getUploadId = (index) => {
    if (reportFormats.length > 0) {
      return uploadIds[0] || "";
    }

    return uploadIds[index] || "";
  };

  const getUploadName = (index) => {
    if (reportFormats.length > 0) {
      return uploadNames[0] || "report";
    }

    return uploadNames[index] || "report";
  };

  const uploadNamesParam =
    searchParams.get("uploadNames") ||
    "";

  const jobQueueIdsParam =
    searchParams.get("jobQueueIds") ||
    "";

  const jobQueueIds = useMemo(
    () =>
      jobQueueIdsParam
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    [jobQueueIdsParam]
  );


  const uploadIds = useMemo(
    () =>
      uploadIdsParam
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    [uploadIdsParam]
  );


  const reportIds = useMemo(
    () =>
      reportIdsParam
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    [reportIdsParam]
  );

  const uploadNames = useMemo(
    () =>
      uploadNamesParam
        .split(",")
        .map((name) =>
          decodeURIComponent(name)
        )
        .filter(Boolean),
    [uploadNamesParam]
  );


  const [jobs, setJobs] =
    useState([]);


  const [currentGroup, setCurrentGroup] =
    useState(
      getLocalStorage("currentGroup")
    );


  const [loading, setLoading] =
    useState(true);


  const [showMessage, setShowMessage] =
    useState(false);


  const [message, setMessage] =
    useState({
      type: "",
      text: "",
    });


  const [search, setSearch] =
    useState("");


  const [limit, setLimit] =
    useState("10");


  const [currentPage, setCurrentPage] =
    useState(1);


  const [trackedReports, setTrackedReports] =
    useState({});


  const downloadedReportIds =
    useRef(new Set(autoDownloadedReportIds));


  const downloadAttemptedReportIds =
    useRef(new Set());


  const dismissedReportIds =
    useRef(new Set());

  const getReportFilename = (
    reportFormat,
    uploadName
  ) => {
    const normalizedFormat =
      String(reportFormat || "").toLowerCase();

    const normalizedUploadName =
      uploadName || "report";

    switch (normalizedFormat) {
      case "clixml":
        return `CLIXML_${normalizedUploadName}.xml`;

      case "cyclonedx":
        return `CYCLONEDX_JSON_${normalizedUploadName}.json`;

      case "spdx2csv":
        return `SPDX2CSV_${normalizedUploadName}.csv`;

      case "dep5":
        return `DEP5_${normalizedUploadName}.txt`;

      case "decisionexporter":
        return `FOSSology_Decisions_${normalizedUploadName}_${new Date()
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(",", "")
          .replace(/\//g, "_")
          .replace(/:/g, "_")
          .replace(/ /g, "_")}.json`;

      case "readmeoss":
        return `ReadME_OSS_${normalizedUploadName}.txt`;

      case "spdx2":
        return `SPDX2_${normalizedUploadName}.spdx.rdf`;

      case "spdx2tv":
        return `SPDX2TV_${normalizedUploadName}.spdx`;

      case "spdx3json":
      case "spdx3":
        return `SPDX3JSON_${normalizedUploadName}.json`;

      case "spdx3jsonld":
        return `SPDX3JSONLD_${normalizedUploadName}.jsonld`;

      case "spdx3rdf":
        return `SPDX3RDF_${normalizedUploadName}.spdx.rdf`;

      case "spdx3tv":
        return `SPDX3TV_${normalizedUploadName}.spdx`;

      case "unifiedreport":
        return `Clearing_Report_${normalizedUploadName}.docx`;

      default:
        return `${getReportDisplayName(
          reportFormat
        )}_${normalizedUploadName}`;
    }
  };


  useEffect(() => {

    const handleGroupChanged = (event) => {

      const groupName =
        event.detail?.groupName;

      if (groupName) {
        setCurrentGroup(groupName);
      }
    };


    window.addEventListener(
      "groupChanged",
      handleGroupChanged
    );


    return () => {
      window.removeEventListener(
        "groupChanged",
        handleGroupChanged
      );
    };

  }, []);


  useEffect(() => {
    if (reportIds.length === 0) {
      setTrackedReports({});
      return;
    }

    const initialReports = {};

    reportIds.forEach(
      (reportId, index) => {
        initialReports[reportId] = {
          status: "Scheduled",
          job: null,
          jobQueueId:
            jobQueueIds[index] || null,
        };
      }
    );

    setTrackedReports(
      initialReports
    );

    downloadedReportIds.current = new Set(
      autoDownloadedReportIds
    );
    downloadAttemptedReportIds.current.clear();
    dismissedReportIds.current.clear();
  }, [
    reportIdsParam,
    jobQueueIdsParam,
    reportFormatsParam,
    autoDownloadedReportIds,
  ]);


  const filteredJobs = useMemo(() => {

    const searchValue =
      search.trim().toLowerCase();


    const sortedJobs =
      [...jobs].sort(
        (a, b) => b.id - a.id
      );


    if (!searchValue) {
      return sortedJobs;
    }


    return sortedJobs.filter((job) => {

      return (
        job.name
          ?.toLowerCase()
          .includes(searchValue) ||

        String(job.id)
          .includes(searchValue) ||

        job.status
          ?.toLowerCase()
          .includes(searchValue)
      );

    });

  }, [
    jobs,
    search,
  ]);


  const totalEntries =
    filteredJobs.length;


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

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

  }, [
    currentPage,
    totalPages,
  ]);


  const startIndex =
    (currentPage - 1) *
    entriesPerPage;


  const endIndex =
    Math.min(
      startIndex +
        entriesPerPage,
      totalEntries
    );


  const displayedJobs =
    filteredJobs.slice(
      startIndex,
      endIndex
    );


  const getReportQueue = (
    job,
    reportFormat
  ) => {
    if (!job?.jobQueue) {
      return null;
    }

    const normalizedFormat =
      String(reportFormat || "").toLowerCase();

    return (
      job.jobQueue.find((item) => {
        const queueType =
          String(
            item?.jobQueueType || ""
          ).toLowerCase();

        if (
          normalizedFormat === "spdx3"
        ) {
          return (
            queueType === "spdx3" ||
            queueType === "spdx3json"
          );
        }

        return (
          queueType === normalizedFormat
        );
      }) || null
    );
  };


  const getReportStatus = (
    job,
    reportFormat
  ) => {
    if (!job) {
      return "";
    }

    const queue =
      getReportQueue(
        job,
        reportFormat
      );

    return (
      queue?.status ||
      job.status ||
      ""
    );
  };

  const findReportJob = (
    uploadJobs,
    uploadId,
    reportFormat
  ) => {
    const normalizedUploadId =
      String(uploadId);

    const normalizedFormat =
      String(reportFormat || "")
        .toLowerCase();

    return [...uploadJobs]
      .sort(
        (a, b) =>
          Number(b.id || 0) -
          Number(a.id || 0)
      )
      .find((job) => {

        if (
          String(job.uploadId) !==
          normalizedUploadId
        ) {
          return false;
        }

        return job.jobQueue?.some(
          (queue) => {

            const queueType =
              String(
                queue?.jobQueueType || ""
              ).toLowerCase();

            if (
              normalizedFormat ===
              "spdx3"
            ) {
              return (
                queueType ===
                  "spdx3" ||
                queueType ===
                  "spdx3json"
              );
            }

            return (
              queueType ===
              normalizedFormat
            );
          }
        );
      });
  };

  const getJobQueueId = (
    job,
    reportFormat
  ) => {
    if (!job?.jobQueue) {
      return null;
    }

    const normalizedFormat =
      String(reportFormat || "").toLowerCase();

    const queue =
      job.jobQueue.find((item) => {
        const queueType =
          String(
            item?.jobQueueType || ""
          ).toLowerCase();

        if (
          normalizedFormat === "spdx3"
        ) {
          return (
            queueType === "spdx3" ||
            queueType === "spdx3json"
          );
        }

        return (
          queueType === normalizedFormat
        );
      }) ||
      job.jobQueue[0];

    return queue?.jobQueueId ?? null;
  };


  const isFailedReport = (
    job,
    reportFormat
  ) => {
    const status =
      getReportStatus(
        job,
        reportFormat
      ).toLowerCase();


    return (
      status.includes("failed") ||
      status.includes("error") ||
      status.includes("killed")
    );
  };


  const isCompletedReport = (
    job,
    reportFormat
  ) => {
    if (!job) {
      return false;
    }

    const queue =
      getReportQueue(
        job,
        reportFormat
      );

    const status =
      getReportStatus(
        job,
        reportFormat
      ).toLowerCase();

    return (
      status === "completed" ||
      queue?.isReady === true
    );
  };


  const getReportDownloadLink = (
    job,
    reportId,
    reportFormat
  ) => {
    if (!job?.jobQueue) {
      return null;
    }

    const normalizedReportId =
      String(reportId);

    const normalizedFormat =
      String(reportFormat || "")
        .toLowerCase();

    const matchingFormatQueue =
      job.jobQueue.find((item) => {
        const queueType =
          String(
            item?.jobQueueType || ""
          ).toLowerCase();

        if (
          normalizedFormat === "spdx3"
        ) {
          return (
            queueType === "spdx3" ||
            queueType === "spdx3json"
          );
        }

        return (
          queueType === normalizedFormat
        );
      });

    if (
      matchingFormatQueue?.download?.link ||
      matchingFormatQueue?.link
    ) {
      return (
        matchingFormatQueue?.download?.link ||
        matchingFormatQueue?.link ||
        null
      );
    }

    const matchingReportQueue =
      job.jobQueue.find((item) => {
        const link =
          item?.download?.link ||
          item?.link ||
          "";

        return link.endsWith(
          `/${normalizedReportId}`
        );
      });

    if (matchingReportQueue) {
      return (
        matchingReportQueue?.download?.link ||
        matchingReportQueue?.link ||
        null
      );
    }

    return null;
  };


  const downloadCompletedReport = async (
    reportId,
    job,
    reportFormat
  ) => {

    const normalizedReportId =
      String(reportId);


    if (
      downloadedReportIds.current.has(
        normalizedReportId
      ) ||
      downloadAttemptedReportIds.current.has(
        normalizedReportId
      )
    ) {
      return;
    }


  const downloadLink =
    getReportDownloadLink(
      job,
      normalizedReportId,
      reportFormat
    );


    if (!downloadLink) {
      return;
    }


    downloadAttemptedReportIds.current.add(
      normalizedReportId
    );


    try {

      const response =
        await downloadReport(
          downloadLink
        );


      const blob =
        response instanceof Blob
          ? response
          : response?.blob;


      if (!(blob instanceof Blob)) {
        throw new Error(
          "Invalid report file response."
        );
      }


      const reportIndex =
        reportIds.indexOf(
          normalizedReportId
        );

      const uploadName =
        getUploadName(reportIndex);

      const filename =
        getReportFilename(
          reportFormat,
          uploadName
        );


      const objectUrl =
        window.URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = objectUrl;
      link.download = filename;


      document.body.appendChild(link);
      link.click();
      link.remove();


      window.URL.revokeObjectURL(
        objectUrl
      );


      downloadedReportIds.current.add(
        normalizedReportId
      );

      rememberAutoDownloadedReport(
        normalizedReportId
      );

    } catch (error) {

      downloadAttemptedReportIds.current.delete(
        normalizedReportId
      );


      console.error(
        "Failed to download report:",
        error
      );


      setMessage({
        type: "error",
        text:
          `Failed to download ${getReportDisplayName(
            reportFormat
          )} report for job #${reportId}.`,
      });


      setShowMessage(true);
    }
  };


  const handleManualReportDownload = async (
    reportId,
    job,
    reportFormat
  ) => {

    const downloadLink =
      getReportDownloadLink(
        job,
        reportId,
        reportFormat
      );


    if (!downloadLink) {
      setMessage({
        type: "error",
        text:
          `Download link is not available for job #${reportId}.`,
      });

      setShowMessage(true);

      return;
    }


    try {

      const response =
        await downloadReport(
          downloadLink
        );


      const blob =
        response instanceof Blob
          ? response
          : response?.blob;


      if (!(blob instanceof Blob)) {
        throw new Error(
          "Invalid report file response."
        );
      }


      const reportIndex =
        reportIds.indexOf(
          String(reportId)
        );

      const uploadName =
        getUploadName(reportIndex);

      const filename =
        getReportFilename(
          reportFormat,
          uploadName
        );


      const objectUrl =
        window.URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = objectUrl;
      link.download = filename;


      document.body.appendChild(link);
      link.click();
      link.remove();


      window.URL.revokeObjectURL(
        objectUrl
      );

    } catch (error) {

      console.error(
        "Failed to download report:",
        error
      );


      setMessage({
        type: "error",
        text:
          `Failed to download ${getReportDisplayName(
            reportFormat
          )} report for job #${reportId}.`,
      });


      setShowMessage(true);
    }
  };


  const loadJobs = async () => {

    if (scope === "all") {
      const response = await getAllAdminJob({
        groupName: currentGroup,
      });
      const allJobs = response.res || [];

      const groupJobs = currentGroup
        ? allJobs.filter(
            (job) => job.groupName === currentGroup
          )
        : allJobs;

      setJobs(groupJobs);

      return groupJobs;
    }

    if (!currentGroup) {
      setJobs([]);
      return [];
    }


    const response =
      await getAllJob({
        groupName: currentGroup,
      });


    const allJobs =
      response.res || [];

    const groupJobs = allJobs.filter(
      (job) => job.groupName === currentGroup
    );


    if (uploadIds.length === 0) {
      setJobs(groupJobs);
      return groupJobs;
    }


    const uploadJobs =
      groupJobs.filter(
        (job) =>
          uploadIds.includes(
            String(job.uploadId)
          )
      );


    setJobs(uploadJobs);


    return uploadJobs;
  };


  const updateTrackedReports = (
    uploadJobs
  ) => {
    if (reportIds.length === 0) {
      return;
    }

    setTrackedReports(
      (previousReports) => {
        const nextReports = {
          ...previousReports,
        };

        reportIds.forEach(
          (reportId, index) => {

            const uploadId =
              getUploadId(index);

            const currentReportFormat =
              getReportFormat(index);

            const reportJob =
              findReportJob(
                uploadJobs,
                uploadId,
                currentReportFormat
              );

            if (!reportJob) {
              return;
            }

            nextReports[reportId] = {
              status:
                getReportStatus(
                  reportJob,
                  currentReportFormat
                ),
              job: reportJob,
              jobQueueId:
                getJobQueueId(
                  reportJob,
                  currentReportFormat
                ) ??
                previousReports[
                  reportId
                ]?.jobQueueId ??
                null,
            };
          }
        );

        return nextReports;
      }
    );
  };


  const processCompletedReports = (
    uploadJobs
  ) => {
    reportIds.forEach(
      (reportId, index) => {

        const uploadId =
          getUploadId(index);

        const currentReportFormat =
          getReportFormat(index);

        const reportJob =
          findReportJob(
            uploadJobs,
            uploadId,
            currentReportFormat
          );

        if (
          !reportJob ||
          !isCompletedReport(
            reportJob,
            currentReportFormat
          )
        ) {
          return;
        }

        downloadCompletedReport(
          reportId,
          reportJob,
          currentReportFormat
        );
      }
    );
  };


  const refreshJobs = async () => {

    try {

      await loadJobs();

    } catch (error) {

      console.error(
        "Failed to refresh jobs:",
        error
      );


      setJobs([]);


      throw error;
    }
  };


  useEffect(() => {

    let intervalId = null;
    let cancelled = false;


    const fetchJobs = async () => {

      if (
        scope !== "all" &&
        !currentGroup
      ) {

        setJobs([]);
        setLoading(false);

        return;
      }


      try {

        setLoading(true);


        const uploadJobs =
          await loadJobs();


        if (cancelled) {
          return;
        }


        if (uploadIds.length > 0) {
          updateTrackedReports(
            uploadJobs
          );


          processCompletedReports(
            uploadJobs
          );
        }


        setCurrentPage(1);

      } catch (error) {

        if (cancelled) {
          return;
        }


        console.error(
          "Failed to fetch jobs:",
          error
        );


        setJobs([]);


        setMessage({
          type: "error",
          text:
            error?.message ||
            "Failed to fetch jobs.",
        });


        setShowMessage(true);

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }

    };


    const pollJobs = async () => {

      if (cancelled) {
        return;
      }


      try {

        const uploadJobs =
          await loadJobs();


        if (cancelled) {
          return;
        }


        updateTrackedReports(
          uploadJobs
        );


        processCompletedReports(
          uploadJobs
        );


        const allReportsFinished =
          reportIds.every(
            (reportId, index) => {

              const uploadId =
                getUploadId(index);

              const currentReportFormat =
                getReportFormat(index);

              const reportJob =
                findReportJob(
                  uploadJobs,
                  uploadId,
                  currentReportFormat
                );

              if (!reportJob) {
                return false;
              }

              return (
                isCompletedReport(
                  reportJob,
                  currentReportFormat
                ) ||
                isFailedReport(
                  reportJob,
                  currentReportFormat
                )
              );
            }
          );


        if (
          allReportsFinished &&
          intervalId
        ) {

          clearInterval(intervalId);
          intervalId = null;

        }

      } catch (error) {

        console.error(
          "Failed to poll report jobs:",
          error
        );

      }

    };


    fetchJobs();


    if (
      scope !== "all" &&
      currentGroup &&
      uploadIds.length > 0 &&
      reportIds.length > 0
    ) {

      intervalId =
        setInterval(
          pollJobs,
          2000
        );

    }


    return () => {

      cancelled = true;


      if (intervalId) {
        clearInterval(intervalId);
      }

    };

  }, [
    scope,
    currentGroup,
    uploadIdsParam,
    reportIdsParam,
  ]);

  const reportAlerts = useMemo(() => {

    const alerts = reportIds
      .map((reportId, index) => {

        const uploadId =
          getUploadId(index);

        const currentReportFormat =
          getReportFormat(index);

        const reportJob =
          findReportJob(
            jobs,
            uploadId,
            currentReportFormat
          ) ||
          trackedReports[
            reportId
          ]?.job;

        const reportName =
          getReportDisplayName(
            currentReportFormat
          );

        if (!reportJob) {

          const trackedJobQueueId =
            trackedReports[
              reportId
            ]?.jobQueueId;

          return {
            id: reportId,
            type: "scheduled",
            jobQueueId:
              trackedJobQueueId,
            message: `${reportName} generation scheduled`,
          };
        }

        const jobQueueId =
          getJobQueueId(
            reportJob,
            currentReportFormat
          )??
          trackedReports[
            reportId
          ]?.jobQueueId ??
          null;

        if (
          isFailedReport(
            reportJob,
            currentReportFormat
          )
        ) {
          return {
            id: reportId,
            type: "error",
            message:
              jobQueueId != null
                ? `${reportName} generation failed: job #${jobQueueId}`
                : `${reportName} generation failed`,
          };
        }

        if (
          isCompletedReport(
            reportJob,
            currentReportFormat
          )
        ) {

          const downloadLink =
            getReportDownloadLink(
              reportJob,
              reportId,
              currentReportFormat
            );

          return {
            id: reportId,
            type: "completed",
            message:
              `Download ${reportName} report`,
            downloadLink,
            job: reportJob,
            reportFormat: currentReportFormat,
          };
        }

        return {
          id: reportId,
          type: "scheduled",
          jobQueueId,
          message:
            `${reportName} generation scheduled`,
        };
      })
      .filter(
        (reportAlert) =>
          !dismissedReportIds.current.has(
            String(reportAlert.id)
          ) &&
          !autoDownloadedReportIds.includes(
            String(reportAlert.id)
          )
      );

    const scheduledAlerts =
      alerts.filter(
        (alert) =>
          alert.type === "scheduled"
      );

    const completedAlerts =
      alerts.filter(
        (alert) =>
          alert.type === "completed"
      );

    const failedAlerts =
      alerts.filter(
        (alert) =>
          alert.type === "error"
      );

    const combinedAlerts = [];

    if (
      scheduledAlerts.length > 0
    ) {

      const scheduledJobIds =
        scheduledAlerts
          .map(
            (alert) =>
              alert.jobQueueId
          )
          .filter(
            (jobQueueId) =>
              jobQueueId != null
          );

      combinedAlerts.push({
        id: "scheduled-reports",
        type: "scheduled",
        message:
          scheduledJobIds.length > 0
            ? `${
                reportFormats.length > 0
                  ? "Report"
                  : getReportDisplayName(
                      reportFormat
                    )
              } generation scheduled ${scheduledJobIds
                .map(
                  (jobQueueId) =>
                    `#${jobQueueId}`
                )
                .join(", ")}`
            : `${
                reportFormats.length > 0
                  ? "Report"
                  : getReportDisplayName(
                      reportFormat
                    )
              } generation scheduled`,
        reportIds:
          scheduledAlerts.map(
            (alert) =>
              alert.id
          ),
      });
    }

    if (
      completedAlerts.length > 0
    ) {

      combinedAlerts.push({
        id: "completed-reports",
        type: "completed",
        reports:
          completedAlerts.map(
            (alert) => ({
              id: alert.id,
              job: alert.job,
              downloadLink:
                alert.downloadLink,
              label:
                getReportDisplayName(
                  alert.reportFormat
                ),
              reportFormat:
                alert.reportFormat,
            })
          ),
      });
    }

    return [
      ...combinedAlerts,
      ...failedAlerts,
    ];

  }, [
    reportIds,
    uploadIds,
    reportFormat,
    reportFormatsParam,
    jobs,
    trackedReports,
    autoDownloadedReportIds,
  ]);


  return (
    <div className="mx-5 px-4 py-8 space-y-8">

      {/* Heading */}

      <h1 className="text-2xl font-bold text-foreground">
        Show Jobs
      </h1>


      {/* Report status */}

      {reportAlerts.map(
        (reportAlert) => (

          <div
            key={reportAlert.id}
            className="mb-4"
          >

            <AlertBanner
              type={
                reportAlert.type ===
                "error"
                  ? "Error"
                  : "Success"
              }

              title={
                reportAlert.type ===
                "error"
                  ? "Error"
                  : "Success"
              }

              description={
                reportAlert.type ===
                "completed" ? (

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">

                    <span>
                      Download Report for
                    </span>

                    {reportAlert.reports.map(
                      (report, index) => (

                        <span
                          key={report.id}
                          className="inline-flex items-center"
                        >

                          {index > 0 && (
                            <span className="mr-2">
                              ,
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleManualReportDownload(
                                report.id,
                                report.job,
                                report.reportFormat
                              )
                            }
                            className="hover:underline"
                          >
                            {report.label}
                          </button>

                        </span>

                      )
                    )}

                  </div>

                ) : (

                  reportAlert.message

                )
              }

              showClose

              onClose={() => {

                if (
                  reportAlert.type ===
                  "scheduled"
                ) {

                  reportAlert.reportIds.forEach(
                    (reportId) => {

                      dismissedReportIds.current.add(
                        String(reportId)
                      );

                    }
                  );

                  setTrackedReports(
                    (previousReports) => {

                      const nextReports = {
                        ...previousReports,
                      };

                      reportAlert.reportIds.forEach(
                        (reportId) => {

                          delete nextReports[
                            reportId
                          ];

                        }
                      );

                      return nextReports;
                    }
                  );

                  return;
                }

                if (
                  reportAlert.type ===
                  "completed"
                ) {

                  reportAlert.reports.forEach(
                    (report) => {

                      dismissedReportIds.current.add(
                        String(report.id)
                      );

                    }
                  );

                  setTrackedReports(
                    (previousReports) => {

                      const nextReports = {
                        ...previousReports,
                      };

                      reportAlert.reports.forEach(
                        (report) => {

                          delete nextReports[
                            report.id
                          ];

                        }
                      );

                      return nextReports;
                    }
                  );

                  return;
                }

                dismissedReportIds.current.add(
                  String(reportAlert.id)
                );

                setTrackedReports(
                  (previousReports) => {

                    const nextReports = {
                      ...previousReports,
                    };

                    delete nextReports[
                      reportAlert.id
                    ];

                    return nextReports;
                  }
                );
              }}

            />

          </div>

        )
      )}


      {/* General message */}

      {showMessage &&
        message && (

          <div className="mb-4">

            <AlertBanner
              type={
                message.type ===
                "success"
                  ? "Success"
                  : "Error"
              }

              title={
                message.type ===
                "success"
                  ? "Success"
                  : "Error"
              }

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

        )
      }


      {/* Toolbar */}

      <div className="flex items-center justify-between">

        {/* Search */}

        <div className="relative w-[320px]">

          <img
            src="/assets/icons/Search_20px.svg"
            alt=""
            width={20}
            height={20}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              opacity-60
            "
          />


          <Input
            placeholder="Search jobs"
            value={search}
            onChange={(event) => {

              setSearch(
                event.target.value
              );

              setCurrentPage(1);

            }}
            className="h-10 pl-10"
          />

        </div>


        {/* Show jobs */}

        <div className="flex items-center gap-2 text-sm">

          <span>
            Show
          </span>


          <Select
            value={limit}
            onValueChange={(value) => {

              setLimit(value);

              setCurrentPage(1);

            }}
          >

            <SelectTrigger className="h-8 w-[80px]">

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              {entriesOptions.map(
                (entry) => (

                  <SelectItem
                    key={entry}
                    value={String(entry)}
                  >
                    {entry}
                  </SelectItem>

                )
              )}

            </SelectContent>

          </Select>


          <span>
            jobs
          </span>

        </div>

      </div>


      {/* Jobs Table */}

      {loading ? (

        <div className="flex justify-center py-12">

          <Spinner />

        </div>

      ) : (

        <JobsTable
          jobs={displayedJobs}
          refreshJobs={refreshJobs}
          onMessage={(
            newMessage
          ) => {

            setMessage(
              newMessage
            );

            setShowMessage(
              true
            );

          }}
        />

      )}


      {/* Pagination */}

      <PaginationControl
        totalPages={totalPages}
        currentPage={currentPage}
        siblingCount={2}
        onPageChange={
          setCurrentPage
        }
      />

    </div>
  );
};


export default ShowJobsClient;
