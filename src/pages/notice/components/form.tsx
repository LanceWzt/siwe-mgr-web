import {
    Button,
    Card,
    DatePicker,
    Form,
    Grid,
    Input,
    Space,
    Typography
} from '@arco-design/web-react';
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { FooterWrapper, NoticeFromWrapper } from '../style/notice.style';
import Loading from '@/components/Loading.comp';
import { IAddNotice, IEditNotice, NOTICE_TYPE } from '@/models/notice.model';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GenType } from '../container/NoticeList';

const MyEditor = lazy(() => import('@/components/Editor.comp'));

interface IProps {
    mutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>;
    type: NOTICE_TYPE;
    isEdit?: boolean;
    loading?: boolean;
    query?: UseQueryResult<AxiosResponse<any, any>, unknown>;
    id?: string;
}

const NoticeForm: React.FC<IProps> = ({
    type,
    isEdit = false,
    loading,
    mutation,
    query,
    id = ''
}) => {
    const [noticeForm] = Form.useForm();

    const [editorHtml, setEditorHtml] = useState<string>('');

    const editorInnerRef = useRef<{ diffFn: () => string[] }>(null!);

    useEffect(() => {
        if (query?.isSuccess && query.data !== undefined) {
            const data = query.data.data;
            noticeForm.setFieldsValue({
                title: data.title,
                time: data.time,
                content: data.content
            });
            setEditorHtml(data.content);
        }
    }, [query, noticeForm]);

    const resetHandler = () => {
        setEditorHtml('');
        noticeForm.resetFields();
    };

    const submitHandler = () => {
        editorInnerRef.current.diffFn();

        noticeForm.setFieldValue('content', editorHtml);

        if (!isEdit) {
            noticeForm.validate().then((values: IAddNotice) => {
                values.type = GenType(type);
                mutation.mutate(values);
            });
        } else {
            noticeForm.validate().then((values: IEditNotice) => {
                values.notice_id = id;
                mutation.mutate(values);
            });
        }
    };

    return (
        <NoticeFromWrapper>
            <Form layout='vertical' autoComplete='off' validateTrigger={[]} form={noticeForm}>
                <Card bordered={false}>
                    <Typography.Title heading={6}>基本信息</Typography.Title>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40 }}>
                        <Grid.Col span={14}>
                            <Form.Item label='标题' field='title' rules={[{ required: true }]}>
                                <Input placeholder='请输入标题' allowClear />
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40 }}>
                        <Grid.Col span={14}>
                            <Form.Item label='发表时间' field='time' rules={[{ required: true }]}>
                                <DatePicker showTime editable={false} />
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                </Card>

                <Card bordered={false} style={{ marginBottom: 20 }}>
                    <Typography.Title heading={6}>内容</Typography.Title>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40, paddingBottom: 16 }}>
                        <Grid.Col span={24}>
                            <Form.Item field='content' rules={[{ required: true, type: 'string' }]}>
                                <Suspense fallback={<Loading />}>
                                    <MyEditor
                                        html={editorHtml}
                                        setHtml={setEditorHtml}
                                        innerRef={editorInnerRef}
                                        height='50vh'
                                    />
                                </Suspense>
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                </Card>
            </Form>

            <FooterWrapper>
                <Space>
                    <Button size='large' onClick={resetHandler}>
                        重置
                    </Button>
                    <Button
                        size='large'
                        type='primary'
                        loading={loading || false}
                        loadingFixedWidth
                        onClick={submitHandler}
                    >
                        提交
                    </Button>
                </Space>
            </FooterWrapper>
        </NoticeFromWrapper>
    );
};

export default NoticeForm;
