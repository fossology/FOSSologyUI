/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)

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

import Title from "components/Title";
// predefined common fields components
import CommonFields from "components/Upload/CommonFields";
// widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";
// constants
import {
  accessLevels,
  agents,
  bucketPool,
  initialAddUserData,
  userStatus,
} from "constants/constants";
import React, { useEffect, useState } from "react";
// services
import { getAllFolders } from "services/folders";
import { editUserById, getAllUsersName, getUserById } from "services/users";
import { isAdmin } from "shared/authHelper";

import TokenSpace from "./token_space";

const EditUser = () => {
  const initialMessage = {
    type: "success",
    text: "",
  };

  // initializing all the local states
  const [editUserData, setEditUserData] = useState({
    ...initialAddUserData,
    rootFolderId: 1,
    defaultFolderId: 1,
    defaultGroup: null,
    noPass: false,
    user_status: "active",
  });
  const [allUsers, setAllUsers] = useState([
    {
      id: JSON.parse(localStorage.getItem("user")).id,
      name: "",
      disabled: false,
    },
  ]);

  const [selectedUserId, setSelectedUserId] = useState(allUsers[0].id);
  const [folderlist, setFolderlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  const [rePass, setRePass] = useState({
    pass1: "",
    pass2: "",
  });

  // handle change event for all the input fields
  const handleChange = (e) => {
    switch (e.target.name) {
      case "accessLevel":
        setEditUserData({ ...editUserData, defaultVisibility: e.target.value });
        break;
      case "permission":
        setEditUserData({ ...editUserData, accessLevel: e.target.value });
        break;
      case "pass1":
        setRePass({ ...rePass, pass1: e.target.value });
        break;
      case "pass2":
        setRePass({ ...rePass, pass2: e.target.value });
        break;
      default:
        setEditUserData({
          ...editUserData,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value,
        });
        break;
    }

    // separate case for agents checkboxes
    if (
      e.target.type === "checkbox" &&
      e.target.name !== "emailNotification" &&
      e.target.name !== "noPass"
    ) {
      editUserData.agents[e.target.name] = e.target.checked;
      setEditUserData({ ...editUserData });
    }
  };

  const handleChangeForUsers = (e) => {
    setSelectedUserId(e.target.value);
  };

  // getting all the folders from the server
  useEffect(() => {
    getAllFolders()
      .then((folders) => {
        setFolderlist(() =>
          folders.map((f) => ({ id: f.id, name: f.name, disabled: false }))
        );
      })
      .catch((error) => {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      });
  }, []);

  const fetchAllUsers = async () => {
    let allUsersTemp = await getAllUsersName();
    allUsersTemp = allUsersTemp.map((user) => ({ ...user, disabled: false }));
    setAllUsers(allUsersTemp);
    setSelectedUserId(JSON.parse(localStorage.getItem("user")).id);
  };

  // getting the list of all the users
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const getUserInfo = async () => {
    try {
      const currUserInfo = await getUserById(selectedUserId);
      if (currUserInfo && currUserInfo.agents) {
        currUserInfo.agents.mime = currUserInfo.agents.mimetype;
        delete currUserInfo.agents.mimetype;
        setEditUserData({
          ...editUserData,
          ...currUserInfo,
          agents: {
            ...editUserData.agents,
            ...currUserInfo.agents,
          },
        });
      } else if (currUserInfo && !currUserInfo.agents) {
        setEditUserData({ ...editUserData, ...currUserInfo });
      }
    } catch (error) {
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [selectedUserId]);

  // API call to add user
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      setLoading(false);
      setShowMessage(false);
    }, 2000);

    try {
      if (rePass.pass1 === rePass.pass2) {
        // setting the request payload
        const finalUserData = {
          ...editUserData,
          _blank_pass: editUserData.noPass,
        };
        delete finalUserData.noPass;
        if (rePass.pass1.length !== 0) finalUserData.user_pass = rePass.pass1;

        setLoading(true);
        const res = await editUserById(selectedUserId, finalUserData);
        await getUserInfo();
        setRePass({ pass1: "", pass2: "" });
        setMessage({ type: "success", text: res.message });
        setShowMessage(true);
        setLoading(false);
      } else {
        setMessage({ type: "danger", text: "Passwords do not match!" });
        setShowMessage(true);
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Edit User Account" />
      <div className="main-container my-3">
        {/* Alert message for any error or success */}
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
              name="permission"
              id="access-level"
              onChange={handleChangeForUsers}
              options={allUsers}
              property="name"
              valueProperty="id"
            >
              Select a user
            </InputContainer>
            <hr />
          </>
        )}
        <div className="row">
          <div className="col-12 col-lg-8">
            <form>
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
                Description, full name, contact, etc. (optional)
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
                    Select the user's access level.
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
                    Select the user's status.
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
                value={editUserData.rootFolder}
              >
                Select the user's default folder. Root for Upload and Browse
                will be this folder.
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
                    Select the user's top-level folder. Access is restricted to
                    this folder.
                  </InputContainer>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <InputContainer
                      type="checkbox"
                      checked={editUserData.noPass}
                      name="noPass"
                      id="noPass"
                      onChange={handleChange}
                    />
                    <p className="font-demi">Require No-Password</p>
                  </div>
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
                checked={editUserData.emailNotification}
                name="emailNotification"
                id="emailNotification"
                onChange={handleChange}
              >
                E-mail notification on job completion
              </InputContainer>

              <p className="font-demi mt-1">Default upload visibility</p>
              <CommonFields
                accessLevel={editUserData.defaultVisibility}
                handleChange={handleChange}
              />

              <label htmlFor="agents" className="font-demi my-1">
                Default agents selected when uploading data.
                {Object.keys(editUserData.agents).map((key) => {
                  return (
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
                  );
                })}
              </label>
              <InputContainer
                type="select"
                name="defaultBucketpool"
                id="defaultBucketpool"
                onChange={handleChange}
                options={bucketPool}
                property="name"
                value={editUserData.defaultBucketpool}
              >
                Default bucketpool
              </InputContainer>
              <Button type="submit" onClick={handleSubmit} className="mt-4">
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
            <TokenSpace
              setMessage={setMessage}
              setShowMessage={setShowMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
