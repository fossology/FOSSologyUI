/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertBanner } from "@/components/ui/alert";

import { getAllFolders } from "@/services/folders";
import { addUser } from "@/services/users";
import CommonFields from "@/components/Upload/CommonFields";
import {
  accessLevels,
  bucketPool,
  initialAddUserData,
  initialMessage,
} from "@/constants/constants";

const CreateUserPage = () => {
  const [addUserData, setAddUserData] = useState(initialAddUserData);
  const [rePass, setRePass] = useState({
    pass1: "",
    pass2: "",
  });
  const [folderlist, setFolderlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  const passwordsMatch =
    rePass.pass2 === "" || rePass.pass1 === rePass.pass2;

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name === "accessLevel") {
      return setAddUserData((prev) => ({
        ...prev,
        defaultVisibility: value,
      }));
    }
    if (name === "permission") {
      return setAddUserData((prev) => ({
        ...prev,
        accessLevel: value,
      }));
    }

    if (name === "pass1" || name === "pass2") {
      return setRePass((prev) => ({
        ...prev,
        [name]: value,
      }));
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

  const handleSelectChange = (name, value) => {
    const event = {
      target: {
        name,
        value,
        type: "select",
        checked: false,
      },
    };

    handleChange(event);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(addUserData.name ?? "").trim()) {
      setMessage({
        type: "error",
        text: "Username is required.",
      });
      setShowMessage(true);
      return;
    }

    if (rePass.pass1 !== rePass.pass2) {
      setMessage({
        type: "error",
        text: "Passwords do not match.",
      });
      setShowMessage(true);
      return;
    }

    setLoading(true);

  try {
    const finalUserData = {
      ...addUserData,
    };

    Object.keys(finalUserData).forEach((key) => {
      if (
        finalUserData[key] === "" ||
        finalUserData[key] === undefined ||
        finalUserData[key] === null
      ) {
        delete finalUserData[key];
      }
    });

    if (finalUserData.rootFolderId) {
      finalUserData.rootFolderId = Number(finalUserData.rootFolderId);
    }

    if (finalUserData.defaultBucketpool) {
      finalUserData.defaultBucketpool = Number(finalUserData.defaultBucketpool);
    }

    if (rePass.pass1.trim() !== "") {
      finalUserData.userPass = rePass.pass1;
    } else {
      delete finalUserData.userPass;
    }

    const res = await addUser(finalUserData);

      setMessage({
        type: "success",
        text: res.message,
      });

      setAddUserData((prev) => ({
        ...initialAddUserData,
        agents: prev.agents,
      }));
      setRePass({
        pass1: "",
        pass2: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    getAllFolders()
      .then((folders) => {
        const mappedFolders = folders.map((f) => ({
          id: f.id,
          name: f.name,
          disabled: false,
        }));

        setFolderlist(mappedFolders);

        if (mappedFolders.length > 0) {
          setAddUserData((prev) => ({
            ...prev,
            rootFolderId: mappedFolders[0].id,
          }));
        }
      })
      .catch((error) => {
        setMessage({
          type: "error",
          text: error.message,
        });

        setShowMessage(true);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.agents) {
      const updatedAgents = {
        ...addUserData.agents,
      };

      for (const agent in updatedAgents) {
        updatedAgents[agent] = user.agents[agent] || false;
      }

      setAddUserData((prev) => ({
        ...prev,
        agents: updatedAgents,
      }));
    }
  }, []);

  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
      <div className="main-container my-3">
        <div className="w-full max-w-3xl">
          {showMessage && (
            <AlertBanner
              type={alertType}
              description={message.text}
              showClose
              onClose={() => setShowMessage(false)}
            />
          )}

          <h1 className="font-size-main-heading mb-3">
            Create A User
          </h1>

          <p className="mb-6">
            From which topic do you wish to view the obligations and risks:
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-name"
                className="font-semibold"
              >
                Username
              </Label>

              <Input
                type="text"
                name="name"
                id="admin-create-user-name"
                value={addUserData.name}
                onChange={handleChange}
                placeholder="Enter username"
                className="h-10"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-description"
                className="font-semibold"
              >
                Description (name, contact, or other information). This may
                be blank.
              </Label>

              <Input
                type="text"
                name="description"
                id="admin-create-user-description"
                value={addUserData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="h-10"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-email"
                className="font-semibold"
              >
                Email address. This may be blank.
              </Label>

              <Input
                type="email"
                name="email"
                id="admin-create-user-email"
                value={addUserData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="h-10"
              />
            </div>

            {/* Access Level */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-permission"
                className="font-semibold"
              >
                Access level
              </Label>

              <Select
                value={addUserData.accessLevel}
                onValueChange={(value) =>
                  handleSelectChange("permission", value)
                }
              >
                <SelectTrigger
                  id="admin-create-user-permission"
                  className="h-10 w-[550px]"
                >
                  <SelectValue placeholder="None (very basic, no database access)" />
                </SelectTrigger>

                <SelectContent>
                  {accessLevels.map((option) => (
                    <SelectItem
                      key={String(option.value)}
                      value={String(option.value)}
                    >
                      {String(option.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* User Root Folder */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-root-folder"
                className="font-semibold"
              >
                User root folder
              </Label>

              <Select
                value={
                  addUserData.rootFolderId
                    ? String(addUserData.rootFolderId)
                    : undefined
                }
                onValueChange={(value) =>
                  handleSelectChange("rootFolderId", value)
                }
              >
                <SelectTrigger
                  id="admin-create-user-root-folder"
                  className="h-10 w-[390px]"
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {folderlist.map((folder) => (
                    <SelectItem
                      key={String(folder.id)}
                      value={String(folder.id)}
                      disabled={folder.disabled}
                    >
                      {String(folder.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-password"
                className="font-semibold"
              >
                Password (Optional)
              </Label>

              <Input
                type="password"
                name="pass1"
                id="admin-create-user-password"
                value={rePass.pass1}
                onChange={handleChange}
                placeholder="Enter password"
                className="h-10"
              />
            </div>

            {/* Re-enter Password */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-password-confirm"
                className="font-semibold"
              >
                Re-enter password.
              </Label>

              <Input
                type="password"
                name="pass2"
                id="admin-create-user-password-confirm"
                value={rePass.pass2}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={`h-10 ${
                  !passwordsMatch ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />

              {!passwordsMatch && (
                <p className="text-sm text-red-600">
                  Passwords do not match.
                </p>
              )}
            </div>

            {/* Default Upload Visibility */}
            <div className="space-y-2">
              <Label className="font-semibold">
                Default upload visibility
              </Label>

              <CommonFields
                accessLevel={addUserData.defaultVisibility}
                handleChange={handleChange}
              />
            </div>

            {/* Agents selected by default when uploading */}
            <div className="space-y-2">
              <Label className="font-semibold">
                Agents selected by default when uploading
              </Label>

              <CommonFields
                analysis={addUserData.agents}
                handleChange={handleChange}
                handleScanChange={(checked, name) => {
                  setAddUserData((prev) => ({
                    ...prev,
                    agents: {
                      ...prev.agents,
                      [name]: checked,
                    },
                  }));
                }}
              />
            </div>

            {/* Default Bucket Pool */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-create-user-bucketpool"
                className="font-semibold"
              >
                Default bucket pool
              </Label>

              <Select
                value={String(addUserData.defaultBucketpool)}
                onValueChange={(value) =>
                  handleSelectChange("defaultBucketpool", Number(value))
                }
              >
                <SelectTrigger
                  id="admin-create-user-bucketpool"
                  className="h-10 w-[390px]"
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {bucketPool.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={String(option.id)}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="default"
                className="mt-2"
                disabled={
                  loading ||
                  (rePass.pass2 !== "" && rePass.pass1 !== rePass.pass2)
                }
              >
                {loading ? "Adding User..." : "Add User"}
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateUserPage;