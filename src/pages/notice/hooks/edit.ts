import { ActivateDailyApi, EditDailyApi } from '@/api/daily.api';
import { ActivateNoticeApi, EditNoticeApi } from '@/api/notice.api';
import { useAjaxErrorMsg, useAjaxSuccessMsg } from '@/hooks/message.hook';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useActivateNotice = () => {
    const mutation = useMutation({
        mutationFn: ActivateNoticeApi,
        onSuccess: useAjaxSuccessMsg({ content: '修改信息状态成功' }),
        onError: useAjaxErrorMsg({})
    });

    return { mutation };
};

export const useActivateDaily = () => {
    const mutation = useMutation({
        mutationFn: ActivateDailyApi,
        onSuccess: useAjaxSuccessMsg({ content: '修改综述状态成功' }),
        onError: useAjaxErrorMsg({})
    });

    return { mutation };
};

export const useEditNotice = (nav: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: EditNoticeApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '编辑信息成功', closeNav: nav }),
        onError: useAjaxError({
            failTitle: '编辑信息失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};

export const useEditDaily = (nav: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: EditDailyApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '编辑综述成功', closeNav: nav }),
        onError: useAjaxError({
            failTitle: '编辑综述失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};
