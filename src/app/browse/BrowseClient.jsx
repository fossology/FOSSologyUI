/*
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

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

// Constants
import routes from "@/constants/routes";
import messages from "@/constants/messages";
import {
  statusOptions,
  entriesOptions,
  assigneeFilterOptions,
  actionsOptions,
  exportOptions,
  initialMessage,
} from "@/constants/constants";

// Components
import FolderNavigation from "@/components/FolderNavigation";
import { AlertBanner } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getGroupMembers } from "@/services/groups";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

import Modal from "@/components/Widgets/Modal";

// Services
import getBrowseData from "@/services/browse";
import {
  scheduleReport,
  downloadReport,
  getAllJob,
} from "@/services/jobs";
import {
  getUploadFileById,
  updateUploadById,
} from "@/services/upload";
import { deleteUploadsbyId } from "@/services/organizeUploads";
import { getLocalStorage } from "@/shared/storageHelper";

// Helpers
import { handleError } from "@/shared/helper";

const TABLE_COLUMN_WIDTHS = {
  open: {
    upload: "197px",
    action: "171px",
    status: "147px",
    comment: "87px",
    licenses: "90px",
    date: "116px",
    assigned: "162px",
  },
  collapsed: {
    upload: "220px",
    action: "242px",
    status: "161px",
    comment: "140px",
    licenses: "110px",
    date: "186px",
    assigned: "242px",
  },
};

const INITIAL_BROWSE_DATA = {
  folderId: 1,
  page: 1,
  limit: 10,
  recursive: false,
  status: "",
  assignee: "",
};

const REPORT_BUTTONS = [
  {
    label: "CLIXML generation",
    value: "clixml",
  },
  {
    label: "CycloneDX generation",
    value: "cyclonedx",
  },
  {
    label: "ReadME_OSS generation",
    value: "readmeoss",
  },
  {
    label: "SPDX2 generation",
    value: "spdx2",
  },
  {
    label: "SPDX3 generation",
    value: "spdx3json",
  },
];

const getActionRoute = (action, uploadId) => {
  switch (action) {
    case "fileBrowser":
      return `${routes.browseUploads.more.fileBrowser}?upload=${uploadId}`;

    case "view":
      return `${routes.browseUploads.more.view}?upload=${uploadId}`;

    case "conf":
      return `${routes.browseUploads.conf}?upload=${uploadId}`;

    case "info":
      return `${routes.browseUploads.more.info}?upload=${uploadId}`;

    case "compare":
      return `${routes.browseUploads.more.fileBrowser}?upload=${uploadId}&action=compare`;

    case "reuseCompare":
      return `${routes.browseUploads.more.fileBrowser}?upload=${uploadId}&action=reuseCompare`;

    case "copyrightEmailUrl":
      return `${routes.browseUploads.copyright}?upload=${uploadId}`;

    case "licenses":
      return `${routes.browseUploads.more.licenses}?upload=${uploadId}`;

    case "tag":
      return `${routes.browseUploads.tag}?upload=${uploadId}`;

    case "history":
      return `${routes.jobs.showJobs}?upload=${uploadId}`
;

    default:
      return null;
  }
};

const getOptionValue = (option, index) => {
  if (typeof option === "string") {
    return option;
  }

  return String(
    option?.value ??
      option?.reportFormat ??
      option?.id ??
      option?.entry ??
      option?.name ??
      index
  );
};

const getOptionLabel = (option) => {
  if (typeof option === "string") {
    return option;
  }

  return (
    option?.name ??
    option?.entry ??
    option?.value ??
    option?.reportFormat ??
    ""
  );
};

const padNumber = (value) => String(value).padStart(2, "0");

const formatUploadDate = (uploadDate) => {
  if (!uploadDate) {
    return "-";
  }

  const date = new Date(uploadDate);

  if (Number.isNaN(date.getTime())) {
    return uploadDate;
  }

  return `${date.getFullYear()}-${padNumber(
    date.getMonth() + 1
  )}-${padNumber(date.getDate())} ${padNumber(
    date.getHours()
  )}:${padNumber(date.getMinutes())}:${padNumber(
    date.getSeconds()
  )}`;
};

const getReportFilename = (
  reportFormat,
  uploadName = "report"
) => {
  const normalizedFormat =
    String(reportFormat || "").toLowerCase();

  switch (normalizedFormat) {
    case "clixml":
      return `CLIXML_${uploadName}.xml`;

    case "cyclonedx":
      return `CYCLONEDX_JSON_${uploadName}.json`;

    case "readmeoss":
      return `ReadMe_OSS_${uploadName}.txt`;

    case "spdx2":
      return `SPDX2_${uploadName}.rdf`;

    case "spdx3json":
      return `SPDX3_${uploadName}.json`;

    default:
      return `${uploadName}`;
  }
};

const getStatusValue = (status) => {
  if (!status) {
    return "";
  }

  const normalizedStatus = String(status)
    .trim()
    .toLowerCase();

  const statusValues = {
    open: "Open",
    "in progress": "InProgress",
    inprogress: "InProgress",
    closed: "Closed",
    rejected: "Rejected",
  };

  return statusValues[normalizedStatus] || "";
};

const getAssigneeLabel = (user, currentUserId) => {
  if (!user) {
    return "";
  }

  if (
    currentUserId !== null &&
    Number(user.id) === Number(currentUserId)
  ) {
    return "— Me —";
  }

  return user.name || user.username || "";
};

const BrowseClient = () => {
  const router = useRouter();

  const [browseData, setBrowseData] =
    useState(INITIAL_BROWSE_DATA);

  const [
    browseDataList,
    setBrowseDataList,
  ] = useState([]);

  const [totalPages, setTotalPages] = useState(1);

  const [message, setMessage] = useState(initialMessage);

  const [
    showMessage,
    setShowMessage,
  ] = useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedUploads, setSelectedUploads] = useState([]);

  const currentUser = getLocalStorage("user");
  const currentUserId = currentUser?.id ?? currentUser?.userId;
  const currentGroup = getLocalStorage("currentGroup");

  const [users, setUsers] = useState([]);
  const [canEditAssignee, setCanEditAssignee] = useState(false);

  useEffect(() => {
    if (!currentGroup || currentUserId == null) {
      setUsers([]);
      setCanEditAssignee(false);
      return;
    }

    getGroupMembers(currentGroup)
      .then((members) => {
        const groupMembers = Array.isArray(members) ? members : [];
        const currentMember = groupMembers.find(
          (member) =>
            Number(member?.user?.id) === Number(currentUserId)
        );
        const permission = Number(currentMember?.groupPerm);

        setUsers(
          groupMembers
            .map((member) => member?.user)
            .filter(Boolean)
        );
        setCanEditAssignee(permission === 1 || permission === 2);
      })
      .catch(() => {
        setUsers([]);
        setCanEditAssignee(false);
      });
  }, [currentGroup, currentUserId]);

  const [isUpdatingAssignee, setIsUpdatingAssignee] =
    useState(null);

  const [isCommentModalOpen, setIsCommentModalOpen] =
    useState(false);

  const [comment, setComment] = useState("");

  const [selectedCommentUpload, setSelectedCommentUpload] =
    useState(null);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedDeleteUpload,
    setSelectedDeleteUpload,
  ] = useState(null);

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const [
    isFolderNavigationCollapsed,
    setIsFolderNavigationCollapsed,
  ] = useState(false);

  const [
    pendingStatusChange,
    setPendingStatusChange,
  ] = useState(null);

  const [
    isExportSheetOpen,
    setIsExportSheetOpen,
  ] = useState(false);

  const [
    selectedExportOptions,
    setSelectedExportOptions,
  ] = useState([]);

  const [
    selectedExportUploadId,
    setSelectedExportUploadId,
  ] = useState(null);

  const [isExporting, setIsExporting] = useState(false);

  const [runningReportFormat, setRunningReportFormat] =
    useState(null);

  const [
    selectedActions,
    setSelectedActions,
  ] = useState({});

  const columnWidths =
    isFolderNavigationCollapsed
      ? TABLE_COLUMN_WIDTHS.collapsed
      : TABLE_COLUMN_WIDTHS.open;

  useEffect(() => {
    setMessage({
      type: "success",
      text: messages.loading,
    });

    setShowMessage(true);

    getBrowseData(browseData)
      .then((response) => {
        setBrowseDataList(response?.uploads || []);

        setTotalPages(Number(response?.pages) || 1);

        setShowMessage(false);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, [browseData]);

  const filteredUploads = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return browseDataList;
    }

    return browseDataList.filter(
      (upload) => {
        const uploadName =
          upload.uploadName?.toLowerCase() ||
          "";

        const description =
          upload.description?.toLowerCase() ||
          "";

        return (
          uploadName.includes(
            searchValue
          ) ||
          description.includes(
            searchValue
          )
        );
      }
    );
  }, [
    browseDataList,
    search,
  ]);

  const totalEntries =
    filteredUploads.length;

  const entriesPerPage =
    browseData.limit;

  useEffect(() => {
    if (browseData.page > totalPages) {
      setBrowseData((previousData) => ({
        ...previousData,
        page: totalPages,
      }));
    }
  }, [
    browseData.page,
    totalPages,
  ]);

  useEffect(() => {
    setBrowseData((previousData) => ({
      ...previousData,
      page: 1,
    }));
    setSelectedUploads([]);
  }, [search]);

  const page = browseData.page;

  const displayStart =
    totalEntries === 0
      ? 0
      : (page - 1) *
          entriesPerPage +
        1;

  const displayEnd =
    totalEntries === 0
      ? 0
      : Math.min(
          displayStart + entriesPerPage - 1,
          totalEntries
        );

  const pageOptions =
    Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

  const handleLimitChange = (value) => {
    setSelectedUploads([]);

    setBrowseData(
      (previousData) => ({
        ...previousData,
        limit: Number(value),
        page: 1,
      })
    );
  };

  const handlePageChange = (value) => {
    setSelectedUploads([]);

    setBrowseData(
      (previousData) => ({
        ...previousData,
        page: Number(value),
      })
    );
  };

  const handleFolderSelect = (folderId) => {
    setSelectedUploads([]);

    setBrowseData(
      (previousData) => ({
        ...previousData,
        folderId,
        page: 1,
      })
    );
  };

  const handleSelectAll = (
    checked
  ) => {
    if (checked === true) {
      setSelectedUploads(
        filteredUploads.map(
          (upload) => upload.id
        )
      );
    } else {
      setSelectedUploads([]);
    }
  };

  const handleSelectUpload = (
    uploadId,
    checked
  ) => {
    if (checked === true) {
      setSelectedUploads(
        (previousUploads) => [
          ...previousUploads,
          uploadId,
        ]
      );
    } else {
      setSelectedUploads(
        (previousUploads) =>
          previousUploads.filter(
            (id) =>
              id !== uploadId
          )
      );
    }
  };

  const handleStatusFilterChange = (value) => {
    setSelectedUploads([]);

    setBrowseData(
      (previousData) => ({
        ...previousData,
        status: value,
        page: 1,
      })
    );
  };

  const handleAssignFilterChange = (value) => {
    const filterValue =
      value === "__all__"
        ? ""
        : value;

    setSelectedUploads([]);

    setBrowseData(
      (previousData) => ({
        ...previousData,
        assignee: filterValue,
        page: 1,
      })
    );
  };

  const handleAssigneeChange = async (
    upload,
    assigneeValue
  ) => {
    const newAssignee =
      assigneeValue === ""
        ? null
        : Number(assigneeValue);

    const previousAssignee =
      upload.assignee ?? null;

    if (
      previousAssignee === newAssignee
    ) {
      return;
    }

    try {
      setIsUpdatingAssignee(upload.id);

      await updateUploadById(
        upload.id,
        undefined,
        "",
        newAssignee
      );

      setBrowseDataList(
        (previousUploads) =>
          previousUploads.map(
            (currentUpload) =>
              currentUpload.id === upload.id
                ? {
                    ...currentUpload,
                    assignee: newAssignee,
                  }
                : currentUpload
          )
      );

      setMessage({
        type: "success",
        text: "Upload assignee updated successfully.",
      });

      setShowMessage(true);
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    } finally {
      setIsUpdatingAssignee(null);
    }
  };

  const saveFile = (
    response,
    fallbackFilename = "download"
  ) => {
    const blob =
      response instanceof Blob
        ? response
        : response?.blob;

    if (!(blob instanceof Blob)) {
      throw new Error("Invalid file response.");
    }

    const filename =
      response?.filename || fallbackFilename;

    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(objectUrl);
  };

  const handleDeleteClick = (upload) => {
    setSelectedDeleteUpload(upload);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
    setSelectedDeleteUpload(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteUpload) {
      return;
    }

    try {
      setIsDeleting(true);

      setMessage({
        type: "success",
        text: "Deleting upload...",
      });

      setShowMessage(true);

      await deleteUploadsbyId(
        selectedDeleteUpload.id
      );

      setBrowseDataList(
        (previousUploads) =>
          previousUploads.filter(
            (upload) =>
              upload.id !== selectedDeleteUpload.id
          )
      );

      setSelectedUploads(
        (previousUploads) =>
          previousUploads.filter(
            (id) =>
              id !== selectedDeleteUpload.id
          )
      );

      setMessage({
        type: "success",
        text: "Upload deleted successfully.",
      });

      setShowMessage(true);

      setIsDeleteModalOpen(false);
      setSelectedDeleteUpload(null);
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleActionChange = async (
    value,
    uploadId,
    uploadName = "upload"
  ) => {
    if (!value || value === "0") {
      return;
    }

    const selectedAction =
      actionsOptions.find(
        (option) =>
          String(option.value) === String(value)
      );

    if (!selectedAction) {
      return;
    }

    if (selectedAction.type === "export") {
      setSelectedExportUploadId(uploadId);
      setSelectedExportOptions([]);
      setIsExportSheetOpen(true);
      return;
    }

    if (selectedAction.type === "navigation") {
      const route = getActionRoute(
        selectedAction.value,
        uploadId
      );

      if (route) {
        router.push(route);
      }

      return;
    }

    if (selectedAction.type === "import") {
      const baseRoute =
        `/upload/reportImport?folder=${browseData.folderId}&upload=${uploadId}`;

      if (selectedAction.value === "importReport") {
        router.push(baseRoute);
        return;
      }

      if (selectedAction.value === "importFossologyDump") {
        router.push(
          `${baseRoute}&reportFormat=decisionimporter`
        );
      }

      return;
    }

  /*
  * API actions.
  */
  if (selectedAction.type === "api") {
    switch (selectedAction.value) {
      case "download":
        try {
          setMessage({
            type: "success",
            text: "Downloading upload...",
          });

          setShowMessage(true);

          const response =
            await getUploadFileById(
              uploadId
            );

          await saveFile(
            response,
            uploadName
          );

          setMessage({
            type: "success",
            text: "Upload downloaded successfully.",
          });

          setShowMessage(true);
        } catch (error) {
          handleError(
            error,
            setMessage
          );

          setShowMessage(true);
        }

        return;

      case "delete":
        handleDeleteClick({
          id: uploadId,
          uploadName,
        });

        return;

        case "tag":
          router.push(
            `${routes.browseUploads.tag}?upload=${uploadId}`
          );
          return;

        case "history":
          router.push(
            `${routes.jobs.showJobs}?upload=${uploadId}`
          );
          return;

        default:
          return;
    }
  }

    /*
    * Report actions.
    */
    if (
      selectedAction.type !== "report" ||
      !selectedAction.reportFormat
    ) {
      return;
    }

    try {
      setMessage({
        type: "success",
        text: "Generating report...",
      });

      setShowMessage(true);

      const response =
        await scheduleReport(
          uploadId,
          selectedAction.reportFormat
        );

      const reportUrl =
        response?.message;

      if (!reportUrl) {
        throw new Error(
          "Report generation did not return a report URL."
        );
      }

      const reportResponse =
        await downloadReport(
          reportUrl
        );

      const reportFilename =
        getReportFilename(
          selectedAction.reportFormat,
          uploadName
        );

      await saveFile(
        reportResponse,
        reportFilename
      );

      setMessage({
        type: "success",
        text: "Report downloaded successfully.",
      });

      setShowMessage(true);
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    }
  };

  const handleExportOptionChange = (
    optionId,
    checked
  ) => {
    setSelectedExportOptions(
      (previousOptions) => {
        if (checked === true) {
          if (
            previousOptions.includes(
              optionId
            )
          ) {
            return previousOptions;
          }

          return [
            ...previousOptions,
            optionId,
          ];
        }

        return previousOptions.filter(
          (id) => id !== optionId
        );
      }
    );
  };

  const handleCloseExportSheet = () => {
    if (isExporting) {
      return;
    }

    setIsExportSheetOpen(false);
    setSelectedExportOptions([]);
    setSelectedExportUploadId(null);
  };

  const handleExport = async () => {
    if (!selectedExportUploadId) {
      return;
    }

    if (selectedExportOptions.length === 0) {
      setMessage({
        type: "info",
        text: "Please select at least one export option.",
      });

      setShowMessage(true);
      return;
    }

    const uploadId = selectedExportUploadId;

    const selectedOptions = selectedExportOptions
      .map((optionId) =>
        exportOptions.find(
          (option) => option.id === optionId
        )
      )
      .filter(Boolean);

    if (selectedOptions.length === 0) {
      return;
    }

    try {
      setIsExporting(true);
      setIsExportSheetOpen(false);

      const scheduledReportIds = [];
      const scheduledJobQueueIds = [];
      const scheduledReportFormats = [];

      for (const option of selectedOptions) {
        setMessage({
          type: "success",
          text: `Scheduling ${option.label}...`,
        });

        setShowMessage(true);

        const response = await scheduleReport(
          uploadId,
          option.reportFormat
        );

        const reportId =
          response?.message
            ?.split("/")
            .pop();

        if (!reportId) {
          throw new Error(
            `Failed to schedule ${option.label}.`
          );
        }

        scheduledReportIds.push(reportId);
        scheduledReportFormats.push(
          option.reportFormat
        );

        const jobQueueId =
          await waitForJobQueueId(
            reportId,
            uploadId,
            option.reportFormat
          );

        scheduledJobQueueIds.push(
          jobQueueId ?? ""
        );
      }

      const uploadName =
        browseDataList.find(
          (upload) =>
            upload.id === uploadId
        )?.uploadName || "report";

      setIsExportSheetOpen(false);
      setSelectedExportOptions([]);
      setSelectedExportUploadId(null);

      router.push(
        `${routes.jobs.showJobs}?uploads=${uploadId}&reports=${scheduledReportIds.join(",")}&jobQueueIds=${scheduledJobQueueIds.join(",")}&uploadNames=${encodeURIComponent(uploadName)}&reportFormats=${scheduledReportFormats.join(",")}`
      );
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    } finally {
      setIsExporting(false);
    }
  };

  const handleStatusChange = (
    upload,
    status
  ) => {
    if (
      !status ||
      status === upload.clearingStatus
    ) {
      return;
    }

    if (
      status === "Closed" ||
      status === "Rejected"
    ) {
      setPendingStatusChange({
        uploadId: upload.id,
        status,
      });

      setSelectedCommentUpload(upload);
      setComment("");
      setIsCommentModalOpen(true);

      return;
    }

    updateUploadStatus(
      upload.id,
      status
    );
  };

  const handleCommentClick = (upload) => {
    setSelectedCommentUpload(upload);
    setComment(upload.comment || "");
    setPendingStatusChange(null);
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedCommentUpload(null);
    setPendingStatusChange(null);
    setComment("");
  };

  const saveUploadComment = async (
    uploadId,
    trimmedComment
  ) => {
    await updateUploadById(
      uploadId,
      undefined,
      trimmedComment
    );

    setBrowseDataList((previousUploads) =>
      previousUploads.map((upload) =>
        upload.id === uploadId
          ? {
              ...upload,
              comment: trimmedComment,
            }
          : upload
      )
    );
  };

  const handleConfirmComment = async () => {
    if (!selectedCommentUpload) {
      return;
    }

    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      setMessage({
        type: "danger",
        text: pendingStatusChange
          ? "Please enter a reason for the status change."
          : "Please enter a comment.",
      });

      setShowMessage(true);

      return;
    }

    const uploadId = selectedCommentUpload.id;

    try {
      if (pendingStatusChange) {
        /*
        * Closed / Rejected status change.
        *
        * The comment is required and is sent together
        * with the new status.
        */
        await updateUploadStatus(
          uploadId,
          pendingStatusChange.status,
          trimmedComment
        );
      } else {
        /*
        * Normal comment edit.
        *
        * Do not send the current upload status.
        * This results in:
        *
        * PATCH /uploads/{id}
        * {
        *   "comment": "..."
        * }
        */
        await saveUploadComment(
          uploadId,
          trimmedComment
        );

        setMessage({
          type: "success",
          text: "Upload comment updated successfully.",
        });

        setShowMessage(true);
      }

      handleCloseCommentModal();
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    }
  };

  const updateUploadStatus = async (
    uploadId,
    status,
    comment = ""
  ) => {
    await updateUploadById(
      uploadId,
      status,
      comment
    );

    setBrowseDataList((previousUploads) =>
      previousUploads.map((upload) =>
        upload.id === uploadId
          ? {
              ...upload,
              clearingStatus: status,
              status,
              comment,
            }
          : upload
      )
    );

    setMessage({
      type: "success",
      text: "Upload updated successfully.",
    });

    setShowMessage(true);
  };

  const waitForJobQueueId = async (
    reportId,
    uploadId,
    reportFormat
  ) => {
    const normalizedFormat =
      String(reportFormat || "").toLowerCase();

    for (let attempt = 0; attempt < 10; attempt++) {
      const jobsResponse =
        await getAllJob({
          groupName:
            getLocalStorage("currentGroup"),
        });

      const allJobs =
        jobsResponse?.res || [];

      const matchingJob =
        allJobs.find(
          (job) =>
            String(job.id) ===
              String(reportId) &&
            String(job.uploadId) ===
              String(uploadId)
        );

      if (matchingJob) {
        const matchingQueue =
          matchingJob.jobQueue?.find(
            (queue) => {
              const queueType =
                String(
                  queue?.jobQueueType || ""
                ).toLowerCase();

              if (
                normalizedFormat.startsWith(
                  "spdx3"
                )
              ) {
                return (
                  queueType ===
                    normalizedFormat ||
                  queueType === "spdx3"
                );
              }

              return (
                queueType ===
                normalizedFormat
              );
            }
          );

        if (
          matchingQueue?.jobQueueId != null
        ) {
          return matchingQueue.jobQueueId;
        }
      }

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 500)
      );
    }

    return null;
  };

  const handleRunReport = async (
    reportFormat
  ) => {
    if (
      selectedUploads.length === 0 ||
      runningReportFormat
    ) {
      return;
    }

    setRunningReportFormat(reportFormat);

    const selectedUploadIds = [
      ...selectedUploads,
    ];

    const scheduledReportIds = [];
    const scheduledJobQueueIds = [];

    try {
      for (
        const uploadId of selectedUploadIds
      ) {
        const response =
          await scheduleReport(
            uploadId,
            reportFormat
          );

        const reportId =
          response?.message
            ?.split("/")
            .pop();

        if (!reportId) {
          throw new Error(
            `Failed to schedule ${reportFormat} report for upload #${uploadId}.`
          );
        }

        scheduledReportIds.push(
          reportId
        );

        /*
        * Wait until the newly created job
        * appears in GET /jobs and obtain
        * the exact jobQueueId displayed
        * by JobsTable.
        */
        const jobQueueId =
          await waitForJobQueueId(
            reportId,
            uploadId,
            reportFormat
          );

        scheduledJobQueueIds.push(
          jobQueueId ?? ""
        );
      }

      const selectedUploadNames =
        selectedUploadIds.map(
          (uploadId) =>
            browseDataList.find(
              (upload) =>
                upload.id === uploadId
            )?.uploadName ||
            "report"
        );

      const uploadIds =
        selectedUploadIds.join(",");

      const reportIds =
        scheduledReportIds.join(",");

      const jobQueueIds =
        scheduledJobQueueIds.join(",");

      const uploadNames =
        selectedUploadNames
          .map((uploadName) =>
            encodeURIComponent(
              uploadName
            )
          )
          .join(",");

      setSelectedUploads([]);

      router.push(
        `${routes.jobs.showJobs}?uploads=${uploadIds}&reports=${reportIds}&jobQueueIds=${jobQueueIds}&uploadNames=${uploadNames}&reportFormat=${reportFormat}`
      );
    } catch (error) {
      handleError(
        error,
        setMessage
      );

      setShowMessage(true);
    } finally {
      setRunningReportFormat(null);
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
    <div className="min-h-screen mx-10 py-8">
      {showMessage &&
        message && (
          <div className="mb-4">
            <AlertBanner
              type={alertType}
              title={alertType}
              description={message.text}
              showClose
              onClose={() => setShowMessage(false)}
            />
          </div>
        )}

      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Browse
      </h1>

      <div className="flex items-start gap-6">
        {/* Folder Navigation */}
        <FolderNavigation
          collapsible
          collapsed={
            isFolderNavigationCollapsed
          }
          onCollapsedChange={
            setIsFolderNavigationCollapsed
          }
          selectedFolderId={
            browseData.folderId
          }
          onFolderSelect={
            handleFolderSelect
          }
        />

        {/* Browse Content */}
        <div className="min-w-0 flex-1">
          <div className="space-y-6">
            {/* Heading and entries */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Uploads in Software Repository
              </h2>

              <div className="mb-4 flex items-center gap-2 text-sm text-gray-700">
                <span>Show</span>

                <Select
                  value={String(browseData.limit)}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="h-8 w-fit py-1 text-sm">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {entriesOptions.map((option, index) => {
                      const value = getOptionValue(
                        option,
                        index
                      );

                      const label = getOptionLabel(
                        option
                      );

                      return (
                        <SelectItem
                          key={value}
                          value={value}
                        >
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <span>entries</span>
              </div>
            </div>

            {/* Table */}
            <Table className="w-full table-fixed">
              <colgroup>
                <col style={{ width: columnWidths.upload }} />
                <col style={{ width: columnWidths.action }} />
                <col style={{ width: columnWidths.status }} />
                <col style={{ width: columnWidths.comment }} />
                <col style={{ width: columnWidths.licenses }} />
                <col style={{ width: columnWidths.date }} />
                <col style={{ width: columnWidths.assigned }} />
              </colgroup>

              <TableHeader>
                <TableRow>
                  <TableHead className="px-2 py-3">
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
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                        placeholder="Search upload"
                        className="h-10 w-full pl-10 text-sm placeholder:text-neutral-500"
                      />
                    </div>
                  </TableHead>

                  <TableHead className="px-2 py-3" />

                  <TableHead className="px-2 py-3">
                    <Select
                      value={browseData.status}
                      onValueChange={
                        handleStatusFilterChange
                      }
                    >
                      <SelectTrigger className="h-10 w-full min-w-0 text-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        {statusOptions.map((option, index) => {
                          const value = getOptionValue(option, index);

                          return (
                            <SelectItem
                              key={value}
                              value={value}
                            >
                              {getOptionLabel(option)}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </TableHead>

                  <TableHead className="px-2 py-3" />
                  <TableHead className="px-2 py-3" />
                  <TableHead className="px-2 py-3" />

                  <TableHead className="px-2 py-3">
                    <Select
                      value={
                        browseData.assignee || "__all__"
                      }
                      onValueChange={
                        handleAssignFilterChange
                      }
                    >
                      <SelectTrigger className="h-10 w-full min-w-0 text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent>
                        {assigneeFilterOptions.map(
                          (option) => (
                            <SelectItem
                              key={option.value || "all"}
                              value={option.value || "__all__"}
                            >
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </TableHead>
                </TableRow>

                <TableRow>
                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    <div className="flex min-w-0 items-start gap-3">
                      <Checkbox
                        className="mt-0.5 shrink-0"
                        checked={
                          filteredUploads.length > 0 &&
                          selectedUploads.length ===
                            filteredUploads.length
                        }
                        onCheckedChange={handleSelectAll}
                      />

                      <span className="min-w-0 whitespace-normal break-words">
                        Upload Name and Description
                      </span>
                    </div>
                  </TableHead>

                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    Action
                  </TableHead>

                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    Status
                  </TableHead>

                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    Comment
                  </TableHead>

                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    Main licenses
                  </TableHead>

                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    Upload Date
                  </TableHead>

                  <TableHead className="whitespace-normal break-words font-semibold text-gray-900">
                    Assigned to
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUploads.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-sm text-gray-500"
                    >
                      No uploads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="whitespace-normal break-words align-top">
                        <div className="flex min-w-0 items-start gap-3">
                          <Checkbox
                            className="mt-1 shrink-0"
                            checked={selectedUploads.includes(upload.id)}
                            onCheckedChange={(checked) =>
                              handleSelectUpload(upload.id, checked)
                            }
                          />

                          <a
                            href={`${routes.browseUploads.licenseBrowser}?uploadID=${upload.id}`}
                            className="min-w-0 flex-1 whitespace-normal break-words"
                          >
                            <div className="whitespace-normal break-words font-medium text-tertiary1-800 hover:underline">
                              {upload.uploadName}
                            </div>

                            {upload.description && (
                              <div className="mt-1 whitespace-normal break-words text-sm text-gray-500">
                                {upload.description}
                              </div>
                            )}
                          </a>
                        </div>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="whitespace-normal break-words align-top">
                        <Select
                          value={selectedActions[upload.id] || ""}
                          onValueChange={(value) => {
                            handleActionChange(
                              value,
                              upload.id,
                              upload.uploadName
                            );

                            setSelectedActions(
                              (previousActions) => ({
                                ...previousActions,
                                [upload.id]: "",
                              })
                            );
                          }}
                        >
                          <SelectTrigger className="h-8 w-full min-w-0 text-sm">
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>

                          <SelectContent>
                            {actionsOptions.map(
                              (option, index) => {
                                const value =
                                  getOptionValue(
                                    option,
                                    index
                                  );

                                return (
                                  <SelectItem
                                    key={value}
                                    value={value}
                                    disabled={option?.disabled}
                                  >
                                    {getOptionLabel(option)}
                                  </SelectItem>
                                );
                              }
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="whitespace-normal break-words align-top">
                        <Select
                          value={getStatusValue(
                            upload.clearingStatus
                          )}
                          onValueChange={(value) =>
                            handleStatusChange(
                              upload,
                              value
                            )
                          }
                        >
                          <SelectTrigger className="h-8 w-full min-w-0 text-sm">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>

                          <SelectContent>
                            {statusOptions.map(
                              (option) => {
                                const value = getStatusValue(option.name);

                                return (
                                  <SelectItem
                                    key={value}
                                    value={value}
                                  >
                                    {getOptionLabel(option)}
                                  </SelectItem>
                                );
                              }
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Comment */}
                      <TableCell className="align-top">
                        <button
                          type="button"
                          onDoubleClick={() =>
                            handleCommentClick(upload)
                          }
                          className="min-h-[48px] w-full cursor-pointer whitespace-normal break-words text-left text-sm text-gray-700"
                          aria-label={`Edit comment for ${upload.uploadName}`}
                        >
                          {upload.comment}
                        </button>
                      </TableCell>

                      {/* Main licenses */}
                      <TableCell className="whitespace-normal break-words align-top" />

                      {/* Upload date */}
                      <TableCell className="whitespace-normal break-words align-top text-sm text-gray-700">
                        {formatUploadDate(upload.uploadDate)}
                      </TableCell>

                      {/* Assigned to */}
                      <TableCell className="whitespace-normal break-words align-top">
                        {canEditAssignee ? (
                          <Select
                            value={
                              upload.assignee === null ||
                              upload.assignee === undefined
                                ? "__unassigned__"
                                : String(upload.assignee)
                            }
                            onValueChange={(value) =>
                              handleAssigneeChange(
                                upload,
                                value === "__unassigned__"
                                  ? ""
                                  : value
                              )
                            }
                            disabled={
                              isUpdatingAssignee === upload.id
                            }
                          >
                            <SelectTrigger className="h-8 w-full min-w-0 text-sm">
                              <SelectValue placeholder="Unassigned" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="__unassigned__">
                                Unassigned
                              </SelectItem>

                              {users.map((user) => (
                                <SelectItem
                                  key={user.id}
                                  value={String(user.id)}
                                >
                                  {getAssigneeLabel(user, currentUserId)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-sm text-gray-700">
                            {upload.assignee === null ||
                            upload.assignee === undefined
                              ? "Unassigned"
                              : getAssigneeLabel(
                                  users.find(
                                    (user) =>
                                      Number(user.id) ===
                                      Number(upload.assignee)
                                  ),
                                  currentUserId
                                ) || "Unassigned"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

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
                  value={String(page)}
                  onValueChange={
                    handlePageChange
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
                  of {totalPages}
                </span>
              </div>
            </div>

            {/* Run report generation */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="mr-1 text-sm font-medium text-gray-700">
                Run:
              </span>

              {REPORT_BUTTONS.map(
                (report) => (
                  <Button
                    key={report.value}
                    type="button"
                    variant="outline"
                    disabled={
                      selectedUploads.length ===
                      0 ||
                      runningReportFormat !== null
                    }
                    onClick={() =>
                      handleRunReport(
                        report.value
                      )
                    }
                  >
                    {runningReportFormat ===
                    report.value
                      ? "Generating"
                      : report.label}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Sheet
        open={isExportSheetOpen}
        onOpenChange={setIsExportSheetOpen}
      >
        <SheetContent
          side="right"
          className="w-[600px] sm:max-w-[700px] p-6"
        >
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="font-semibold text-xl">
              Export Options
            </SheetTitle>
          </SheetHeader>

          <div className="w-full p-6">
            <div className="space-y-4">
              {exportOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-3"
                >
                  <Checkbox
                    id={`export-${option.id}`}
                    checked={selectedExportOptions.includes(
                      option.id
                    )}
                    onCheckedChange={(checked) =>
                      handleExportOptionChange(
                        option.id,
                        checked
                      )
                    }
                  />

                  <label
                    htmlFor={`export-${option.id}`}
                    className="cursor-pointer text-sm"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="px-28 font-medium text-primary rounded border-primary hover:bg-accent hover:text-accent-foreground"
              onClick={handleCloseExportSheet}
              disabled={isExporting}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="default"
              size="default"
              className="px-28"
              disabled={
                selectedExportOptions.length === 0 ||
                isExporting
              }
              onClick={handleExport}
            >
              {isExporting ? "Exporting" : "Export"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Modal
        id="comment-modal"
        title="Enter Comment"
        show={isCommentModalOpen}
        onClose={handleCloseCommentModal}
        onConfirm={handleConfirmComment}
        confirmText="Save"
        cancelText="Cancel"
      >
        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="block text-sm text-gray-700"
          >
            {pendingStatusChange
              ? "Please enter a reason for status change"
              : "Please enter a comment"}
          </label>

          <Textarea
            className="w-full resize-none"
            id="comment"
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            placeholder="Type your comment here"
          />
        </div>
      </Modal>
      <Modal
        id="delete-modal"
        title="Delete Upload"
        show={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete this upload?
          </p>

          {selectedDeleteUpload?.uploadName && (
            <p className="text-sm font-medium text-gray-900 break-words">
              {selectedDeleteUpload.uploadName}
            </p>
          )}

          <p className="text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default BrowseClient;