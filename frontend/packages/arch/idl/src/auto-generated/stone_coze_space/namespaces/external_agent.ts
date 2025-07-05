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

/** 回调类型 */
export enum CallbackType {
  CREATE = 1,
  DELETE = 2,
}

export enum OperateType {
  /** 运行中，Chat和任务执行都算在运行中 */
  Running = 1,
  /** 暂停 */
  Pause = 2,
  /** 一轮任务完成 */
  TaskFinish = 3,
  /** 初始化 */
  Init = 4,
  /** 终止 */
  Stop = 5,
  /** 中断 */
  Interrupt = 6,
  /** 存在非法内容 */
  IllegalContent = 7,
  /** 异常中断 */
  AbnormalInterrupt = 8,
  /** 休眠 */
  Sleep = 9,
}

export interface UpdateTaskNameRequest {
  agent_id?: Int64;
  sk?: string;
  task_id?: string;
  task_name?: string;
}

export interface UpdateTaskNameResponse {
  code?: Int64;
  msg?: string;
}

export interface UpdateTaskStatusRequest {
  agent_id?: Int64;
  sk?: string;
  task_id?: string;
  task_status?: OperateType;
}

export interface UpdateTaskStatusResponse {
  code?: Int64;
  msg?: string;
}
/* eslint-enable */
