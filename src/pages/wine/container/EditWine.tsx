import { Form, Message, Spin } from '@arco-design/web-react';
import React, { useEffect } from 'react';
import FormWine from '../components/Form';
import { useGetWine } from '../hooks/get';
import { useNavigate, useParams } from 'react-router-dom';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { useEditWine } from '../hooks/edit';

const EditWine: React.FC = () => {
    const [wineEditForm] = Form.useForm();

    const { id } = useParams();
    const wine_id = id || '';

    const query = useGetWine({ wine_id: wine_id });

    const { mutation: editMutation, loading } = useEditWine();

    const navigate = useNavigate();

    useEffect(() => {
        if (query.isError) {
            if (isRespInvalidParams(query.error)) {
                Message.error({
                    content: ErrorsToString((query.error as RespInvalidParams).errors),
                    duration: 1000,
                    onClose: () => {
                        navigate('/wine');
                    }
                });
                return;
            }

            if (isRespBadRqst(query.error)) {
                Message.error({
                    duration: 1000,
                    content: (query.error as RespBadRqst).msg,
                    onClose: () => {
                        navigate('/wine');
                    }
                });
                return;
            }
        }
    });

    return (
        <Spin loading={query.isLoading} block>
            <FormWine
                form={wineEditForm}
                query={query}
                mutation={editMutation}
                isEdit={true}
                loading={loading}
            />
        </Spin>
    );
};

export default EditWine;
