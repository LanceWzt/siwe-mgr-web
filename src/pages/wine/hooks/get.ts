import { GetWineApi } from '@/api/wine.api';
import { IGetWine } from '@/models/wine.model';
import { useQuery } from '@tanstack/react-query';

export const useGetWine = (params: IGetWine) => {
    const query = useQuery({
        queryKey: ['wine', params.wine_id],
        queryFn: () => GetWineApi(params)
    });

    return query;
};
