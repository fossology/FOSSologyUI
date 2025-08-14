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
import { addUser } from "@/services/users";

// components
import CommonFields from "@/components/Upload/CommonFields";

// constants
import {
  accessLevels,
  agents,
  bucketPool,
  initialAddUserData,
} from "@/constants/constants";

const AddUserPage = () => {
  const initialMessage = {
    type: "success",
    text: "",
  };

  const [addUserData, setAddUserData] = useState(initialAddUserData);
  const [rePass, setRePass] = useState({ pass1: "", pass2: "" });
  const [folderlist, setFolderlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name === "accessLevel") {
      return setAddUserData((prev) => ({ ...prev, defaultVisibility: value }));
    }
    if (name === "permission") {
      return setAddUserData((prev) => ({ ...prev, accessLevel: value }));
    }
    if (name === "pass1" || name === "pass2") {
      return setRePass((prev) => ({ ...prev, [name]: value }));
    }

    if (type === "checkbox" && name in addUserData.agents) {
      setAddUserData((prev) => ({
        ...prev,
        agents: {
          ...prev.agents,
          [name]: checked,
        },
      }));
    } else {
      setAddUserData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rePass.pass1 !== rePass.pass2) {
      setMessage({ type: "danger", text: "Passwords do not match." });
      setShowMessage(true);
      return;
    }

    setLoading(true);
    try {
      const finalUserData = { ...addUserData, user_pass: rePass.pass1 };
      const res = await addUser(finalUserData);
      setMessage({ type: "success", text: res.message });
      setAddUserData(initialAddUserData);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  useEffect(() => {
    getAllFolders()
      .then((folders) => {
        setFolderlist(
          folders.map((f) => ({ id: f.id, name: f.name, disabled: false }))
        );
      })
      .catch((error) => {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.agents) {
      const updatedAgents = { ...addUserData.agents };
      for (const agent in updatedAgents) {
        updatedAgents[agent] = user.agents[agent] || false;
      }
      setAddUserData((prev) => ({ ...prev, agents: updatedAgents }));
    }
  }, []);

  return (
    <div className="main-container my-3">
      {showMessage && (
        <Alert
          type={message.type}
          setShow={setShowMessage}
          message={message.text}
        />
      )}
      <h1 className="font-size-main-heading">Add A User</h1>
      <div className="row">
        <div className="col-12 col-lg-8">
          <form onSubmit={handleSubmit}>
            <InputContainer
              name="name"
              id="name"
              type="text"
              value={addUserData.name}
              onChange={handleChange}
            >
              Username
            </InputContainer>

            <InputContainer
              name="description"
              id="description"
              type="text"
              value={addUserData.description}
              onChange={handleChange}
            >
              Description, full name, contact, etc. (optional)
            </InputContainer>

            <InputContainer
              name="email"
              id="email"
              type="email"
              value={addUserData.email}
              onChange={handleChange}
            >
              Email address
            </InputContainer>

            <InputContainer
              type="select"
              name="permission"
              id="permission"
              options={accessLevels}
              value={addUserData.accessLevel}
              onChange={handleChange}
              property="name"
              valueProperty="value"
            >
              Access level
            </InputContainer>

            <InputContainer
              type="select"
              name="rootFolderId"
              id="rootFolderId"
              options={folderlist}
              value={addUserData.rootFolderId}
              onChange={handleChange}
              property="name"
            >
              User root folder
            </InputContainer>

            <InputContainer
              name="pass1"
              id="pass1"
              type="password"
              value={rePass.pass1}
              onChange={handleChange}
            >
              Password (optional)
            </InputContainer>

            <InputContainer
              name="pass2"
              id="pass2"
              type="password"
              value={rePass.pass2}
              onChange={handleChange}
            >
              Re-enter password
            </InputContainer>

            <p className="font-demi my-1">E-mail Notification</p>
            <InputContainer
              type="checkbox"
              checked={addUserData.emailNotification}
              name="emailNotification"
              id="emailNotification"
              onChange={handleChange}
            >
              Check to enable email notification when upload scan completes.
            </InputContainer>

            <p className="font-demi mt-1">Default upload visibility</p>
            <CommonFields
              accessLevel={addUserData.defaultVisibility}
              handleChange={handleChange}
            />

            <label htmlFor="agents" className="font-demi my-1">
              Agents selected by default when uploading
              {Object.keys(addUserData.agents).map((key) => (
                <InputContainer
                  key={key}
                  type="checkbox"
                  name={key}
                  id={key}
                  checked={addUserData.agents[key]}
                  onChange={handleChange}
                >
                  {agents[key]}
                </InputContainer>
              ))}
            </label>

            <InputContainer
              type="select"
              name="defaultBucketpool"
              id="defaultBucketpool"
              options={bucketPool}
              value={addUserData.defaultBucketpool}
              onChange={handleChange}
              property="name"
            >
              Default bucketpool
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
                "Add User"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;

