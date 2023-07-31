import { DeleteWineApi } from '@/api/wine.api';
import { useMutation } from '@tanstack/react-query';

export const useWineDelete = () => {
    const mutation = useMutation({
        mutationFn: DeleteWineApi
    });

    return { mutation };
};
