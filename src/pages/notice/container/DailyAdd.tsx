import React from 'react';
import { useAddDaily } from '../hooks/add';
import DailyForm from '../components/dailyForm';

const DailyAdd: React.FC = () => {
    const { mutation, isLoading } = useAddDaily('/daily');

    return <DailyForm loading={isLoading} mutation={mutation} />;
};

export default DailyAdd;
