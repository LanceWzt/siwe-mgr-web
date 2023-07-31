import { DelDailyApi } from '@/api/daily.api';
import { DelNoticeApi } from '@/api/notice.api';
import { useAjaxErrorMsg, useAjaxSuccessMsg } from '@/hooks/message.hook';
import { useMutation } from '@tanstack/react-query';

export const useDelNotice = () => {
    const mutation = useMutation({
        mutationFn: DelNoticeApi,
        onSuccess: useAjaxSuccessMsg({ content: '删除信息成功' }),
        onError: useAjaxErrorMsg({})
    });

    return { mutation };
};

export const useDelDaily = () => {
    const mutation = useMutation({
        mutationFn: DelDailyApi,
        onSuccess: useAjaxSuccessMsg({ content: '删除综述成功' }),
        onError: useAjaxErrorMsg({})
    });

    return { mutation };
};
