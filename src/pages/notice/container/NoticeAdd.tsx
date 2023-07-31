import { NOTICE_TYPE } from '@/models/notice.model';
import React from 'react';
import NoticeForm from '../components/form';
import { useAddNotice } from '../hooks/add';

export const GenNoticeNav = (type: NOTICE_TYPE) => {
    switch (type) {
        case NOTICE_TYPE.ANCMT:
            return '/notices/ancmt';
        case NOTICE_TYPE.NEWS:
            return '/notices/news';

        default:
            return '/index';
    }
};

interface IProps {
    type: NOTICE_TYPE;
}

const NoticeAdd: React.FC<IProps> = ({ type }) => {
    const { mutation, isLoading } = useAddNotice(GenNoticeNav(type));

    return <NoticeForm type={type} loading={isLoading} mutation={mutation} />;
};

export default NoticeAdd;
