import { GetTopiListApi } from '@/api/topic.api';
import { IGetTopicList } from '@/models/topic.model';
import { useQuery } from '@tanstack/react-query';

export const useGetTopicList = (params: IGetTopicList) => {
    const query = useQuery({
        queryKey: ['topics', params],
        queryFn: () => GetTopiListApi(params),
        enabled: false
    });

    return query;
};
