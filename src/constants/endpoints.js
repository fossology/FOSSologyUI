/*
* This file lists all application wide constants and APIs
*/

const serverUrl = 'http://localhost/repo';

export const endpoints = {
  jobs: {
    details: (jobId) => `${serverUrl}/jobs/${jobId}`
  }
}