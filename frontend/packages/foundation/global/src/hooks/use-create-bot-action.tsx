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

import { useEffect } from 'react';

import { EVENT_NAMES, sendTeaEvent } from '@coze-arch/bot-tea';
import { useCreateProjectModal } from '@coze-studio/project-entity-adapter';
import { cozeMitt } from '@coze-common/coze-mitt';

export const useCreateBotAction = ({
  autoCreate,
  urlSearch,
  currentSpaceId,
}: {
  autoCreate?: boolean;
  urlSearch?: string;
  currentSpaceId?: string;
}) => {
  // Create bot function - 移除新窗口相关逻辑
  const { modalContextHolder, createProject } = useCreateProjectModal({
    bizCreateFrom: 'navi',
    selectSpace: true,
    onCreateBotSuccess: (botId, targetSpaceId) => {
      let url = `/space/${targetSpaceId}/bot/${botId}`;
      if (autoCreate) {
        url += urlSearch;
      }
      // 改为在当前页面导航，而不是新窗口
      if (botId) {
        window.location.href = url;
      }
    },
    onBeforeCreateBot: () => {
      sendTeaEvent(EVENT_NAMES.create_bot_click, {
        source: 'menu_bar',
      });
      // 移除打开新窗口的逻辑
    },
    onCreateBotError: () => {
      // 移除销毁窗口的逻辑
    },
    onBeforeCreateProject: () => {
      // 移除打开新窗口的逻辑
    },
    onCreateProjectError: () => {
      // 移除销毁窗口的逻辑
    },
    onBeforeCopyProjectTemplate: ({ toSpaceId }) => {
      // 移除打开新窗口的逻辑
    },
    onProjectTemplateCopyError: () => {
      // 移除销毁窗口的逻辑
    },
    onCreateProjectSuccess: ({ projectId, spaceId }) => {
      const baseUrl = `/space/${spaceId}/project-ide/${projectId}`;
      let finalUrl = baseUrl;
      
      if (autoCreate) {
        finalUrl += urlSearch;
      }
      
      // 改为在当前页面导航
      window.location.href = finalUrl;
    },
    onCopyProjectTemplateSuccess: param => {
      cozeMitt.emit('createProjectByCopyTemplateFromSidebar', param);
      // 改为在当前页面导航
      window.location.href = `/space/${param.toSpaceId}/develop`;
    },
  });

  useEffect(() => {
    if (autoCreate) {
      createProject();
    }
  }, [autoCreate]);

  return {
    createBot: createProject,
    createBotModal: modalContextHolder,
  };
};
