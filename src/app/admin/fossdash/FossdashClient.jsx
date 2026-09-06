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

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialFormData = {
    fossdashEnableDisable: "0",
    fossdashEndpointUrl: "",
    metricReportingConfig: "",
    cronSchedule: "*****",
    instanceName: "",
    reportedFilesCleaning: "",
    authType: "0",
    influxDbToken: "",
    influxDbUser: "",
    influxDbUserPassword: "",
};

const FossdashClient = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();

    /*
     * API integration will be added later.
     *
     * For now, the form only handles the UI state.
     */
};

return (
    <div className="min-h-screen mx-40 py-8">
        <div className="w-full max-w-3xl">
            <h1 className="font-size-main-heading mb-6">
            Fossdash Configuration
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
            {/* Enable/Disable Fossdash */}
            <div className="space-y-2">
                <Label htmlFor="fossdash-enable-disable">
                Enable/Disable Fossdash
                </Label>

                <Select
                value={formData.fossdashEnableDisable}
                onValueChange={(value) =>
                    handleSelectChange(
                    "fossdashEnableDisable",
                    value
                    )
                }
                >
                <SelectTrigger
                    id="fossdash-enable-disable"
                    className="h-10 w-[390px]"
                >
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="0">
                    Disable
                    </SelectItem>

                    <SelectItem value="1">
                    Enable
                    </SelectItem>
                </SelectContent>
                </Select>

                <p className="text-sm text-info-600">
                Start(Enable) or stop(Disable) the Fossdash
                </p>
            </div>

            {/* FossDash Endpoint URL */}
            <div className="space-y-2">
                <Label htmlFor="fossdash-endpoint">
                    FossDash Endpoint URL
                </Label>

                <Input
                    type="text"
                    name="fossdashEndpointUrl"
                    id="fossdash-endpoint"
                    value={formData.fossdashEndpointUrl}
                    onChange={handleChange}
                    className="h-10"
                />

                <p className="text-sm text-info-600">
                    Set the FossDash service endpoint. Disabled if empty.
                    <br />
                    eg. for Source Code :
                    "http://localhost:8086/write?db=fossology_db"
                    &nbsp; OR for Docker Setup :
                    "http://influxdb:8086/write?db=fossology_db"
                </p>
            </div>

            {/* Fossdash Metric Reporting Config */}
            <div className="space-y-2">
                <Label htmlFor="metric-reporting-config">
                Fossdash metric-reporting config
                </Label>

                <Textarea
                name="metricReportingConfig"
                id="metric-reporting-config"
                value={formData.metricReportingConfig}
                placeholder="Type here"
                rows={3}
                onChange={handleChange}
                className="min-h-14 w-full"
                />

                <p className="text-sm text-info-600">
                Modify the fossdash reporting metrics config. Leave
                empty to use default one.
                <br />
                e.g. Reporting config file here.
                <br />
                To add new query_metric: 1. Add query_metric name
                in QUERIES_NAME list. 2. Add same query_metric name
                and its corresponding DB_query under the QUERY
                </p>
            </div>

            {/* Cron Job */}
            <div className="space-y-2">
                <Label htmlFor="cron-schedule">
                Cron job to run script
                </Label>

                <Input
                type="text"
                name="cronSchedule"
                id="cron-schedule"
                value={formData.cronSchedule}
                onChange={handleChange}
                className="h-10"
                />

                <p className="text-sm text-info-600">
                Set the cron job of publishing script for pushing
                data to time series db.
                </p>
            </div>

            {/* Fossology Instance Name */}
            <div className="space-y-2">
                <Label htmlFor="instance-name">
                Fossology instance name
                </Label>

                <Input
                type="text"
                name="instanceName"
                id="instance-name"
                value={formData.instanceName}
                onChange={handleChange}
                className="h-10"
                />

                <p className="text-sm text-info-600">
                Set the fossology instance name. Leave empty to use
                autogenerated UUID value.
                <br />
                e.g. Instance name formate = [a-zA-Z0-9_-]+.
                </p>
            </div>

            {/* Fossdash Reported Files Cleaning */}
            <div className="space-y-2">
                <Label htmlFor="reported-files-cleaning">
                Fossdash reported files cleaning
                </Label>

                <Input
                type="text"
                name="reportedFilesCleaning"
                id="reported-files-cleaning"
                value={formData.reportedFilesCleaning}
                onChange={handleChange}
                className="h-10"
                />

                <p className="text-sm text-info-600">
                number of days for which the successfully pushed
                metrics are archived. Older data will be deleted.
                Leave empty to disable cleanup
                </p>
            </div>

            {/* Auth Type for InfluxDB */}
            <div className="space-y-2">
                <Label htmlFor="auth-type">
                Auth_type for InfluxDB
                </Label>

                <Select
                value={formData.authType}
                onValueChange={(value) =>
                    handleSelectChange("authType", value)
                }
                >
                <SelectTrigger
                    id="auth-type"
                    className="h-10 w-[390px]"
                >
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="0">
                    Token_based
                    </SelectItem>

                    <SelectItem value="1">
                    User_password
                    </SelectItem>
                </SelectContent>
                </Select>

                <p className="text-sm text-info-600">
                Select authentication type for an InfluxDB
                </p>
            </div>

            {/* InlfuxDB Encoded Token */}
            {formData.authType === "0" && (
                <div className="space-y-2">
                    <Label htmlFor="influxdb-token">
                        InlfuxDB Encoded Token
                    </Label>

                    <Textarea
                    name="influxDbToken"
                    id="influxdb-token"
                    value={formData.influxDbToken}
                    placeholder="Type here"
                    rows={3}
                    onChange={handleChange}
                    className="min-h-14 w-full"
                    />

                <p className="text-sm text-info-600">
                    Please Enter encoded token for InfluxDB
                    Authentication.
                    <br />
                    Check out the steps for Token Generation.
                </p>
                </div>
            )}

            {/* InfluxDB User */}
            {formData.authType === "1" && (
                <>
                <div className="space-y-2">
                    <Label htmlFor="influxdb-user">
                    InfluxDB User
                    </Label>

                    <Input
                    type="text"
                    name="influxDbUser"
                    id="influxdb-user"
                    value={formData.influxDbUser}
                    onChange={handleChange}
                    className="h-10"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="influxdb-user-password">
                    InfluxDB User Password
                    </Label>

                    <Input
                    type="password"
                    name="influxDbUserPassword"
                    id="influxdb-user-password"
                    value={formData.influxDbUserPassword}
                    onChange={handleChange}
                    className="h-10"
                    />
                </div>
                </>
            )}

            {/* Update */}
            <div className="pt-2">
                <Button
                type="submit"
                className="mt-2"
                >
                Update
                </Button>
            </div>
            </form>
        </div>
    </div>
);
};

export default FossdashClient;