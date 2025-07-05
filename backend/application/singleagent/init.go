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

package singleagent

import (
	"github.com/cloudwego/eino/compose"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"

	"code.byted.org/flow/opencoze/backend/domain/agent/singleagent/entity"
	"code.byted.org/flow/opencoze/backend/domain/agent/singleagent/repository"
	singleagent "code.byted.org/flow/opencoze/backend/domain/agent/singleagent/service"
	connector "code.byted.org/flow/opencoze/backend/domain/connector/service"
	knowledge "code.byted.org/flow/opencoze/backend/domain/knowledge/service"
	database "code.byted.org/flow/opencoze/backend/domain/memory/database/service"
	variables "code.byted.org/flow/opencoze/backend/domain/memory/variables/service"
	"code.byted.org/flow/opencoze/backend/domain/modelmgr"
	"code.byted.org/flow/opencoze/backend/domain/plugin/service"
	search "code.byted.org/flow/opencoze/backend/domain/search/service"
	shortcutCmd "code.byted.org/flow/opencoze/backend/domain/shortcutcmd/service"
	user "code.byted.org/flow/opencoze/backend/domain/user/service"
	"code.byted.org/flow/opencoze/backend/domain/workflow"
	"code.byted.org/flow/opencoze/backend/infra/contract/idgen"
	"code.byted.org/flow/opencoze/backend/infra/contract/imagex"
	"code.byted.org/flow/opencoze/backend/infra/contract/storage"
	"code.byted.org/flow/opencoze/backend/infra/impl/chatmodel"
	"code.byted.org/flow/opencoze/backend/pkg/jsoncache"
)

type (
	SingleAgent = singleagent.SingleAgent
)

var SingleAgentSVC *SingleAgentApplicationService

type ServiceComponents struct {
	IDGen       idgen.IDGenerator
	DB          *gorm.DB
	Cache       *redis.Client
	TosClient   storage.Storage
	ImageX      imagex.ImageX
	EventBus    search.ProjectEventBus
	CounterRepo repository.CounterRepository

	KnowledgeDomainSVC   knowledge.Knowledge
	ModelMgrDomainSVC    modelmgr.Manager
	PluginDomainSVC      service.PluginService
	WorkflowDomainSVC    workflow.Service
	UserDomainSVC        user.User
	VariablesDomainSVC   variables.Variables
	ConnectorDomainSVC   connector.Connector
	DatabaseDomainSVC    database.Database
	ShortcutCMDDomainSVC shortcutCmd.ShortcutCmd
	CPStore              compose.CheckPointStore
}

func InitService(c *ServiceComponents) (*SingleAgentApplicationService, error) {
	domainComponents := &singleagent.Components{
		AgentDraftRepo:   repository.NewSingleAgentRepo(c.DB, c.IDGen, c.Cache),
		AgentVersionRepo: repository.NewSingleAgentVersionRepo(c.DB, c.IDGen),
		PublishInfoRepo:  jsoncache.New[entity.PublishInfo]("agent:publish:last:", c.Cache),
		CounterRepo:      repository.NewCounterRepo(c.Cache),
		CPStore:          c.CPStore,
		ModelFactory:     chatmodel.NewDefaultFactory(),
	}

	singleAgentDomainSVC := singleagent.NewService(domainComponents)
	SingleAgentSVC = newApplicationService(c, singleAgentDomainSVC)

	return SingleAgentSVC, nil
}
