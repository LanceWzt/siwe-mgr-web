import { ResetPwdApi } from '@/api/user';
import { useMutation } from '@tanstack/react-query';
import { Notification } from '@arco-design/web-react';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';

export const useResetPwd = () => {
    const mutation = useMutation({
        mutationKey: ['resetpwd'],
        mutationFn: ResetPwdApi,
        onSuccess: () => {
            Notification.success({
                title: '成功',
                content: '重置密码成功',
                duration: 3000
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
                    title: '重置密码失败',
                    content: (error as RespBadRqst).msg
                });
                return;
            }
        }
    });

    return { mutation };
};
