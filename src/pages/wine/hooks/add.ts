import { AddWineApi } from '@/api/wine.api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';

export const useWineAdd = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: AddWineApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '添加酒品成功', closeNav: '/wine' }),
        onError: useAjaxError({
            failTitle: '添加酒品失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, loading };
};
