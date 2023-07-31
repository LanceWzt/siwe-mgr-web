import React, { memo, useCallback, useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Card,
    Icon,
    Message,
    PaginationProps,
    Popconfirm,
    Space,
    TableColumnProps,
    Typography
} from '@arco-design/web-react';
import SearchForm, { InputConInt } from '@/components/SearchForm';
import ButtonGroup from '@/components/ButtonGroup';
import { WINE_STATUS } from '@/models/wine.model';
import InfoTable from '@/components/InfoTable';
import { useGetList } from '../hooks/getList';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { ErrorsToString } from '@/utils/common';
import { IconDelete, IconEdit, IconRefresh } from '@arco-design/web-react/icon';
import { IconFontCnURL } from '@/config/config';
import { useWineActive } from '../hooks/activeFn';
import { useWineDelete } from '../hooks/deleteFn';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { useLocation, useNavigate } from 'react-router-dom';

const MemoSearchForm = memo(SearchForm);
const MemoButtonGroup = memo(ButtonGroup);

const searchInput: InputConInt[] = [
    {
        field: 'wine_id',
        label: '酒品ID',
        placeholder: '请输入酒品ID',
        type: 'input',
        rules: [
            {
                type: 'number',
                match: /[0-9]+/,
                message: '酒品ID输入错误'
            }
        ]
    },
    {
        field: 'wine_name',
        label: '酒品名称',
        placeholder: '请输入酒品名称',
        type: 'input',
        rules: [
            {
                type: 'string',
                match: /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/,
                message: '酒品名称输入错误'
            }
        ]
    },
    {
        field: 'state',
        label: '状态',
        placeholder: '全部',
        type: 'select',
        select_option: [
            {
                value: WINE_STATUS.ACTIVE,
                txt: '有效'
            },
            {
                value: WINE_STATUS.INACTIVE,
                txt: '冻结'
            }
        ],
        rules: [
            {
                type: 'number',
                min: 0,
                max: 1,
                message: '状态选择有误'
            }
        ]
    }
];

const tblColumns: TableColumnProps[] = [
    {
        title: '酒品ID',
        dataIndex: 'wine_id'
    },
    {
        title: '酒品名称',
        dataIndex: 'wine_name'
    },
    {
        title: '规格',
        dataIndex: 'scale'
    },
    {
        title: '报价单位',
        dataIndex: 'price_unit'
    },
    {
        title: '报价货币',
        dataIndex: 'coin'
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

interface ItblWine {
    key: string;
    wine_id: string;
    wine_name: string;
    scale: string;
    price_unit: string;
    coin: string;
    state: React.ReactElement;
    mgr_btns: React.ReactElement;
}

const IconFont = Icon.addFromIconFontCn({
    src: IconFontCnURL
});

// 映射state到中文
const translate_state = (v: WINE_STATUS): React.ReactElement => {
    switch (v) {
        case WINE_STATUS.ACTIVE:
            return <Badge status='success' text='可用' />;
        default:
            return <Badge status='error' text='冻结' />;
    }
};

const WineList: React.FC = () => {
    const [page, setPage] = useState<number | undefined>();
    const [state, setState] = useState<number | undefined>();
    const [wineID, setWineID] = useState<string | undefined>();
    const [wineName, setWineName] = useState<string | undefined>();

    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (values: any) => {
        setPage(1);
        setState(values.state);
        setWineID(values.wine_id);
        setWineName(values.wine_name);
    };

    const resetHandler = useCallback(() => {
        setPage(undefined);
        setState(undefined);
        setWineID(undefined);
        setWineName(undefined);
    }, []);

    const buttonGroupFunc = useCallback(() => {
        navigate('/wine/add', { state: { prevLocation: location } });
    }, [navigate, location]);

    //  获取列表
    const { data, isLoading, isError, error, refetch } = useGetList({
        page: page,
        state: state,
        wine_id: wineID,
        wine_name: wineName
    });

    // 请求server报错处理
    useEffect(() => {
        if (isError && (error as RespInvalidParams).errors) {
            Message.error(ErrorsToString((error as RespInvalidParams).errors));
        } else if (isError && (error as RespBadRqst).msg) {
            Message.error((error as RespBadRqst).msg);
        }
    }, [isError, error]);

    // 激活/冻结
    const { mutation: activeMutation } = useWineActive();

    const { mutation: deleteMutation } = useWineDelete();

    const translate_btns = (key: string, state: WINE_STATUS, wine_name: string) => {
        return (
            <Space>
                <Button
                    type='text'
                    status='default'
                    size='mini'
                    onClick={() => {
                        navigate('/wine/' + key);
                    }}
                >
                    <IconEdit />
                    编辑
                </Button>

                {state === WINE_STATUS.ACTIVE ? (
                    <Button
                        type='secondary'
                        status='warning'
                        size='mini'
                        onClick={() => {
                            activeMutation.mutate(
                                { wine_id: key, op: WINE_STATUS.INACTIVE },
                                {
                                    onSuccess: () => {
                                        refetch();
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
                            activeMutation.mutate(
                                { wine_id: key, op: WINE_STATUS.ACTIVE },
                                {
                                    onSuccess: () => {
                                        refetch();
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
                    content={`是否确认删除酒品:<${wine_name}>`}
                    okText='删除'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'danger' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return new Promise((resolve, reject) => {
                            deleteMutation.mutate(
                                { wine_id: key },
                                {
                                    onSuccess: () => {
                                        resolve('success');
                                        refetch();
                                    },
                                    onError: (error) => {
                                        reject(error);
                                        if (isRespInvalidParams(error)) {
                                            Message.error(
                                                ErrorsToString((error as RespInvalidParams).errors)
                                            );
                                        } else if (isRespBadRqst(error)) {
                                            Message.error((error as RespBadRqst).msg);
                                        }
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
    let tblData: ItblWine[] = [];
    data?.data.list.map((item: any) => {
        let obj: ItblWine = {
            key: item.wine_id,
            wine_id: item.wine_id,
            wine_name: item.wine_name,
            scale: item.scale || '-',
            price_unit: item.price_unit || '-',
            coin: item.coin || '-',
            state: translate_state(item.state),
            mgr_btns: translate_btns(item.wine_id, item.state, item.wine_name)
        };
        tblData.push(obj);
        return obj;
    });

    const pagination_config: PaginationProps = {
        total: data?.data.total,
        current: page ? page : 1,
        onChange: (pageNum: number) => {
            setPage(pageNum || 1);
        }
    };

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={6} style={{ marginTop: 0, marginBottom: 16 }}>
                酒品列表
            </Typography.Title>

            <MemoSearchForm
                cons={searchInput}
                submitFn={submitHandler}
                resetFn={resetHandler}
                loading={false}
            />

            <MemoButtonGroup txt='新增酒品' href={buttonGroupFunc} />

            <InfoTable
                columns_config={tblColumns}
                columns_data={tblData}
                loading={isLoading}
                pagination={pagination_config}
            />
        </Card>
    );
};

export default WineList;
