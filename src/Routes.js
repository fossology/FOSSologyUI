/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 Copyright (C) 2021 Siemens AG

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

import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicLayout from './shared/PublicLayout';
import PrivateLayout from './shared/PrivateLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Login from './pages/Login';


const Routes = () => {
  return ( 
    <BrowserRouter> 
      <Switch>          
        <PublicLayout exact path='/' component={ Home } />
        <PublicLayout exact path='/login' component={ Login } />

        <PrivateLayout exact path='/browse' component={ Browse } />        
      </Switch> 
    </BrowserRouter>
  );
};

export default Routes;