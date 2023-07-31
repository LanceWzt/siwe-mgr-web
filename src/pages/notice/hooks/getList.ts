import { GetDailyListApi } from '@/api/daily.api';
import { GetNoticeListApi } from '@/api/notice.api';
import { IGetDailyList } from '@/models/daily.model';
import { IGetNoticeList } from '@/models/notice.model';
import { useQuery } from '@tanstack/react-query';

export const useGetNoticeList = (params: IGetNoticeList) => {
    const query = useQuery({
        queryKey: ['notices', params],
        queryFn: () => GetNoticeListApi(params),
        enabled: false
    });

    return query;
};

export const useGetDailyList = (params: IGetDailyList) => {
    const query = useQuery({
        queryKey: ['daily', params],
        queryFn: () => GetDailyListApi(params),
        enabled: false
    });

    return query;
};
