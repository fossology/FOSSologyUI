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

import React, { useEffect, useState } from "react";
import Title from "components/Title";

// widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// services
import { getAllFolders } from "services/folders";

// predefined common fields components
import CommonFields from "components/Upload/CommonFields";

// constants
import {
  accessLevels,
  agents,
  bucketPool,
  initialAddUserData,
} from "constants/constants";
import { getAllUsersName, getUserById } from "services/users";
import TokenSpace from "./token_space";

const EditUser = () => {
  // initial state to keep a track of the checkbox values
  const [checkboxes, setCheckboxes] = useState({
    enote: true,
    no_pass: false,
    Check_agent_bucket: false,
    Check_agent_copyright: false,
    Check_agent_ecc: false,
    Check_agent_keyword: false,
    Check_agent_mimetype: false,
    Check_agent_monk: false,
    Check_agent_nomos: false,
    Check_agent_ojo: false,
    Check_agent_pkgagent: false,
    Check_agent_reso: false,
    Check_agent_shagent: false,
  });

  const initialMessage = {
    type: "success",
    text: "",
  };

  // initializing all the local states
  const [editUserData, setEditUserData] = useState({
    ...initialAddUserData,
    rootFolderId: 1,
    topFolderId: 1,
  });
  const [allUsers, setAllUsers] = useState([
    {
      id: 0,
      name: "",
      disabled: false,
    },
  ]);

  const [selectedUserId, setSelectedUserId] = useState(allUsers[0].id);
  const [folderlist, setFolderlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  // API call to add user
  const handleSubmit = (e) => {
    e.preventDefault();

    // preparing the final user data to send to the server
    const finalUserData = { ...editUserData };

    finalUserData.public = editUserData.accessLevel;
    delete editUserData.accessLevel;
    delete finalUserData.folder;
    finalUserData.Check_agent_copyright = checkboxes.Check_agent_copyright;
    finalUserData.Check_agent_ecc = checkboxes.Check_agent_ecc;
    finalUserData.Check_agent_keyword = checkboxes.Check_agent_keyword;
    finalUserData.Check_agent_mimetype = checkboxes.Check_agent_mimetype;
    finalUserData.Check_agent_monk = checkboxes.Check_agent_monk;
    finalUserData.Check_agent_nomos = checkboxes.Check_agent_nomos;
    finalUserData.Check_agent_ojo = checkboxes.Check_agent_ojo;
    finalUserData.Check_agent_pkgagent = checkboxes.Check_agent_pkgagent;
    finalUserData.Check_agent_reso = checkboxes.Check_agent_reso;
    finalUserData.Check_agent_shagent = checkboxes.Check_agent_shagent;
    finalUserData.enote = checkboxes.enote;
    finalUserData.no_pass = checkboxes.no_pass;
    finalUserData.permission = parseInt(editUserData.permission, 10);

    // mock asynchrounchronous instructions
    setTimeout(() => {
      setLoading(false);
      setShowMessage(false);
    }, 2000);
    setLoading(true);
    setMessage({ type: "danger", text: "Failed to fetch" });
    setShowMessage(true);
  };

  // handle change event for all the input fields
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setCheckboxes({
        ...checkboxes,
        [e.target.name]: e.target.checked,
      });
    } else {
      setEditUserData({
        ...editUserData,
        [e.target.name]: e.target.value,
      });
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
    setSelectedUserId(allUsersTemp[0].id);
  };

  // getting the list of all the users
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const getUserInfo = async () => {
    const currUserInfo = await getUserById(selectedUserId);
    if (currUserInfo.agents) {
      checkboxes.Check_agent_copyright =
        currUserInfo.agents.copyright_email_author;
      checkboxes.Check_agent_ecc = currUserInfo.agents.ecc;
      checkboxes.Check_agent_keyword = currUserInfo.agents.keyword;
      checkboxes.Check_agent_mimetype = currUserInfo.agents.mimetype;
      checkboxes.Check_agent_monk = currUserInfo.agents.monk;
      checkboxes.Check_agent_nomos = currUserInfo.agents.nomos;
      checkboxes.Check_agent_ojo = currUserInfo.agents.ojo;
      checkboxes.Check_agent_pkgagent = currUserInfo.agents.package;
      checkboxes.Check_agent_reso = currUserInfo.agents.reso;
      checkboxes.Check_agent_bucket = currUserInfo.agents.bucket;
      delete currUserInfo.agents;
    }
    currUserInfo.username = currUserInfo.name;
    delete currUserInfo.name;
    setEditUserData(currUserInfo);
  };

  useEffect(() => {
    getUserInfo();
  }, [selectedUserId]);

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
        <div className="row">
          <div className="col-12 col-lg-8">
            <form>
              <InputContainer
                name="username"
                id="username"
                type="text"
                onChange={handleChange}
                value={editUserData.username}
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
              <InputContainer
                type="select"
                name="permission"
                id="access-level"
                onChange={handleChange}
                options={accessLevels}
                property="name"
                value={editUserData.permission}
                valueProperty="value"
              >
                Access level
              </InputContainer>
              <InputContainer
                type="select"
                name="rootFolder"
                id="root-folder"
                onChange={handleChange}
                options={folderlist}
                property="name"
                value={editUserData.rootFolder}
              >
                Select the user's default folder. Root for Upload and Browse
                will be this folder.
              </InputContainer>
              <InputContainer
                type="select"
                name="topFolder"
                id="top-folder"
                onChange={handleChange}
                options={folderlist}
                property="name"
                value={editUserData.topFolder}
              >
                Select the user's top-level folder. Access is restricted to this
                folder.
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
                  checked={checkboxes.no_pass}
                  name="no_pass"
                  id="no_pass"
                  onChange={handleChange}
                />
                <p className="font-demi">Require No-Password</p>
              </div>
              <InputContainer
                name="pass1"
                id="pass1"
                type="password"
                onChange={handleChange}
                value={editUserData.pass1}
              >
                Password (optional)
              </InputContainer>
              <InputContainer
                name="pass2"
                id="pass2"
                type="password"
                onChange={handleChange}
                value={editUserData.pass2}
              >
                Re-enter password
              </InputContainer>

              <p className="font-demi my-1">Require No-Password</p>
              <InputContainer
                type="checkbox"
                checked={checkboxes.enote}
                name="enote"
                id="enote"
                onChange={handleChange}
              >
                Check to enable email notification when upload scan completes.
              </InputContainer>

              <p className="font-demi mt-1">Default upload visibility</p>
              <CommonFields
                accessLevel={editUserData.accessLevel}
                handleChange={handleChange}
              />

              <label htmlFor="agents" className="font-demi my-1">
                Agents selected by default when uploading
                {Object.keys(checkboxes).map((key) => {
                  if (key !== "enote" && key !== "no_pass")
                    return (
                      <InputContainer
                        key={key}
                        type="checkbox"
                        checked={checkboxes[key]}
                        name={key}
                        id={key}
                        onChange={handleChange}
                      >
                        {agents[key]}
                      </InputContainer>
                    );
                  return null;
                })}
              </label>
              <InputContainer
                type="select"
                name="default_bucketpool_fk"
                id="default_bucketpool_fk"
                onChange={handleChange}
                options={bucketPool}
                property="name"
                value={editUserData.default_bucketpool_fk}
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
