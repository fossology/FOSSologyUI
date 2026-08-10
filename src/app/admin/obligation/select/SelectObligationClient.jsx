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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertBanner } from "@/components/ui/alert";
// API services
import { getObligationsList, getAllObligations } from "@/services/obligation";

const SelectObligationClient = () => {
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const handleFind = async () => {
    setLoading(true);

    try {
        const data = await getAllObligations();

        let filteredResults;

        if (topic === "all") {
        filteredResults = data;
        } else {
        filteredResults = data.filter(
            (obligation) => obligation.topic === topic
        );
        }

        setResults(filteredResults);
        setSearched(true);

        if (filteredResults.length === 0) {
        setMessage({
            type: "info",
            text: "No obligations found.",
        });
        } else {
        setMessage({
            type: "success",
            text:
            topic === "all"
                ? "Obligations loaded successfully."
                : "Search completed successfully.",
        });
        }

        setShowMessage(true);
    } catch (err) {
        setMessage({
        type: "error",
        text: err?.message || "Failed to fetch obligations.",
        });
        setShowMessage(true);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        const fetchTopics = async () => {
            try {
            const data = await getObligationsList();

            setTopics(data || []);
            } catch (err) {
                setMessage({
                    type: "error",
                    text: err?.message || "Failed to load obligation topics.",
                });
                setShowMessage(true);
                }
        };

        fetchTopics();
    }, []);

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

            <h1 className="mb-8 text-2xl font-semibold text-gray-900">
                Select Obligation
            </h1>

            <div className="space-y-8">
                <p>
                From which topic do you wish to view the obligations and risks:
                </p>

                <div className="space-y-2">
                <Label>From topic:</Label>

                <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>

                        {topics.map((item) => (
                        <SelectItem
                            key={item.id}
                            value={item.obligationTopic}
                        >
                            {item.obligationTopic}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </div>

                <Button
                onClick={handleFind}
                disabled={!topic || loading}
                >
                {loading ? "Finding..." : "Find"}
                </Button>

                {searched && (
                <div className="mt-8 space-y-4">
                    {results.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No obligations found.
                    </p>
                    ) : (
                    results.map((item) => (
                        <div
                        key={item.id}
                        className="rounded-md border p-4 space-y-2"
                        >
                        <p>
                            <strong>Type:</strong> {item.type}
                        </p>

                        <p>
                            <strong>Topic:</strong> {item.topic}
                        </p>

                        <p>
                            <strong>Text:</strong> {item.text}
                        </p>

                        <p>
                            <strong>Classification:</strong>{" "}
                            {item.classification}
                        </p>

                        <p>
                            <strong>Comment:</strong>{" "}
                            {item.comment || "-"}
                        </p>
                        </div>
                    ))
                    )}
                </div>
                )}
            </div>
        </div>
    );
};

export default SelectObligationClient;