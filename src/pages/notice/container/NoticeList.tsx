import ButtonGroup from '@/components/ButtonGroup';
import InfoTable from '@/components/InfoTable';
import SearchForm, { InputConInt } from '@/components/SearchForm';
import { IconFontCnURL } from '@/config/config';
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
import {
    IconDelete,
    IconEdit,
    IconRefresh,
    IconToBottom,
    IconToTop
} from '@arco-design/web-react/icon';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetNoticeList } from '../hooks/getList';
import { NOTICE_STATUS, NOTICE_TYPE } from '@/models/notice.model';
import { useActivateNotice } from '../hooks/edit';
import { useDelNotice } from '../hooks/delete';

interface IProps {
    type: NOTICE_TYPE;
}

const MemoSearchForm = memo(SearchForm);
const MemoButtonGroup = memo(ButtonGroup);

const genTitle = (value: NOTICE_TYPE) => {
    switch (value) {
        case NOTICE_TYPE.ANCMT:
            return '中心公告';
        case NOTICE_TYPE.NEWS:
            return '中心快讯';
        default:
            return '';
    }
};

export const GenType = (value: NOTICE_TYPE) => {
    switch (value) {
        case NOTICE_TYPE.ANCMT:
            return 'a';
        case NOTICE_TYPE.NEWS:
            return 'd';
    }
};

const genPath = (value: NOTICE_TYPE) => {
    switch (value) {
        case NOTICE_TYPE.ANCMT:
            return 'ancmt';
        case NOTICE_TYPE.NEWS:
            return 'news';

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
        title: '置顶',
        dataIndex: 'top_btn'
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
                message: '发表时间输入有误'
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
                value: NOTICE_STATUS.ACTIVE,
                txt: '有效'
            },
            {
                value: NOTICE_STATUS.INACTIVE,
                txt: '冻结'
            },
            {
                value: NOTICE_STATUS.HIGHLIGHT,
                txt: '置顶'
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

interface ITblNotice {
    key: string;
    title: string;
    time: string;
    creator: string;
    modifier: string;
    state: React.ReactElement;
    top_btn: React.ReactElement;
    mgr_btns: React.ReactElement;
}

// 映射state到中文
const translate_state = (v: NOTICE_STATUS): React.ReactElement => {
    switch (v) {
        case NOTICE_STATUS.ACTIVE:
            return <Badge status='success' text='可用' />;
        case NOTICE_STATUS.HIGHLIGHT:
            return <Badge status='warning' text='置顶' />;
        default:
            return <Badge status='error' text='冻结' />;
    }
};

const IconFont = Icon.addFromIconFontCn({
    src: IconFontCnURL
});

const NoticeList: React.FC<IProps> = ({ type }) => {
    const [page, setPage] = useState<number | undefined>();
    const [title, setTitle] = useState<string | undefined>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [state, setState] = useState<number | undefined>();

    const navigate = useNavigate();
    const location = useLocation();

    const query = useGetNoticeList({
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

    const { mutation: activateMutation } = useActivateNotice();

    const { mutation: deleteMutation } = useDelNotice();

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
        navigate('/notices/' + genPath(type) + '/add', { state: { prevLocation: location } });
    }, [navigate, location, type]);

    const translate_top = (key: string, state: NOTICE_STATUS) => {
        if (state === NOTICE_STATUS.HIGHLIGHT) {
            return (
                <Button
                    type='dashed'
                    status='danger'
                    size='mini'
                    onClick={() => {
                        activateMutation.mutate(
                            {
                                notice_id: key,
                                state: NOTICE_STATUS.ACTIVE
                            },
                            {
                                onSuccess: () => {
                                    query.refetch();
                                }
                            }
                        );
                    }}
                >
                    <IconToBottom />
                    取消
                </Button>
            );
        } else {
            return (
                <Button
                    type='dashed'
                    status='warning'
                    size='mini'
                    onClick={() => {
                        activateMutation.mutate(
                            {
                                notice_id: key,
                                state: NOTICE_STATUS.HIGHLIGHT
                            },
                            {
                                onSuccess: () => {
                                    query.refetch();
                                }
                            }
                        );
                    }}
                >
                    <IconToTop />
                    置顶
                </Button>
            );
        }
    };

    const translate_btns = (key: string, state: NOTICE_STATUS, title: string) => {
        return (
            <Space>
                <Button
                    type='text'
                    status='default'
                    size='mini'
                    onClick={() => {
                        navigate('/notices/' + genPath(type) + '/' + key, {
                            state: { prevLocation: location }
                        });
                    }}
                >
                    <IconEdit />
                    编辑
                </Button>

                {state === NOTICE_STATUS.ACTIVE || state === NOTICE_STATUS.HIGHLIGHT ? (
                    <Button
                        type='secondary'
                        status='warning'
                        size='mini'
                        onClick={() => {
                            activateMutation.mutate(
                                {
                                    notice_id: key,
                                    state: NOTICE_STATUS.INACTIVE
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
                                    notice_id: key,
                                    state: NOTICE_STATUS.ACTIVE
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
                    content={`是否确认删除信息:<${title}>`}
                    okText='删除'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'danger' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return new Promise((resolve, reject) => {
                            deleteMutation.mutate(
                                { notice_id: key },
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
    let tblData: ITblNotice[] = [];
    query.data?.data.list.map((item: any) => {
        let obj: ITblNotice = {
            key: item.notice_id,
            title: item.title || '-',
            time: item.time || '-',
            creator: item.creator || '-',
            modifier: item.modifier || '-',
            state: translate_state(item.state),
            top_btn: translate_top(item.notice_id, item.state),
            mgr_btns: translate_btns(item.notice_id, item.state, item.title)
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

            <MemoButtonGroup txt='新增信息' href={buttonGroupFunc} />

            <InfoTable
                columns_config={tblColumns}
                columns_data={tblData}
                loading={query.isLoading}
                pagination={pagination_config}
            />
        </Card>
    );
};

export default NoticeList;
