import {
    IActivateTopic,
    IAddTopic,
    IDelTopic,
    IEditTopic,
    IGetTopic,
    IGetTopicList
} from '@/models/topic.model';
import axiosx from '@/utils/axiosJSON';

const base_url = '/mgr/topics';

export const GetTopicApi = async (params: IGetTopic) => {
    const url = base_url + '/' + params.topic_id;

    return await axiosx.get(url);
};

export const EditTopicApi = async (params: IEditTopic) => {
    const url = base_url + '/' + params.topic_id;

    return await axiosx.put(url, params);
};

export const GetTopiListApi = async (params: IGetTopicList) => {
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

export const ActivateTopicApi = async (params: IActivateTopic) => {
    const url = base_url + '/' + params.topic_id;

    return await axiosx.patch(url, params);
};

export const DelTopicApi = async (params: IDelTopic) => {
    const url = base_url + '/' + params.topic_id;

    return await axiosx.delete(url);
};

export const AddTopicApi = async (params: IAddTopic) => {
    const url = base_url;

    return await axiosx.post(url, params);
};
