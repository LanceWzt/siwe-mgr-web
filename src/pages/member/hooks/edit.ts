import { EditMemberApi } from '@/api/member.api';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useEditMember = () => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: EditMemberApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '编辑会员成功', closeNav: '/members' }),
        onError: useAjaxError({
            failTitle: '编辑会员失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};
