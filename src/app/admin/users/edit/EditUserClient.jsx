/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
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

// widgets
import { Alert, Button, InputContainer, Spinner } from "@/components/Widgets";

// services
import { getAllFolders } from "@/services/folders";
import {
  editUserById,
  getAllUsersName,
  getUserById,
} from "@/services/users";

// utils
import { isAdmin } from "@/shared/authHelper";

// constants
import {
  accessLevels,
  agents,
  bucketPool,
  initialAddUserData,
  userStatus,
} from "@/constants/constants";

// components
import CommonFields from "@/components/Upload/CommonFields";
import TokenSpace from "./token_space";

const EditUserPage = () => {
  const initialMessage = { type: "success", text: "" };

  const [editUserData, setEditUserData] = useState({
    ...initialAddUserData,
    rootFolderId: 1,
    defaultFolderId: 1,
    defaultGroup: null,
    noPass: false,
    user_status: "active",
  });

  const [rePass, setRePass] = useState({ pass1: "", pass2: "" });
  const [folderlist, setFolderlist] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "accessLevel") {
      setEditUserData({ ...editUserData, defaultVisibility: value });
    } else if (name === "permission") {
      setEditUserData({ ...editUserData, accessLevel: value });
    } else if (name === "pass1" || name === "pass2") {
      setRePass({ ...rePass, [name]: value });
    } else if (type === "checkbox") {
      if (name === "emailNotification" || name === "noPass") {
        setEditUserData({ ...editUserData, [name]: checked });
      } else {
        setEditUserData({
          ...editUserData,
          agents: { ...editUserData.agents, [name]: checked },
        });
      }
    } else {
      setEditUserData({ ...editUserData, [name]: value });
    }
  };

  const fetchFolders = async () => {
    try {
      const folders = await getAllFolders();
      setFolderlist(folders.map((f) => ({ id: f.id, name: f.name })));
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const users = await getAllUsersName();
      setAllUsers(users.map((u) => ({ ...u, disabled: false })));
      const currentUserId = JSON.parse(localStorage.getItem("user")).id;
      setSelectedUserId(currentUserId);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  const fetchUserInfo = async (userId) => {
    try {
      const user = await getUserById(userId);
      if (user && user.agents) {
        user.agents.mime = user.agents.mimetype;
        delete user.agents.mimetype;
        setEditUserData({
          ...initialAddUserData,
          ...user,
          agents: { ...initialAddUserData.agents, ...user.agents },
          noPass: false,
        });
      } else {
        setEditUserData({ ...initialAddUserData, ...user });
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rePass.pass1 !== rePass.pass2) {
      setMessage({ type: "danger", text: "Passwords do not match!" });
      setShowMessage(true);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...editUserData,
        _blank_pass: editUserData.noPass,
      };
      if (rePass.pass1) payload.user_pass = rePass.pass1;
      delete payload.noPass;

      const response = await editUserById(selectedUserId, payload);
      await fetchUserInfo(selectedUserId);
      setRePass({ pass1: "", pass2: "" });

      setMessage({ type: "success", text: response.message });
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    } finally {
      setShowMessage(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchUserInfo(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}
      <h1 className="font-size-main-heading">Edit A User</h1>

      {isAdmin() && (
        <>
          <InputContainer
            type="select"
            name="selectedUserId"
            id="user-selector"
            onChange={(e) => setSelectedUserId(e.target.value)}
            options={allUsers}
            property="name"
            value={selectedUserId}
            valueProperty="id"
          >
            Select a user
          </InputContainer>
          <hr />
        </>
      )}

      <div className="row">
        <div className="col-12 col-lg-8">
          <form onSubmit={handleSubmit}>
            <InputContainer
              name="name"
              id="name"
              type="text"
              onChange={handleChange}
              value={editUserData.name}
            >
              Username
            </InputContainer>

            <InputContainer
              name="description"
              id="description"
              type="text"
              onChange={handleChange}
              value={editUserData.description}
            >
              Description (optional)
            </InputContainer>

            <InputContainer
              name="email"
              id="email"
              type="email"
              onChange={handleChange}
              value={editUserData.email}
            >
              Email address
            </InputContainer>

            {isAdmin() && (
              <>
                <InputContainer
                  type="select"
                  name="permission"
                  id="permission"
                  onChange={handleChange}
                  options={accessLevels}
                  property="name"
                  value={editUserData.accessLevel}
                  valueProperty="value"
                >
                  Access Level
                </InputContainer>

                <InputContainer
                  type="select"
                  name="user_status"
                  id="user_status"
                  onChange={handleChange}
                  options={userStatus}
                  property="name"
                  value={editUserData.user_status}
                  valueProperty="value"
                >
                  Status
                </InputContainer>
              </>
            )}

            <InputContainer
              type="select"
              name="rootFolderId"
              id="rootFolderId"
              onChange={handleChange}
              options={folderlist}
              property="name"
              value={editUserData.rootFolderId}
            >
              Root Folder
            </InputContainer>

            {isAdmin() && (
              <>
                <InputContainer
                  type="select"
                  name="defaultFolderId"
                  id="defaultFolderId"
                  onChange={handleChange}
                  options={folderlist}
                  property="name"
                  value={editUserData.defaultFolderId}
                >
                  Default Folder
                </InputContainer>

                <InputContainer
                  type="checkbox"
                  name="noPass"
                  id="noPass"
                  checked={editUserData.noPass}
                  onChange={handleChange}
                >
                  Require No-Password
                </InputContainer>
              </>
            )}

            <InputContainer
              name="pass1"
              id="pass1"
              type="password"
              onChange={handleChange}
              value={rePass.pass1}
            >
              Password (optional)
            </InputContainer>

            <InputContainer
              name="pass2"
              id="pass2"
              type="password"
              onChange={handleChange}
              value={rePass.pass2}
            >
              Re-enter password
            </InputContainer>

            <InputContainer
              type="checkbox"
              name="emailNotification"
              id="emailNotification"
              checked={editUserData.emailNotification}
              onChange={handleChange}
            >
              Enable Email Notification
            </InputContainer>

            <p className="font-demi mt-1">Default Upload Visibility</p>
            <CommonFields
              accessLevel={editUserData.defaultVisibility}
              handleChange={handleChange}
            />

            <label className="font-demi my-1">Default Agents</label>
            {Object.keys(editUserData.agents).map((key) => (
              <InputContainer
                key={key}
                type="checkbox"
                checked={editUserData.agents[key]}
                name={key}
                id={key}
                onChange={handleChange}
              >
                {agents[key]}
              </InputContainer>
            ))}

            <InputContainer
              type="select"
              name="defaultBucketpool"
              id="defaultBucketpool"
              onChange={handleChange}
              options={bucketPool}
              property="name"
              value={editUserData.defaultBucketpool}
            >
              Default Bucketpool
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
                "Update User"
              )}
            </Button>
          </form>

          <hr />
          <TokenSpace setMessage={setMessage} setShowMessage={setShowMessage} />
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
