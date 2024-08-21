/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)

 SPDX-License-Identifier: GPL-2.0

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

import React, { useEffect, useState } from "react";

// Title
import Title from "components/Title";

// Widgets
import { Alert, InputContainer } from "components/Widgets";

// Required functions for calling APIs
import { fetchAllGroupMembers, fetchAllGroups } from "services/groups";

// Required page components
import ChangePermissionContainer from "components/Admin/ChangePermission";
import { getAllUsers } from "../../../../services/users";

const ManageGroup = () => {
  const initialMessage = {
    type: "success",
    text: "",
  };

  const [currGroup, setCurrentGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [noneGroupMembers, setNoneGroupMembers] = useState([]);

  const [groups, setGroups] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleSetAllUsers = async (groupId) => {
    try {
      const members = await fetchAllGroupMembers(groupId);
      const memberUsers = [];

      for (let i = 0; i < members.length; i++) {
        memberUsers.push({
          id: members[i].user.id,
          group_perm: members[i].group_perm,
          name: members[i].user.name,
        });
      }

      setGroupMembers(memberUsers);
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.message,
      });
    }
  };

  useEffect(async () => {
    const users = await getAllUsers();

    const noneMembers = [];

    for (let i = 0; i < users.length; i++) {
      let isMember = false;
      for (let j = 0; j < groupMembers.length; j++) {
        if (users[i].id === groupMembers[j].id) {
          isMember = true;
          break;
        }
      }
      if (!isMember) {
        noneMembers.push(users[i]);
      }
    }
    setNoneGroupMembers(noneMembers);
  }, [groupMembers]);

  useEffect(async () => {
    try {
      const res = await fetchAllGroups();
      setCurrentGroup(res[0].id);
      setGroups(res);
      await handleSetAllUsers(res[0].id);
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.message,
      });
    }
  }, []);

  const handleFetchGroupMembers = async (groupId) => {
    try {
      await handleSetAllUsers(groupId);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.message,
      });
    }
  };

  const handleGroupChange = async (e) => {
    setCurrentGroup(e.target.value);
    await handleSetAllUsers(e.target.value);
  };

  return (
    <>
      <Title title="Manage Group Users" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">Manage Group Users</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <form>
              <InputContainer
                type="select"
                name="name"
                options={groups}
                id="select-tag"
                property="name"
                onChange={(e) => handleGroupChange(e)}
                value={currGroup}
              >
                Select group to manage:
              </InputContainer>
            </form>
            {noneGroupMembers && groupMembers && (
              <ChangePermissionContainer
                currGroup={currGroup}
                groupMembers={groupMembers}
                noneGroupMembers={noneGroupMembers}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
                handleFetchGroupMembers={handleFetchGroupMembers}
              />
            )}
          </div>
          <div className="col-10 mt-4">
            <p>
              All user permissions take place immediately when a value is
              changed. There is no submit button. Add new users on the last
              line.
            </p>
            <p className="font-weight-bold">
              Note: By removing users, you may loose access to uploads, that are
              uploaded by them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageGroup;
