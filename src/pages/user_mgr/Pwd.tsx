import React from 'react';
import { Button, Card, Input, Space, Typography } from '@arco-design/web-react';

import { AddForm, AddFormWrapper } from './style/user';
import { useChangePwd } from './hooks/changePwd';

const Pwd: React.FC = () => {
    const [pwdForm] = AddForm.useForm();

    const { loading, mutation } = useChangePwd();

    // 提交修改密码
    const submitHandler = (e: Event) => {
        e.preventDefault();
        pwdForm
            .validate()
            .then((values) => {
                mutation.mutate(values);
            })
            .catch();
    };

    // 重置表单
    const resetHandler = () => {
        pwdForm.resetFields();
    };

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px' }}>
            <Typography.Title heading={5} style={{ margin: 0 }}>
                修改密码
            </Typography.Title>

            <AddFormWrapper>
                <AddForm
                    layout='horizontal'
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    autoComplete='off'
                    form={pwdForm}
                    validateTrigger={[]}
                >
                    <AddForm.Item
                        field='old_password'
                        label='原密码'
                        rules={[
                            {
                                required: true,
                                type: 'string',
                                message: '原密码输入错误'
                            }
                        ]}
                    >
                        <Input.Password placeholder='请输入原密码' />
                    </AddForm.Item>
                    <AddForm.Item
                        field='new_password'
                        label='新密码'
                        rules={[
                            {
                                required: true,
                                type: 'string',
                                match: /^\S*(?=\S{6,18})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*.? ])\S*$/,
                                message: '新密码输入错误'
                            }
                        ]}
                    >
                        <Input.Password placeholder='请输入新密码' />
                    </AddForm.Item>
                    <AddForm.Item
                        field='re_password'
                        label='重复新密码'
                        rules={[
                            {
                                required: true,
                                type: 'string',
                                match: /^\S*(?=\S{6,18})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*.? ])\S*$/,
                                message: '重复新密码输入错误'
                            }
                        ]}
                    >
                        <Input.Password placeholder='请再次输入新密码' />
                    </AddForm.Item>
                    <AddForm.Item label={' '}>
                        <Space>
                            <Button
                                type='primary'
                                size='large'
                                onClick={submitHandler}
                                loading={loading}
                                loadingFixedWidth
                            >
                                提交
                            </Button>
                            <Button type='outline' size='large' onClick={resetHandler}>
                                重置
                            </Button>
                        </Space>
                    </AddForm.Item>
                </AddForm>
            </AddFormWrapper>
        </Card>
    );
};

export default Pwd;
