import ButtonGroup from '@/components/ButtonGroup';
import InfoTable from '@/components/InfoTable';
import SearchForm, { InputConInt } from '@/components/SearchForm';
import {
    Button,
    Card,
    Message,
    PaginationProps,
    Popconfirm,
    Space,
    TableColumnProps,
    Typography
} from '@arco-design/web-react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetList } from '../hooks/getList';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { ErrorsToString } from '@/utils/common';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { useGetCity } from '../hooks/getCity';
import { useDelMember } from '../hooks/delete';

const MemoSearchForm = memo(SearchForm);
const MemoButtonGroup = memo(ButtonGroup);

const tblColumns: TableColumnProps[] = [
    {
        title: '会员ID',
        dataIndex: 'member_id'
    },
    {
        title: '会员名称',
        dataIndex: 'member_name'
    },
    {
        title: '所在城市',
        dataIndex: 'city'
    },
    {
        title: '联系方式',
        dataIndex: 'phone'
    },
    {
        title: '地址',
        dataIndex: 'address'
    },
    {
        title: '操作',
        dataIndex: 'mgr_btns'
    }
];

interface ITblMember {
    key: string;
    member_id: string;
    member_name: string;
    city: string;
    phone: string;
    address: string;
    mgr_btns: React.ReactElement;
}

const MemberList: React.FC = () => {
    const [page, setPage] = useState<number | undefined>();
    const [memID, setMemID] = useState<string | undefined>();
    const [memName, setMemName] = useState<string | undefined>();
    const [memCity, setMemCity] = useState<string | undefined>();

    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (values: any) => {
        setPage(1);
        setMemID(values.member_id);
        setMemName(values.member_name);
        setMemCity(values.city);
    };

    const resetHandler = () => {
        setPage(undefined);
        setMemID(undefined);
        setMemName(undefined);
        setMemCity(undefined);
    };

    const buttonGroupFunc = useCallback(() => {
        navigate('/members/add', { state: { prevLocation: location } });
    }, [navigate, location]);

    const { data, isLoading, isError, error, refetch } = useGetList({
        page: page,
        member_id: memID,
        member_name: memName,
        city: memCity
    });

    const { data: cityData } = useGetCity();

    const { mutation: deleteMutation } = useDelMember();

    const searchInput: InputConInt[] = [
        {
            field: 'member_id',
            label: '会员ID',
            placeholder: '请输入会员ID',
            type: 'input',
            rules: [
                {
                    type: 'string',
                    message: '会员ID输入有误'
                }
            ]
        },
        {
            field: 'member_name',
            label: '会员名称',
            placeholder: '请输入会员名称',
            type: 'input',
            rules: [
                {
                    type: 'string',
                    message: '会员名称输入有误'
                }
            ]
        },
        {
            field: 'city',
            label: '所在城市',
            type: 'select',
            placeholder: '全部',
            select_option: cityData?.data.city_set?.map((item: string) => {
                return { value: item, txt: item };
            }),
            rules: [
                {
                    type: 'string',
                    message: '所在城市选择有误'
                }
            ]
        }
    ];

    // 请求server报错处理
    useEffect(() => {
        if (isError && (error as RespInvalidParams).errors) {
            Message.error(ErrorsToString((error as RespInvalidParams).errors));
        } else if (isError && (error as RespBadRqst).msg) {
            Message.error((error as RespBadRqst).msg);
        }
    }, [isError, error]);

    const translate_btns = (member_id: string, member_name: string) => {
        return (
            <Space>
                <Button
                    type='text'
                    status='default'
                    size='mini'
                    onClick={() => {
                        navigate('/members/' + member_id);
                    }}
                >
                    <IconEdit />
                    编辑
                </Button>

                <Popconfirm
                    focusLock
                    title='删除确认'
                    content={`是否确认删除会员:<${member_name}>`}
                    okText='删除'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'danger' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return new Promise((resolve, reject) => {
                            deleteMutation.mutate(
                                { member_id: member_id },
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
                    <Button
                        type='secondary'
                        status='danger'
                        size='mini'
                        onClick={() => {
                            navigate('/members/' + member_id, {
                                state: { prevLocation: location }
                            });
                        }}
                    >
                        <IconDelete />
                        删除
                    </Button>
                </Popconfirm>
            </Space>
        );
    };

    let tblData: ITblMember[] = [];
    data?.data.list.map((item: any) => {
        let obj: ITblMember = {
            key: item.id,
            member_id: item.member_id,
            member_name: item.member_name,
            city: item.city,
            phone: item.phone || '-',
            address: item.address || '-',
            mgr_btns: translate_btns(item.member_id, item.member_name)
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

            <MemoButtonGroup txt='新增会员' href={buttonGroupFunc} />

            <InfoTable
                columns_config={tblColumns}
                columns_data={tblData}
                loading={isLoading}
                pagination={pagination_config}
            />
        </Card>
    );
};

export default MemberList;
