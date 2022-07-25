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

const AddUser = () => {
  // initial state to keep a track of the checkbox values
  const [checkboxes, setCheckboxes] = useState({
    enote: true,
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
  const [addUserData, setAddUserData] = useState(initialAddUserData);
  const [folderlist, setFolderlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  // API call to add user
  const handleSubmit = (e) => {
    e.preventDefault();

    // preparing the final user data to send to the server
    const finalUserData = { ...addUserData, public: addUserData.accessLevel };

    delete finalUserData.accessLevel;
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
    finalUserData.permission = parseInt(addUserData.permission, 10);

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
      setAddUserData({
        ...addUserData,
        [e.target.name]: e.target.value,
      });
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
      checkboxes.Check_agent_copyright = user.agents.copyright_email_author;
      checkboxes.Check_agent_ecc = user.agents.ecc;
      checkboxes.Check_agent_keyword = user.agents.keyword;
      checkboxes.Check_agent_mimetype = user.agents.mimetype;
      checkboxes.Check_agent_monk = user.agents.monk;
      checkboxes.Check_agent_nomos = user.agents.nomos;
      checkboxes.Check_agent_ojo = user.agents.ojo;
      checkboxes.Check_agent_pkgagent = user.agents.package;
      checkboxes.Check_agent_reso = user.agents.reso;
      checkboxes.Check_agent_bucket = user.agents.bucket;
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
                name="username"
                id="username"
                type="text"
                onChange={handleChange}
                value={addUserData.username}
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
                id="access-level"
                onChange={handleChange}
                options={accessLevels}
                property="name"
                value={addUserData.permission}
                valueProperty="value"
              >
                Access level
              </InputContainer>
              <InputContainer
                type="select"
                name="folder"
                id="root-folder"
                onChange={handleChange}
                options={folderlist}
                property="name"
                value={addUserData.folder}
              >
                User root folder
              </InputContainer>
              <InputContainer
                name="pass1"
                id="pass1"
                type="password"
                onChange={handleChange}
                value={addUserData.pass1}
              >
                Password (optional)
              </InputContainer>
              <InputContainer
                name="pass2"
                id="pass2"
                type="password"
                onChange={handleChange}
                value={addUserData.pass2}
              >
                Re-enter password
              </InputContainer>

              <p className="font-demi my-1">E-mail Notification</p>
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
                accessLevel={addUserData.accessLevel}
                handleChange={handleChange}
              />

              <label htmlFor="agents" className="font-demi my-1">
                Agents selected by default when uploading
                {Object.keys(checkboxes).map((key) => {
                  if (key !== "enote")
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
                value={addUserData.default_bucketpool_fk}
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
