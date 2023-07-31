import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Notification } from '@arco-design/web-react';
import { useSetRecoilState } from 'recoil';

import { ChangePwdApi } from '@/api/user';
import { InitialState, User, userState } from '@/store/user_store';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';

export const useChangePwd = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const setAuthToken = useSetRecoilState<User>(userState);

    const mutation = useMutation({
        mutationKey: ['pwd'],
        mutationFn: ChangePwdApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            Notification.success({
                title: '成功',
                content: '修改密码成功',
                duration: 1000,
                onClose: () => {
                    setAuthToken(InitialState);
                    navigate('/login', { replace: true });
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
                    title: '修改失败',
                    content: (error as RespBadRqst).msg
                });
                return;
            }
        },
        onSettled: () => {
            setLoading(false);
        }
    });

    return { loading, mutation };
};
