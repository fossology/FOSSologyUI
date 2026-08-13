/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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
import { AlertBanner } from "@/components/ui/alert";
import { createLicense, getCustomiseData } from "@/services/licenses";
import { getObligationsList } from "@/services/obligation";
import { SearchableMultiSelect } from "@/components/Widgets";

const initialFormData = {
  active: "Yes",
  checked: "No",
  spdxCompatible: "",
  shortName: "",
  fullName: "",
  licenseText: "",
  textUpdatable: "Yes",
  detectorType: "Reference License",
  licenseType: "Permissive",
  url: "",
  publicNotes: "",
  conclusion: "[self]",
  reportedLicense: "[self]",
  riskLevel: "0",
  obligations: "",
};

const AddLicensePage = () => {
  const yesNoOptions = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" },
  ];

  /*
  * Detector types are statically defined in the legacy PHP UI:
  *   1 -> Reference License
  *   2 -> Nomos
  *   3 -> Unconcrete License
  *
  * The legacy implementation stores the selected value in
  * license_ref.rf_detector_type.
  *
  * The current OpenAPI v2 License schema does not expose a
  * detectorType property, and POST /license currently defaults
  * rf_detector_type to 1 (Reference License).
  *
  * Therefore, these options are retained as a static UI list.
  * The selected value cannot currently be persisted through
  * the OpenAPI v2 License API.
  */
  const detectorTypeOptions = [
    { id: 1, value: "Reference License" },
    { id: 2, value: "Nomos" },
    { id: 3, value: "Unconcrete License" },
  ];

  const [licenseTypeOptions, setLicenseTypeOptions] =
  useState([]);

  const [licenseTypeLoading, setLicenseTypeLoading] =
    useState(false);

  useEffect(() => {
    const loadLicenseTypes = async () => {
      setLicenseTypeLoading(true);

      try {
        const response = await getCustomiseData();

        const licenseTypesConfig = response.find(
          (item) => item.key === "LicenseTypes"
        );

        const options =
          licenseTypesConfig?.value
            ?.split(",")
            .map((type) => type.trim())
            .filter(Boolean)
            .map((type) => ({
              id: type,
              value: type,
            })) ?? [];

        setLicenseTypeOptions(options);
      } catch (error) {
        // Handle error
      } finally {
        setLicenseTypeLoading(false);
      }
    };

    loadLicenseTypes();
  }, []);

  /*
   * The legacy PHP UI populates this dropdown from the
   * LicenseMap with CONCLUSION usage.
   *
   * No OpenAPI v2 endpoint has been identified that exposes
   * the available conclusion license mappings for this form.
   *
   * Therefore, only [self] is currently available.
   */
  const conclusionOptions = [
    { id: 0, value: "[self]" },
  ];

  /*
   * The legacy PHP UI populates this dropdown from the
   * LicenseMap with REPORT usage.
   *
   * No OpenAPI v2 endpoint has been identified that exposes
   * the available reported-license mappings for this form.
   *
   * Therefore, only [self] is currently available.
   */
  const reportedLicenseOptions = [
    { id: 0, value: "[self]" },
  ];

  const riskLevelOptions = [
    { id: 0, value: "0" },
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
  ];

  const [formData, setFormData] = useState(initialFormData);

  const [obligationOptions, setObligationOptions] = useState([]);
  const [selectedObligations, setSelectedObligations] = useState([]);
  const [obligationLoading, setObligationLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadObligations = async () => {
      setObligationLoading(true);

      try {
        const response = await getObligationsList();

        const options = (response ?? []).map((obligation) => ({
          id: obligation.id,
          label: obligation.topic,
          value: obligation.topic,
        }));

        setObligationOptions(options);
      } catch (error) {
        setObligationOptions([]);
      } finally {
        setObligationLoading(false);
      }
    };

    loadObligations();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAlert({
      show: false,
      type: "",
      message: "",
    });

    setIsSubmitting(true);

    try {
      /*
       * The OpenAPI v2 License schema currently exposes:
       * - shortName
       * - fullName
       * - text
       * - url
       * - risk
       * - isCandidate
       *
       * These are the fields that can currently be sent through
       * the License API based on the schema reviewed.
       *
       * The following legacy PHP fields are not included because
       * they are not present in the current License API schema:
       * - active
       * - checked / marydone
       * - SPDX ID
       * - textUpdatable
       * - detectorType
       * - licenseType
       * - publicNotes / notes
       * - conclusion / parent license mapping
       * - reportedLicense / report license mapping
       * - associated obligations
       *
       * These fields remain in the UI to preserve the legacy page
       * layout, but cannot currently be persisted through the
       * available License API.
       */
      await createLicense({
        shortName: formData.shortName,
        fullName: formData.fullName,
        text: formData.licenseText,
        url: formData.url,
        risk: Number(formData.riskLevel),

        /*
         * The License schema exposes isCandidate.
         * The legacy Add License form does not explicitly expose
         * a candidate selector, so the default value is false.
         */
        isCandidate: false,
      });

      setAlert({
        show: true,
        type: "success",
        message: "License added successfully.",
      });

      setFormData(initialFormData);
    } catch (error) {
      let message = "Failed to add license.";

      if (error?.message) {
        message = error.message;
      }

      setAlert({
        show: true,
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-container my-3">
      <div className="w-full max-w-3xl">
        <h1 className="font-size-main-heading mb-6">
          Add License
        </h1>

        {alert.show && (
          <AlertBanner
            type={alert.type}
            message={alert.message}
            onClose={() =>
              setAlert({
                show: false,
                type: "",
                message: "",
              })
            }
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Active
              No corresponding property is available in the
              current License API schema. Retained for UI parity. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-status">
              Active
            </Label>

            <Select
              value={formData.active}
              onValueChange={(value) =>
                handleSelectChange("active", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-status"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {yesNoOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Checked
              Corresponds to marydone in the legacy PHP implementation.
              No corresponding property is available in the current
              License API schema. Retained for UI parity. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-checked">
              Checked
            </Label>

            <Select
              value={formData.checked}
              onValueChange={(value) =>
                handleSelectChange("checked", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-checked"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {yesNoOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SPDX ID
              No corresponding property is available in the
              current License API schema. Retained for UI parity. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-spdx-compatible">
              SPDX ID
            </Label>

            <Input
              type="text"
              name="spdxCompatible"
              id="admin-add-license-spdx-compatible"
              value={formData.spdxCompatible}
              onChange={handleChange}
              className="h-10"
            />

            <p className="text-sm text-tertiary1-800">
              Used in report
            </p>
          </div>

          {/* Short Name - supported by License API */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-short-name">
              Short name
            </Label>

            <Input
              type="text"
              name="shortName"
              id="admin-add-license-short-name"
              value={formData.shortName}
              onChange={handleChange}
              className="h-10"
            />

            <p className="text-sm text-tertiary1-800">
              Must be unique
            </p>
          </div>

          {/* Full Name - supported by License API */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-full-name">
              Full name
            </Label>

            <Input
              type="text"
              name="fullName"
              id="admin-add-license-full-name"
              value={formData.fullName}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          {/* License Text - supported by License API */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-text">
              License Text
            </Label>

            <Textarea
              name="licenseText"
              id="admin-add-license-text"
              value={formData.licenseText}
              placeholder="Enter the license text"
              rows={3}
              onChange={handleChange}
              className="min-h-[56px] w-full"
            />
          </div>

          {/* Text Updatable
              No corresponding property is available in the
              current License API schema. Retained for UI parity. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-text-update">
              Text Updatable
            </Label>

            <Select
              value={formData.textUpdatable}
              onValueChange={(value) =>
                handleSelectChange("textUpdatable", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-text-update"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {yesNoOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Detector Type
              No corresponding property is available in the
              current License API schema. Retained for UI parity. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-detector-type">
              Detector Type
            </Label>

            <Select
              value={formData.detectorType}
              onValueChange={(value) =>
                handleSelectChange("detectorType", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-detector-type"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {detectorTypeOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* License Type
              License type options are available in the UI, but the
              current OpenAPI v2 License schema does not expose a
              licenseType property.

              Therefore, this selection is not included in the
              createLicense() API request and is currently UI-only.
          */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-type">
              License Type
            </Label>

            <Select
              value={formData.licenseType}
              onValueChange={(value) =>
                handleSelectChange("licenseType", value)
              }
              disabled={licenseTypeLoading}
            >
              <SelectTrigger
                id="admin-add-license-type"
                className="h-10 w-[390px]"
              >
                <SelectValue
                  placeholder={
                    licenseTypeLoading
                      ? "Loading license types..."
                      : "Permissive"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {licenseTypeOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* URL - supported by License API */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-url">
              URL
            </Label>

            <Input
              type="text"
              name="url"
              id="admin-add-license-url"
              value={formData.url}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          {/* Public Notes
              No corresponding property is available in the
              current License API schema. Retained for UI parity. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-public-notes">
              Public Notes
            </Label>

            <Textarea
              name="publicNotes"
              id="admin-add-license-public-notes"
              value={formData.publicNotes}
              placeholder="Enter public notes"
              rows={3}
              onChange={handleChange}
              className="min-h-[56px] w-full"
            />
          </div>

          {/* Conclusion
              Legacy PHP uses LicenseMap::CONCLUSION.
              No OpenAPI v2 endpoint has been identified to retrieve
              or persist these license mappings.
              Only [self] is retained. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-conclusion">
              Conclusion
            </Label>

            <Select
              value={formData.conclusion}
              onValueChange={(value) =>
                handleSelectChange("conclusion", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-conclusion"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {conclusionOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reported License
              Legacy PHP uses LicenseMap::REPORT.
              No OpenAPI v2 endpoint has been identified to retrieve
              or persist these license mappings.
              Only [self] is retained. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-report">
              Reported License
            </Label>

            <Select
              value={formData.reportedLicense}
              onValueChange={(value) =>
                handleSelectChange("reportedLicense", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-report"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

                <SelectContent>
                  {reportedLicenseOptions.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.value}
                    >
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>

          {/* Risk Level - supported by License API as integer */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-risk-level">
              Risk level
            </Label>

            <Select
              value={formData.riskLevel}
              onValueChange={(value) =>
                handleSelectChange("riskLevel", value)
              }
            >
              <SelectTrigger
                id="admin-add-license-risk-level"
                className="h-10 w-[390px]"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {riskLevelOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Associated Obligations
              GET /obligations/list is available, but the License
              schema does not expose an obligations property.
              Therefore, the obligations selected here cannot
              currently be persisted through POST /licenses.
              
              The UI is retained unchanged as requested. */}
          <div className="space-y-2">
            <Label htmlFor="admin-add-license-obligations">
              Associated Obligations
            </Label>

            <SearchableMultiSelect
              options={obligationOptions}
              value={selectedObligations}
              onChange={setSelectedObligations}
              placeholder={
                obligationLoading
                  ? "Loading obligations..."
                  : "Search and select obligations associated with this license"
              }
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Adding License..."
                : "Add License"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLicensePage;