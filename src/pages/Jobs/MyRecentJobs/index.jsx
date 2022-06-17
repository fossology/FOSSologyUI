/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com),
 Copyright (C) 2022 Soham Banerjee (sohambanerjee4abc@hotmail.com)

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

// Title
import Title from "components/Title";

// Required functions for API and Error handling
import { getAllJobApi } from "api/jobs";
import { handleError } from "shared/helper";
import { initialMessage } from "constants/constants";
import messages from "constants/messages";
import { Alert } from "components/Widgets";
import { MDBDataTable } from "mdbreact";
import { getUserSelf } from "services/users";
import "./styles.css";

const MyRecentJobs = () => {
  // Setting the browse data to the table
  const [jobsDataList, setJobsDataList] = useState();

  // State Variables for handling Error Boundaries
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  function Dateformatter(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const d = new Date(date);
    return d.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const arr = [];
    setMessage({
      type: "success",
      text: messages.loading,
    });
    setShowMessage(true);

    getAllJobApi()
      .then((res) => {
        // Checking the id of user with the userId from the jobs list
        const uid = getUserSelf();
        uid.then(function getUid(result) {
          const usrId = result.id;
          let k = 0;
          for (let i = 0; i < res.length; i++) {
            // Formatting the date from time stamp to readable date
            res[i].queueDate = Dateformatter(res[i].queueDate);
            if (res[i].userId === `${usrId}`) {
              arr[k] = res[i];
              k += 1;
            }
          }
          setJobsDataList(arr);
        });

        setShowMessage(false);
      })
      .catch((error) => {
        handleError(error, setMessage);
      });
  }, []);

  // Data formatted for the data-table with respective coloumns
  const data = {
    columns: [
      {
        label: "Job Name ",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Queue Date",
        field: `queueDate`,
        sort: "asc",
        width: 270,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
    ],
    rows: jobsDataList,
  };

  return (
    <>
      <Title title="My Recent Jobs" />
      <div className="main-container my-3 text-center">
        {showMessage && (
          <Alert
            type={message.type}
            setShow={setShowMessage}
            message={message.text}
          />
        )}
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <h2 className="font-size-sub-heading">My Jobs</h2>
          </div>
          <div className="col-md-9 col-lg-10">
            <MDBDataTable className="reactTable" striped bordered data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRecentJobs;
