/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

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

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Title
import Title from "components/Title";

// Widgets
import { Alert, Button, InputContainer } from "components/Widgets";

// Required functions for calling APIs
import { getAllLicense } from "services/licenses";

// Routes
import routes from "constants/routes";

const AdviceLicenses = () => {
  const history = useHistory();
  const entriesOptions = [
    {
      id: 10,
      value: 10,
    },
    {
      id: 25,
      value: 25,
    },
    {
      id: 50,
      value: 50,
    },
    {
      id: 100,
      value: 100,
    },
  ];

  const initialState = {
    page: 1,
    limit: 10,
    kind: "candidate",
  };
  const initialMessage = {
    type: "success",
    text: "",
  };

  // Data required for getting the candidate license list
  const [licenseData, setLicenseData] = useState(initialState);

  // Setting the candidate licenses data to the table
  const [licenseDataList, setLicenseDataList] = useState();

  // State Variables for handling Error Boundaries
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const handleChange = (e) => {
    setLicenseData({
      ...licenseData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    getAllLicense(licenseData)
      .then((res) => {
        setLicenseDataList(res);
      })
      .catch((error) => {
        setMessage({
          type: "danger",
          text: error.message,
        });
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      });
  }, [licenseData]);
  return (
    <>
      <Title title="Candidate Licenses" />
      <div className="main-container my-3">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h1 className="font-size-main-heading">Candidate Licenses</h1>
            <br />
            <div className="d-flex justify-content-between">
              <InputContainer
                name="limit"
                type="select"
                onChange={(e) => handleChange(e)}
                options={entriesOptions}
                property="value"
              />
              <input
                type="search"
                className="form-control w-25 mt-4"
                placeholder="Search"
              />
            </div>
            <table className="table table-striped text-primary-color font-size-medium table-responsive-md table-bordered">
              <thead>
                <tr className="font-bold text-center font-size-sub-heading">
                  <th>Edit</th>
                  <th>Short Name</th>
                  <th>Full Name</th>
                  <th>Text</th>
                  <th>URL</th>
                  <th>Merge Request</th>
                </tr>
              </thead>
              <tbody>
                {licenseDataList &&
                  licenseDataList.map((license) => (
                    <tr className="text-center" key={license.id}>
                      <td />
                      <td>{license.shortName}</td>
                      <td>{license.fullName}</td>
                      <td className="py-0 px-0 candidate-license-text">
                        <textarea
                          disabled
                          className="w-100 px-3"
                          value={license.text}
                        />
                      </td>
                      <td>
                        <a href={license.url}>{license.url}</a>
                      </td>
                      <td />
                    </tr>
                  ))}
              </tbody>
            </table>
            <Button
              type="button"
              onClick={() => history.push(routes.organize.licenses.create)}
              className="mt-4"
            >
              New License
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdviceLicenses;
