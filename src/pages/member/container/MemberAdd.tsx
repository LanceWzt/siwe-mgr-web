import { Card, Typography } from '@arco-design/web-react';
import React from 'react';
import FormMember from '../components/Form';
import { useAddMember } from '../hooks/add';

const MemberAdd: React.FC = () => {
    const { mutation: addMutation, isLoading } = useAddMember();

    return (
        <Card bordered={false} bodyStyle={{ padding: '20px 20px', marginBottom: 40 }}>
            <Typography.Title heading={6} style={{ margin: 0 }}>
                新增会员
            </Typography.Title>

            <FormMember isLoading={isLoading} mutation={addMutation} />
        </Card>
    );
};

export default MemberAdd;
