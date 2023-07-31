import styled from 'styled-components';
import { Grid } from '@arco-design/web-react';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    min-width: 640px;
`;
export const Left = styled(Grid.Col)`
    background-color: rgb(var(--gray-1));
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: rgb(var(--gray-7));

    > div {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: lighter;
        font-family: Heiti, STHeiti;
    }
`;
export const Right = styled(Grid.Col)`
    min-width: 450px;
    background-color: rgb(var(--cyan-9));
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > Form {
        width: 20rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: rgb(var(--gray-1));
        font-size: 1.5rem;
    }
`;
