/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
import { Alert, Button, InputContainer, Spinner } from "@/components/Widgets";

// Required function for calling APIs
import { createGroup } from "@/services/groups";

const GroupCreatePage = () => {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "success", text: "" });

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createGroup(groupName)
      .then(() => {
        setMessage({ type: "success", text: messages.groupCreate });
        setGroupName(""); // Clear input after success
      })
      .catch((error) => {
        setMessage({ type: "danger", text: error.message });
      })
      .finally(() => {
        setLoading(false);
        setShowMessage(true);
      });
  };

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}

      <h1 className="font-size-main-heading">Add Group</h1>
      <br />

      <div className="row">
        <div className="col-12 col-lg-8">
          <form onSubmit={handleSubmit}>
            <InputContainer
              type="text"
              name="name"
              id="admin-group-add-name"
              onChange={handleChange}
              placeholder="Group name"
              value={groupName}
            >
              Enter the group name:
            </InputContainer>

            <Button type="submit" className="mt-4">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Add"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupCreatePage;
