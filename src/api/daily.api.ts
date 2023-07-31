import {
    IActivateDaily,
    IAddDaily,
    IDelDaily,
    IEditDaily,
    IGetDaily,
    IGetDailyList
} from '@/models/daily.model';
import axiosx from '@/utils/axiosJSON';

const base_url = '/mgr/daily';

export const GetDailyListApi = async (params: IGetDailyList) => {
    let url = base_url;

    if (
        !(!params.page && params.page !== 0) ||
        !(!params.state && params.state !== 0) ||
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

export const ActivateDailyApi = async (params: IActivateDaily) => {
    const url = base_url + '/' + params.daily_id;

    return await axiosx.patch(url, params);
};

export const DelDailyApi = async (params: IDelDaily) => {
    const url = base_url + '/' + params.daily_id;

    return await axiosx.delete(url);
};

export const AddDailyApi = async (params: IAddDaily) => {
    const url = base_url;

    return await axiosx.post(url, params);
};

export const GetDailyApi = async (params: IGetDaily) => {
    const url = base_url + '/' + params.daily_id;

    return await axiosx.get(url);
};

export const EditDailyApi = async (params: IEditDaily) => {
    const url = base_url + '/' + params.daily_id;

    return await axiosx.put(url, params);
};
