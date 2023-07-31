import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { FooterWrapper, WineForm } from '../style/wine.style';
import {
    Button,
    Card,
    Form,
    FormInstance,
    Grid,
    Input,
    Space,
    Typography
} from '@arco-design/web-react';
import UploadImg from '@/components/UploadImg.comp';
import Loading from '@/components/Loading.comp';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { IAddWine } from '@/models/wine.model';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const MyEditor = lazy(() => import('@/components/Editor.comp'));

interface IFormWine {
    form: FormInstance<any, any, string | number | symbol>;
    mutation?: UseMutationResult<AxiosResponse<any, any>, unknown, any, void>;
    loading?: boolean;
    query?: UseQueryResult<AxiosResponse<any, any>, unknown>;
    isEdit?: boolean;
}

const FormWine: React.FC<IFormWine> = ({ form, loading, mutation, query, isEdit }) => {
    const [fileList, setFileList] = useState<UploadItem[]>([]);

    const [ediotrHtml, setEditorHtml] = useState<string>('');

    const editorInnerRef = useRef<{ diffFn: () => string[] }>(null!);

    const imageHandler = (value: string) => {
        form.setFieldValue('photo', value);
    };

    const resetHandler = () => {
        form.resetFields();
    };

    const submitHandler = () => {
        editorInnerRef.current.diffFn();
        form.setFieldValue('content', ediotrHtml);
        form.validate().then((values: IAddWine) => {
            if (!values.total_name) {
                delete values.total_name;
            }
            if (!values.unit) {
                delete values.unit;
            }
            if (!values.coin) {
                delete values.coin;
            }
            mutation?.mutate(values);
        });
    };

    useEffect(() => {
        if (query?.isSuccess && query?.data !== undefined) {
            const data = query.data.data;

            form.setFieldsValue({
                wine_id: data.wine_id,
                wine_name: data.wine_name,
                total_name: data.total_name,
                scale: data.scale,
                unit: data.unit,
                coin: data.coin,
                inititor: data.inititor,
                productor: data.productor,
                consignee: data.consignee,
                photo: data.photo,
                content: data.content
            });
            if (data.photo) {
                setFileList([
                    {
                        uid: '0',
                        url: data.photo
                    }
                ]);
            }
            if (data.content) {
                setEditorHtml(data.content);
            }
        }
    }, [query, form]);

    return (
        <WineForm>
            <Form layout='vertical' autoComplete='off' form={form} validateTrigger={[]}>
                <Card bordered={false}>
                    <Typography.Title heading={6}>基本信息</Typography.Title>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40 }}>
                        <Grid.Col span={8}>
                            <Form.Item
                                label='酒品ID'
                                field='wine_id'
                                rules={[{ required: true }]}
                                disabled={isEdit || false}
                            >
                                <Input placeholder='请输入酒品ID' />
                            </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Form.Item
                                label='酒品名称'
                                field='wine_name'
                                rules={[{ required: true }]}
                            >
                                <Input placeholder='请输入酒品名称' />
                            </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Form.Item label='酒品全称' field='total_name'>
                                <Input placeholder='请输入酒品全称' />
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40 }}>
                        <Grid.Col span={8}>
                            <Form.Item label='规格' field='scale' rules={[{ required: true }]}>
                                <Input placeholder='请输入酒品规格' />
                            </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Form.Item label='报价单位' field='unit'>
                                <Input placeholder='请输入报价单位' />
                            </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Form.Item label='报价货币' field='coin'>
                                <Input placeholder='请输入报价货币' />
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                </Card>

                <Card bordered={false}>
                    <Typography.Title heading={6}>发行信息</Typography.Title>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40 }}>
                        <Grid.Col span={8}>
                            <Form.Item label='发行人' field='inititor' rules={[{ required: true }]}>
                                <Input placeholder='请输入发行人' />
                            </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Form.Item
                                label='出品人'
                                field='productor'
                                rules={[{ required: true }]}
                            >
                                <Input placeholder='请输入出品人' />
                            </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Form.Item
                                label='承销人'
                                field='consignee'
                                rules={[{ required: true }]}
                            >
                                <Input placeholder='请输入承销人' />
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                </Card>

                <Card bordered={false}>
                    <Typography.Title heading={6}>首页图片</Typography.Title>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40 }}>
                        <Grid.Col span={24}>
                            <Form.Item field='photo' rules={[{ required: true, type: 'string' }]}>
                                <UploadImg
                                    fileList={fileList}
                                    setFileList={setFileList}
                                    uploadSuccess={imageHandler}
                                    uploadRemove={() => {
                                        form.setFieldValue('photo', '');
                                    }}
                                />
                            </Form.Item>
                        </Grid.Col>
                    </Grid.Row>
                </Card>

                <Card bordered={false} style={{ marginBottom: 20 }}>
                    <Typography.Title heading={6}>酒品详情</Typography.Title>
                    <Grid.Row style={{ marginLeft: -40, marginRight: -40, paddingBottom: 16 }}>
                        <Grid.Col span={24}>
                            <Form.Item field='content' rules={[{ required: true, type: 'string' }]}>
                                <Suspense fallback={<Loading />}>
                                    <MyEditor
                                        html={ediotrHtml}
                                        setHtml={setEditorHtml}
                                        innerRef={editorInnerRef}
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
        </WineForm>
    );
};

export default FormWine;
