/*
 Copyright (C) 2022 Samuel Dushimimana
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

import React, { useEffect, useState } from "react";
import messages from "@/constants/messages";

// Widgets
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// API Services
import { deleteGroup, fetchAllDeletableGroups } from "@/services/groups";

// Helper
import { handleError } from "@/shared/helper";

const DeleteGroupClient = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "success", text: "" });

  useEffect(() => {
    fetchAllDeletableGroups()
      .then((res) => {
        setGroups(Array.isArray(res) ? res : []);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      })
      .finally(() => setInitialLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteGroup(selectedGroupName)
      .then(() => {
        setMessage({ type: "success", text: messages.deletedGroup });
        setSelectedGroupName("");
        return fetchAllDeletableGroups();
      })
      .then((res) => {
        setGroups(Array.isArray(res) ? res : []);
      })
      .catch((error) => {
        handleError(error, setMessage);
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div>
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
        Delete Group
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>

          <Label className={`block mb-3 ${!initialLoading && groups.length === 0 ? "text-neutral-600" : ""}`}>
            Select group to delete:
          </Label>

          {initialLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Loading groups…
            </div>
          ) : (
            <Select
              value={selectedGroupName}
              onValueChange={(value) => setSelectedGroupName(value)}
              disabled={groups.length === 0}
            >
              <SelectTrigger className="w-[320px]" disabled={groups.length === 0}>
                <SelectValue placeholder={groups.length === 0 ? "No groups available for deletion" : "Select group"} />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                <SelectItem
                  key={group.name}
                  value={group.name}
                >
                  {group.name}
                </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <AlertBanner
            type="Warning"
            description="Note: After deleting group, you will loose access to uploads that are associated with deleted group."
            showClose={false}
            className="mt-4"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !selectedGroupName}
            variant="alert" size="default"
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeleteGroupClient;
