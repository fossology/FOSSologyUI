/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com),
 Copyright (C) 2022 Soham Banerjee (sohambanerjee4abc@hotmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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

"use client";

import React, { useEffect, useState } from "react";

// Required functions for API and Error handling
import { handleError } from "@/shared/helper";
import { initialMessage, entriesOptions } from "@/constants/constants";
import messages from "@/constants/messages";
import { InputContainer, Alert } from "@/components/Widgets";
import { getAllAdminJob } from "@/services/jobs";
import Pagination from "@mui/material/Pagination";

const AllJobsPage = () => {
  const initialState = {
    page: 1,
    limit: 10,
  };

  const [jobsDataList, setJobsDataList] = useState([]);
  const [jobsData, setJobsData] = useState(initialState);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  const [pagesOptions, setPagesOptions] = useState([]);
  const [pages, setPages] = useState(1);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    setMessage({
      type: "success",
      text: messages.loading,
    });
    setShowMessage(true);

    getAllAdminJob(jobsData)
      .then((res) => {
        setShowMessage(false);

        const formatted = res?.res?.map((job) => ({
          ...job,
          queueDate: formatDate(job.queueDate),
        })) || [];

        setJobsDataList(formatted);
        setPages(res.pages || 1);

        const pageOptions = Array.from({ length: res.pages || 1 }, (_, i) => ({
          id: i + 1,
          value: i + 1,
        }));
        setPagesOptions(pageOptions);
      })
      .catch((error) => {
        handleError(error, setMessage);
        setShowMessage(true);
      });
  }, [jobsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobsData({
      ...jobsData,
      [name]: value,
      page: 1,
    });
  };

  const handlePageChange = (_, value) => {
    if (value >= 1) {
      setJobsData({ ...jobsData, page: value });
    }
  };

  return (
    <>
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
                    <span className="mt-1">Show entries: </span>
                    <InputContainer
                      name="limit"
                      type="select"
                      onChange={handleChange}
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
                      onChange={(e) => setQuery(e.target.value)}
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
                  .filter((job) =>
                    query === ""
                      ? true
                      : job?.name?.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((job, idx) => (
                    <tr key={idx} className="text-center">
                      <td>
                        <div className="font-demi">{job?.name}</div>
                      </td>
                      <td>
                        <div className="font-demi">{job?.queueDate}</div>
                      </td>
                      <td>{job?.status}</td>
                    </tr>
                  ))}
                <tr className="text-left">
                  <td colSpan="6">
                    <div className="right-pagination">
                      Page:
                      <div className="row">
                        <Pagination
                          name="page"
                          className="col-md-6 pagination-div"
                          count={pages}
                          page={jobsData.page}
                          onChange={handlePageChange}
                        />
                        <div className="row">
                          Go to Page:&nbsp;
                          <input
                            type="number"
                            className="pagination-textarea"
                            onChange={(e) =>
                              handlePageChange(e, Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
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

export default AllJobsPage;
