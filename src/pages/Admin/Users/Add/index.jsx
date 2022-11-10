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
} from "constants/constants";
import React, { useEffect, useState } from "react";
// services
import { getAllFolders } from "services/folders";
import { addUser } from "services/users";

const AddUser = () => {
  const initialMessage = {
    type: "success",
    text: "",
  };

  // initializing all the local states
  const [addUserData, setAddUserData] = useState(initialAddUserData);
  const [rePass, setRePass] = useState({
    pass1: "",
    pass2: "",
  });
  const [folderlist, setFolderlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  // API call to add user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // preparing the final user data to send to the server
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    if (rePass.pass1 !== rePass.pass2) {
      setMessage({ type: "danger", text: "Passwords do not match." });
      setShowMessage(true);
    } else {
      setLoading(true);
      try {
        const finalUserData = { ...addUserData, user_pass: rePass.pass1 };
        const res = await addUser(finalUserData);
        setMessage({ type: "success", text: res.message });
        setShowMessage(true);
        setAddUserData(initialAddUserData);
      } catch (error) {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      }
      setLoading(false);
    }
  };

  // handle change event for all the input fields
  const handleChange = (e) => {
    switch (e.target.name) {
      case "accessLevel":
        setAddUserData({ ...addUserData, defaultVisibility: e.target.value });
        break;
      case "permission":
        setAddUserData({ ...addUserData, accessLevel: e.target.value });
        break;
      case "pass1":
        setRePass({ ...rePass, pass1: e.target.value });
        break;
      case "pass2":
        setRePass({ ...rePass, pass2: e.target.value });
        break;
      default:
        setAddUserData({
          ...addUserData,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value,
        });
        break;
    }

    // separate case for agents checkboxes
    if (e.target.type === "checkbox") {
      addUserData.agents[e.target.name] = e.target.checked;
      setAddUserData({ ...addUserData });
    }
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

  // setting defaults for the agent checkboxes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.agents) {
      addUserData.agents.copyright_email_author =
        user.agents.copyright_email_author;
      addUserData.agents.ecc = user.agents.ecc;
      addUserData.agents.keyword = user.agents.keyword;
      addUserData.agents.mime = user.agents.mimetype;
      addUserData.agents.monk = user.agents.monk;
      addUserData.agents.nomos = user.agents.nomos;
      addUserData.agents.ojo = user.agents.ojo;
      addUserData.agents.package = user.agents.package;
      addUserData.agents.reso = user.agents.reso;
      addUserData.agents.bucket = user.agents.bucket;
      addUserData.agents.heritage = user.agents.heritage;
    }
  }, []);

  return (
    <>
      <Title title="Add User" />
      <div className="main-container my-3">
        {/* Alert message for any error or success */}
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
            <form>
              <InputContainer
                name="name"
                id="name"
                type="text"
                onChange={handleChange}
                value={addUserData.name}
              >
                Username
              </InputContainer>
              <InputContainer
                name="description"
                id="description"
                type="text"
                onChange={handleChange}
                value={addUserData.description}
              >
                Description, full name, contact, etc. (optional)
              </InputContainer>
              <InputContainer
                name="email"
                id="email"
                type="email"
                onChange={handleChange}
                value={addUserData.email}
              >
                Email address
              </InputContainer>
              <InputContainer
                type="select"
                name="permission"
                id="permission"
                onChange={handleChange}
                options={accessLevels}
                property="name"
                value={addUserData.accessLevel}
                valueProperty="value"
              >
                Access level
              </InputContainer>
              <InputContainer
                type="select"
                name="rootFolderId"
                id="rootFolderId"
                onChange={handleChange}
                options={folderlist}
                property="name"
                value={addUserData.rootFolderId}
              >
                User root folder
              </InputContainer>
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
                {Object.keys(addUserData.agents).map((key) => {
                  return (
                    <InputContainer
                      key={key}
                      type="checkbox"
                      checked={addUserData.agents[key]}
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
                value={addUserData.defaultBucketpool}
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
                  "Add User"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
