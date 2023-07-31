import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { Form, Input, Button, Notification } from '@arco-design/web-react';

import { getCaptchaApi, userLoginApi } from '@/api/user';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { ErrorsToString } from '@/utils/common';
import { User, userState } from '@/store/user_store';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [loginForm] = Form.useForm();

    // 登录状态
    const setAuth = useSetRecoilState<User>(userState);

    // 登录请求
    const userLogin = useMutation(['user', 'auth'], userLoginApi);
    // 获取图片验证码
    const {
        data: captchaData,
        isSuccess: captchaIsSuccess,
        refetch: captchaRefetch
    } = useQuery(['captcha'], getCaptchaApi);

    // 路由跳转
    const location = useLocation();
    const from = location.state?.prevLocation?.pathname || '/index';
    const navigate = useNavigate();

    // 表单提交
    const submitHandler = async (e: Event) => {
        e.preventDefault();
        loginForm
            .validate()
            .then((values) => {
                userLogin.mutate(
                    {
                        user_name: values.userName,
                        password: values.password,
                        captcha_id: captchaData?.data.id,
                        captcha_value: values.captcha
                    },
                    {
                        onSuccess: (data) => {
                            setAuth({
                                isLogged: true,
                                auth_token: data.data.auth_token,
                                user: {
                                    user_id: data.data.user_id,
                                    name: data.data.name,
                                    type: data.data.type
                                }
                            });
                            Notification.success({
                                title: '成功',
                                content: '登录成功',
                                duration: 1000,
                                onClose: () => {
                                    navigate(from, { replace: true });
                                }
                            });
                        },
                        onError: (error) => {
                            if (isRespInvalidParams(error)) {
                                Notification.error({
                                    title: '参数错误',
                                    content: ErrorsToString((error as RespInvalidParams).errors),
                                    duration: 2000
                                });
                                captchaRefetch();
                                return;
                            }

                            if (isRespBadRqst(error)) {
                                Notification.error({
                                    title: '登录失败',
                                    content: (error as RespBadRqst).msg
                                });
                                captchaRefetch();
                                return;
                            }
                        }
                    }
                );
            })
            .catch((error) => {
                return error;
            });
    };

    // 渲染DOM
    return (
        <Form autoComplete='off' form={loginForm}>
            <Form.Item>
                <span>登录国际酒业官网后台</span>
            </Form.Item>
            <Form.Item
                field='userName'
                validateTrigger={[]}
                rules={[{ required: true, type: 'string', message: '用户名输入错误' }]}
            >
                <Input placeholder='用户名' />
            </Form.Item>
            <Form.Item
                field='password'
                validateTrigger={[]}
                rules={[{ required: true, type: 'string', message: '密码输入错误' }]}
            >
                <Input.Password placeholder='密码' />
            </Form.Item>
            <Form.Item
                field='captcha'
                validateTrigger={[]}
                rules={[{ required: true, type: 'string', message: '验证码不能为空' }]}
            >
                <Input placeholder='验证码' />
            </Form.Item>
            {captchaIsSuccess && (
                <Form.Item>
                    <div
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img
                            src={captchaData?.data.base64s}
                            onClick={() => {
                                captchaRefetch();
                            }}
                        />
                    </div>
                </Form.Item>
            )}
            <Form.Item>
                <Button type='primary' long onClick={submitHandler}>
                    登 录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
