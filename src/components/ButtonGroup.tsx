import React from 'react';
import { Button, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import { BtnGroup } from '@/style/layout_style';

interface IBg {
    txt: string;
    href: () => void;
}

const ButtonGroup: React.FC<IBg> = ({ txt, href }) => {
    return (
        <BtnGroup>
            <Space align='center'>
                <Button
                    type='primary'
                    onClick={() => {
                        href();
                    }}
                >
                    <IconPlus />
                    {txt}
                </Button>
            </Space>
        </BtnGroup>
    );
};

export default ButtonGroup;
