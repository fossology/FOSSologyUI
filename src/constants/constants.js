/*
 Copyright (C) 2022 Soham Banerjee(sohambanerjee4abc@hotmail.com)

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

// constants used in Browse component
import { defaultAgentsList, getLocalStorage } from "shared/storageHelper";

export const statusOptions = [
  {
    id: 0,
    name: "open",
  },
  {
    id: 1,
    name: "in progress",
  },
  {
    id: 2,
    name: "closed",
  },
  {
    id: 3,
    name: "rejected",
  },
];

export const assignOptions = [
  {
    id: 0,
    name: "me",
  },
  {
    id: 1,
    name: "unassigned",
  },
];
export const actionsOptions = [
  {
    id: 0,
    name: "-- select action --",
    reportFormat: "0",
    disabled: true,
  },
  {
    id: 1,
    name: "Export DEP5",
    reportFormat: "dep5",
  },
  {
    id: 2,
    name: "Export ReadMe_OSS",
    reportFormat: "readmeoss",
  },
  {
    id: 3,
    name: "Export SPDX RDF",
    reportFormat: "spdx2",
  },
  {
    id: 4,
    name: "Export SPDX tag:value",
    reportFormat: "spdx2tv",
  },
  {
    id: 5,
    name: "Export Unified Report",
    reportFormat: "unifiedreport",
  },
];
export const initialMessage = {
  type: "success",
  text: "",
};

export const initialState = {
  searchType: "allfiles",
  uploadId: "",
  filename: "",
  tag: "",
  filesizemin: "",
  filesizemax: "",
  license: "",
  copyright: "",
  page: 1,
  limit: 10,
};
// constants used in the Search component
export const initialMessageSearch = {
  type: "danger",
  text: "",
};

// constants used in Upload/file component
export const initialStateFile = {
  folderId: 1,
  uploadDescription: "",
  accessLevel: "protected",
  ignoreScm: false,
  fileInput: null,
};
export const initialScanFileDataFile = {
  analysis: defaultAgentsList(),
  decider: {
    nomosMonk: false,
    bulkReused: false,
    newScanner: false,
    ojoDecider: false,
  },
  reuse: {
    reuseUpload: 0,
    reuseGroup: getLocalStorage("user")?.default_group,
    reuseMain: false,
    reuseEnhanced: false,
    reuseReport: false,
    reuseCopyright: false,
  },
};
export const initialFolderListFile = [
  {
    id: 1,
    name: "Software Repository",
    description: "Top Folder",
    parent: null,
  },
];
// constants for upload/ImportReport
export const initialStateImportReport = {
  folder: "",
  editUpload: "",
  reportUpload: "",
  newLicense: "licenseCanditate",
  licenseInfoInFile: true,
  licenseConcluded: false,
  licenseDecision: true,
  existingDecisions: true,
  importDiscussed: true,
  copyright: false,
};

// constants for upload/UploadFromServer
export const initialStateUploadFromServer = {
  folderId: 1,
  uploadDescription: "",
  accessLevel: "protected",
  ignoreScm: false,
  uploadType: "server",
  groupName: "",
};

// constants for upload/url
export const initialStateUrl = {
  folderId: 1,
  uploadDescription: "",
  accessLevel: "protected",
  ignoreScm: false,
  uploadType: "url",
};

export const initialUrlData = {
  url: "",
  name: "",
};

// constants from upload/vcs
export const initialStateVcs = {
  folderId: 1,
  uploadDescription: "",
  accessLevel: "protected",
  ignoreScm: false,
  uploadType: "vcs",
};

export const initialVcsData = {
  vcsType: "git",
  vcsUrl: "",
  vcsBranch: "",
  vcsName: "",
  vcsUsername: "",
  vcsPassword: "",
};
export const typeVcs = [
  { id: "git", type: "Git" },
  { id: "svn", type: "SVN" },
];

// common & reused
export const entriesOptions = [
  {
    id: 10,
    entry: "10",
  },
  {
    id: 25,
    entry: "25",
  },
  {
    id: 50,
    entry: "50",
  },
  {
    id: 100,
    entry: "100",
  },
];
export const initialScanFileData = {
  analysis: defaultAgentsList(),
  decider: {
    nomosMonk: false,
    bulkReused: false,
    newScanner: false,
    ojoDecider: false,
  },
  reuse: {
    reuseUpload: 0,
    reuseGroup: getLocalStorage("user")?.default_group,
    reuseMain: false,
    reuseEnhanced: false,
    reuseReport: false,
    reuseCopyright: false,
  },
};
export const initialFolderList = [
  {
    id: 1,
    name: "Software Repository",
    description: "Top Folder",
    parent: null,
  },
];

export const initialMantainanceFields = {
  allNonSlow: false,
  allOperations: false,
  validateFolderContents: false,
  rmvGoldFiles: false,
  rmvOrphanedRows: false,
  rmvLogFiles: false,
  normalizePriority: false,
  rmvUploads: false,
  rmvTokens: false,
  rmvTempTables: false,
  analyseDb: false,
  rmvRepoFiles: false,
  dbReindexing: false,
  verbose: false,
  rmvRepoOldFiles1: false,
  rmvRepoOldFiles2: false,
};
export const accessLevels = [
  {
    id: 0,
    name: "None (very basic, no database access)",
    disabled: false,
    value: 0,
  },
  {
    id: 1,
    name: "Read-only (read, but no writes or downloads)",
    disabled: false,
    value: 1,
  },
  {
    id: 2,
    name: "Read-Write (read, download, or edit information)",
    disabled: false,
    value: 3,
  },
  {
    id: 3,
    name: "Clearing Administrator (read, download, edit information and edit decisions)",
    disabled: false,
    value: 5,
  },
  {
    id: 4,
    name: "Full Administrator (all access including adding and deleting users)",
    disabled: false,
    value: 10,
  },
];

export const initialAddUserData = {
  username: "",
  description: "",
  email: "",
  permission: 1,
  folder: 1,
  pass1: "",
  pass2: "",
  enote: "y",
  accessLevel: "public",
  Check_agent_copyright: false,
  Check_agent_ecc: false,
  Check_agent_keyword: false,
  Check_agent_mimetype: false,
  Check_agent_monk: false,
  Check_agent_nomos: false,
  Check_agent_ojo: false,
  Check_agent_pkgagent: false,
  Check_agent_reso: false,
  Check_agent_shagent: false,
  default_bucketpool_fk: 2,
};

export const bucketPool = [
  {
    id: 0,
    name: "GPL Demo bucket pool, v1",
    disabled: false,
  },
];

export const agents = {
  Check_agent_bucket: "Bucket Analysis",
  Check_agent_copyright: "Copyright/Email/URL/Author Analysis",
  Check_agent_ecc:
    "ECC Analysis, scanning for text fragments potentially relevant for export control",
  Check_agent_keyword: "Keyword Analysis",
  Check_agent_mimetype:
    "MIME-type Analysis (Determine mimetype of every file. Not needed for licenses or buckets)",
  Check_agent_monk:
    "Monk License Analysis, scanning for licenses performing a text comparison",
  Check_agent_nomos:
    "Nomos License Analysis, scanning for licenses using regular expressions",
  Check_agent_ojo:
    "Ojo License Analysis, scanning for licenses using SPDX-License-Identifier",
  Check_agent_pkgagent: "Package Analysis (Parse package headers)",
  Check_agent_reso: "REUSE.Software Analysis (forces *Ojo License Analysis*)",
  Check_agent_shagent: "Software Heritage Analysis",
};
