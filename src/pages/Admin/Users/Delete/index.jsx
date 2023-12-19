/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

import React, { useState, useEffect } from "react";
import messages from "constants/messages";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer, Spinner } from "components/Widgets";

// Required functions for calling APIs
import { getAllUsersName, deleteUser } from "services/users";

// Helper function for error handling
import { handleError } from "shared/helper";

const DeleteUser = () => {
  const initialDeleteUserData = {
    id: 0,
    confirm: false,
  };
  const initialUsersList = [
    {
      id: 0,
      name: "string",
      disabled: false,
    },
  ];
  const initialMessage = {
    type: "success",
    text: "",
  };
  const [deleteUserData, setDeleteUserData] = useState(initialDeleteUserData);
  const [usersList, setUsersList] = useState(initialUsersList);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const { id, confirm } = deleteUserData;

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setDeleteUserData({
        ...deleteUserData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setDeleteUserData({
        ...deleteUserData,
        [e.target.name]: e.target.value,
      });
    }
  };

  /* Defaults for the dropdown */
  const setDefaultsForDropdown = (res) => {
    let userList = res.map((user) => ({
      ...user,
      disabled: !(user.name !== "fossy" && user.name !== "Default User"),
    }));
    setUsersList(userList);
    userList = userList.filter(
      (user) => user.name !== "fossy" && user.name !== "Default User"
    );
    setDeleteUserData({
      ...deleteUserData,
      id: userList.length ? userList[0].id : 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirm) {
      setLoading(true);
      try {
        await deleteUser(id);
        setMessage({
          type: "success",
          text: messages.deletedUser,
        });
        const res = await getAllUsersName();
        setDefaultsForDropdown(res);
      } catch (error) {
        if (id === 0) {
          const err = new Error("Default users cannot be deleted");
          handleError(err, setMessage);
        } else {
          handleError(error, setMessage);
        }
      } finally {
        setLoading(false);
        setShowMessage(true);
      }
    } else {
      setMessage({
        type: "danger",
        text: messages.confirmDeletion,
      });
      setShowMessage(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUsersName();
        setDefaultsForDropdown(res);
      } catch (error) {
        handleError(error, setMessage);
        setShowMessage(true);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Title title="Delete A User" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">Delete A User</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <p>
              Deleting a user removes the user entry from the FOSSology system.
              The user's name, account information, and password will be
              permanently removed. (There is no 'undo' to this delete.)
              <br />
              To delete a user, enter the following information:
            </p>

            <form>
              <InputContainer
                type="select"
                name="id"
                id="admin-users-delete-id"
                onChange={handleChange}
                options={usersList}
                value={id}
                property="name"
              >
                Select the user to delete:
              </InputContainer>
              <InputContainer
                type="checkbox"
                checked={confirm}
                name="confirm"
                id="admin-users-delete-confirm"
                onChange={handleChange}
              >
                Confirm user deletion
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
                  "Delete"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
