import React from 'react';

import MyHeader from '@/layout/header';
import MyMenu from '@/layout/menu';
import MyContent from '@/layout/content';
import { Container } from '@/style/layout_style';

interface props {
    bread: string[];
    page: React.ReactElement | null;
    menu_key: string;
}

const LayoutX: React.FC<props> = ({ bread, page, menu_key }) => {
    return (
        <Container>
            <MyHeader />
            <Container hasSider>
                <MyMenu selected={menu_key} />
                <MyContent bread={bread} page={page} />
            </Container>
        </Container>
    );
};

export default LayoutX;
