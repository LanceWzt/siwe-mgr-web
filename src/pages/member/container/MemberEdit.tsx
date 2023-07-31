import { Card, Typography } from '@arco-design/web-react';
import React, { useEffect } from 'react';
import FormMember from '../components/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMember } from '../hooks/get';
import { useAjaxErrorMsg } from '@/hooks/message.hook';
import Loading from '@/components/Loading.comp';
import { useEditMember } from '../hooks/edit';

const MemberEdit: React.FC = () => {
    const { id } = useParams();
    const member_id = id || '';

    const navigate = useNavigate();

    const query = useGetMember(member_id);

    const { mutation, isLoading } = useEditMember();

    const errMsg = useAjaxErrorMsg({
        onErrorClose: () => {
            navigate('/members');
        }
    });

    useEffect(() => {
        if (query.isError) {
            errMsg(query.error);
        }
    }, [query, errMsg]);

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={6} style={{ margin: 0 }}>
                新增会员
            </Typography.Title>

            <Loading isLoading={query.isLoading}>
                <FormMember isLoading={isLoading} query={query} mutation={mutation} isEdit={true} />
            </Loading>
        </Card>
    );
};

export default MemberEdit;
