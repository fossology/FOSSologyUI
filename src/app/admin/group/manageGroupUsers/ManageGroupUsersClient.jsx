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

import { AlertBanner } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Spinner } from "@/components/Widgets";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  fetchAllGroupsForManagement,
  getGroupMembers,
  addGroupUser,
  deleteGroupUser,
  updateGroupUserPermission,
} from "@/services/groups";

import { getAllUsers } from "@/services/users";
import { handleError } from "@/shared/helper";

const permissions = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "1",
    label: "Admin",
  },
  {
    value: "0",
    label: "User",
  },
  {
    value: "2",
    label: "Advisor",
  },
];

const ManageGroupUsersPage = () => {
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] =
    useState("");

  const [members, setMembers] = useState([]);
  const [availableUsers, setAvailableUsers] =
    useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPermission, setNewUserPermission] =
    useState("0");

  const [loadingGroups, setLoadingGroups] =
    useState(false);

  const [loadingUsers, setLoadingUsers] =
    useState(false);

  const [updatingUser, setUpdatingUser] =
    useState(null);

  const [message, setMessage] =
    useState(null);

  const [showMessage, setShowMessage] =
    useState(false);

  const getUserName = (user) => {
    return (
      user?.name ||
      user?.userName ||
      user?.username ||
      ""
    );
  };

  useEffect(() => {
    const loadGroups = async () => {
      setLoadingGroups(true);

      try {
        const groups =
          await fetchAllGroupsForManagement();

        setGroupList(
          Array.isArray(groups)
            ? groups
            : []
        );
      } catch (error) {
        handleError(
          error,
          setMessage
        );
        setShowMessage(true);
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    if (!selectedGroup) {
      setMembers([]);
      setAvailableUsers([]);
      setNewUserName("");
      setNewUserPermission("0");
      return;
    }

    const loadGroupData = async () => {
      setLoadingUsers(true);

      try {
        const [
          usersResponse,
          membersResponse,
        ] = await Promise.all([
          getAllUsers(),
          getGroupMembers(selectedGroup),
        ]);

        const users = Array.isArray(usersResponse)
          ? usersResponse
          : [];

        const members = Array.isArray(membersResponse)
          ? membersResponse
          : [];

        const memberNames =
          new Set(
            members
              .map((member) =>
                getUserName(
                  member.user
                )
              )
              .filter(Boolean)
          );

        setMembers(members);
        setAvailableUsers(
          users.filter((user) => {
            const userName = getUserName(user);

            return userName && !memberNames.has(userName);
          })
        );
        setNewUserName("");
        setNewUserPermission("0");
      } catch (error) {
        handleError(
          error,
          setMessage
        );

        setShowMessage(true);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadGroupData();
  }, [selectedGroup]);

  const handleExistingPermissionChange =
    async (
      user,
      permission
    ) => {
      if (
        !selectedGroup ||
        !user
      ) {
        return;
      }

      const userName =
        getUserName(user);

      if (!userName) {
        return;
      }

      const numericPermission =
        Number(permission);

      setUpdatingUser(
        userName
      );

      try {
        if (permission === "none") {
          await deleteGroupUser({
            groupName: selectedGroup,
            userName,
          });
          setMembers((previousMembers) =>
            previousMembers.filter(
              (member) => getUserName(member.user) !== userName
            )
          );
          setAvailableUsers((previousUsers) => [
            ...previousUsers,
            user,
          ]);
        } else {
          await updateGroupUserPermission({
            groupName:
              selectedGroup,
            userName,
            perm:
              numericPermission,
          });

          setMembers((previousMembers) =>
            previousMembers.map((member) =>
              getUserName(member.user) === userName
                ? { ...member, groupPerm: numericPermission }
                : member
            )
          );
        }

        setMessage({
          type: "success",
          text:
            "User permission updated successfully.",
        });

        setShowMessage(true);
      } catch (error) {
        handleError(
          error,
          setMessage
        );

        setShowMessage(true);
      } finally {
        setUpdatingUser(null);
      }
    };

  const handleNewUserChange = async (userName) => {
    const selectedUser = availableUsers.find(
      (user) => getUserName(user) === userName
    );

    if (!selectedUser || !selectedGroup) {
      return;
    }

    setUpdatingUser(userName);

    try {
      await addGroupUser({
        groupName: selectedGroup,
        userName,
        perm: Number(newUserPermission),
      });

      setMembers((previousMembers) => [
        ...previousMembers,
        { user: selectedUser, groupPerm: Number(newUserPermission) },
      ]);
      setAvailableUsers((previousUsers) =>
        previousUsers.filter(
          (user) => getUserName(user) !== userName
        )
      );
      setNewUserName("");
      setNewUserPermission("0");
      setMessage({
        type: "success",
        text: "User added to group successfully.",
      });
      setShowMessage(true);
    } catch (error) {
      handleError(error, setMessage);
      setShowMessage(true);
    } finally {
      setUpdatingUser(null);
    }
  };

  const alertType =
    message?.type === "danger" || message?.type === "error"
      ? "Error"
      : message?.type === "success"
        ? "Success"
        : "Info";

  return (
    <div className="pb-10">
      {showMessage && message && (
        <div className="mb-4">
          <AlertBanner
              type={alertType}
              description={
                message.text
              }
              showClose
              onClose={() =>
                setShowMessage(
                  false
                )
              }
            />
          </div>
        )}

      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Manage Group Users
      </h1>

      <div className="space-y-6">
        {/* Group selection */}
        <div>
          <Label className="mb-3 block">
            Select the group to manage:
          </Label>

          <Select
            value={
              selectedGroup
            }
            onValueChange={
              setSelectedGroup
            }
            disabled={
              loadingGroups
            }
          >
            <SelectTrigger className="w-[320px]">
              {loadingGroups ? (
                <Spinner />
              ) : (
                <SelectValue placeholder="Select group" />
              )}
            </SelectTrigger>

            <SelectContent>
              {groupList.map(
                (group) => (
                  <SelectItem
                    key={
                      group.name
                    }
                    value={
                      group.name
                    }
                  >
                    {group.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <Table className="w-[596px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[298px]">
                User
              </TableHead>

              <TableHead className="w-[298px]">
                Permission
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {members.map((member) => {
              const userName = getUserName(member.user);

              return (
                <TableRow key={userName}>
                  <TableCell>{userName}</TableCell>
                  <TableCell>
                    <Select
                      value={String(member.groupPerm)}
                      onValueChange={(value) =>
                        handleExistingPermissionChange(member.user, value)
                      }
                      disabled={
                        !selectedGroup ||
                        updatingUser !== null ||
                        loadingUsers
                      }
                    >
                      <SelectTrigger className="h-8 w-[266px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {permissions.map((permission) => (
                          <SelectItem
                            key={permission.value}
                            value={permission.value}
                          >
                            {permission.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell>
                <Select
                  value={newUserName}
                  onValueChange={handleNewUserChange}
                  disabled={
                    !selectedGroup ||
                    loadingUsers ||
                    updatingUser !== null
                  }
                >
                  <SelectTrigger className="h-8 w-[266px]">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.map((user) => {
                      const userName = getUserName(user);
                      const description = user.description || user.userDescription;

                      return (
                        <SelectItem key={userName} value={userName}>
                          {description
                            ? `${description} (${userName})`
                            : userName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={newUserPermission}
                  onValueChange={setNewUserPermission}
                  disabled={
                    !selectedGroup ||
                    loadingUsers ||
                    updatingUser !== null
                  }
                >
                  <SelectTrigger className="h-8 w-[266px]">
                    <SelectValue placeholder="Select permission" />
                  </SelectTrigger>
                  <SelectContent>
                    {permissions
                      .filter(
                        (permission) => permission.value !== "none"
                      )
                      .map((permission) => (
                      <SelectItem key={permission.value} value={permission.value}>
                        {permission.label}
                      </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p>
          All user permissions take place
          immediately when a value is changed.
          There is no submit button.
          <br />
          Add new users on the last line.
        </p>

        <AlertBanner
          type="Warning"
          description="Note: By removing users, you may lose access to uploads, that are uploaded by them."
          showClose={false}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ManageGroupUsersPage;
