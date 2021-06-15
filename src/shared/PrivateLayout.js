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
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivateLayout = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth()  ? (
              <React.Fragment>
                <Header />
                <Component {...props} />
                <Footer />
              </React.Fragment>
              
            ) : (
                <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateLayout;