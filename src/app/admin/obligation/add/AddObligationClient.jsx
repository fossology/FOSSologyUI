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

import { useEffect, useState } from "react";
// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Chip from "@/components/ui/chip";
import { SearchableMultiSelect } from "@/components/Widgets";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertBanner } from "@/components/ui/alert";
//Api Services
import {
  getObligationsList
} from "@/services/obligation";
import { getAllLicense } from "@/services/licenses";

const AddObligationClient = () => {
    const [formData, setFormData] = useState({
        active: true,
        topic: "",
        type: "obligation",
        text: "",
        attention: "green",
        modifiedSource: false,
        comment: "",
        textUpdatable: true,
    });

    const [obligations, setObligations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedLicenses, setSelectedLicenses] = useState([]);
    const [selectedCandidateLicenses, setSelectedCandidateLicenses] = useState([]);

    const [licenses, setLicenses] = useState([]);
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
            const data = await getAllLicense({
                page: 1,
                limit: 1000,
                kind: "all",
            });
            setLicenses(
                data.map((license) => ({
                label: license.shortName,
                value: license.shortName,
                id: license.id,
                }))
            );
            } catch (err) {
                setMessage({
                    type: "error",
                    text: err?.message || "Failed to load licenses.",
                });
                setShowMessage(true);
                }
        };

        fetchLicenses();
    }, []);

    useEffect(() => {
        const fetchObligations = async () => {
            try {
            const data = await getObligationsList();
            setObligations(data || []);
            } catch (err) {
                setMessage({
                    type: "error",
                    text: err?.message || "Failed to load obligations.",
                });
                setShowMessage(true);
                }finally {
            setLoading(false);
            }
        };

        fetchObligations();
    }, []);

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            licenses: selectedLicenses.map((license) => license.id),
            candidateLicenses: selectedCandidateLicenses.map(
                (license) => license.id
            ),
        };

        try {
            // await createObligation(payload);

            setMessage({
                type: "info",
                text: "Add Obligation is not available yet. The backend API has not been implemented.",
            });

            // Later replace the above with:
            /*
            setMessage({
                type: "success",
                text: "Obligation added successfully.",
            });
            */

            setShowMessage(true);
        } catch (err) {
            setMessage({
                type: "error",
                text: err?.message || "Failed to add obligation.",
            });
            setShowMessage(true);
        }
    };

    const alertType =
        message?.type === "danger" || message?.type === "error"
            ? "Error"
            : message?.type === "success"
            ? "Success"
            : "Info";
    
    const isFormValid =
        formData.topic.trim() !== "" &&
        formData.text.trim() !== "" &&
        (
            selectedLicenses.length > 0 ||
            selectedCandidateLicenses.length > 0
        );

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

            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Add Obligation
            </h1>

        <div className="space-y-8">

        {/* Active */}
        <div className="space-y-2">
            <Label>Active</Label>

            <Select
                value={String(formData.active ? "true" : "false")}
                onValueChange={(value) =>
                    setFormData((prev) => ({
                        ...prev,
                        active: value === "true",
                    }))
                }
            >
                <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="Yes" />
                </SelectTrigger>

            <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
            </SelectContent>
            </Select>
        </div>

        {/* Topic */}
        <div className="space-y-2">
            <Label>Obligation Topic</Label>

            <Input
                value={formData.topic}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        topic: e.target.value,
                    }))
                }
                placeholder="Enter obligation topic"
                className="w-[800px]"
            />
        </div>

        {/* Type */}
        <div className="space-y-3">
            <p className="text-base">
                Type of obligation
            </p>

            <RadioGroup
                value={formData.type}
                onValueChange={(value) =>
                    setFormData((prev) => ({
                        ...prev,
                        type: value,
                    }))
                }
                className="flex flex-row flex-wrap items-center gap-6"
            >
            {[
                ["obligation", "Obligation"],
                ["restriction", "Restriction"],
                ["risk", "Risk"],
                ["right", "Right"],
            ].map(([value, label]) => (
                <div
                    key={value}
                    className="flex shrink-0 items-center gap-2"
                >
                <RadioGroupItem
                    value={value}
                    id={value}
                />
                <Label htmlFor={value}>{label}</Label>
                </div>
            ))}
            </RadioGroup>
        </div>

        {/* Obligation text */}
        <div className="space-y-2">
            <Label>Obligation Text</Label>

            <Textarea
                value={formData.text}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        text: e.target.value,
                    }))
                }
                className="min-w-[800px] resize"
                placeholder="Enter obligation text"
            />
        </div>

        {/* Attention */}
        <div className="space-y-3">
            <p className="text-base">
                Optional: level of attention this obligation
                should raise in the clearing process
            </p>

            <RadioGroup
                value={formData.attention}
                onValueChange={(value) =>
                    setFormData((prev) => ({
                        ...prev,
                        attention: value,
                    }))
                }
                className="flex flex-row flex-wrap items-center gap-6"
            >
            {[
                {
                    value: "green",
                    label: "Green",
                    className:
                    "bg-success-500 text-white border-success-500",
                },
                {
                    value: "white",
                    label: "White",
                    className:
                    "bg-white text-neutral-900 border-neutral-400",
                },
                {
                    value: "yellow",
                    label: "Yellow",
                    className:
                    "bg-yellow-500 text-neutral-900 border-yellow-500",
                },
                {
                    value: "red",
                    label: "Red",
                    className:
                    "bg-alert-500 text-white border-alert-500",
                },
                ].map(({ value, label, className }) => (
                <div
                key={value}
                className="flex shrink-0 items-center gap-2"
                >
                <RadioGroupItem
                    value={value}
                    id={value}
                />

                <Label htmlFor={value} className="cursor-pointer">
                    <Chip
                        label={label}
                        removable={false}
                        interactive={false}
                        variant="custom"
                        className={`h-7 px-2 py-1 rounded border justify-center ${className}`}
                    />
                </Label>
                </div>
            ))}
            </RadioGroup>
        </div>

        {/* Modified source */}
        <div className="space-y-2">
            <Label>
                Optional: does this obligation apply on
                modified source code?
            </Label>

            <Select
                value={String(formData.modifiedSource)}
                onValueChange={(value) =>
                    setFormData((prev) => ({
                    ...prev,
                    modifiedSource: value === "true",
                    }))
                }
                >
                <SelectTrigger className="w-[320px]">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                </SelectContent>
                </Select>
        </div>

        {/* Associated Licenses */}
        <div className="space-y-2">
            <Label>
                Associated Licenses (conclusions)
            </Label>

            <SearchableMultiSelect
                options={licenses}
                value={selectedLicenses}
                onChange={setSelectedLicenses}
                placeholder="Search and select licenses associated with this obligation"
            />
        </div>

        {/* Candidate licenses */}
        <div className="space-y-2">
        <Label>
            Optional: Associated Candidate Licenses
        </Label>

        <SearchableMultiSelect
            options={licenses}
            value={selectedCandidateLicenses}
            onChange={setSelectedCandidateLicenses}
            placeholder="Search and select candidate licenses associated with this obligation"
        />
        </div>

        {/* Comment */}
        <div className="space-y-2">
            <Label>Optional: comment</Label>

            <Textarea
                value={formData.comment}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        comment: e.target.value,
                    }))
                }
                className="min-w-[800px] resize"
                placeholder="Enter comment"
            />
        </div>

        {/* Updatable */}
        <div className="space-y-2">
            <Label>Text Updatable</Label>

            <Select
                value={String(formData.textUpdatable ? "true" : "false")}
                onValueChange={(value) =>
                    setFormData((prev) => ({
                        ...prev,
                        textUpdatable: value === "true",
                    }))
                }
            >
            <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Yes" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div className="pb-6">
            <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
            >
                Add Obligation
            </Button>
        </div>

        </div>
    </div>
    );
};

export default AddObligationClient;