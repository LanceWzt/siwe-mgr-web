import { GetWineListApi } from '@/api/wine.api';
import { IGetWineList } from '@/models/wine.model';
import { useQuery } from '@tanstack/react-query';

export const useGetList = (params: IGetWineList) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['wine', params],
        queryFn: () => GetWineListApi(params)
    });

    return { data, isLoading, isError, error, refetch };
};
