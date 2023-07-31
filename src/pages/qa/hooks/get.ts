import { GetTopicApi } from '@/api/topic.api';
import { IGetTopic } from '@/models/topic.model';
import { useQuery } from '@tanstack/react-query';

export const useGetTopic = ({ topic_id }: IGetTopic) => {
    const query = useQuery({
        queryKey: ['topic', topic_id],
        queryFn: () => GetTopicApi({ topic_id: topic_id })
    });

    return query;
};

export const useGetQA = () => {
    const query = useQuery({
        queryKey: ['topic', 'cjwt'],
        queryFn: () => GetTopicApi({ topic_id: 'cjwt' })
    });

    return query;
};

export const useGetFee = () => {
    const query = useQuery({
        queryKey: ['topic', 'fee'],
        queryFn: () => GetTopicApi({ topic_id: 'fyyl' })
    });

    return query;
};
