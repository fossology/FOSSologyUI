/*
* This file contains functions which process the data retured by jobs API
*/

import {
  getJobApi
} from '../api/jobs';

export function getJob(jobId) {
  return getJobApi(jobId).then(res => {
    return res.entity.map(jsonObject => {
      const tag = {};
      tag.stats = { score: jsonObject.score };
      return tag;
    })
  })
}