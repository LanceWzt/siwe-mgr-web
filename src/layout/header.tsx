import React from 'react';
import { useRecoilValue } from 'recoil';

import { Avatar, Typography, Dropdown } from '@arco-design/web-react';

import logo from '@/assets/logo.png';
import { Navibar } from '@/style/layout_style';
import { User } from '@/store/user_store';
import { userState } from '@/store/user_store';
import PopupMenu from '@/components/popupMenu';

const MyHeader: React.FC = () => {
    const user = useRecoilValue<User>(userState);

    const myTrigger = (
        <Dropdown droplist={<PopupMenu />} position='br'>
            <Avatar size={28} style={{ backgroundColor: '#14a9f8' }}>
                {user.user?.name.slice(0, 1)}
            </Avatar>
        </Dropdown>
    );

    return (
        <Navibar>
            <div>
                <img src={logo} style={{ height: 20 }} />
                <Typography.Text
                    bold
                    style={{
                        fontSize: 18,
                        padding: '0 1rem',
                        fontFamily: 'Tahoma, Helvetica, Arial, STXihei, sans-serif'
                    }}
                >
                    上海国际酒业交易中心
                </Typography.Text>
            </div>
            <div>{myTrigger}</div>
        </Navibar>
    );
};

export default MyHeader;
