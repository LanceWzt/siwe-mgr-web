import { AddMemberApi } from '@/api/member.api';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useAddMember = () => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: AddMemberApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '添加会员成功', closeNav: '/members' }),
        onError: useAjaxError({
            failTitle: '添加会员失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, isLoading };
};
