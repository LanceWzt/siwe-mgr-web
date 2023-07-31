import React, { useEffect } from 'react';
import { Button, Input, Select, Space } from '@arco-design/web-react';

import { AddForm, AddFormWrapper } from './style/user';

import { USERTYPE } from '@/models/user';

interface IProps {
    type: 'add' | 'edit';
    loading: boolean;
    submitFn: (params: any) => void;

    query?: any;
}

const UserForm: React.FC<IProps> = ({ type, loading, submitFn, query }) => {
    const [userForm] = AddForm.useForm();

    // 重置表单
    const resetHandler = () => {
        userForm.resetFields();
    };

    // 提交表单
    const submitHandler = (e: Event) => {
        e.preventDefault();
        userForm
            .validate()
            .then((values) => {
                submitFn(values);
            })
            .catch(() => {
                return;
            });
    };

    // 获取用户数据填充编辑表单
    useEffect(() => {
        if (type === 'edit' && query) {
            userForm.setFieldsValue({
                user_name: query.user_name,
                name: query.name,
                phone: query.phone,
                type: query.type
            });
        }
    }, [query, type, userForm]);

    return (
        <AddFormWrapper>
            <AddForm
                layout='horizontal'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                autoComplete='off'
                form={userForm}
                validateTrigger={[]}
            >
                <AddForm.Item
                    field='user_name'
                    label='账户'
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            match: /[a-zA-Z1-9]{1,20}/,
                            message: '用户账户输入错误'
                        }
                    ]}
                >
                    <Input placeholder='请输入用户账户' allowClear />
                </AddForm.Item>
                <AddForm.Item
                    field='name'
                    label='姓名'
                    rules={[
                        {
                            required: false,
                            type: 'string',
                            match: /\p{Unified_Ideograph}{1,10}/u,
                            message: '姓名输入错误'
                        }
                    ]}
                >
                    <Input placeholder='请输入用户姓名' allowClear />
                </AddForm.Item>
                <AddForm.Item
                    field='phone'
                    label='联系方式'
                    rules={[
                        {
                            required: false,
                            type: 'string',
                            match: /(^(?:(?:\+|00)86)?1[3-9]\d{9}$)|(^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$)/,
                            message: '联系方式输入错误'
                        }
                    ]}
                >
                    <Input placeholder='请输入联系方式' allowClear />
                </AddForm.Item>
                <AddForm.Item
                    field='type'
                    label='类型'
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 1,
                            max: 10,
                            message: '类型选择错误'
                        }
                    ]}
                >
                    <Select placeholder='请选择用户类型' allowClear>
                        <Select.Option key={0} value={USERTYPE.ADMIN}>
                            管理员
                        </Select.Option>
                        <Select.Option key={1} value={USERTYPE.OPERATOR}>
                            操作员
                        </Select.Option>
                        <Select.Option key={2} value={USERTYPE.DEPART}>
                            部门
                        </Select.Option>
                        <Select.Option key={3} value={USERTYPE.AUDITOR}>
                            审计
                        </Select.Option>
                    </Select>
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
    );
};

export default UserForm;
