import React, { useEffect, useState } from 'react';
import { Card, Message, Spin, Typography, Notification } from '@arco-design/web-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import UserForm from './form';
import { EditUserApi, GetUserApi } from '@/api/user';
import { ErrorsToString } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { USERTYPE } from '@/models/user';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';

const initialUserData = {
    user_name: '-',
    name: '-',
    phone: '-',
    type: USERTYPE.OPERATOR
};

const UserEdit: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [userData, setUserData] = useState(initialUserData);

    const { id } = useParams();
    const user_id = Number(id) || 0;

    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['user', user_id],
        queryFn: () => {
            return GetUserApi(user_id);
        }
    });

    const navigate = useNavigate();

    /* ---------------------------- Edit User Request --------------------------- */

    const editUser = useMutation(['user', 'edit', user_id], EditUserApi, {
        onMutate: () => {
            setLoading(true);
        },

        onSuccess: () => {
            Notification.success({
                title: '成功',
                content: '编辑用户成功',
                duration: 1000,
                onClose: () => {
                    navigate('/usr_mgr');
                }
            });
        },

        onError: (error) => {
            if (isRespInvalidParams(error)) {
                Notification.error({
                    title: '参数错误',
                    content: ErrorsToString((error as RespInvalidParams).errors),
                    duration: 2000
                });
                return;
            }

            if (isRespBadRqst(error)) {
                Notification.error({
                    title: '编辑失败',
                    content: (error as RespBadRqst).msg
                });
                return;
            }
        },

        onSettled: () => {
            setLoading(false);
        }
    });

    const editUserHandler = (params: any) => {
        editUser.mutate({ ...params, id: user_id });
    };

    /* ------------------------------ End Edit User ----------------------------- */

    // 请求server报错处理
    useEffect(() => {
        if (isError && (error as RespInvalidParams).errors) {
            Message.error(ErrorsToString((error as RespInvalidParams).errors));
        } else if (isError && (error as RespBadRqst).msg) {
            Message.error((error as RespBadRqst).msg);
        }
    }, [isError, error]);

    // 根据查询api更新用户数据
    useEffect(() => {
        if (isSuccess) {
            setUserData(data.data);
        }

        return () => {
            setUserData(initialUserData);
        };
    }, [isSuccess, data]);

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={5} style={{ margin: 0 }}>
                编辑用户
            </Typography.Title>

            <Spin style={{ display: 'block' }} loading={isLoading}>
                <UserForm
                    submitFn={editUserHandler}
                    loading={loading}
                    query={userData}
                    type='edit'
                />
            </Spin>
        </Card>
    );
};

export default UserEdit;
