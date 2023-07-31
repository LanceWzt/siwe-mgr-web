import React from 'react';

import { Grid } from '@arco-design/web-react';
import logo from '@/assets/logo.png';

import LoginForm from './form';
import { Container, Left, Right } from '@/style/login_style';

const Login: React.FC = () => {
    return (
        <Container>
            <Grid.Row>
                <Left span={6}>
                    <div>
                        <img src={logo} width='100%' />
                    </div>
                    <div>上海国际酒业交易中心</div>
                </Left>
                <Right span={18}>
                    <LoginForm />
                </Right>
            </Grid.Row>
        </Container>
    );
};

export default Login;
