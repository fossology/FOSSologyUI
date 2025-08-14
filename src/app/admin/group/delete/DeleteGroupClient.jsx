/*
 Copyright (C) 2022 Samuel Dushimimana
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

import React, { useEffect, useState } from "react";
import messages from "@/constants/messages";

// Widgets
import { Alert, Button, InputContainer } from "@/components/Widgets";
import Modal from "@/components/Widgets/Modal";

// API Services
import { deleteGroup, fetchAllDeletableGroups } from "@/services/groups";

const DeleteGroup = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchAllDeletableGroups()
      .then(setGroups)
      .catch((e) => {
        setMessage({ type: "error", text: e.message });
        setShowMessage(true);
      });
  }, []);

  useEffect(() => {
    if (groups.length > 0) setSelectedGroupId(groups[0].id);
  }, [groups]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteGroup(selectedGroupId);
      setMessage({ type: "success", text: messages.deletedGroup });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setShowMessage(true);
    }
  };

  return (
    <>
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}

        <h1 className="font-size-main-heading">Delete Group</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <form>
              <InputContainer
                name="group"
                type="select"
                onChange={(e) => setSelectedGroupId(e.target.value)}
                options={groups}
                property="name"
                value={selectedGroupId || ""}
              >
                Select group to delete:
              </InputContainer>
              <Button
                type="button"
                className="mt-4"
                disabled={groups.length === 0}
                onClick={() => setModalOpen(true)}
              >
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        show={modalOpen}
        title="Are you sure you want to delete this group?"
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      >
        This action cannot be undone.
      </Modal>
    </>
  );
};

export default DeleteGroup;
