import {
    IActivateNotice,
    IAddNotice,
    IDelNotice,
    IEditNotice,
    IGetNotice,
    IGetNoticeList
} from '@/models/notice.model';
import axiosx from '@/utils/axiosJSON';

const base_url = '/mgr/notices';

export const GetNoticeListApi = async (params: IGetNoticeList) => {
    let url = base_url;

    if (
        !(!params.page && params.page !== 0) ||
        !(!params.type && params.type !== '') ||
        !(!params.state && params.state !== 0) ||
        !(!params.title && params.title !== '') ||
        !(!params.start_date && params.start_date !== '') ||
        !(!params.end_date && params.end_date !== '')
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

export const ActivateNoticeApi = async (params: IActivateNotice) => {
    const url = base_url + '/' + params.notice_id;

    return await axiosx.patch(url, params);
};

export const DelNoticeApi = async (params: IDelNotice) => {
    const url = base_url + '/' + params.notice_id;

    return await axiosx.delete(url);
};

export const AddNoticeApi = async (params: IAddNotice) => {
    const url = base_url;

    return await axiosx.post(url, params);
};

export const GetNoticeApi = async (params: IGetNotice) => {
    const url = base_url + '/' + params.notice_id;

    return await axiosx.get(url);
};

export const EditNoticeApi = async (params: IEditNotice) => {
    const url = base_url + '/' + params.notice_id;

    return await axiosx.put(url, params);
};
