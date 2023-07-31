import { FC } from 'react';
import { Form } from '@arco-design/web-react';

import { useWineAdd } from '../hooks/add';
import FormWine from '../components/Form';

const AddWine: FC = () => {
    const [wineAddForm] = Form.useForm();

    const { mutation: addMutation, loading } = useWineAdd();

    return <FormWine form={wineAddForm} loading={loading} mutation={addMutation} />;
};

export default AddWine;
