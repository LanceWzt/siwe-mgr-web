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
import { IconDelete, IconEdit, IconEraser, IconRefresh } from '@arco-design/web-react/icon';
import { useMutation, useQuery } from '@tanstack/react-query';

import { DelUserApi, activeUserApi, getUsersApi, getUsersInt } from '@/api/user';
import SearchForm, { InputConInt } from '@/components/SearchForm';
import ButtonGroup from '@/components/ButtonGroup';
import InfoTable from '@/components/InfoTable';
import { ErrorsToString } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { IconFontCnURL } from '@/config/config';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { useLocation, useNavigate } from 'react-router-dom';
import { USERSTATUS, USERTYPE } from '@/models/user';
import { useResetPwd } from './hooks/resetPwd';

// 表格列结构，定义列名记列索引
const columns: TableColumnProps[] = [
    {
        title: '用户名',
        dataIndex: 'user_name'
    },
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '电话',
        dataIndex: 'phone'
    },
    {
        title: '类型',
        dataIndex: 'type'
    },
    {
        title: '状态',
        dataIndex: 'state'
    },
    {
        title: '操作',
        dataIndex: 'btns'
    }
];

// 表格行结构
interface Itbl {
    key: number;
    user_name: string;
    name: string;
    phone: string;
    type: string;
    state: React.ReactElement;
    // 按钮组
    btns: React.ReactElement;
}

// 搜索条件form的输入框组
const searchInput: InputConInt[] = [
    {
        field: 'user_name',
        label: '用户名',
        placeholder: '请输入用户名',
        type: 'input',
        rules: [
            {
                type: 'string',
                match: /[a-zA-Z1-9]{1,20}/,
                message: '用户名输入错误'
            }
        ]
    },
    {
        field: 'name',
        label: '姓名',
        placeholder: '请输入姓名',
        type: 'input',
        rules: [
            {
                type: 'string',
                message: '姓名输入错误',
                match: /\p{Unified_Ideograph}{1,10}/u
            }
        ]
    },
    {
        field: 'type',
        label: '类型',
        placeholder: '全部',
        type: 'select',
        select_option: [
            {
                value: String(USERTYPE.ADMIN),
                txt: '管理员'
            },
            {
                value: String(USERTYPE.OPERATOR),
                txt: '操作员'
            },
            {
                value: String(USERTYPE.DEPART),
                txt: '部门'
            },
            {
                value: String(USERTYPE.AUDITOR),
                txt: '审计'
            }
        ],
        rules: [
            {
                type: 'number',
                min: 1,
                max: 10,
                message: '类型选择错误'
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
                value: USERSTATUS.INACTIVE,
                txt: '冻结'
            },
            {
                value: USERSTATUS.ACTIVE,
                txt: '有效'
            }
        ],
        rules: [
            {
                type: 'number',
                min: 0,
                max: 1,
                message: '状态选择错误'
            }
        ]
    }
];

// 映射type到中文
const translate_type = (v: USERTYPE): string => {
    switch (v) {
        case USERTYPE.ADMIN:
            return '管理员';
        case USERTYPE.DEPART:
            return '部门';
        case USERTYPE.AUDITOR:
            return '审计';
        default:
            return '操作员';
    }
};

// 映射state到中文
const translate_state = (v: USERSTATUS): React.ReactElement => {
    switch (v) {
        case USERSTATUS.ACTIVE:
            return <Badge status='success' text='可用' />;
        default:
            return <Badge status='error' text='冻结' />;
    }
};

// 缓存子组件
const MemoSearchForm = memo(SearchForm);
const MemoButtonGroup = memo(ButtonGroup);

/* -------------------------------------------------------------------------- */
/*                             Component UserList                             */
/* -------------------------------------------------------------------------- */

const UserList: React.FC = () => {
    let tblData: Itbl[] = [];
    let pagination_config: PaginationProps = {};

    const IconFont = Icon.addFromIconFontCn({
        src: IconFontCnURL
    });

    /* -------------------------------- userState ------------------------------- */

    const [page, setPage] = useState<number | undefined>();
    const [userName, setUserName] = useState<string | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [type, setType] = useState<number | undefined>();
    const [state, setState] = useState<number | undefined>();

    /* ------------------------------ Children Func ----------------------------- */

    const navigate = useNavigate();
    const location = useLocation();

    const btngroupFunc = useCallback(() => {
        navigate('/usr_add', { state: { prevLocation: location } });
    }, [navigate, location]);

    // 搜索表单提交函数
    const submitFunc = useCallback((inputs: any) => {
        setUserName(inputs.user_name);
        setName(inputs.name);
        setType(inputs.type);
        setState(inputs.state);
        setPage(1);
    }, []);

    // 重置搜索表单函数
    const resetFunc = useCallback(() => {
        setPage(undefined);
        setUserName(undefined);
        setName(undefined);
        setType(undefined);
        setState(undefined);
    }, []);

    /* ------------------------------- Query List ------------------------------- */

    const params: getUsersInt = {
        page: page,
        user_name: userName,
        name: name,
        type: type,
        state: state
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsersApi(params)
    });

    // 请求server报错处理
    useEffect(() => {
        if (isError && (error as RespInvalidParams).errors) {
            Message.error(ErrorsToString((error as RespInvalidParams).errors));
        } else if (isError && (error as RespBadRqst).msg) {
            Message.error((error as RespBadRqst).msg);
        }
    }, [isError, error]);

    /* ------------------------------ Redner Table ------------------------------ */

    /**
     * 根据state生成按钮组
     * @param key 用户id
     * @param state 用户状态
     * @param user_name 用户名
     * @returns Button * 3
     */
    const translate_btns = (
        key: number,
        state: USERSTATUS,
        user_name: string
    ): React.ReactElement => {
        return (
            <Space align='center'>
                <Button
                    type='text'
                    status='default'
                    size='mini'
                    onClick={() => {
                        editFn(key);
                    }}
                >
                    <IconEdit />
                    编辑
                </Button>
                {state === USERSTATUS.ACTIVE ? (
                    <Button
                        type='secondary'
                        status='warning'
                        size='mini'
                        onClick={() => {
                            activeFn(key, 0);
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
                            activeFn(key, 1);
                        }}
                    >
                        <IconRefresh />
                        激活
                    </Button>
                )}
                <Popconfirm
                    focusLock
                    title='删除确认'
                    content={`是否确认删除用户:<${user_name}>`}
                    okText='删除'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'danger' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return deleteFn(key);
                    }}
                >
                    <Button type='secondary' status='danger' size='mini'>
                        <IconDelete />
                        删除
                    </Button>
                </Popconfirm>
                <Popconfirm
                    focusLock
                    title='确认'
                    content={`是否确认重置密码:<${user_name}>`}
                    okText='重置'
                    position='lb'
                    okButtonProps={{ type: 'primary', status: 'warning' }}
                    onOk={(e: React.MouseEvent) => {
                        e.preventDefault();
                        return resetPwdMutation.mutate({ user_id: key });
                    }}
                >
                    <Button type='outline' size='mini'>
                        <IconEraser />
                        重置密码
                    </Button>
                </Popconfirm>
            </Space>
        );
    };

    /**
     * 生成表格行
     */
    data?.data.list.map((item: any) => {
        let obj: Itbl = {
            key: item.id,
            user_name: item.user_name,
            name: item.name === '' ? '-' : item.name,
            phone: item.phone === '' ? '-' : item.phone,
            type: translate_type(item.type),
            state: translate_state(item.state),
            btns: translate_btns(item.id, item.state, item.user_name)
        };
        tblData.push(obj);
        return obj;
    });

    /**
     * 分页器
     */
    pagination_config = {
        total: data?.data.total,
        current: page ? page : 1,
        onChange: (pageNum: number) => {
            setPage(pageNum || 1);
        }
    };

    /* -------------------------------- Edit User ------------------------------- */

    const editFn = (user_id: number) => {
        navigate('/usr_edit/' + user_id);
    };

    /* ---------------------------- Lock/Unlock User ---------------------------- */

    const activationUser = useMutation(['user', 'activation'], activeUserApi);

    const activeFn = (user_id: number, op: USERSTATUS) => {
        activationUser.mutate(
            { user_id: user_id, activation: op },
            {
                onSuccess: () => {
                    refetch();
                },
                onError: (error) => {
                    if (isRespInvalidParams(error)) {
                        Message.error(ErrorsToString((error as RespInvalidParams).errors));
                    } else if (isRespBadRqst(error)) {
                        Message.error((error as RespBadRqst).msg);
                    }
                }
            }
        );
    };

    /* ------------------------------- Delete User ------------------------------ */

    const delUser = useMutation(['user', 'del'], DelUserApi);

    const deleteFn = (key: number) => {
        return new Promise((resolve, reject) => {
            delUser.mutate(
                { user_id: key },
                {
                    onSuccess: () => {
                        resolve('success');
                        refetch();
                    },
                    onError: (error) => {
                        reject(error);

                        if (isRespInvalidParams(error)) {
                            Message.error(ErrorsToString((error as RespInvalidParams).errors));
                        } else if (isRespBadRqst(error)) {
                            Message.error((error as RespBadRqst).msg);
                        }
                    }
                }
            );
        });
    };

    /* ----------------------------- Reset Password ----------------------------- */

    const { mutation: resetPwdMutation } = useResetPwd();

    /* --------------------------------- Render --------------------------------- */

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={6} style={{ marginTop: 0, marginBottom: 16 }}>
                用户列表
            </Typography.Title>

            <MemoSearchForm
                cons={searchInput}
                resetFn={resetFunc}
                submitFn={submitFunc}
                loading={isLoading}
            />

            <MemoButtonGroup txt='新建用户' href={btngroupFunc} />

            <InfoTable
                columns_config={columns}
                columns_data={tblData}
                loading={isLoading}
                pagination={pagination_config}
            />
        </Card>
    );
};

export default UserList;
