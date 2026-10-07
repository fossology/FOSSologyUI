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
import { Checkbox } from "@/components/ui/checkbox";
import { AlertBanner } from "@/components/ui/alert";
import {
  getAllFolders,
} from "@/services/folders";
import {
  editUserByName,
  getAllUsersName,
  getUserByName,
} from "@/services/users";
import { fetchAllGroups } from "@/services/groups";
import { isAdmin } from "@/shared/authHelper";
import {
  accessLevels,
  bucketPool,
  initialAddUserData,
  userStatus,
} from "@/constants/constants";
import CommonFields from "@/components/Upload/CommonFields";
import TokenSpace from "./token_space";


const EditUserPage = () => {
  const initialMessage = {
    type: "success",
    text: "",
  };

  const [editUserData, setEditUserData] = useState({
    ...initialAddUserData,
    rootFolderId: 1,
    defaultFolderId: 1,
    defaultGroup: null,
    noPass: false,
    userStatus: "active",
  });

  const [rePass, setRePass] = useState({
    pass1: "",
    pass2: "",
  });
  const passwordsMatch =
    rePass.pass2 === "" || rePass.pass1 === rePass.pass2;
  const [adminUser, setAdminUser] = useState(false);
  const [folderlist, setFolderlist] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setAdminUser(isAdmin());
  }, []);

  const handleChange = (e) => {
    if (!e?.target) return;

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    if (name === "accessLevel") {
      setEditUserData((prev) => ({
        ...prev,
        defaultVisibility: value,
      }));

      return;
    }

    if (name === "pass1" || name === "pass2") {
      setRePass((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    if (name in editUserData.agents) {
      setEditUserData((prev) => ({
        ...prev,
        agents: {
          ...prev.agents,
          [name]: checked,
        },
      }));
      return;
    }

    setEditUserData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    handleChange({
      target: {
        name,
        value,
        type: "select",
      },
    });
  };

  const fetchFolders = async () => {
    try {
      const folders = await getAllFolders();

      setFolderlist(
        folders.map((folder) => ({
          id: folder.id,
          name: folder.name,
        }))
      );
    } catch(error) {
      setMessage({
        type: "error",
        text: error.message,
      });
      setShowMessage(true);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const users = await getAllUsersName();

      setAllUsers(
        users.map((user)=>({
          ...user,
          disabled:false,
        }))
      );

      const currentUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      setSelectedUserName(currentUser.name);
    } catch(error){

      setMessage({
        type:"error",
        text:error.message,
      });

      setShowMessage(true);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetchAllGroups();

      setGroups(response);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
      setShowMessage(true);
    }
  };

  const fetchUserInfo = async(name)=>{

    try{
      const user =
        await getUserByName(name);
      user.emailNotification = user.emailNotification === "y";

      const group = groups.find(
        (g) => g.name === user.defaultGroup
      );

      user.defaultGroup = group ? String(group.id) : "";

      if(user?.agents){
        user.agents.mime =
          user.agents.mimetype;
        delete user.agents.mimetype;

        setEditUserData({
          ...initialAddUserData,
          ...user,
          agents:{
            ...initialAddUserData.agents,
            ...user.agents,
          },
          noPass:false,
        });

      }else{
        setEditUserData({
          ...initialAddUserData,
          ...user,
        });
      }

    }catch(error){
      setMessage({
        type:"error",
        text:error.message,
      });
      setShowMessage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rePass.pass1 !== rePass.pass2) {
      setMessage({
        type: "error",
        text: "Passwords do not match!",
      });
      setShowMessage(true);
      return;
    }

    setLoading(true);

    try {
      const response = await editUserByName(
        selectedUserName,
        {
          ...editUserData,
          emailNotification: editUserData.emailNotification ? "y" : "n",
          userPass: rePass.pass1 || undefined,
        }
      );

      await fetchUserInfo(selectedUserName);

      setRePass({
        pass1: "",
        pass2: "",
      });

      setMessage({
        type: "success",
        text: response.message,
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


  useEffect(()=>{
    fetchFolders();
    fetchAllUsers();
    fetchGroups();
  },[]);

  useEffect(() => {
    if (selectedUserName && groups.length > 0) {
      fetchUserInfo(selectedUserName);
    }
  }, [selectedUserName, groups]);


  const alertType =
    message.type === "success"
      ? "Success"
      : message.type === "error"
      ? "Error"
      : "Info";
  return (
  <div className="main-container my-3">
    <div className="w-full max-w-3xl">
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

      <h1 className="font-size-main-heading mb-6">
        Edit User Account
      </h1>

      {adminUser && (
        <div className="space-y-2 mb-6">
          <Label
            htmlFor="user-selector"
            className="font-semibold"
          >
            Select a user to edit
          </Label>

          <Select
            value={selectedUserName}
            onValueChange={(value) =>
              setSelectedUserName(value)
            }
          >
            <SelectTrigger
              id="user-selector"
              className="h-10 w-[390px]"
            >
              <SelectValue
                placeholder="Select user"
              />
            </SelectTrigger>

            <SelectContent>
              {allUsers.map((user)=>(
                <SelectItem
                  key={user.id}
                  value={user.name}
                  disabled={user.disabled}
                >
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Username */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="font-semibold"
          >
            Username.
          </Label>
          <Input
            id="name"
            name="name"
            value={
              editUserData.name ?? ""
            }
            onChange={handleChange}
            placeholder="Enter username"
            className="h-10"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="font-semibold"
          >
            Description (name, contact, or other information). This may be blank.
          </Label>
          <Input
            id="description"
            name="description"
            value={
              editUserData.description ?? ""
            }
            onChange={handleChange}
            placeholder="Enter description"
            className="h-10"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="font-semibold"
          >
            Email address. This may be blank.
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={
              editUserData.email ?? ""
            }
            onChange={handleChange}
            placeholder="Enter email address"
            className="h-10"
          />
        </div>

        {/* Email notification on job completion */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="emailNotification"
            name="emailNotification"
            checked={
              editUserData.emailNotification ?? false
            }
            onCheckedChange={(checked) =>
              handleChange({
                target: {
                  name: "emailNotification",
                  type: "checkbox",
                  checked,
                },
              })
            }
          />

          <Label
            htmlFor="emailNotification"
            className="font-semibold"
          >
            E-mail notification on job completion
          </Label>
        </div>
        {adminUser && (
          <>

            {/* Access Level */}
            <div className="space-y-2">
              <Label
                className="font-semibold"
              >
                Select the user's access level.
              </Label>

              <Select
                value={
                  editUserData.accessLevel
                }
                onValueChange={(value)=>
                  handleSelectChange(
                    "accessLevel",
                    value
                  )
                }
              >
                <SelectTrigger className="h-10 w-[550px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((item)=>(
                    <SelectItem
                      key={item.value}
                      value={
                        String(item.value)
                      }
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label
                className="font-semibold"
              >
                Select the user's status.
              </Label>

              <Select
                value={
                  editUserData.userStatus
                }
                onValueChange={(value)=>
                  handleSelectChange(
                    "userStatus",
                    value
                  )
                }
              >

                <SelectTrigger
                  className="h-10 w-[390px]"
                >
                  <SelectValue placeholder="Select status"/>
                </SelectTrigger>
                <SelectContent>
                  {userStatus.map((item)=>(
                    <SelectItem
                      key={item.value}
                      value={
                        String(item.value)
                      }
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Root Folder */}
        <div className="space-y-2">
          <Label
            className="font-semibold"
          >
            Select the user's top-level folder. Access is restricted to this folder.
          </Label>

          <Select
            value={
              editUserData.rootFolderId
                ? String(
                    editUserData.rootFolderId
                  )
                : undefined
            }
            onValueChange={(value)=>
              handleSelectChange(
                "rootFolderId",
                value
              )
            }
          >

            <SelectTrigger
              className="h-10 w-[390px]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {folderlist.map((folder)=>(
                <SelectItem
                  key={folder.id}
                  value={
                    String(folder.id)
                  }
                >
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {adminUser && (
          <>

            {/* Default Folder */}
            <div className="space-y-2">
              <Label
                className="font-semibold"
              >
                Select the user's default folder. Root for Upload and Browse will be this folder.
              </Label>

              <Select
                value={
                  editUserData.defaultFolderId
                    ? String(
                        editUserData.defaultFolderId
                      )
                    : undefined
                }
                onValueChange={(value)=>
                  handleSelectChange(
                    "defaultFolderId",
                    value
                  )
                }
              >
                <SelectTrigger
                  className="h-10 w-[390px]"
                >
                  <SelectValue placeholder="Select default folder"/>
                </SelectTrigger>

                <SelectContent>
                  {folderlist.map((folder)=>(
                    <SelectItem
                      key={folder.id}
                      value={
                        String(folder.id)
                      }
                    >
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* No password */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="noPass"
                checked={
                  editUserData.noPass
                }
                onCheckedChange={(checked)=>
                  handleChange({
                    target:{
                      name:"noPass",
                      type:"checkbox",
                      checked,
                    }
                  })
                }
              />
              <Label
                htmlFor="noPass"
                className="font-semibold"
              >
                Require no password.
              </Label>
            </div>
          </>
        )}

        {/* Password */}
        <div className="space-y-2">
          <Label
            className="font-semibold"
          >
            Password (Optional)
          </Label>
          <Input
            type="password"
            name="pass1"
            value={rePass.pass1}
            onChange={handleChange}
            placeholder="Enter password"
            className="h-10"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label
            className="font-semibold"
          >
            Re-enter password.
          </Label>
            <Input
              type="password"
              name="pass2"
              value={rePass.pass2}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={`h-10 ${
                !passwordsMatch
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
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
            accessLevel={
              editUserData.defaultVisibility
            }
            handleChange={handleChange}
          />
        </div>

        {/* Agents selected by default when uploading */}
        <div className="space-y-2">
          <Label className="font-semibold">
            Agents selected by default when uploading
          </Label>

          <CommonFields
            analysis={editUserData.agents}
            handleChange={handleChange}
            handleScanChange={(checked, name) => {
              setEditUserData((prev) => ({
                ...prev,
                agents: {
                  ...prev.agents,
                  [name]: checked,
                },
              }));
            }}
          />
        </div>

        {/* Bucket Pool */}
        <div className="space-y-2">
          <Label
            className="font-semibold"
          >
            Default Bucketpool
          </Label>

          <Select
            value={
              editUserData.defaultBucketpool
                ? String(
                    editUserData.defaultBucketpool
                  )
                : undefined
            }
            onValueChange={(value)=>
              handleSelectChange(
                "defaultBucketpool",
                value
              )
            }
          >
            <SelectTrigger
              className="h-10 w-[390px]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bucketPool.map((pool)=>(
                <SelectItem
                  key={pool.id}
                  value={
                    String(pool.id)
                  }
                >
                  {pool.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Default Group */}
        <div className="space-y-2">
          <Label
            className="font-semibold"
          >
            Select user's default group
          </Label>

          <Select
            value={editUserData.defaultGroup ?? ""}
            onValueChange={(value) =>
              handleSelectChange(
                "defaultGroup",
                value
              )
            }
          >
            <SelectTrigger
              className="h-10 w-[390px]"
            >
              <SelectValue/>
            </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem
                      key={group.id}
                      value={String(group.id)}
                  >
                      {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={
              loading ||
              (rePass.pass2 !== "" && !passwordsMatch)
            }
          >
            {loading
              ? "Updating Account..."
              : "Update Account"}
          </Button>
        </div>
      </form>

      {/* REST API Tokens */}
      <div className="mt-8">
        <TokenSpace
          setMessage={setMessage}
          setShowMessage={setShowMessage}
        />
      </div>
    </div>
  </div>
);
};

export default EditUserPage;