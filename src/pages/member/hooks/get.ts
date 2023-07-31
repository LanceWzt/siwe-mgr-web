import { GetMemberApi } from '@/api/member.api';
import { useQuery } from '@tanstack/react-query';

export const useGetMember = (id: string) => {
    const query = useQuery({
        queryKey: ['member', id],
        queryFn: () => GetMemberApi({ member_id: id })
    });

    return query;
};
