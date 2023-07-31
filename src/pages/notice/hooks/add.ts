import { AddDailyApi } from '@/api/daily.api';
import { AddNoticeApi } from '@/api/notice.api';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useAddNotice = (nav: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: AddNoticeApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '新增信息成功', closeNav: nav }),
        onError: useAjaxError({
            failTitle: '新增信息失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};

export const useAddDaily = (nav: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: AddDailyApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '新增综述成功', closeNav: nav }),
        onError: useAjaxError({
            failTitle: '新增综述失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};
