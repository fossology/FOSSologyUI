/*
* This file contains lists all API functions
*/

import { endpoints } from '../constants/endpoints';
import sendRequest from '../services/senrequest';

export const getJobApi = ({ jobId }) => {
  const url = endpoints.jobs.details(jobId);
  return sendRequest({
    url,
    method: 'GET',
    credentials: 'include'
  });
};