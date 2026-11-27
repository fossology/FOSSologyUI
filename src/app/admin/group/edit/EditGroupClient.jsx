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
import messages from "@/constants/messages";

// Widgets
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { fetchAllGroups } from "@/services/groups";

// Helper
import { handleError } from "@/shared/helper";

const EditGroupClient = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "success", text: "" });

  useEffect(() => {
    fetchAllGroups()
      .then((res) => {
        setGroups(Array.isArray(res) ? res : []);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      })
      .finally(() => setInitialLoading(false));
  }, []);

  // Pre-fill name when a group is selected
  useEffect(() => {
    if (!selectedGroupId) {
      setGroupName("");
      return;
    }
    const found = groups.find((g) => g.id.toString() === selectedGroupId.toString());
    if (found) setGroupName(found.name);
  }, [selectedGroupId, groups]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // FOSSology API v2 does not provide a Group Rename endpoint.
    // Re-enable this handler once the backend exposes a rename API.

    setMessage({
      type: "info",
      text: "Group renaming is currently unavailable because the API endpoint is not implemented in FOSSology API v2.",
    });

    setShowMessage(true);
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
        Edit Group
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-3 text-sm">
            Select a group and enter the new name to rename it.
          </p>

          <Label className="block mb-3">
            1. Select the group to edit:
          </Label>

          {initialLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Loading groups…
            </div>
          ) : groups.length === 0 ? (
            <p className="text-sm text-gray-500">No groups available.</p>
          ) : (
            <Select
              value={selectedGroupId?.toString()}
              onValueChange={(value) => setSelectedGroupId(value)}
            >
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label className="block mb-3">
            2. Enter the new group name:
          </Label>
          <Input
            type="text"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="New group name"
            className="w-[320px]"
            disabled={!selectedGroupId}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !selectedGroupId || !groupName}
            variant="default" size="default"
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditGroupClient;
