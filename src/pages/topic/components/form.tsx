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
import { FooterWrapper, TopicFromWrapper } from '../style/topic.style';
import Loading from '@/components/Loading.comp';
import { IAddTopic, IEditTopic, TOPIC_TYPE } from '@/models/topic.model';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GenType } from '../container/TopicList';

const MyEditor = lazy(() => import('@/components/Editor.comp'));

interface IProps {
    mutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>;
    type: TOPIC_TYPE;
    loading?: boolean;
    query?: UseQueryResult<AxiosResponse<any, any>, unknown>;
    isEdit?: boolean;
    id?: string;
}

const TopicForm: React.FC<IProps> = ({
    type,
    loading,
    mutation,
    query,
    isEdit = false,
    id = ''
}) => {
    const [topicForm] = Form.useForm();

    const [ediotrHtml, setEditorHtml] = useState<string>('');

    const editorInnerRef = useRef<{ diffFn: () => string[] }>(null!);

    useEffect(() => {
        if (query?.isSuccess && query.data !== undefined) {
            const data = query.data.data;
            topicForm.setFieldsValue({
                title: data.title,
                time: data.time,
                content: data.content
            });
            setEditorHtml(data.content);
        }
    }, [query, topicForm]);

    const resetHandler = () => {
        topicForm.resetFields();
        setEditorHtml('');
    };

    const submitHandler = () => {
        editorInnerRef.current.diffFn();

        topicForm.setFieldValue('content', ediotrHtml);

        if (!isEdit) {
            topicForm.validate().then((values: IAddTopic) => {
                values.type = GenType(type);
                mutation.mutate(values);
            });
        } else {
            topicForm.validate().then((values: IEditTopic) => {
                values.topic_id = id;
                mutation.mutate(values);
            });
        }
    };

    return (
        <TopicFromWrapper>
            <Form layout='vertical' autoComplete='off' validateTrigger={[]} form={topicForm}>
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
                                        html={ediotrHtml}
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
        </TopicFromWrapper>
    );
};

export default TopicForm;
