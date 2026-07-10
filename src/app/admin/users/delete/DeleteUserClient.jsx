/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import { useEffect, useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

// Services
import { getAllUsersName, deleteUser } from "@/services/users";

// Helpers
import { handleError } from "@/shared/helper";
import messages from "@/constants/messages";

const DeleteUserClient = () => {
    const [deleteUserData, setDeleteUserData] = useState({
        id: "",
        confirm: false,
    });

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const { id, confirm } = deleteUserData;

    const setDefaultsForDropdown = (res) => {
        const userList = res.map((user) => ({
            ...user,
            disabled:
                user.name === "fossy" ||
                user.name === "Default User",
        }));

        setUsersList(userList);

        setDeleteUserData({
            id: "",
            confirm: false,
        });
    };

    useEffect(() => {
        getAllUsersName()
            .then(setDefaultsForDropdown)
            .catch((error) => {
                handleError(error, setMessage);
                setShowMessage(true);
            });
    }, []);

    const handleSubmit = async () => {
        if (!confirm) {
            setMessage({
                type: "error",
                text: messages.confirmDeletion,
            });
            setShowMessage(true);
            return;
        }

        const selectedUser = usersList.find(
            (user) => user.id.toString() === id
        );

        if (!selectedUser) {
            setMessage({
                type: "error",
                text: "Please select a valid user.",
            });
            setShowMessage(true);
            return;
        }

        try {
            setLoading(true);

            await deleteUser(selectedUser.name);

            setMessage({
                type: "success",
                text: `${messages.deletedUser}: ${selectedUser.name}`,
            });

            const res = await getAllUsersName();
            setDefaultsForDropdown(res);
        } catch (error) {
            handleError(error, setMessage);
        } finally {
            setLoading(false);
            setShowMessage(true);
        }
    };

    const alertType =
        message?.type === "danger" || message?.type === "error"
            ? "Error"
            : message?.type === "success"
            ? "Success"
            : "Info";

    const isFormValid = id !== "" && confirm;

    return (
        <div className="pb-10">
            {showMessage && message && (
                <div className="mb-4">
                    <AlertBanner
                        type={alertType}
                        description={message.text}
                        showClose
                        onClose={() => setShowMessage(false)}
                    />
                </div>
            )}

            <h1 className="mb-8 text-2xl font-semibold text-gray-900">
                Delete User
            </h1>

            <AlertBanner
                type="Warning"
                description="Deleting a user removes the user entry from the FOSSology system. The user's name, account information, and password will be permanently removed. There is no undo for this action."
                showClose={false}
                className="mb-6"
            />

            <p className="text-base">
                To delete a user, enter the following information:
            </p>

            <div className="mt-8 space-y-8">
                <div className="space-y-2">
                    <Label className="block">
                        1. Select the user to delete:
                    </Label>

                    <Select
                        value={id}
                        onValueChange={(value) =>
                            setDeleteUserData((prev) => ({
                                ...prev,
                                id: value,
                            }))
                        }
                    >
                        <SelectTrigger className="w-[320px]">
                            <SelectValue placeholder="Select User" />
                        </SelectTrigger>

                        <SelectContent>
                            {usersList.map((user) => (
                                <SelectItem
                                    key={user.id}
                                    value={user.id.toString()}
                                    disabled={user.disabled}
                                >
                                    {user.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="confirm"
                        className="flex items-center gap-3"
                    >
                        <span>2.</span>

                        <Checkbox
                            id="confirm"
                            checked={confirm}
                            onCheckedChange={(checked) =>
                                setDeleteUserData((prev) => ({
                                    ...prev,
                                    confirm: !!checked,
                                }))
                            }
                        />

                        <span>Confirm user deletion</span>
                    </Label>
                </div>

                <Button
                    type="button"
                    variant="alert"
                    onClick={handleSubmit}
                    disabled={!isFormValid || loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </div>
    );
};

export default DeleteUserClient;
