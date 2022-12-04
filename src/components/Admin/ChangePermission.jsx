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

import { InputContainer } from "components/Widgets";

// Required functions for calling APIs
import { changeUserPermission, removeGroupMember } from "services/groups";

import PropTypes from "prop-types";

// Required constants
import { userPermissions } from "constants/constants";

const ChangePermissionContainer = ({
  groupMembers,
  noneGroupMembers,
  setShowMessage,
  setMessage,
  currGroup,
  handleFetchGroupMembers,
}) => {
  const [currUser, setCurrentUser] = useState(null);
  const [currNonMember, setCurrentNonMember] = useState(null);

  useEffect(() => {
    if (groupMembers.length > 0) {
      setCurrentUser({
        user: groupMembers[0].id,
        perm: groupMembers[0].group_perm,
      });
    }
  }, [groupMembers]);

  useEffect(() => {
    if (noneGroupMembers.length > 0) {
      setCurrentNonMember({
        user: noneGroupMembers[0].id,
        perm: -1,
      });
    }
  }, [noneGroupMembers]);

  const handleChangeCurrUser = async (newUser, isMember = true) => {
    if (isMember) {
      let perm;
      groupMembers.forEach((item) => {
        if (item.id === parseInt(newUser, 10)) {
          perm = item.group_perm;
        }
      });
      setCurrentUser({ user: parseInt(newUser, 10), perm });
    } else {
      setCurrentNonMember({ user: parseInt(newUser, 10), perm: -1 });
    }
  };

  const handleSetNewPermission = async (newPerm, isMember = true) => {
    try {
      let res;

      if (parseInt(newPerm, 10) === -1) {
        res = await removeGroupMember(currGroup, currUser.user);
      } else {
        res = await changeUserPermission(
          currGroup,
          isMember ? currUser.user : currNonMember.user,
          parseInt(newPerm, 10)
        );
      }

      setShowMessage(true);
      setMessage({
        type: "success",
        text: res.message,
      });

      handleFetchGroupMembers(currGroup);
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.message,
      });
    } finally {
      setTimeout(() => {
        setShowMessage(false);
      }, [3000]);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {groupMembers.length > 0 ? (
            <div className="col-md-12 col-sm-12 col-12 mt-3">
              <TableFill
                title="Group Members"
                ContentFill={
                  <tr>
                    <td>
                      <InputContainer
                        type="select"
                        name="name"
                        options={groupMembers}
                        id="select-user-tag"
                        value={currUser?.user}
                        property="name"
                        onChange={(e) => handleChangeCurrUser(e.target.value)}
                      />
                    </td>
                    <td>
                      <InputContainer
                        type="select"
                        name="name"
                        options={userPermissions}
                        id="select-tag"
                        value={currUser?.perm}
                        property="name"
                        onChange={(e) => handleSetNewPermission(e.target.value)}
                      />
                    </td>
                  </tr>
                }
              />
            </div>
          ) : (
            <></>
          )}
          {noneGroupMembers.length > 0 ? (
            <div className="col-md-12 col-sm-12 col-12 mt-3">
              <TableFill
                title="None Group Members"
                ContentFill={
                  <tr>
                    <td>
                      <InputContainer
                        type="select"
                        name="name"
                        options={noneGroupMembers}
                        id="select-user-tag"
                        value={currNonMember?.user}
                        property="name"
                        onChange={(e) =>
                          handleChangeCurrUser(e.target.value, false)
                        }
                      />
                    </td>
                    <td>
                      <InputContainer
                        type="select"
                        name="name"
                        options={userPermissions}
                        id="select-tag"
                        value={-1}
                        property="name"
                        onChange={(e) =>
                          handleSetNewPermission(e.target.value, false)
                        }
                      />
                    </td>
                  </tr>
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
export const TableFill = ({ ContentFill, title }) => (
  <>
    <h5>{title}</h5>
    <table className="table table-striped table-bordered rounded mt-1">
      <thead className="bg-dark text-light font-weight-bold">
        <tr>
          <th>User</th>
          <th>Permission</th>
        </tr>
      </thead>
      <tbody>{ContentFill}</tbody>
    </table>
  </>
);

TableFill.prototype = {
  ContentFill: PropTypes.any,
  title: PropTypes.string,
};

ChangePermissionContainer.propTypes = {
  groupMembers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  noneGroupMembers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
    .isRequired,
  setMessage: PropTypes.func,
  currGroup: PropTypes.number,
  handleFetchGroupMembers: PropTypes.func,
  setShowMessage: PropTypes.func,
};

export default ChangePermissionContainer;
