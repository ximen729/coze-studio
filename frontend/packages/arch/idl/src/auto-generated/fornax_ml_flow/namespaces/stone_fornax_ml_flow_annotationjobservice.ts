/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import * as annotation_job from './annotation_job';
import * as base from './base';
import * as datasetv2 from './datasetv2';
import * as ai_annotate from './ai_annotate';
import * as filter from './filter';

export type Int64 = string | number;

export interface CreateQualityScoreJobRequest {
  spaceID: string;
  datasetID: string;
  /** 质量分任务内容 */
  job: annotation_job.QualityScoreJob;
  base?: base.Base;
}

export interface CreateQualityScoreJobResponse {
  jobID?: string;
  baseResp?: base.BaseResp;
}

export interface DeleteQualityScoreJobRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  base?: base.Base;
}

export interface DeleteQualityScoreJobResponse {
  baseResp?: base.BaseResp;
}

export interface DryRunQualityScoreJobRequest {
  spaceID: string;
  datasetID: string;
  job: annotation_job.QualityScoreJob;
  /** 不传，默认5条 */
  sampleCount?: number;
  base?: base.Base;
}

export interface DryRunQualityScoreJobResponse {
  items?: Array<datasetv2.DatasetItem>;
  qualityScoreFieldKey?: string;
  baseResp?: base.BaseResp;
}

export interface GetQualityScoreJobInstanceRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  base?: base.Base;
}

export interface GetQualityScoreJobInstanceResponse {
  instance?: annotation_job.QualityScoreJobInstance;
  baseResp?: base.BaseResp;
}

export interface GetQualityScoreJobRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  base?: base.Base;
}

export interface GetQualityScoreJobResponse {
  job?: annotation_job.QualityScoreJob;
  baseResp?: base.BaseResp;
}

export interface ListQualityScoreJobsRequest {
  spaceID: string;
  datasetID: string;
  /** pagination */
  page?: number;
  pageSize?: number;
  cursor?: string;
  base?: base.Base;
}

export interface ListQualityScoreJobsResponse {
  jobs?: Array<annotation_job.QualityScoreJob>;
  nextCursor?: string;
  total?: string;
  baseResp?: base.BaseResp;
}

export interface RunQualityScoreJobRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  taskRunType: ai_annotate.AIAnnotateTaskRunType;
  filter?: filter.Filter;
  base?: base.Base;
}

export interface RunQualityScoreJobResponse {
  jobInstanceID?: string;
  baseResp?: base.BaseResp;
}

export interface RunQualityScoreSyncRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  itemIDs: Array<string>;
  base?: base.Base;
}

export interface RunQualityScoreSyncResponse {
  items?: Array<datasetv2.DatasetItem>;
  baseResp?: base.BaseResp;
}

export interface TerminateQualityScoreJobInstanceRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  /** 任务实例id */
  instanceID: string;
  base?: base.Base;
}

export interface TerminateQualityScoreJobInstanceResponse {
  baseResp?: base.BaseResp;
}

export interface UpdateQualityScoreJobRequest {
  spaceID: string;
  datasetID: string;
  jobID: string;
  job: annotation_job.QualityScoreJob;
  base?: base.Base;
}

export interface UpdateQualityScoreJobResponse {
  baseResp?: base.BaseResp;
}
/* eslint-enable */
