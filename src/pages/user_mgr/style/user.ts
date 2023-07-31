import { Form } from '@arco-design/web-react';
import styled from 'styled-components';

export const AddForm = styled(Form)``;

export const AddFormWrapper = styled.div`
    width: 624px;
    margin: 0 auto;
    padding: 56px 0 70px 0;

    ${AddForm} {
        width: 100%;
        box-sizing: border-box;
        margin-top: 36px;
        padding-right: 76px;
    }
`;
