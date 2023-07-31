import styled from 'styled-components';

import { Container } from './login_style';

export const TContainer = styled(Container)`
    background-color: rgb(var(--gray-2));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    div {
        text-align: center;
        color: var(--color-text-2);
    }
`;
