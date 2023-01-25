/*
 Copyright (C) 2022 Samuel Dushimimana

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
import messages from "constants/messages";

// Jquery for handling modal
import $ from "jquery";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer } from "components/Widgets";

// Required functions for calling APIs
import { deleteGroup, fetchAllDeletableGroups } from "services/groups";
import DeleteConfirmation from "components/Modals/DeleteConfirmation";

const DeleteGroup = () => {
  const initialMessage = {
    type: "",
    text: "",
  };

  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // State Variables for handling Error Boundaries
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  useEffect(async () => {
    try {
      const res = await fetchAllDeletableGroups();
      setGroups(res);
    } catch (e) {
      setMessage({
        type: "error",
        text: e.message,
      });
      setShowMessage(true);
    }
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      setSelectedGroupId(groups[0].id);
    }
  }, [groups]);

  const toggleModal = (modalId, status) => {
    // eslint-disable-next-line func-names
    $(function () {
      if (status === "show") {
        $(modalId).modal("show");
      } else {
        $(modalId).modal("hide");
        $(".modal-backdrop").remove();
      }
    });
  };

  const deleteItem = async () => {
    setLoading(true);
    try {
      await deleteGroup(selectedGroupId);
      setMessage({
        type: "success",
        text: messages.deletedGroup,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.message,
      });
    } finally {
      setLoading(false);
      setShowMessage(true);
      toggleModal("#deleteConfirmationModal", "hide");
    }
  };

  return (
    <>
      <Title title="Delete Group" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">Delete Group</h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <form>
              <InputContainer
                name="group"
                type="select"
                onChange={(e) => setSelectedGroupId(e.target.value)}
                options={groups}
                property="name"
              >
                Select group to delete:
              </InputContainer>
              <Button
                type="button"
                dataToggle="modal"
                dataTarget="#deleteConfirmationModal"
                className="mt-4"
                disabled={groups.length === 0}
              >
                Delete
              </Button>
            </form>
          </div>
          <DeleteConfirmation callBack={deleteItem} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default DeleteGroup;
