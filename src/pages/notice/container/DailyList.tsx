import ButtonGroup from '@/components/ButtonGroup';
import SearchForm, { InputConInt } from '@/components/SearchForm';
import { IconFontCnURL } from '@/config/config';
import { DAILY_STATUS } from '@/models/daily.model';
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
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetDailyList } from '../hooks/getList';
import { IconDelete, IconEdit, IconRefresh } from '@arco-design/web-react/icon';
import InfoTable from '@/components/InfoTable';
import { useActivateDaily } from '../hooks/edit';
import { useDelDaily } from '../hooks/delete';

const MemoSearchForm = memo(SearchForm);
const MemoButtonGroup = memo(ButtonGroup);

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
                value: DAILY_STATUS.ACTIVE,
                txt: '有效'
            },
            {
                value: DAILY_STATUS.INACTIVE,
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

interface ITblDaily {
    key: string;
    title: string;
    time: string;
    creator: string;
    modifier: string;
    state: React.ReactElement;
    mgr_btns: React.ReactElement;
}

// 映射state到中文
const translate_state = (v: DAILY_STATUS): React.ReactElement => {
    switch (v) {
        case DAILY_STATUS.ACTIVE:
            return <Badge status='success' text='可用' />;
        default:
            return <Badge status='error' text='冻结' />;
    }
};

const IconFont = Icon.addFromIconFontCn({
    src: IconFontCnURL
});

const DailyList: React.FC = () => {
    const [page, setPage] = useState<number | undefined>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [state, setState] = useState<DAILY_STATUS | undefined>();

    const navigate = useNavigate();
    const location = useLocation();

    const query = useGetDailyList({
        page: page,
        start_date: startDate,
        end_date: endDate,
        state: state
    });

    useEffect(() => {
        query.refetch();
    });

    const { mutation: activateMutation } = useActivateDaily();

    const { mutation: deleteMutation } = useDelDaily();

    const submitHandler = (values: any) => {
        setPage(undefined);
        setStartDate(values.date_range ? values.date_range[0] : undefined);
        setEndDate(values.date_range ? values.date_range[1] : undefined);
        setState(values.state);
    };

    const resetHandler = () => {
        setPage(undefined);
        setStartDate(undefined);
        setEndDate(undefined);
        setState(undefined);
    };

    const buttonGroupFunc = useCallback(() => {
        navigate('/daily/add', { state: { prevLocation: location } });
    }, [navigate, location]);

    const translate_btns = (key: string, state: DAILY_STATUS, title: string) => {
        return (
            <Space>
                <Button
                    type='text'
                    status='default'
                    size='mini'
                    onClick={() => {
                        navigate('/daily/' + key, { state: { prevLocation: location } });
                    }}
                >
                    <IconEdit />
                    编辑
                </Button>

                {state === DAILY_STATUS.ACTIVE ? (
                    <Button
                        type='secondary'
                        status='warning'
                        size='mini'
                        onClick={() => {
                            activateMutation.mutate(
                                {
                                    daily_id: key,
                                    state: DAILY_STATUS.INACTIVE
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
                                    daily_id: key,
                                    state: DAILY_STATUS.ACTIVE
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
                    content={`是否确认删除综述:<${title}>`}
                    okText='删除'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'danger' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return new Promise((resolve, reject) => {
                            deleteMutation.mutate(
                                { daily_id: key },
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
    let tblData: ITblDaily[] = [];
    query.data?.data.list.map((item: any) => {
        let obj: ITblDaily = {
            key: item.daily_id,
            title: item.title || '-',
            time: item.time || '-',
            creator: item.creator || '-',
            modifier: item.modifier || '-',
            state: translate_state(item.state),
            mgr_btns: translate_btns(item.daily_id, item.state, item.title)
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
                交易综述
            </Typography.Title>

            <MemoSearchForm
                cons={searchInput}
                submitFn={submitHandler}
                resetFn={resetHandler}
                loading={false}
            />

            <MemoButtonGroup txt='新增综述' href={buttonGroupFunc} />

            <InfoTable
                columns_config={tblColumns}
                columns_data={tblData}
                loading={query.isLoading}
                pagination={pagination_config}
            />
        </Card>
    );
};

export default DailyList;
