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

export type Int64 = string | number;

export enum Language {
  /** 中文 */
  Chinese = 0,
  /** 英文 */
  English = 1,
}

export interface AuthorizedChannel {
  name?: string;
  icon?: string;
  url_code?: string;
  web_url?: string;
}

export interface AuthorizedChannelMatchData {
  channel_list?: Array<AuthorizedChannel>;
}

export interface AuthorizedChannelMatchRequest {
  web_rul?: string;
}

export interface AuthorizedChannelMatchResponse {
  code?: Int64;
  msg?: string;
  data?: AuthorizedChannelMatchData;
}

export interface ContractFileInfo {
  /** 文件名 */
  name?: string;
  /** 文件uri */
  file_uri?: string;
}

export interface DraftConfig {
  /** 起草文件名 */
  name?: string;
  /** 业务背景 */
  background?: string;
  /** 合同最小字数 */
  contractMinLength?: number;
  /** 合同最大字数 */
  contractMaxLength?: number;
  /** 草稿最小字数 */
  draftMinLength?: number;
  /** 代表的立场 */
  representativePosition?: string;
  /** 优势等级 */
  advantageLevel?: number;
  /** 语言 */
  language?: Language;
}

export interface GenerateRelatedWordsData {
  related_words?: Array<RelatedWord>;
}

export interface GenerateRelatedWordsRequest {
  original_word?: string;
  describe?: string;
}

export interface GenerateRelatedWordsResponse {
  code?: Int64;
  msg?: string;
  data?: GenerateRelatedWordsData;
}

export interface LawQAConfig {
  /** 问题 */
  question?: string;
}

export interface RelatedWord {
  intent?: string;
  keywords?: Array<string>;
}

export interface ReviewConfig {
  /** 主体名称 */
  holderName?: string;
  /** 主体角色 */
  holderRole?: string;
  /** 审查目的 */
  objectives?: Array<string>;
  /** 背景 */
  background?: string;
}
/* eslint-enable */
