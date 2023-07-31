import React from 'react';
import TopicForm from '../components/form';
import { TOPIC_TYPE } from '@/models/topic.model';
import { useAddTopic } from '../hooks/add';

interface IProps {
    type: TOPIC_TYPE;
}

export const GenNav = (type: TOPIC_TYPE) => {
    switch (type) {
        case TOPIC_TYPE.INDUSTRY_NEWS:
            return '/topics/industry_news';
        case TOPIC_TYPE.MEMBER_NEWS:
            return '/topics/member_news';
        case TOPIC_TYPE.FINANCIAL_INFO:
            return '/topics/financial_info';
        default:
            return '/index';
    }
};

const TopicAdd: React.FC<IProps> = ({ type }) => {
    const { mutation: addMutation, isLoading } = useAddTopic(GenNav(type));

    return <TopicForm type={type} mutation={addMutation} loading={isLoading} />;
};

export default TopicAdd;
