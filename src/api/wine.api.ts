import { IActiveWine, IAddWine, IDelWine, IGetWine, IGetWineList } from '@/models/wine.model';
import axiosx from '@/utils/axiosJSON';

const base_url = '/mgr/wine';

// GetWineListApi 获取酒品列表
export const GetWineListApi = async (params: IGetWineList) => {
    let url = base_url;

    if (
        !(!params.page && params.page !== 0) ||
        !(!params.state && params.state !== 0) ||
        !(!params.wine_id && params.wine_id !== '') ||
        !(!params.wine_name && params.wine_name !== '')
    ) {
        url += '?';
        const keys = Object.keys(params);
        const values = Object.values(params);

        keys.forEach((key, index) => {
            if (values[index] !== undefined && values[index] !== null) {
                url += key + '=' + values[index] + '&';
            }
        });

        url = url.slice(0, -1);
    }

    return await axiosx.get(url);
};

// ActiveWineApi 激活/解冻酒品
export const ActiveWineApi = async ({ wine_id, op }: IActiveWine) => {
    const url = base_url + '/' + wine_id + '/activation';

    return await axiosx.patch(url, { state: op });
};

// DeleteWineApi 删除酒品
export const DeleteWineApi = async ({ wine_id }: IDelWine) => {
    const url = base_url + '/' + wine_id;

    return await axiosx.delete(url);
};

// AddWineApi 添加酒品
export const AddWineApi = async (params: IAddWine) => {
    const url = base_url;

    return await axiosx.post(url, params);
};

// GetWineApi 获取酒品详情
export const GetWineApi = async ({ wine_id }: IGetWine) => {
    const url = base_url + '/' + wine_id;

    return await axiosx.get(url);
};

// EditWineApi 编辑酒品
export const EditWineApi = async (params: IAddWine) => {
    const url = base_url + '/' + params.wine_id;

    return await axiosx.put(url, params);
};
