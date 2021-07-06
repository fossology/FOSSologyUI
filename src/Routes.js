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
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Guards imports
import PublicLayout from "./shared/PublicLayout";
import PrivateLayout from "./shared/PrivateLayout";
import AdminLayout from "./shared/AdminLayout";

// Pages imports
import Home from "./pages/Home";
import Search from "./pages/Search";
import Browse from "./pages/Browse";

// Help Pages
import About from "./pages/Help/About";
import Overview from "./pages/Help/Overview";
import LicenseBrowser from "./pages/Help/LicenseBrowser";
import ThirdPartyLicenses from "./pages/Help/ThirdPartyLicenses";

// Upload Pages
import UploadFile from "./pages/Upload/File";
import UploadFromServer from "./pages/Upload/Server";
import UploadFromVcs from "./pages/Upload/Vcs";
import UploadFromUrl from "./pages/Upload/Url";
import ImportReport from "./pages/Upload/ImportReport";
import Instructions from "./pages/Upload/Instructions";
import OneShotAnalysis from "./pages/Upload/OneShotAnalysis";
import OneShotCopyright from "./pages/Upload/OneShotCopyright";
import OneShotMonk from "./pages/Upload/OneShotMonk";

// Jobs Pages
import AllJobs from "./pages/Jobs/AllJobs";
import MyRecentJobs from "./pages/Jobs/MyRecentJobs";
import ScheduleAgents from "./pages/Jobs/ScheduleAgents";

// Organize Pages
import DeleteFolder from "./pages/Organize/Folder/Delete";
import CreateFolder from "./pages/Organize/Folder/Create";
import EditFolder from "./pages/Organize/Folder/Edit";
import MoveFolder from "./pages/Organize/Folder/Move";
import AdviceLicenses from "./pages/Organize/License/index";
import UploadEdit from "./pages/Organize/Uploads/Edit";
import UploadMove from "./pages/Organize/Uploads/Move";
import UploadDelete from "./pages/Organize/Uploads/Delete";

// Admin Pages
import GroupCreate from "./pages/Admin/Group/Create";
import DeleteUser from "./pages/Admin/Users/Delete";
import AddLicense from "./pages/Admin/License/Create";
import SelectLicense from "./pages/Admin/License/SelectLicense";

// Default Page
import ErrorPage from "./pages/ErrorPage";
import UnlinkFolder from "./pages/Organize/Folder/Unlink";

// Routes imports
import { routes } from "./constants/routes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Home Page */}
        <PublicLayout exact path={routes.home} component={Home} />

        {/* Search Page */}
        <PrivateLayout exact path={routes.search} component={Search} />

        {/* Browse Page */}
        <PrivateLayout exact path={routes.browse} component={Browse} />

        {/* Help Pages */}
        <PublicLayout exact path={routes.help.about} component={About} />
        <PublicLayout exact path={routes.help.overview} component={Overview} />
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
        <PrivateLayout exact path={routes.upload.file} component={UploadFile} />
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

        {/* Organize Folder pages */}
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
          path={routes.organize.licenses}
          component={AdviceLicenses}
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
        <PrivateLayout
          exact
          path={routes.organize.folders.unlinkContent}
          component={UnlinkFolder}
        />

        {/* Admin Page */}
        <AdminLayout
          exact
          path={routes.admin.group.create}
          component={GroupCreate}
        />
        <PrivateLayout
          exact
          path={routes.admin.license.create}
          component={AddLicense}
        />
        <PrivateLayout
          exact
          path={routes.admin.license.selectLicense}
          component={SelectLicense}
        />
        <PrivateLayout
          exact
          path={routes.admin.users.delete}
          component={DeleteUser}
        />

        {/* Default Page */}
        <Route path="*">
          <PublicLayout component={ErrorPage} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
