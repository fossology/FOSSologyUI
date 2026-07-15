/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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

import React, { useState } from "react";
import messages from "@/constants/messages";

// Widgets
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertBanner } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

// API Services
import { createGroup } from "@/services/groups";

// Helper
import { handleError } from "@/shared/helper";

const CreateGroupClient = () => {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "success", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createGroup(groupName)
      .then(() => {
        setMessage({ type: "success", text: messages.groupCreate });
        setGroupName("");
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
        Add a Group
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="block mb-3">
            Enter the group name:
          </Label>
          <Input
            type="text"
            name="name"
            id="admin-group-add-name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name"
            className="w-[320px]"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !groupName}
            variant="default" size="default"
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupClient;
