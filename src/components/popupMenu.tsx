import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Menu, Divider, Notification } from '@arco-design/web-react';
import { IconLock, IconPoweroff } from '@arco-design/web-react/icon';

import { userLogoutApi } from '@/api/user';

import { InitialState, User, userState } from '@/store/user_store';

const PopupMenu: React.FC = () => {
    const userLogout = useMutation(['user', 'logout'], userLogoutApi);

    const navigate = useNavigate();

    const setAuth = useSetRecoilState<User>(userState);

    const notification = () => {
        Notification.success({
            title: '成功',
            content: '登出成功',
            duration: 1000,
            onClose: () => {
                setAuth(InitialState);
                navigate('/login', { replace: true });
            }
        });
    };

    const pwdHandler = () => {
        navigate('/pwd');
    };

    const logoutHandler = () => {
        userLogout.mutate(undefined, {
            onSuccess: () => {
                notification();
            },

            onError: () => {
                setAuth(InitialState);
                navigate('/login', { replace: true });
            }
        });
    };

    return (
        <Menu style={{ boxShadow: '0 0 1px rgba(0, 0, 0, 1)', height: '100%' }}>
            <Menu.Item key='repassword' onClick={pwdHandler}>
                <IconLock />
                修改密码
            </Menu.Item>
            <Divider style={{ margin: '5px 0' }} />
            <Menu.Item key='logout' onClick={logoutHandler}>
                <IconPoweroff />
                退出登录
            </Menu.Item>
        </Menu>
    );
};

export default PopupMenu;
