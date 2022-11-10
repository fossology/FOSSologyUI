/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com),
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

import Pagination from "@material-ui/lab/Pagination";
// Title
import Title from "components/Title";
import { Alert, InputContainer } from "components/Widgets";
import { entriesOptions, initialMessage } from "constants/constants";
import messages from "constants/messages";
import React, { useEffect, useState } from "react";
import { getAllAdminJob } from "services/jobs";
// Required functions for API and Error handling
import { handleError } from "shared/helper";

const AllJobs = () => {
  const initialState = {
    page: 1,
    limit: 10,
  };
  // Setting the browse data to the table
  const [jobsDataList, setJobsDataList] = useState();
  const [jobsData, setJobsData] = useState(initialState);
  // variable for searching in the datatable
  const [query, setQuery] = useState("");

  // State Variables for handling Error Boundaries
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  const [pagesOptions, setPagesOptions] = useState();
  const [pages, setPages] = useState();

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
    setMessage({
      type: "success",
      text: messages.loading,
    });
    setShowMessage(true);
    getAllAdminJob(jobsData)
      .then((res) => {
        // Formatting the date from time stamp to readable date
        setShowMessage(false);
        const arr = [];
        for (let i = 0; i < res.res.length; i++) {
          res.res[i].queueDate = Dateformatter(res.res[i].queueDate);
          arr[i] = res.res[i];
        }
        setPages(res.pages);
        // Creating pagination
        const arrPages = [];
        for (let i = 0; i < res.pages; i++) {
          arrPages.push({
            id: i + 1,
            value: i + 1,
          });
        }
        setPagesOptions(arrPages);
        setJobsDataList(arr);
        setShowMessage(false);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, [jobsData]);

  const handleChange = (e) => {
    if (e.target.name === "limit") {
      setJobsData({
        ...jobsData,
        [e.target.name]: e.target.value,
        page: 1,
      });
    } else {
      setJobsData({
        ...jobsData,
        [e.target.name]: e.target.value,
        page: 1,
      });
    }
  };
  const handlePageChange = (e, value) => {
    if (value >= 1) {
      setPages(value);
      setJobsData({ ...jobsData, [`page`]: value });
    }
  };

  return (
    <>
      <Title title="Show Jobs" />
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
            <h2 className="font-size-sub-heading">All Jobs</h2>
          </div>
          <div className="col-md-9 col-lg-10">
            <table className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered">
              <thead>
                <tr>
                  <th colSpan="6" className="font-size-sub-heading text-center">
                    All Recent Jobs
                  </th>
                </tr>
                <tr className="font-demi">
                  <td colSpan="6" className="p-2 m-2 text-left">
                    <span className="mt-1 ">Show entries: </span>
                    <InputContainer
                      name="limit"
                      type="select"
                      onChange={(e) => handleChange(e)}
                      options={entriesOptions}
                      property="entry"
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Filter Jobs"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </th>
                  <th />
                </tr>
                <tr className="font-bold text-center">
                  <th>Job Name</th>
                  <th>Queue Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobsDataList
                  ?.filter((post) => {
                    if (query === "") {
                      return post;
                    }
                    if (post?.name.toLowerCase().includes(query.toLowerCase()))
                      return post;
                    return null;
                  })
                  .map((data) => (
                    <tr className="text-center">
                      <td>
                        <div className="font-demi">{data?.name}</div>
                      </td>
                      <td>
                        <div className="font-demi">{data?.queueDate}</div>
                      </td>
                      <td>{data?.status}</td>
                    </tr>
                  ))}
                <tr className="text-left">
                  <td colSpan="6">
                    <div className="right-pagination">
                      Page:
                      {pagesOptions && (
                        <div className="row">
                          <Pagination
                            name="page"
                            className="col-md-6 pagination-div "
                            property="value"
                            count={pages}
                            page={jobsData.page}
                            onChange={handlePageChange}
                          />

                          <div className="row">
                            Go to Page: &nbsp;
                            <input
                              type="number"
                              maxLength="4"
                              size="3"
                              className="pagination-textarea"
                              onChange={(event) =>
                                handlePageChange(event, event.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobs;
