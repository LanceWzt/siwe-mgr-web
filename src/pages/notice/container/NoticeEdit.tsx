import { NOTICE_TYPE } from '@/models/notice.model';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetNotice } from '../hooks/get';
import { useEditNotice } from '../hooks/edit';
import NoticeForm from '../components/form';
import { GenNoticeNav } from './NoticeAdd';

interface IProps {
    type: NOTICE_TYPE;
}

const NoticeEdit: React.FC<IProps> = ({ type }) => {
    const { id } = useParams();
    const notice_id = id || '';

    const query = useGetNotice({ notice_id: notice_id });

    const { mutation, isLoading } = useEditNotice(GenNoticeNav(type));

    return (
        <NoticeForm
            type={type}
            query={query}
            mutation={mutation}
            loading={isLoading}
            isEdit={true}
            id={notice_id}
        />
    );
};

export default NoticeEdit;
