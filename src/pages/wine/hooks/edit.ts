import { EditWineApi } from '@/api/wine.api';
import { useAjaxError, useAjaxSuccess } from '@/hooks/notification.hook';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useEditWine = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: EditWineApi,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: useAjaxSuccess({ content: '编辑酒品成功', closeNav: '/wine' }),
        onError: useAjaxError({
            failTitle: '编辑酒品失败',
            onErrorClose: () => {
                setLoading(false);
            }
        })
    });

    return { mutation, loading };
};
