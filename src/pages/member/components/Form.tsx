import React, { useEffect } from 'react';
import { MemFrom } from '../style/member.style';
import { Button, Form, Input, Space } from '@arco-design/web-react';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface IProps {
    isLoading: boolean;
    mutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, void>;
    query?: UseQueryResult<AxiosResponse<any, any>, unknown>;
    isEdit?: boolean;
}

const FormMember: React.FC<IProps> = ({ isLoading, mutation, query, isEdit = false }) => {
    const [memForm] = Form.useForm();

    const resetHandler = () => {
        memForm.resetFields();
    };

    const submitHandler = (e: Event) => {
        e.preventDefault();
        memForm.validate().then((values) => {
            mutation.mutate(values);
        });
    };

    useEffect(() => {
        if (query?.isSuccess && query.data !== undefined) {
            const data = query.data.data;
            memForm.setFieldsValue({
                member_id: data.member_id,
                member_name: data.member_name,
                city: data.city,
                phone: data.phone,
                address: data.address
            });
        }
    }, [query, memForm]);

    return (
        <MemFrom>
            <Form
                layout='horizontal'
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                autoComplete='off'
                form={memForm}
                validateTrigger={[]}
            >
                <Form.Item
                    field='member_id'
                    label='会员ID'
                    rules={[{ required: true, type: 'string', message: '会员ID输入错误' }]}
                    disabled={isEdit}
                >
                    <Input placeholder='请输入会员ID' allowClear />
                </Form.Item>

                <Form.Item
                    field='member_name'
                    label='名称'
                    rules={[{ required: true, type: 'string', message: '会员名称输入错误' }]}
                >
                    <Input placeholder='请输入会员名称' allowClear />
                </Form.Item>

                <Form.Item
                    field='city'
                    label='城市'
                    rules={[{ required: true, type: 'string', message: '会员城市输入错误' }]}
                >
                    <Input placeholder='请输入会员城市' allowClear />
                </Form.Item>

                <Form.Item
                    field='phone'
                    label='联系方式'
                    rules={[{ required: false, type: 'string', message: '联系方式输入错误' }]}
                >
                    <Input placeholder='请输入会员电话' allowClear />
                </Form.Item>
                <Form.Item
                    field='address'
                    label='地址'
                    rules={[{ required: false, type: 'string', message: '会员地址输入错误' }]}
                >
                    <Input placeholder='请输入会员地址' allowClear />
                </Form.Item>

                <Form.Item label={' '} style={{ marginTop: 30 }}>
                    <Space>
                        <Button
                            type='primary'
                            size='large'
                            onClick={submitHandler}
                            loading={isLoading}
                            loadingFixedWidth
                        >
                            提交
                        </Button>
                        <Button type='outline' size='large' onClick={resetHandler}>
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </MemFrom>
    );
};

export default FormMember;
