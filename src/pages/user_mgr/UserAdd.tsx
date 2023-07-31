import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, Notification, Typography } from '@arco-design/web-react';

import { AddUserApi } from '@/api/user';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import UserForm from './form';

const UserAdd: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const addUser = useMutation(['user', 'add'], AddUserApi, {
        onMutate: () => {
            setLoading(true);
        },

        onSuccess: () => {
            Notification.success({
                title: '成功',
                content: '新增用户成功',
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
                    title: '新增失败',
                    content: (error as RespBadRqst).msg
                });
                return;
            }
        },

        onSettled: () => {
            setLoading(false);
        }
    });

    // 新增用户请求
    const addUserHandler = (params: any) => {
        addUser.mutate(params);
    };

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={5} style={{ margin: 0 }}>
                新增用户
            </Typography.Title>

            <UserForm submitFn={addUserHandler} loading={isLoading} type='add' />
        </Card>
    );
};

export default UserAdd;
