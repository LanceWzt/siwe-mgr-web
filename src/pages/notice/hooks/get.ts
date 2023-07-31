import { GetDailyApi } from '@/api/daily.api';
import { GetNoticeApi } from '@/api/notice.api';
import { IGetDaily } from '@/models/daily.model';
import { IGetNotice } from '@/models/notice.model';
import { useQuery } from '@tanstack/react-query';

export const useGetNotice = (params: IGetNotice) => {
    const query = useQuery({
        queryKey: ['notice', params.notice_id],
        queryFn: () => GetNoticeApi(params)
    });

    return query;
};

export const useGetDaily = (params: IGetDaily) => {
    const query = useQuery({
        queryKey: ['daily', params.daily_id],
        queryFn: () => GetDailyApi(params)
    });

    return query;
};
