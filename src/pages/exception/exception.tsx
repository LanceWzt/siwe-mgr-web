import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Avatar, Icon, Space, Button } from '@arco-design/web-react';
import { TContainer } from '@/style/exception_style';
import { IconFontCnURL } from '@/config/config';
import { useSetRecoilState } from 'recoil';
import { InitialState, User, userState } from '@/store/user_store';

interface Props {
    code: number;
}

const Exception: React.FC<Props> = ({ code }) => {
    const IconFont = Icon.addFromIconFontCn({
        src: IconFontCnURL
    });

    const setAuth = useSetRecoilState<User>(userState);

    const location = useLocation();

    const from = location.state?.prevLocation?.pathname || '/index';

    const navigate = useNavigate();

    const btnHandler = () => {
        switch (code) {
            case 401:
                setAuth(InitialState);
                navigate('/login', { state: { prevLocation: location.state?.prevLocation } });
                break;
            default:
                navigate(from, { replace: true });
                break;
        }
    };

    return (
        <TContainer>
            <Space direction='vertical' size='large'>
                <div>
                    <Avatar size={90} style={{ backgroundColor: '#9FD4FD' }}>
                        {code === 401 && <IconFont type='icon-yiguoqi' style={{ fontSize: 60 }} />}
                        {code === 403 && (
                            <IconFont type='icon-hold__easyico' style={{ fontSize: 50 }} />
                        )}
                        {code === 404 && <IconFont type='icon-404' style={{ fontSize: 50 }} />}
                        {code === 500 && <IconFont type='icon-group43' style={{ fontSize: 50 }} />}
                    </Avatar>
                </div>
                <div>
                    {code === 401 && '登录已过期，请重新登录'}
                    {code === 403 && '禁止访问'}
                    {code === 404 && '未找到资源'}
                    {code === 500 && '发生了错误'}
                </div>
                <div>
                    <Button type='primary' onClick={btnHandler}>
                        {code === 401 && '去登录'}
                        {code !== 401 && '返 回'}
                    </Button>
                </div>
            </Space>
        </TContainer>
    );
};

export default Exception;
