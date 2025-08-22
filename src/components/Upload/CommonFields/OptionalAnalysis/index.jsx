/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

import React from "react";
import PropTypes from "prop-types";

// Widgets
import {InputContainer, Tooltip} from "@/components/Widgets";

function OptionalAnalysis({ analysis, handleChange }) {
  return (
    <div
      id="uplod-optional-analysis"
      className="mt-4 space-y-2"
    >
      <p className="font-semibold text-base inline-flex items-center gap-1">
        Select additional analysis:
      </p>
      <InputContainer
        type="checkbox"
        checked={analysis.compatibility}
        name="compatibility"
        id="upload-analysis-compatibility"
        onChange={(checked) => handleChange(checked, "compatibility")}
      >
        Compatibility License Analysis, scanning for licenses compatibility
        <Tooltip title="Checks licenses found in a file and main license and adds red highlight to treeview if licenses fail compatibility" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.copyrightEmailAuthor}
        name="copyrightEmailAuthor"
        id="upload-analysis-copyright-email-author"
        onChange={(checked) => handleChange(checked, "copyrightEmailAuthor")}
      >
        Copyright/Email/URL/Author Analysis
        <Tooltip title="Scanning for all text fragments which can be relevant to copyright laws" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.ecc}
        name="ecc"
        id="upload-analysis-ecc"
        onChange={(checked) => handleChange(checked, "ecc")}
      >
        ECC Analysis
        <Tooltip title="Scanning for text fragments potentially relevant for export control" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.ipra}
        name="ipra"
        id="upload-analysis-ipra"
        onChange={(checked) => handleChange(checked, "ipra")}
      >
        IPRA Analysis
        <Tooltip title="Scanning for test fragments potentially relevant for patent issues" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.keyword}
        name="keyword"
        id="upload-analysis-keyword"
        onChange={(checked) => handleChange(checked, "keyword")}
      >
        Keyword Analysis
        <Tooltip title="Scanning for keywords, which are entered in addition" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.mime}
        name="mime"
        id="upload-analysis-mime"
        onChange={(checked) => handleChange(checked, "mime")}
      >
        MIME-type Analysis
        <Tooltip title="Determines the mimetype of every file, which can be used to ignore specific file types" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.monk}
        name="monk"
        id="upload-analysis-monk"
        onChange={(checked) => handleChange(checked, "monk")}
      >
        Monk License Analysis
        <Tooltip title="Scanning for licenses by text comparison" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.nomos}
        name="nomos"
        id="upload-analysis-nomos"
        onChange={(checked) => handleChange(checked, "nomos")}
      >
        Nomos License Analysis
        <Tooltip title="Scanning for Licenses using regular expressions" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.ojo}
        name="ojo"
        id="upload-analysis-ojo"
        onChange={(checked) => handleChange(checked, "ojo")}
      >
        Ojo License Analysis
        <Tooltip title="Scanning for licenses using SPDX-License-Identifier" />
      </InputContainer>

      <InputContainer
        type="checkbox"
        checked={analysis.package}
        name="package"
        id="upload-analysis-package"
        onChange={(checked) => handleChange(checked, "package")}
      >
        Package Analysis
        <Tooltip title="Parsing package headers for files ex. if files are rpm package listed, display their package information" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.softwareAnalysis}
        name="softwareAnalysis"
        id="upload-analysis-softwareAnalysis"
        onChange={(checked) => handleChange(checked, "softwareAnalysis")}
      >
        REUSE.Software Analysis
        <Tooltip title="ReSo agent marks licensed files with a license found in the .license files (outside of the licensed files)." />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.scanoss}
        name="scanoss"
        id="upload-analysis-scanoss"
        onChange={(checked) => handleChange(checked, "scanoss")}
      >
        SCANOSS Toolkit
        <Tooltip title="Matches code to known open source components" />
      </InputContainer>
      <InputContainer
        type="checkbox"
        checked={analysis.heritage}
        name="heritage"
        id="upload-analysis-heritage"
        onChange={(checked) => handleChange(checked, "heritage")}
      >
        Software Heritage Analysis
        <Tooltip title="Get file information from Software Heritage A significant amount of source code has already been ingested in the Software Heritage archive" />
      </InputContainer>
    </div>
  );
}

OptionalAnalysis.propTypes = {
  analysis: PropTypes.shape({
    compatibility: PropTypes.bool.isRequired,
    copyrightEmailAuthor: PropTypes.bool.isRequired,
    ecc: PropTypes.bool.isRequired,
    ipra: PropTypes.bool.isRequired,
    keyword: PropTypes.bool.isRequired,
    mime: PropTypes.bool.isRequired,
    monk: PropTypes.bool.isRequired,
    nomos: PropTypes.bool.isRequired,
    ojo: PropTypes.bool.isRequired,
    package: PropTypes.bool.isRequired,
    softwareAnalysis: PropTypes.bool.isRequired,
    scanoss: PropTypes.bool.isRequired,
    heritage: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func,
};

export default OptionalAnalysis;
