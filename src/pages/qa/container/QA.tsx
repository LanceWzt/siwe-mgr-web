import Loading from '@/components/Loading.comp';
import { Button, Card, Form, Space } from '@arco-design/web-react';
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useGetQA } from '../hooks/get';
import { useAjaxErrorMsg } from '@/hooks/message.hook';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEditTopic } from '../hooks/edit';

const MyEditor = lazy(() => import('@/components/Editor.comp'));

const Qa: React.FC = () => {
    const [topicForm] = Form.useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const [editorHtml, setEditorHtml] = useState<string>('');

    const editorInnerRef = useRef<{ diffFn: () => string[] }>(null!);

    const query = useGetQA();

    const { mutation: editMutation, isLoading } = useEditTopic();

    const errMsg = useAjaxErrorMsg({
        onErrorClose: () => {
            navigate('/index', { state: { prevLocation: location } });
        }
    });

    useEffect(() => {
        if (query.isError) {
            errMsg(query.error);
        }
        if (query.isSuccess && query.data !== undefined) {
            const data = query.data.data;

            topicForm.setFieldValue('content', data.content);

            if (data.content) {
                setEditorHtml(data.content);
            }
        }
    }, [query.isSuccess, query.isError, setEditorHtml]);

    const submitHandler = () => {
        topicForm.setFieldValue('content', editorHtml);
        topicForm.validate().then((values) => {
            editMutation.mutate(
                {
                    topic_id: 'cjwt',
                    title: '常见问题',
                    content: values.content
                },
                {
                    onSettled: () => {
                        query.refetch();
                    }
                }
            );
        });
    };

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Loading isLoading={query.isLoading}>
                <Form form={topicForm} validateTrigger={[]}>
                    <Form.Item
                        field='content'
                        label=''
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, type: 'string', message: '内容不能为空' }]}
                    >
                        <Suspense fallback={<Loading />}>
                            <MyEditor
                                html={editorHtml}
                                setHtml={setEditorHtml}
                                innerRef={editorInnerRef}
                                height='65vh'
                            />
                        </Suspense>
                    </Form.Item>

                    <Form.Item
                        label={' '}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        style={{ marginTop: 30 }}
                    >
                        <Space>
                            <Button
                                type='primary'
                                size='large'
                                style={{ width: 120 }}
                                onClick={submitHandler}
                                loading={isLoading}
                                loadingFixedWidth
                            >
                                提交
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Loading>
        </Card>
    );
};

export default Qa;
