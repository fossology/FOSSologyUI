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

// Title
import Title from "components/Title";

// Widgets
import { Alert, InputContainer } from "components/Widgets";
import { getAllFolders } from "services/folders";
import { getUploadsFolderId } from "services/organizeUploads";
import { accessLevels } from "constants/constants";
import {
  changeUploadPermissions,
  getGroupsWithPermissions,
} from "services/upload";
import { getEquivalentValueForPermission, getEquivalentPermVals } from "utils";

// assets
import loader from "assets/images/loader.svg";
import { getAllGroups } from "services/groups";

const UploadPermissions = () => {
  const initialMessage = {
    type: "success",
    text: "",
  };

  // State Variables for handling Error Boundaries
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  // data variables
  const [folderlist, setFolderlist] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [noPermGroupsList, setNoPermGroupsList] = useState([]);
  const [allGroupsList, setAllGroupsList] = useState([]);
  const [groupsWithPerms, setGroupsWithPerms] = useState({});
  const [loading, setLoading] = useState(false);

  const initialPermFormData = {
    uploadId: null,
    folderId: 1,
    allUploadsPermission: false,
    groupId: -1,
    newPermission: "none",
    publicPermission: "none",
  };
  const [permFormData, setPermFormData] = useState(initialPermFormData);

  // getting all the folders from the server
  const fetchFoldersAndGroups = async () => {
    try {
      const groups = await getAllGroups();
      setAllGroupsList(groups);
      const folders = await getAllFolders();
      setFolderlist(() =>
        folders.map((f) => ({ id: f.id, name: f.name, disabled: false }))
      );
      setPermFormData((p) => ({
        ...p,
        folderId: parseInt(folders[0].id, 10),
      }));
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };
  useEffect(async () => {
    await fetchFoldersAndGroups();
  }, []);

  // getting all the uploads based on folder id
  const fetchUploads = async () => {
    const uploads = await getUploadsFolderId(permFormData.folderId);
    try {
      setUploadList(() =>
        uploads.map((u) => ({
          id: u.id,
          name: `${u.uploadname}, ${u.uploaddate}`,
          disabled: false,
        }))
      );
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };
  useEffect(async () => {
    await fetchUploads();
  }, [permFormData.folderId]);

  useEffect(() => {
    if (uploadList.length) {
      setPermFormData((p) => ({ ...p, uploadId: uploadList[0].id }));
    }
  }, [uploadList]);

  const fetchGroupsWithPerms = async () => {
    try {
      const resp = await getGroupsWithPermissions(permFormData.uploadId);
      const finalPermGroups = {};
      resp.permGroups.forEach((grp) => {
        finalPermGroups[grp.group_pk] = grp;
      });
      resp.permGroups = finalPermGroups;
      const permId = parseInt(resp.publicPerm, 10);
      setPermFormData((p) => ({
        ...p,
        publicPermission: getEquivalentPermVals(permId),
      }));
      setGroupsWithPerms(resp.permGroups);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };
  useEffect(async () => {
    if (uploadList.length) {
      await fetchGroupsWithPerms();
    }
  }, [permFormData.uploadId]);

  const segregateNoPermGroups = () => {
    try {
      const temp = allGroupsList.filter(
        (group) => !Object.keys(groupsWithPerms).includes(String(group.id))
      );
      setPermFormData((p) => ({
        ...p,
        groupId: temp.length ? temp[0].id : -1,
      }));
      setNoPermGroupsList(
        temp.map((group, idx) => ({
          id: idx,
          name: group.name,
          disabled: false,
          value: group.id,
        }))
      );
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  useEffect(async () => {
    if (Object.keys(groupsWithPerms).length) {
      segregateNoPermGroups();
    }
  }, [groupsWithPerms]);

  const handleEditRequestOnChange = async () => {
    setLoading(true);
    try {
      await changeUploadPermissions(permFormData);
      const temp = allGroupsList.filter(
        (group) => !Object.keys(groupsWithPerms).includes(String(group.id))
      );
      if (temp.length)
        setPermFormData((p) => ({
          ...p,
          groupId: temp[0].id,
          newPermission: "none",
        }));
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
    setLoading(false);
  };

  useEffect(async () => {
    if (
      permFormData.uploadId &&
      permFormData.groupId !== -1 &&
      permFormData.newPermission !== -1
    ) {
      await handleEditRequestOnChange();
    }
  }, [
    permFormData.newPermission,
    permFormData.groupId,
    permFormData.publicPermission,
  ]);

  const handleChange = (e, groupPk = "") => {
    if (e.target.type === "checkbox") {
      setPermFormData((p) => ({ ...p, [e.target.name]: e.target.checked }));
    } else if (e.target.name === "newPermission") {
      const permVal = getEquivalentValueForPermission(e.target.value);
      const grp = allGroupsList.filter((g) => String(g.id) === String(groupPk));
      if (grp.length) {
        setGroupsWithPerms((g) => ({
          ...g,
          [groupPk]: {
            ...g[groupPk],
            perm: permVal,
            group_name: grp[0].name,
            group_pk: groupPk,
          },
        }));
      }
      setPermFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
        groupId: groupPk,
      }));
      if (e.target.value === "none") {
        delete groupsWithPerms[groupPk];
        setGroupsWithPerms(groupsWithPerms);
        segregateNoPermGroups();
      }
    } else if (e.target.name === "publicPermission") {
      setPermFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
        groupId: 0,
      }));
    } else {
      setPermFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    }
  };

  const modifyAccessLevelOptions = (acsLev) => {
    const temp = acsLev.map((al) => {
      return {
        ...al,
        name: al.name.split(" (")[0],
      };
    });
    return temp;
  };

  return (
    <>
      {loading && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.65)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
          className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center"
        >
          <img src={loader} alt="updating.." />
          Updating..Please wait
        </div>
      )}
      <Title title="Edit Uploaded File Permissions" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <h1 className="font-size-main-heading">
          Edit Uploaded File Permissions
        </h1>
        <br />
        <div className="row">
          <div className="col-12 col-lg-8">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <InputContainer
                type="select"
                name="folderId"
                id="folderId"
                onChange={handleChange}
                options={folderlist}
                value={permFormData.folderId}
                property="name"
              >
                Select the folder that contains the upload:
              </InputContainer>
              <InputContainer
                type="checkbox"
                checked={permFormData.allUploadsPermission}
                name="allUploadsPermission"
                id="allUploadsPermission"
                onChange={handleChange}
              >
                Apply same permissions to all uploads in this folder
              </InputContainer>
              {!permFormData.allUploadsPermission && (
                <InputContainer
                  type="select"
                  name="uploadId"
                  id="uploadId"
                  onChange={handleChange}
                  options={uploadList}
                  value={permFormData.uploadId || ""}
                  property="name"
                >
                  Select the upload you wish to edit:
                </InputContainer>
              )}
              <InputContainer
                type="select"
                name="publicPermission"
                id="publicPermission"
                onChange={handleChange}
                options={modifyAccessLevelOptions(accessLevels)}
                value={permFormData.publicPermission}
                valueProperty="value"
                property="name"
              >
                Public Permission:
              </InputContainer>
              <h6>Modify upload permissions for below groups</h6>
              <table className="table table-striped text-primary-color font-size-medium table-bordered">
                <thead>
                  <tr className="font-bold">
                    <th>Group</th>
                    <th>Permission</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(groupsWithPerms).map((group) => {
                    return (
                      <tr key={group.group_pk} className="token_row">
                        <td>{group.group_name}</td>
                        <td>
                          <InputContainer
                            className="mt-0"
                            type="select"
                            name="newPermission"
                            id="newPermission"
                            onChange={(e) => handleChange(e, group.group_pk)}
                            options={accessLevels}
                            value={getEquivalentPermVals(
                              parseInt(group.perm, 10)
                            )}
                            valueProperty="value"
                            property="value"
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {noPermGroupsList.length ? (
                    <tr className="token_row">
                      <td>
                        <InputContainer
                          className="mt-0"
                          type="select"
                          name="groupId"
                          id="groupId"
                          onChange={handleChange}
                          options={[
                            {
                              id: -1,
                              name: "Select a new group",
                              disabled: true,
                              value: -1,
                            },
                            ...noPermGroupsList,
                          ]}
                          value={permFormData.groupId}
                          valueProperty="value"
                          property="name"
                        />
                      </td>
                      <td>
                        <InputContainer
                          className="mt-0"
                          type="select"
                          name="newPermission"
                          id="newPermission"
                          onChange={(e) =>
                            handleChange(e, permFormData.groupId)
                          }
                          options={[
                            {
                              id: -1,
                              name: "Select permission",
                              disabled: true,
                              value: -1,
                            },
                            ...modifyAccessLevelOptions(accessLevels),
                          ]}
                          value={permFormData.newPermission}
                          valueProperty="value"
                          property="name"
                        />
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </form>
            <h6>Note: </h6>All upload permissions take place immediately when
            <p>
              a value is changed. There is no submit button. Add new groups on
              the last line. If the clearing for the upload is in progress or
              ready for your recent group, the reuser can copy these.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPermissions;
