/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)

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
import { initialMessage } from "constants/constants";
import { Alert } from "components/Widgets";
import { useParams } from "react-router-dom";
import { getUploadHistory } from "services/jobs";
import { apiUrl } from "constants/endpoints";

const ShowJobs = () => {
  const [message, setMessage] = useState(initialMessage);
  const [showMessage, setShowMessage] = useState(false);
  const [allJobsHistoryList, setAllJobsHistoryList] = useState([]);
  const params = useParams();

  useEffect(async () => {
    if (params.uploadId) {
      try {
        const allJobsHistory = await getUploadHistory(params.uploadId);
        setAllJobsHistoryList(allJobsHistory);
      } catch (error) {
        setMessage(error.message);
        setShowMessage(true);
      }
    }
  }, [params]);

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
        <div>
          <div>
            {allJobsHistoryList?.map((job) => {
              return (
                <table
                  key={job.jobId}
                  className="table table-striped text-primary-color font-size-medium table-responsive-sm table-bordered"
                >
                  <thead>
                    <tr className="font-bold">
                      <th>Job/Dependency</th>
                      <th>Status</th>
                      <th colSpan={3}>{job.jobName}</th>
                      <th>Average items/sec</th>
                      <th>ETA</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {job?.jobQueue?.map((jobQues) => {
                      return (
                        <tr key={jobQues.jobQueueId}>
                          <td>
                            {jobQues?.jobQueueId}
                            {jobQues?.dependencies[0] &&
                              ` / ${jobQues?.dependencies[0]}`}
                          </td>
                          <td>{jobQues?.status}</td>
                          <td>{jobQues?.jobQueueType}</td>
                          <td>
                            {jobQues?.startTime} - {jobQues?.endTime}
                          </td>
                          <td>{jobQues?.itemsProcessed} items</td>
                          <td>{jobQues?.itemsPerSec} items/sec</td>
                          <td>
                            {job.upload.uploadEta.length
                              ? job.upload.uploadEta
                              : "Scanned"}
                          </td>
                          <td>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`${apiUrl.slice(
                                0,
                                -7
                              )}/?mod=download&report=${job.jobId}`}
                            >
                              {jobQues?.itemsProcessed !== 0 &&
                                jobQues?.download}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowJobs;
