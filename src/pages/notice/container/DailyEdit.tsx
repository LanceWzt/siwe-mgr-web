import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDaily } from '../hooks/get';
import { useEditDaily } from '../hooks/edit';
import DailyForm from '../components/dailyForm';

const DailyEdit: React.FC = () => {
    const { id } = useParams();
    const daily_id = id || '';

    const query = useGetDaily({ daily_id: daily_id });

    const { mutation, isLoading } = useEditDaily('/daily');

    return (
        <DailyForm
            query={query}
            mutation={mutation}
            loading={isLoading}
            isEdit={true}
            id={daily_id}
        />
    );
};

export default DailyEdit;
