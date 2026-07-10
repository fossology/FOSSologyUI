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

import React, { useEffect, useState } from "react";
//UI Components imports
import { Label } from "@/components/ui/label";
import { ContentBox } from "@/components/ui/content-box";
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";
import {
Select,
SelectTrigger,
SelectValue,
SelectContent,
SelectItem,
} from "@/components/ui/select";
//API service import
import {
  getAllFolders,
  getFolderContents,
} from "@/services/folders";

const EnableDisableClient = () => {
    const [folder, setFolder] = useState("");
    const [folders, setFolders] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [selectedUpload, setSelectedUpload] = useState(null);
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        getAllFolders()
            .then((res) => setFolders(res))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!folder) {
            setUploads([]);
            return;
        }

        getFolderContents(folder)
            .then((res) => {
            const onlyUploads = res.filter(
                (item) => !item.content.startsWith("/")
                );

            setUploads(onlyUploads);

            })
            .catch(console.error);
    }, [folder]);

    const isFormValid = folder !== "" && selectedUpload !== null;

    const handleDisable = () => {
        // TODO: API Integration
        setMessage({
            type: "error",
            text: "Enable/Disable Tag Display API has not been implemented yet.",
        });
        setShowMessage(true);

        console.log("Disable", {
            folder,
            upload: selectedUpload,
        });
    };

    const handleEnable = () => {
        // TODO: API Integration
        setMessage({
            type: "error",
            text: "Enable/Disable Tag Display API has not been implemented yet.",
        });
        setShowMessage(true);

        console.log("Enable", {
            folder,
            upload: selectedUpload,
        });
    };

    const alertType =
    message?.type === "danger" || message?.type === "error"
        ? "Error"
        : message?.type === "success"
        ? "Success"
        : "Info";

    return (
    <div>
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Enable/Disable Tag Display
        </h1>

        <p className="leading-6 max-w-4xl">
            Displaying tags while browsing can be slow for large uploads.
            This interface allows you to select an upload to disable
            (or enable) the tag display. By default the tag display
            is enabled.
        </p>

        <div className="space-y-6 my-8">
            <div className="space-y-2">
                <Label className="block mb-3">
                    Select the folder containing the upload you wish to
                    enable/disable:
                </Label>

                <Select
                    value={folder}
                    onValueChange={setFolder}
                >
                <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="Select Folder" />
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

            <div className="space-y-2">
                <Label className="block mb-3">
                    Select the upload to enable/disable:
                </Label>

                <ContentBox>
                    {uploads.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                            No uploads found.
                        </div>
                        ) : (
                        uploads.map((upload) => (
                            <button
                            key={upload.id}
                            type="button"
                            onClick={() => setSelectedUpload(upload.id)}
                            className={`
                                w-full rounded-sm px-2 py-1.5 text-left text-sm
                                outline-none transition-colors
                                ${
                                selectedUpload === upload.id
                                    ? "bg-secondary text-gray-900"
                                    : "text-foreground hover:bg-secondary hover:text-gray-900 focus:bg-secondary focus:text-gray-900"
                                }
                            `}
                            >
                            {upload.content}
                            </button>
                        ))
                        )}
                </ContentBox>
            </div>

            <div className="flex items-center gap-4">
            <Button
                type="button"
                variant="alert-outline"
                onClick={handleDisable}
                disabled={!isFormValid}
            >
                Disable
            </Button>

            <Button
                type="button"
                variant="success-outline"
                onClick={handleEnable}
                disabled={!isFormValid}
            >
                Enable
            </Button>
            </div>
        </div>
    </div>
);
};

export default EnableDisableClient;