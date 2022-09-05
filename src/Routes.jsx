/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

// React imports
import React from "react";
import routes from "constants/routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Guards imports
const PublicLayout = React.lazy(() => import("shared/PublicLayout"));
const PrivateLayout = React.lazy(() => import("shared/PrivateLayout"));
const AdminLayout = React.lazy(() => import("shared/AdminLayout"));

// Pages imports
const Home = React.lazy(() => import("pages/Home"));
const Search = React.lazy(() => import("pages/Search"));
const Browse = React.lazy(() => import("pages/Browse"));

// Browse Upload pages imports
const SoftwareHeritage = React.lazy(() =>
  import("pages/BrowseUploads/SoftwareHeritage")
);
const LicenseBrowse = React.lazy(() =>
  import("pages/BrowseUploads/LicenseBrowser")
);
const FileBrowser = React.lazy(() => import("pages/BrowseUploads/FileBrowser"));
const CopyrightBrowser = React.lazy(() =>
  import("pages/BrowseUploads/Copyright")
);
const Ecc = React.lazy(() => import("pages/BrowseUploads/Ecc"));

// Help Pages
const About = React.lazy(() => import("pages/Help/About"));
const Overview = React.lazy(() => import("pages/Help/Overview"));
const LicenseBrowser = React.lazy(() => import("pages/Help/LicenseBrowser"));
const ThirdPartyLicenses = React.lazy(() =>
  import("pages/Help/ThirdPartyLicenses")
);

// Upload Pages
const UploadFile = React.lazy(() => import("pages/Upload/File"));
const UploadFromServer = React.lazy(() => import("pages/Upload/Server"));
const UploadFromVcs = React.lazy(() => import("pages/Upload/Vcs"));
const UploadFromUrl = React.lazy(() => import("pages/Upload/Url"));
const ImportReport = React.lazy(() => import("pages/Upload/ImportReport"));
const Instructions = React.lazy(() => import("pages/Upload/Instructions"));
const OneShotAnalysis = React.lazy(() =>
  import("pages/Upload/OneShotAnalysis")
);
const OneShotCopyright = React.lazy(() =>
  import("pages/Upload/OneShotCopyright")
);
const OneShotMonk = React.lazy(() => import("pages/Upload/OneShotMonk"));

// Jobs Pages
const AllJobs = React.lazy(() => import("pages/Jobs/AllJobs"));
const MyRecentJobs = React.lazy(() => import("pages/Jobs/MyRecentJobs"));
const ScheduleAgents = React.lazy(() => import("pages/Jobs/ScheduleAgents"));

// Organize Pages
const DeleteFolder = React.lazy(() => import("pages/Organize/Folder/Delete"));
const CreateFolder = React.lazy(() => import("pages/Organize/Folder/Create"));
const EditFolder = React.lazy(() => import("pages/Organize/Folder/Edit"));
const MoveFolder = React.lazy(() => import("pages/Organize/Folder/Move"));
const UnlinkFolder = React.lazy(() => import("pages/Organize/Folder/Unlink"));
const AdviceLicenses = React.lazy(() =>
  import("pages/Organize/License/CandidateLicense")
);
const AddCandidateLicense = React.lazy(() =>
  import("pages/Organize/License/Create")
);
const UploadEdit = React.lazy(() => import("pages/Organize/Uploads/Edit"));
const UploadMove = React.lazy(() => import("pages/Organize/Uploads/Move"));
const UploadDelete = React.lazy(() => import("pages/Organize/Uploads/Delete"));

// Admin Pages
const GroupCreate = React.lazy(() => import("pages/Admin/Group/Create"));
const DeleteGroup = React.lazy(() => import("pages/Admin/Group/Delete"));
const DeleteUser = React.lazy(() => import("pages/Admin/Users/Delete"));
const AddUser = React.lazy(() => import("pages/Admin/Users/Add"));
const EditUser = React.lazy(() => import("pages/Admin/Users/Edit"));
const ManageGroup = React.lazy(() => import("pages/Admin/Group/Manage"));
const AddLicense = React.lazy(() => import("pages/Admin/License/Create"));
const SelectLicense = React.lazy(() =>
  import("pages/Admin/License/SelectLicense")
);
const ManageMantainance = React.lazy(() => import("pages/Admin/Mantainance"));

// Default Page
const ErrorPage = React.lazy(() => import("pages/ErrorPage"));

// Footer
const Footer = React.lazy(() => import("components/Footer"));

const Routes = () => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          {/* Home Page */}
          <PublicLayout exact path={routes.home} component={Home} />

          {/* Search Page */}
          <PrivateLayout exact path={routes.search} component={Search} />

          {/* Browse Page */}
          <PrivateLayout exact path={routes.browse} component={Browse} />

          {/* Browse Uploads Pages */}
          <PrivateLayout
            exact
            path={routes.browseUploads.softwareHeritage}
            component={SoftwareHeritage}
          />
          <PrivateLayout
            exact
            path={`${routes.browseUploads.licenseBrowser}/uploadID=:uploadID`}
            component={LicenseBrowse}
          />
          <PrivateLayout
            exact
            path={routes.browseUploads.fileBrowser}
            component={FileBrowser}
          />
          <PrivateLayout
            exact
            path={routes.browseUploads.copyright}
            component={CopyrightBrowser}
          />
          <PrivateLayout
            exact
            path={routes.browseUploads.ecc}
            component={Ecc}
          />

          {/* Help Pages */}
          <PublicLayout exact path={routes.help.about} component={About} />
          <PublicLayout
            exact
            path={routes.help.overview}
            component={Overview}
          />
          <PublicLayout
            exact
            path={routes.help.licenseBrowser}
            component={LicenseBrowser}
          />
          <PublicLayout
            exact
            path={routes.help.thirdPartyLicenses}
            component={ThirdPartyLicenses}
          />

          {/* Upload Pages */}
          <PrivateLayout
            exact
            path={routes.upload.file}
            component={UploadFile}
          />
          <PrivateLayout
            exact
            path={routes.upload.server}
            component={UploadFromServer}
          />
          <PrivateLayout
            exact
            path={routes.upload.url}
            component={UploadFromUrl}
          />
          <PrivateLayout
            exact
            path={routes.upload.vcs}
            component={UploadFromVcs}
          />
          <PrivateLayout
            exact
            path={routes.upload.report}
            component={ImportReport}
          />
          <PublicLayout
            exact
            path={routes.upload.instructions}
            component={Instructions}
          />
          <PublicLayout
            exact
            path={routes.upload.oneShotAnalysis}
            component={OneShotAnalysis}
          />
          <PublicLayout
            exact
            path={routes.upload.oneShotCopyright}
            component={OneShotCopyright}
          />
          <PublicLayout
            exact
            path={routes.upload.oneShotMonk}
            component={OneShotMonk}
          />

          {/* Jobs Page */}
          <PrivateLayout
            exact
            path={routes.jobs.allRecentJobs}
            component={AllJobs}
          />
          <PrivateLayout
            exact
            path={routes.jobs.myRecentJobs}
            component={MyRecentJobs}
          />
          <PrivateLayout
            exact
            path={routes.jobs.scheduleAgents}
            component={ScheduleAgents}
          />

          {/* Organize pages */}
          <PrivateLayout
            exact
            path={routes.organize.folders.delete}
            component={DeleteFolder}
          />
          <PrivateLayout
            exact
            path={routes.organize.folders.create}
            component={CreateFolder}
          />
          <PrivateLayout
            exact
            path={routes.organize.folders.edit}
            component={EditFolder}
          />
          <PrivateLayout
            exact
            path={routes.organize.folders.move}
            component={MoveFolder}
          />
          <PrivateLayout
            exact
            path={routes.organize.folders.unlinkContent}
            component={UnlinkFolder}
          />
          <PrivateLayout
            exact
            path={routes.organize.licenses.candidate}
            component={AdviceLicenses}
          />
          <PrivateLayout
            exact
            path={routes.organize.licenses.create}
            component={AddCandidateLicense}
          />
          <PrivateLayout
            exact
            path={routes.organize.uploads.edit}
            component={UploadEdit}
          />
          <PrivateLayout
            exact
            path={routes.organize.uploads.move}
            component={UploadMove}
          />
          <PrivateLayout
            exact
            path={routes.organize.uploads.delete}
            component={UploadDelete}
          />

          {/* Admin Page */}
          <AdminLayout
            exact
            path={routes.admin.group.create}
            component={GroupCreate}
          />
          <AdminLayout
            exact
            path={routes.admin.group.delete}
            component={DeleteGroup}
          />
          <AdminLayout
            exact
            path={routes.admin.group.manageGroup}
            component={ManageGroup}
          />
          <AdminLayout
            exact
            path={routes.admin.license.create}
            component={AddLicense}
          />
          <AdminLayout
            exact
            path={routes.admin.license.selectLicense}
            component={SelectLicense}
          />
          <AdminLayout
            exact
            path={routes.admin.users.delete}
            component={DeleteUser}
          />
          <AdminLayout
            exact
            path={routes.admin.users.add}
            component={AddUser}
          />
          <AdminLayout
            exact
            path={routes.admin.users.edit}
            component={EditUser}
          />

          <AdminLayout
            exact
            path={routes.admin.mantainance}
            component={ManageMantainance}
          />

          {/* Default Page */}
          <Route path="*">
            <PublicLayout component={ErrorPage} />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Routes;
