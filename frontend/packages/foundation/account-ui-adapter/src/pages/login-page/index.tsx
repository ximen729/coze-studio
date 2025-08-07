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

import { type FC, useState, useEffect } from 'react';

import { CozeBrand } from '@coze-studio/components/coze-brand';
import { I18n } from '@coze-arch/i18n';
import { Button, Form } from '@coze-arch/coze-design';
import { SignFrame, SignPanel } from '@coze-arch/bot-semi';

import { useLoginService } from './service';
import { Favicon } from './favicon';
import { Toast } from '@coze-arch/coze-design';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginError = (error: any) => {
    setShowLoginForm(true);
    setIsAutoLogin(false);
    Toast.error({
      content: '登录失败，请联系管理员！',
      showClose: false,
    });
  };

  const { login, register, loginLoading, registerLoading } = useLoginService({
    email,
    password,
    onLoginError: handleLoginError,
  });

  // 自动登录逻辑
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const pwdParam = urlParams.get('pwd');

    if (emailParam && pwdParam) {
      setEmail(emailParam);
      setPassword(pwdParam);
      setIsAutoLogin(true);
      setShowLoginForm(false); // 隐藏登录表单

      // 延迟一下确保状态更新完成后再调用登录
      setTimeout(() => {
        login();
      }, 100);
    } else {
      // 如果没有URL参数，显示登录表单
      setShowLoginForm(true);
    }
  }, [login]);

  const submitDisabled = !email || !password || hasError;
  const loginMessage = () => {
    Toast.error({
      content: '登录失败，请联系管理员！',
      showClose: false,
    });
  };

  // 如果正在自动登录且没有显示登录表单，显示加载状态
  if (isAutoLogin && !showLoginForm) {
    return (
      <SignFrame brandNode={<CozeBrand isOversea={IS_OVERSEA} />}>
        <SignPanel className="w-[600px] h-[640px] pt-[96px]">
          <div className="flex flex-col items-center w-full h-full">
            <Favicon />
            <div className="text-[24px] font-medium coze-fg-plug leading-[36px] mt-[32px]">
              {I18n.t('open_source_login_welcome')}
            </div>
            <div className="mt-[64px] flex flex-col items-center">
              <div className="text-[16px] text-gray-500 mb-[20px]">
                自动登录中...
              </div>
              <div className="w-[40px] h-[40px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </SignPanel>
      </SignFrame>
    );
  }

  return (
    <SignFrame brandNode={<CozeBrand isOversea={IS_OVERSEA} />}>
      <SignPanel className="w-[600px] h-[640px] pt-[96px]">
        <div className="flex flex-col items-center w-full h-full">
          <Favicon />
          <div className="text-[24px] font-medium coze-fg-plug leading-[36px] mt-[32px]">
            {I18n.t('open_source_login_welcome')}
          </div>
          <div className="mt-[64px] w-[320px] flex flex-col items-stretch [&_.semi-input-wrapper]:overflow-hidden">
            <Form
              initValues={{ email, password }}
              onErrorChange={errors => {
                setHasError(Object.keys(errors).length > 0);
              }}
            >
              <Form.Input
                data-testid="login.input.email"
                noLabel
                type="email"
                field="email"
                rules={[
                  {
                    required: true,
                    message: I18n.t('open_source_login_placeholder_email'),
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: I18n.t('open_source_login_placeholder_email'),
                  },
                ]}
                onChange={newVal => {
                  setEmail(newVal);
                }}
                placeholder={I18n.t('open_source_login_placeholder_email')}
              />
              <Form.Input
                data-testid="login.input.password"
                noLabel
                rules={[
                  {
                    required: true,
                    message: I18n.t('open_source_login_placeholder_password'),
                  },
                ]}
                field="password"
                type="password"
                onChange={setPassword}
                placeholder={I18n.t('open_source_login_placeholder_password')}
              />
            </Form>
            {/* <Button
              data-testid="login.button.login"
              className="mt-[12px]"
              disabled={submitDisabled || registerLoading}
              onClick={login}
              loading={loginLoading}
              color="hgltplus"
            >
              {isAutoLogin ? '自动登录中...' : I18n.t('login_button_text')}
            </Button> */}
            <Button
              data-testid="login.button.login"
              className="mt-[12px]"
              disabled={submitDisabled || registerLoading}
              onClick={loginMessage}
              loading={loginLoading}
              color="hgltplus"
            >
              {I18n.t('login_button_text')}
            </Button>
            {/* 注册 */}
            {/* <Button
              data-testid="login.button.signup"
              className="mt-[20px]"
              disabled={submitDisabled || loginLoading}
              onClick={register}
              loading={registerLoading}
              color="primary"
            >
              {I18n.t('register')}
            </Button> */}
            {/* 开源协议 */}
            {/* <div className="mt-[12px] flex justify-center">
              <a
                data-testid="login.link.terms"
                href="https://github.com/coze-dev/coze-studio?tab=Apache-2.0-1-ov-file"
                target="_blank"
                className="no-underline coz-fg-hglt"
              >
                {I18n.t('open_source_terms_linkname')}
              </a>
            </div> */}
          </div>
        </div>
      </SignPanel>
    </SignFrame>
  );
};
