import { DelTopicApi } from '@/api/topic.api';
import { useAjaxErrorMsg, useAjaxSuccessMsg } from '@/hooks/message.hook';
import { useMutation } from '@tanstack/react-query';

export const useDelTopic = () => {
    const mutation = useMutation({
        mutationFn: DelTopicApi,
        onSuccess: useAjaxSuccessMsg({ content: '删除专题成功' }),
        onError: useAjaxErrorMsg({})
    });

    return { mutation };
};
