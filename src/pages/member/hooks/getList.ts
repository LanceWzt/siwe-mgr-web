import { GetListApi } from '@/api/member.api';
import { IGetMemList } from '@/models/member.model';
import { useQuery } from '@tanstack/react-query';

export const useGetList = (params: IGetMemList) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['members', params],
        queryFn: () => GetListApi(params)
    });

    return { data, isLoading, isError, error, refetch };
};
