import ButtonGroup from '@/components/ButtonGroup';
import InfoTable from '@/components/InfoTable';
import SearchForm, { InputConInt } from '@/components/SearchForm';
import { IconFontCnURL } from '@/config/config';
import { TOPIC_STATUS, TOPIC_TYPE } from '@/models/topic.model';
import {
    Badge,
    Button,
    Card,
    Icon,
    PaginationProps,
    Popconfirm,
    Space,
    TableColumnProps,
    Typography
} from '@arco-design/web-react';
import { IconDelete, IconEdit, IconRefresh } from '@arco-design/web-react/icon';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetTopicList } from '../hooks/getList';
import { useActivateTopic } from '../hooks/edit';
import { useDelTopic } from '../hooks/delete';

interface IProps {
    type: TOPIC_TYPE;
}

const MemoSearchForm = memo(SearchForm);
const MemoButtonGroup = memo(ButtonGroup);

const genTitle = (value: TOPIC_TYPE) => {
    switch (value) {
        case TOPIC_TYPE.MEMBER_NEWS:
            return '会员动态';
        case TOPIC_TYPE.FINANCIAL_INFO:
            return '财经资讯';
        case TOPIC_TYPE.INDUSTRY_NEWS:
            return '行业动态';
        default:
            return '';
    }
};

export const GenType = (value: TOPIC_TYPE) => {
    switch (value) {
        case TOPIC_TYPE.MEMBER_NEWS:
            return 'hydt';
        case TOPIC_TYPE.FINANCIAL_INFO:
            return 'cjzx';
        case TOPIC_TYPE.INDUSTRY_NEWS:
            return 'hadt';
        default:
            return '';
    }
};

const genPath = (value: TOPIC_TYPE) => {
    switch (value) {
        case TOPIC_TYPE.MEMBER_NEWS:
            return 'member_news';
        case TOPIC_TYPE.FINANCIAL_INFO:
            return 'financial_info';
        case TOPIC_TYPE.INDUSTRY_NEWS:
            return 'industry_news';
        default:
            return '';
    }
};

const tblColumns: TableColumnProps[] = [
    {
        title: '标题',
        dataIndex: 'title'
    },
    {
        title: '发表时间',
        dataIndex: 'time'
    },
    {
        title: '创建人',
        dataIndex: 'creator'
    },
    {
        title: '修改人',
        dataIndex: 'modifier'
    },
    {
        title: '状态',
        dataIndex: 'state'
    },
    {
        title: '操作',
        dataIndex: 'mgr_btns'
    }
];

const searchInput: InputConInt[] = [
    {
        field: 'title',
        label: '标题',
        placeholder: '标题（支持模糊搜索）',
        type: 'input',
        rules: [
            {
                type: 'string',
                message: '标题输入有误'
            }
        ]
    },
    {
        field: 'date_range',
        label: '发表时间',
        placeholder: '选择时间范围',
        type: 'date',
        rules: [
            {
                type: 'string',
                message: '时间范围输入有误'
            }
        ]
    },
    {
        field: 'state',
        label: '状态',
        type: 'select',
        placeholder: '全部',
        select_option: [
            {
                value: TOPIC_STATUS.ACTIVE,
                txt: '有效'
            },
            {
                value: TOPIC_STATUS.INACTIVE,
                txt: '冻结'
            }
        ],
        rules: [
            {
                type: 'string',
                message: '状态选择有误'
            }
        ]
    }
];

interface ITblTopic {
    key: string;
    title: string;
    time: string;
    creator: string;
    modifier: string;
    state: React.ReactElement;
    mgr_btns: React.ReactElement;
}

// 映射state到中文
const translate_state = (v: TOPIC_STATUS): React.ReactElement => {
    switch (v) {
        case TOPIC_STATUS.ACTIVE:
            return <Badge status='success' text='可用' />;
        default:
            return <Badge status='error' text='冻结' />;
    }
};

const IconFont = Icon.addFromIconFontCn({
    src: IconFontCnURL
});

const TopicList: React.FC<IProps> = ({ type }) => {
    const [page, setPage] = useState<number | undefined>();
    const [title, setTitle] = useState<string | undefined>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [state, setState] = useState<number | undefined>();

    const navigate = useNavigate();
    const location = useLocation();

    const query = useGetTopicList({
        page: page,
        title: title,
        start_date: startDate,
        end_date: endDate,
        state: state,
        type: GenType(type)
    });

    useEffect(() => {
        query.refetch();
    });

    const { mutation: activateMutation } = useActivateTopic();

    const { mutation: deleteMutation } = useDelTopic();

    const submitHandler = (values: any) => {
        setPage(undefined);
        setTitle(values.title);
        setStartDate(values.date_range ? values.date_range[0] : '');
        setEndDate(values.date_range ? values.date_range[1] : '');
        setState(values.state);
    };

    const resetHandler = () => {
        setPage(undefined);
        setTitle(undefined);
        setStartDate(undefined);
        setEndDate(undefined);
        setState(undefined);
    };

    const buttonGroupFunc = useCallback(() => {
        navigate('/topics/' + genPath(type) + '/add', { state: { prevLocation: location } });
    }, [navigate, location, type]);

    const translate_btns = (key: string, state: TOPIC_STATUS, title: string) => {
        return (
            <Space>
                <Button
                    type='text'
                    status='default'
                    size='mini'
                    onClick={() => {
                        navigate('/topics/' + genPath(type) + '/' + key, {
                            state: { prevLocation: location }
                        });
                    }}
                >
                    <IconEdit />
                    编辑
                </Button>

                {state === TOPIC_STATUS.ACTIVE ? (
                    <Button
                        type='secondary'
                        status='warning'
                        size='mini'
                        onClick={() => {
                            activateMutation.mutate(
                                {
                                    topic_id: key,
                                    state: TOPIC_STATUS.INACTIVE
                                },
                                {
                                    onSuccess: () => {
                                        query.refetch();
                                    }
                                }
                            );
                        }}
                    >
                        <IconFont type='icon-dongjie' />
                        冻结
                    </Button>
                ) : (
                    <Button
                        type='secondary'
                        status='success'
                        size='mini'
                        onClick={() => {
                            activateMutation.mutate(
                                {
                                    topic_id: key,
                                    state: TOPIC_STATUS.ACTIVE
                                },
                                {
                                    onSuccess: () => {
                                        query.refetch();
                                    }
                                }
                            );
                        }}
                    >
                        <IconRefresh />
                        激活
                    </Button>
                )}

                <Popconfirm
                    focusLock
                    title='删除确认'
                    content={`是否确认删除专题:<${title}>`}
                    okText='删除'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'danger' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return new Promise((resolve, reject) => {
                            deleteMutation.mutate(
                                { topic_id: key },
                                {
                                    onSuccess: () => {
                                        resolve('success');
                                        query.refetch();
                                    },
                                    onError: (error: unknown) => {
                                        reject(error);
                                    }
                                }
                            );
                        });
                    }}
                >
                    <Button type='secondary' status='danger' size='mini'>
                        <IconDelete />
                        删除
                    </Button>
                </Popconfirm>
            </Space>
        );
    };

    /**
     * 生成表格行
     */
    let tblData: ITblTopic[] = [];
    query.data?.data.list.map((item: any) => {
        let obj: ITblTopic = {
            key: item.topic_id,
            title: item.title || '-',
            time: item.time || '-',
            creator: item.creator || '-',
            modifier: item.modifier || '-',
            state: translate_state(item.state),
            mgr_btns: translate_btns(item.topic_id, item.state, item.title)
        };
        tblData.push(obj);
        return obj;
    });

    const pagination_config: PaginationProps = {
        total: query.data?.data.total,
        current: page ? page : 1,
        onChange: (pageNum: number) => {
            setPage(pageNum || 1);
        }
    };

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={6} style={{ marginTop: 0, marginBottom: 16 }}>
                {genTitle(type)}
            </Typography.Title>

            <MemoSearchForm
                cons={searchInput}
                submitFn={submitHandler}
                resetFn={resetHandler}
                loading={false}
            />

            <MemoButtonGroup txt='新增专题' href={buttonGroupFunc} />

            <InfoTable
                columns_config={tblColumns}
                columns_data={tblData}
                loading={query.isLoading}
                pagination={pagination_config}
            />
        </Card>
    );
};

export default TopicList;
