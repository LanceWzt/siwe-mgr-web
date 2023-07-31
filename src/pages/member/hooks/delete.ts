import { DelMemberApi } from '@/api/member.api';
import { useMutation } from '@tanstack/react-query';

export const useDelMember = () => {
    const mutation = useMutation({
        mutationFn: DelMemberApi
    });

    return { mutation };
};
