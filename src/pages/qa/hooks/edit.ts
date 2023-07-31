import { EditTopicApi } from '@/api/topic.api';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useEditTopic = () => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: EditTopicApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '编辑专题成功' }),
        onError: useAjaxError({ failTitle: '编辑专题失败' }),
        onSettled: () => {
            setLoading(false);
        }
    });

    return { mutation, isLoading };
};
