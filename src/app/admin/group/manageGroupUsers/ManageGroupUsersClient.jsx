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
  getAllGroups,
  getGroupMembers,
  addGroupUser,
  updateGroupUserPermission,
} from "@/services/groups";

import { getAllUsers } from "@/services/users";
import { handleError } from "@/shared/helper";

const permissions = [
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

  const [availableUsers, setAvailableUsers] =
    useState([]);
  const [rowOneUser, setRowOneUser] =
    useState(null);
  const [rowOnePermission, setRowOnePermission] =
    useState("0");
  const [rowTwoUser, setRowTwoUser] =
    useState(null);
  const [rowTwoPermission, setRowTwoPermission] =
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

  const findUserByName = (
    users,
    userName
  ) => {
    return (
      users.find(
        (user) =>
          getUserName(user) === userName
      ) || null
    );
  };

  const findDefaultUser = (users) => {
    return (
      users.find(
        (user) =>
          getUserName(user) ===
          "Default User"
      ) ||
      users.find(
        (user) =>
          user.description ===
          "Default User when nobody is logged in"
      ) ||
      null
    );
  };

  const findFossy = (users) => {
    return (
      users.find(
        (user) =>
          getUserName(user) ===
          "fossy"
      ) ||
      users.find(
        (user) =>
          user.description ===
          "Default Administrator"
      ) ||
      null
    );
  };

  useEffect(() => {
    const loadGroups = async () => {
      setLoadingGroups(true);

      try {
        const groups =
          await getAllGroups();

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
      setRowOneUser(null);
      setRowOnePermission("0");
      setRowTwoUser(null);
      setRowTwoPermission("0");
      setAvailableUsers([]);
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

        const defaultUser =
          findDefaultUser(users);

        const fossy =
          findFossy(users);

        const memberMap = new Map(
          members
            .map((member) => {
              const userName =
                getUserName(member.user);

              if (!userName) {
                return null;
              }

              return [
                userName,
                member,
              ];
            })
            .filter(Boolean)
        );

        if (
          selectedGroup ===
          "Default User"
        ) {
          const defaultUserMember =
            defaultUser
              ? memberMap.get(
                  getUserName(defaultUser)
                )
              : null;

          const fossyMember =
            fossy
              ? memberMap.get(
                  getUserName(fossy)
                )
              : null;

          setRowOneUser(
            defaultUser
          );

          setRowOnePermission(
            defaultUserMember
              ? String(
                  defaultUserMember.groupPerm
                )
              : "1"
          );

          setRowTwoUser(
            fossy
          );

          setRowTwoPermission(
            fossyMember
              ? String(
                  fossyMember.groupPerm
                )
              : "0"
          );

          setAvailableUsers([]);

          return;
        }

        if (
          selectedGroup ===
          "fossy"
        ) {
          const defaultUserMember =
            defaultUser
              ? memberMap.get(
                  getUserName(defaultUser)
                )
              : null;

          const fossyMember =
            fossy
              ? memberMap.get(
                  getUserName(fossy)
                )
              : null;

          setRowOneUser(
            defaultUser
          );

          setRowOnePermission(
            defaultUserMember
              ? String(
                  defaultUserMember.groupPerm
                )
              : "0"
          );

          setRowTwoUser(
            fossy
          );

          setRowTwoPermission(
            fossyMember
              ? String(
                  fossyMember.groupPerm
                )
              : "1"
          );

          setAvailableUsers([]);

          return;
        }


        const fossyMember =
          fossy
            ? memberMap.get(
                getUserName(fossy)
              )
            : null;

        setRowOneUser(
          fossy
        );

        setRowOnePermission(
          fossyMember
            ? String(
                fossyMember.groupPerm
              )
            : "1"
        );

        const secondRowMember =
          members.find(
            (member) =>
              getUserName(member.user) !==
              getUserName(fossy)
          );

        if (secondRowMember) {
          setRowTwoUser(
            secondRowMember.user
          );

          setRowTwoPermission(
            String(
              secondRowMember.groupPerm
            )
          );
        } else {
          setRowTwoUser(null);
          setRowTwoPermission("0");
        }

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

        const usersForRowTwo =
          users.filter((user) => {
            const userName =
              getUserName(user);

            return (
              userName &&
              userName !==
                getUserName(fossy) &&
              !memberNames.has(
                userName
              )
            );
          });

        setAvailableUsers(
          usersForRowTwo
        );
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
      permission,
      row
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
        await updateGroupUserPermission({
          groupName:
            selectedGroup,
          userName,
          perm:
            numericPermission,
        });

        if (row === 1) {
          setRowOnePermission(
            permission
          );
        }

        if (row === 2) {
          setRowTwoPermission(
            permission
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

  const handleRowTwoUserSelect = async (userName) => {
    const selectedUser = findUserByName(
      availableUsers,
      userName
    );

    if (!selectedUser || !selectedGroup) {
      return;
    }

    const selectedPermission = Number(
      rowTwoPermission
    );

    const selectedUserName =
      getUserName(selectedUser);

    setRowTwoUser(selectedUser);

    setUpdatingUser(selectedUserName);

    try {
      await addGroupUser({
        groupName: selectedGroup,
        userName: selectedUserName,
        perm: selectedPermission,
      });

      setAvailableUsers((previousUsers) =>
        previousUsers.filter(
          (user) =>
            getUserName(user) !== selectedUserName
        )
      );

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

  const handleRowTwoPermissionChange =
    async (permission) => {
      if (
        !selectedGroup ||
        !rowTwoUser
      ) {
        return;
      }

      const userName =
        getUserName(rowTwoUser);

      if (!userName) {
        return;
      }

      const numericPermission =
        Number(permission);

      setRowTwoPermission(
        permission
      );

      setUpdatingUser(
        userName
      );

      try {
        await addGroupUser({
          groupName:
            selectedGroup,
          userName,
          perm:
            numericPermission,
        });

        setRowTwoUser(
          rowTwoUser
        );

        setRowTwoPermission(
          permission
        );

        setAvailableUsers(
          (previousUsers) =>
            previousUsers.filter(
              (user) =>
                getUserName(user) !==
                userName
            )
        );

        setMessage({
          type: "success",
          text:
            "User added to group successfully.",
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

  const alertType =
    message?.type === "danger" ||
    message?.type === "error"
      ? "Error"
      : message?.type === "success"
      ? "Success"
      : "Info";

  return (
    <div className="pb-10">
      {showMessage &&
        message && (
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
            {/* ROW 1 */}
            <TableRow>
              <TableCell>
                {rowOneUser
                  ? getUserName(
                      rowOneUser
                    )
                  : ""}
              </TableCell>

              <TableCell>
                <Select
                  value={
                    rowOnePermission
                  }
                  onValueChange={(
                    value
                  ) =>
                    handleExistingPermissionChange(
                      rowOneUser,
                      value,
                      1
                    )
                  }
                  disabled={
                    !rowOneUser ||
                    !selectedGroup ||
                    updatingUser !==
                      null ||
                    loadingUsers
                  }
                >
                  <SelectTrigger className="h-8 w-[266px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {permissions.map(
                      (
                        permission
                      ) => (
                        <SelectItem
                          key={
                            permission.value
                          }
                          value={
                            permission.value
                          }
                        >
                          {
                            permission.label
                          }
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>

            {/* ROW 2 */}
            <TableRow>
              <TableCell>
                {rowTwoUser ? (
                  getUserName(
                    rowTwoUser
                  )
                ) : (
                  <Select
                    value=""
                    onValueChange={
                      handleRowTwoUserSelect
                    }
                    disabled={
                      !selectedGroup ||
                      loadingUsers ||
                      updatingUser !==
                        null
                    }
                  >
                    <SelectTrigger className="h-8 w-[266px]">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>

                    <SelectContent>
                      {availableUsers.map(
                        (user) => {
                          const userName =
                            getUserName(
                              user
                            );

                          const description =
                            user.description ||
                            user.userDescription;

                          return (
                            <SelectItem
                              key={
                                userName
                              }
                              value={
                                userName
                              }
                            >
                              {description
                                ? `${description} (${userName})`
                                : userName}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                )}
              </TableCell>

              <TableCell>
                <Select
                  value={rowTwoPermission}
                  onValueChange={
                    rowTwoUser
                      ? (value) =>
                          handleExistingPermissionChange(
                            rowTwoUser,
                            value,
                            2
                          )
                      : (value) =>
                          setRowTwoPermission(value)
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
