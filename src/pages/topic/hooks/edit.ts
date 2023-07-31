import { ActivateTopicApi, EditTopicApi } from '@/api/topic.api';
import { useAjaxErrorMsg, useAjaxSuccessMsg } from '@/hooks/message.hook';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useActivateTopic = () => {
    const mutation = useMutation({
        mutationFn: ActivateTopicApi,
        onSuccess: useAjaxSuccessMsg({ content: '修改专题状态成功' }),
        onError: useAjaxErrorMsg({})
    });

    return { mutation };
};

export const useEditTopic = (nav: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const mutation = useMutation({
        mutationFn: EditTopicApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '编辑专题成功', closeNav: nav }),
        onError: useAjaxError({
            failTitle: '编辑失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};
