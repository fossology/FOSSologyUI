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

import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertBanner } from "@/components/ui/alert";
import Chip from "@/components/ui/chip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllFolders } from "@/services/folders";
import { getUploadsFolderId } from "@/services/organizeUploads";
import {
  getAllUsers,
  getUserSelf,
} from "@/services/users";
import { importFossologyDump } from "@/services/jobs";

const ImportFossologyDumpClient = () => {
    const [folders, setFolders] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedUpload, setSelectedUpload] = useState(null);
    const [selectedUser, setSelectedUser] = useState("me");

    const [selectedFile, setSelectedFile] = useState(null);

    const [loadingFolders, setLoadingFolders] = useState(false);
    const [loadingUploads, setLoadingUploads] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("Info");
    const [showMessage, setShowMessage] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchFolders = async () => {
        try {
            setLoadingFolders(true);

            const response = await getAllFolders();

            const folderData = Array.isArray(response)
            ? response
            : response?.data ?? [];

            setFolders(
            folderData.map((folder) => ({
                id: folder.id,
                name: folder.name,
            }))
            );
        } catch (error) {
            console.error("Failed to fetch folders:", error);

            setMessage(
            error?.message || "Failed to load folders."
            );
            setMessageType("Error");
            setShowMessage(true);
        } finally {
            setLoadingFolders(false);
        }
        };

        fetchFolders();
    }, []);

    useEffect(() => {
    setSelectedUpload("");

    if (!selectedFolder) {
        setUploads([]);
        return;
    }

    const fetchUploads = async () => {
        try {
        setLoadingUploads(true);

        const response = await getUploadsFolderId({
            folderId: Number(selectedFolder),
            recursive: false,
        });

        setUploads(response || []);
        } catch (error) {
        console.error("Failed to fetch uploads:", error);

        setUploads([]);
        setMessage(
            error?.message || "Failed to load uploads."
        );
        setMessageType("Error");
        setShowMessage(true);
        } finally {
        setLoadingUploads(false);
        }
    };

    fetchUploads();
    }, [selectedFolder]);


    useEffect(() => {
    const fetchUsers = async () => {
        try {
        setLoadingUsers(true);

        const [allUsersResponse, currentUserResponse] =
            await Promise.all([
            getAllUsers(),
            getUserSelf(),
            ]);

        const allUsers = Array.isArray(allUsersResponse)
            ? allUsersResponse
            : allUsersResponse?.data ?? [];

        const currentUser = currentUserResponse;

        const currentUserId = currentUser?.id;
        const currentUserName = currentUser?.name;

        const otherUsers = allUsers.filter((user) => {
            if (
            currentUserId !== undefined &&
            user.id === currentUserId
            ) {
            return false;
            }

            if (
            currentUserName &&
            user.name === currentUserName
            ) {
            return false;
            }

            return true;
        });

        setUsers(otherUsers);
        } catch (error) {
        console.error(
            "Failed to fetch users:",
            error
        );

        setUsers([]);

        setMessage(
            error?.message || "Failed to load users."
        );
        setMessageType("Error");
        setShowMessage(true);
        } finally {
        setLoadingUsers(false);
        }
    };

    fetchUsers();
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files || []);

        if (files.length > 0) {
        setSelectedFile(files[0]);
        } else {
        setSelectedFile(null);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);

        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFolder) {
        setMessage("Select a folder.");
        setMessageType("Error");
        setShowMessage(true);
        return;
    }

    if (!selectedUpload) {
        setMessage("Select an upload.");
        setMessageType("Error");
        setShowMessage(true);
        return;
    }

    if (!selectedFile) {
        setMessage("Select a dump report.");
        setMessageType("Error");
        setShowMessage(true);
        return;
    }

    try {
        setLoading(true);

        const formData = new FormData();

        formData.append("report", selectedFile);

        const importerUser =
        selectedUser === "me"
            ? 0
            : Number(selectedUser);

        formData.append(
        "importerUser",
        String(importerUser)
        );

        const response = await importFossologyDump(
        selectedUpload,
        formData
        );

        setMessage(
        response?.message ||
        "Dump report uploaded and import job scheduled successfully."
        );
        setMessageType("Success");
        setShowMessage(true);

        // Reset the file after successful scheduling
        setSelectedFile(null);

        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    } catch (error) {
        console.error(
        "Failed to import Fossology dump:",
        error
        );

        setMessage(
        error?.message ||
        "Failed to upload and import the dump report."
        );
        setMessageType("Error");
        setShowMessage(true);
    } finally {
        setLoading(false);
    }
    };

    const isSubmitDisabled =
        !selectedFolder ||
        !selectedUpload ||
        !selectedFile ||
        loading;

    return (
        <div className="max-w-5xl mx-40 my-6 px-4">
        {showMessage && (
            <div className="mb-4">
            <AlertBanner
                type={messageType}
                description={message}
                showClose
                onClose={() => setShowMessage(false)}
            />
            </div>
        )}

        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
            Decision Dump Importer
        </h1>

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div>
            <Label className="mb-3 block">
                1. Select the folder that contains the upload:
            </Label>

            <Select
            value={
                selectedFolder
                ? selectedFolder.toString()
                : ""
            }
            onValueChange={(value) => {
                setSelectedFolder(Number(value));
            }}
            >
            <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Select folder" />
            </SelectTrigger>

            <SelectContent>
                {folders.map((folder) => (
                <SelectItem
                    key={folder.id}
                    value={folder.id.toString()}
                >
                    {folder.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
            </div>

            <div>
            <Label className="mb-3 block">
                2. Select the upload you wish to import:
            </Label>

            {selectedFolder &&
            !loadingUploads &&
            uploads.length === 0 ? (
                <p className="text-sm text-alert-700">
                No upload available in this folder
                </p>
            ) : (
            <Select
            value={
                selectedUpload
                ? selectedUpload.toString()
                : ""
            }
            onValueChange={(value) =>
                setSelectedUpload(Number(value))
            }
            disabled={!selectedFolder || loadingUploads}
            >
                <SelectTrigger className="w-[320px]">
                    <SelectValue
                    placeholder={
                        loadingUploads
                        ? "Loading uploads..."
                        : "Select upload"
                    }
                    />
                </SelectTrigger>

                <SelectContent>
                    {!selectedFolder ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                        Select a folder first.
                    </div>
                    ) : uploads.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                        No uploads found in this folder.
                    </div>
                    ) : (
                    uploads.map((upload) => (
                        <SelectItem
                        key={upload.id}
                        value={upload.id.toString()}
                        >
                        {upload.uploadName ?? upload.uploadname}
                        </SelectItem>
                    ))
                    )}
                </SelectContent>
                </Select>
            )}
            </div>

            <div>
            <Label className="mb-3 block">
                3. Select dump report to upload
            </Label>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <div className="mb-3">
                    <Chip
                        label={selectedFile.name}
                        onRemove={handleRemoveFile}
                        removable
                    />
                </div>
            )}

            <div className="flex items-center gap-3">
                <Button
                type="button"
                variant="outline"
                className="rounded border-primary font-medium text-primary hover:bg-accent hover:text-accent-foreground"
                onClick={() =>
                    fileInputRef.current?.click()
                }
                >
                Browse
                </Button>

                {!selectedFile && (
                <span className="text-sm text-alert-700">
                    No file selected
                </span>
                )}
            </div>
            </div>

            <div>
            <Label className="mb-3 block">
                4. Select how the information should be imported:
            </Label>

            <div>
                <Label className="mb-3 block font-medium">
                Import decision as
                </Label>

                <Select
                value={selectedUser}
                onValueChange={setSelectedUser}
                disabled={loadingUsers}
                >
                <SelectTrigger className="w-[320px]">
                    <SelectValue
                    placeholder="Select User"
                    />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="me">
                    Me
                    </SelectItem>

                    {users.map((user) => (
                    <SelectItem
                        key={user.id}
                        value={String(user.id)}
                    >
                        {user.name ||
                        user.userName ||
                        user.username}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            <div className="pt-2">
            <Button
                type="submit"
                variant="default"
                size="default"
                disabled={isSubmitDisabled}
            >
                {loading
                ? "Importing..."
                : "Upload and Import"}
            </Button>
            </div>
        </form>
        </div>
    );
};

export default ImportFossologyDumpClient;