import { GetCityApi } from '@/api/member.api';
import { useQuery } from '@tanstack/react-query';

export const useGetCity = () => {
    const { data, isError, error, refetch } = useQuery({
        queryKey: ['member_city'],
        queryFn: GetCityApi
    });

    return { data, isError, error, refetch };
};
