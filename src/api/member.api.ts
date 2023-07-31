import { IAddMem, IDelMem, IEditMem, IGetMem, IGetMemList } from '@/models/member.model';
import axiosx from '@/utils/axiosJSON';

const base_url = '/mgr/members';

export const GetCityApi = async () => {
    const url = base_url + '/city';

    return await axiosx.get(url);
};

export const GetListApi = async (params: IGetMemList) => {
    let url = base_url;

    if (
        !(!params.page && params.page !== 0) ||
        !(!params.member_id && params.member_id !== '') ||
        !(!params.member_name && params.member_name !== '') ||
        !(!params.city && params.city !== '')
    ) {
        url += '?';
        const keys = Object.keys(params);
        const values = Object.values(params);

        keys.forEach((k, index) => {
            if (values[index] !== undefined && values[index] !== null) {
                url += k + '=' + values[index] + '&';
            }
        });

        url = url.slice(0, -1);
    }

    return await axiosx.get(url);
};

export const DelMemberApi = async (params: IDelMem) => {
    const url = base_url + '/' + params.member_id;

    return await axiosx.delete(url);
};

export const AddMemberApi = async (params: IAddMem) => {
    const url = base_url;

    return await axiosx.post(url, params);
};

export const GetMemberApi = async ({ member_id }: IGetMem) => {
    const url = base_url + '/' + member_id;

    return await axiosx.get(url);
};

export const EditMemberApi = async (params: IEditMem) => {
    const url = base_url + '/' + params.member_id;

    return await axiosx.put(url, params);
};
