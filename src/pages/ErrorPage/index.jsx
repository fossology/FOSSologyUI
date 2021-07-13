/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
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

import React from "react";
import styles from "styled-components";
import { Link } from "react-router-dom";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import routes from "../../constants/routes";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <div className="text-center mx-auto">
        <ExclamationTriangleFill color="#FF0000" size={120} />
        <Heading1>Error: Page Not Found!</Heading1>
        <Heading2>We could not find the page you were searching for</Heading2>
        <Heading2>
          Go back to <Link to={routes.home}>Home</Link>
        </Heading2>
      </div>
    </ErrorContainer>
  );
};

const ErrorContainer = styles.div`
  display: flex;
  height: 65vh;
  align-items: center;
`;

const Heading1 = styles.h1`
  font-family: IndieFlower-regular;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Heading2 = styles.h2`
  font-family: IndieFlower-regular;
  margin-bottom: 2rem;
`;

export default ErrorPage;
