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
import { BrowserRouter, Switch } from "react-router-dom";

// Guards imports
import PublicLayout from "./shared/PublicLayout";
import PrivateLayout from "./shared/PrivateLayout";

// Pages imports
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Overview from "./pages/Help/Overview";
import LicenseBrowser from "./pages/Help/LicenseBrowser";
import Instructions from "./pages/Upload/Instructions";
import About from "./pages/Help/About";
import ThirdPartyLicenses from "./pages/Help/ThirdPartyLicenses";

// Routes imports
import { routes } from "./constants/routes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicLayout exact path={routes.home} component={Home} />
        <PublicLayout exact path={routes.login} component={Login} />
        <PublicLayout exact path={routes.help.overview} component={Overview} />
        <PublicLayout
          exact
          path={routes.help.licenseBrowser}
          component={LicenseBrowser}
        />
        <PublicLayout
          exact
          path={routes.upload.instructions}
          component={Instructions}
        />
        <PublicLayout exact path={routes.help.about} component={About} />
        <PublicLayout
          exact
          path={routes.help.thirdPartyLicenses}
          component={ThirdPartyLicenses}
        />
        <PrivateLayout exact path={routes.search} component={Search} />
        <PrivateLayout exact path={routes.browse} component={Browse} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
