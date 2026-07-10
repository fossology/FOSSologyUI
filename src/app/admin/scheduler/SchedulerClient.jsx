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

import {
  getSchedulerOptions,
  runSchedulerOperation,
} from "@/services/jobs";

// Widgets
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { ContentBox } from "@/components/ui/content-box";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const operations = [
  {
    value: "status",
    label: "Status",
    description: "Display job or scheduler status.",
  },
  {
    value: "database",
    label: "Check job queue",
    description: "Check for new jobs.",
  },
  {
    value: "reload",
    label: "Reload",
    description: "Reload fossology.conf.",
  },
  {
    value: "agents",
    label: "Agents",
    description: "Show a list of enabled agents.",
  },
  {
    value: "verbose",
    label: "Verbose",
    description:
      "Change the verbosity level of the scheduler or a job.",
  },
  {
    value: "stop",
    label: "Shutdown Scheduler",
    description:
      "Shutdown the scheduler gracefully and stop all background processing. This can take a while for all the agents to quit.",
  },
  {
    value: "restart",
    label: "Unpause a job",
    description: "Unpause a job.",
  },
  {
    value: "pause",
    label: "Pause a running job",
    description: "Pause a running job.",
  },
  {
    value: "priority",
    label: "Priority",
    description: "Change the priority of a job.",
  },
];

const SchedulerClient = () => {
  const [selectedOperation, setSelectedOperation] =
    useState("status");

  const [schedulerOptions, setSchedulerOptions] = useState({
    jobList: [],
    priorityList: [],
    verboseList: [],
    agentList: [],
  });

  const [selectedJob, setSelectedJob] = useState("");
  const [selectedPriority, setSelectedPriority] =
    useState("");
  const [selectedVerbose, setSelectedVerbose] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const [message, setMessage] = useState({
    type: "info",
    text: "",
  });

  useEffect(() => {
    const fetchSchedulerOptions = async () => {
      try {
        const data = await getSchedulerOptions(
          selectedOperation
        );

        setSchedulerOptions({
          jobList: data?.jobList || [],
          priorityList: data?.priorityList || [],
          verboseList: data?.verboseList || [],
          agentList: data?.agentList || [],
        });

        setSelectedJob("");
        setSelectedPriority("");
        setSelectedVerbose("");
      } catch (err) {
        setMessage({
          type: "error",
          text:
            err?.message ||
            "Failed to fetch scheduler options.",
        });
        setShowMessage(true);
      }
    };

    fetchSchedulerOptions();
  }, [selectedOperation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await runSchedulerOperation(
        selectedOperation,
        selectedJob || undefined,
        selectedVerbose || undefined,
        selectedPriority || undefined
      );

      setMessage({
        type: "success",
        text:
          res?.message ||
          "Scheduler operation executed successfully.",
      });

      setShowMessage(true);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.message ||
          "Failed to execute scheduler operation.",
      });

      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  const requiresJob = [
    "status",
    "verbose",
    "pause",
    "restart",
  ].includes(selectedOperation);

  const requiresPriority =
    selectedOperation === "priority";

  const isSubmitDisabled =
    loading ||
    (requiresJob && !selectedJob) ||
    (requiresPriority && !selectedPriority);

  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="max-w-5xl mx-40 my-6 px-4">
      {showMessage && (
        <div className="mb-4">
          <AlertBanner
            type={alertType}
            description={message.text}
            showClose
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Scheduler Administration
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <h2 className="font-medium text-gray-900 mb-2 text-base">
            List of operations:
          </h2>

          <ul className="list-disc pl-6 space-y-1 text-base text-gray-700">
            {operations.map((operation) => (
              <li key={operation.value}>
                <span className="font-medium">
                  {operation.label}
                </span>
                : {operation.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label className="block mb-2">
            Select an operation:
          </Label>

          <Select
            value={selectedOperation}
            onValueChange={setSelectedOperation}
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              {operations.map((operation) => (
                <SelectItem
                  key={operation.value}
                  value={operation.value}
                >
                  {operation.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(selectedOperation === "status" ||
          selectedOperation === "verbose" ||
          selectedOperation === "pause" ||
          selectedOperation === "restart") && (
          <div className="space-y-2">
            <Label className="block mb-2">
              Select scheduler or a job:
            </Label>

            <ContentBox className="max-h-72 overflow-y-auto">
              {schedulerOptions.jobList.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No jobs available.
                </div>
              ) : (
                schedulerOptions.jobList.map((job) => (
                  <button
                    key={job}
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className={`
                      w-full rounded-sm px-2 py-1.5 text-left text-sm
                      outline-none transition-colors
                      ${
                        selectedJob === job
                          ? "bg-secondary text-gray-900"
                          : "text-foreground hover:bg-secondary hover:text-gray-900 focus:bg-secondary focus:text-gray-900"
                      }
                    `}
                  >
                    {job}
                  </button>
                ))
              )}
            </ContentBox>
          </div>
        )}

        {selectedOperation === "verbose" &&
          schedulerOptions.verboseList.length > 0 && (
        <div>
          <Label className="block mb-2">
            Select verbosity level:
          </Label>

          <Select
            value={String(selectedVerbose)}
            onValueChange={setSelectedVerbose}
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>

            <SelectContent>
              {schedulerOptions.verboseList.map((level, index) => (
                <SelectItem
                  key={level}
                  value={String(level)}
                >
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedOperation === "priority" &&
        schedulerOptions.priorityList.length > 0 && (
        <div>
          <Label className="block mb-2">
            Select priority:
          </Label>

          <Select
            value={String(selectedPriority)}
            onValueChange={setSelectedPriority}
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>

            <SelectContent>
              {schedulerOptions.priorityList.map((priority) => (
                <SelectItem
                  key={priority}
                  value={String(priority)}
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedOperation === "agents" &&
        schedulerOptions.agentList.length > 0 && (
        <div>
          <Label className="block mb-2">
            Available agents:
          </Label>

          <ul className="list-disc pl-6 text-sm text-gray-700">
            {schedulerOptions.agentList.map((agent) => (
              <li key={agent}>{agent}</li>
            ))}
          </ul>
        </div>
      )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
          >
            {loading ? (
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
      </form>
    </div>
  );
};

export default SchedulerClient;
