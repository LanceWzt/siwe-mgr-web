import { AddTopicApi } from '@/api/topic.api';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useAddTopic = (nav: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: AddTopicApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '新增专题成功', closeNav: nav }),
        onError: useAjaxError({
            failTitle: '新增失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};
