import { TOPIC_TYPE } from '@/models/topic.model';
import React from 'react';
import TopicForm from '../components/form';
import { useEditTopic } from '../hooks/edit';
import { GenNav } from './TopicAdd';
import { useGetTopic } from '@/pages/qa/hooks/get';
import { useParams } from 'react-router-dom';

interface IProps {
    type: TOPIC_TYPE;
}

const TopicEdit: React.FC<IProps> = ({ type }) => {
    const { id } = useParams();
    const topic_id = id || '';

    const query = useGetTopic({ topic_id: topic_id });
    const { mutation: editMutation, isLoading } = useEditTopic(GenNav(type));

    return (
        <TopicForm
            type={type}
            mutation={editMutation}
            query={query}
            loading={isLoading}
            isEdit={true}
            id={topic_id}
        />
    );
};

export default TopicEdit;
