import React from 'react';
import { Icon, Menu } from '@arco-design/web-react';

import { MenuTitle, MenuWrapper, MenuX, MenuItem, PrimaryItem } from '@/style/layout_style';
import { IconFontCnURL } from '@/config/config';
import { IconUser } from '@arco-design/web-react/icon';
import { USERTYPE } from '@/models/user';
import { NavLink } from 'react-router-dom';

interface props {
    selected: string;
}

const MyMenu: React.FC<props> = ({ selected }) => {
    const IconFont = Icon.addFromIconFontCn({
        src: IconFontCnURL
    });

    const session_str = sessionStorage.getItem('user_state');
    let session = {};
    if (session_str) {
        session = JSON.parse(session_str);
    }

    return (
        <MenuX width={220}>
            <MenuWrapper>
                <Menu autoOpen defaultSelectedKeys={[selected]}>
                    <MenuTitle
                        key='0'
                        title={
                            <>
                                <IconFont type='icon-info_in' className='menu_icon' />
                                信息录入
                            </>
                        }
                    >
                        <NavLink to='/daily'>
                            <MenuItem key='0_1'>
                                <IconFont type='icon-jiaoyitongji' />
                                交易综述
                            </MenuItem>
                        </NavLink>
                        <NavLink to='/notices/ancmt'>
                            <MenuItem key='0_2'>
                                <IconFont type='icon-gonggao' />
                                中心公告
                            </MenuItem>
                        </NavLink>
                        <NavLink to='/notices/news'>
                            <MenuItem key='0_3'>
                                <IconFont type='icon-18' />
                                中心快讯
                            </MenuItem>
                        </NavLink>
                    </MenuTitle>
                    <MenuTitle
                        key='1'
                        title={
                            <>
                                <IconFont type='icon-zhuanti' className='menu_icon' />
                                专题管理
                            </>
                        }
                    >
                        <NavLink to='/topics/member_news'>
                            <MenuItem key='1_1'>
                                <IconFont type='icon-dongtai' />
                                会员动态
                            </MenuItem>
                        </NavLink>
                        <NavLink to='/topics/financial_info'>
                            <MenuItem key='1_2'>
                                <IconFont type='icon-licai' />
                                财经资讯
                            </MenuItem>
                        </NavLink>
                        <NavLink to='/topics/industry_news'>
                            <MenuItem key='1_3'>
                                <IconFont type='icon-hangye' />
                                行业动态
                            </MenuItem>
                        </NavLink>
                    </MenuTitle>
                    <MenuTitle
                        key='2'
                        title={
                            <>
                                <IconFont type='icon-h5e' className='men_icon' />
                                常见页面
                            </>
                        }
                    >
                        <NavLink to='/fee'>
                            <MenuItem key='2_1'>
                                <IconFont type='icon-feiyong' />
                                费用一览
                            </MenuItem>
                        </NavLink>
                        <NavLink to='/qa'>
                            <MenuItem key='2_2'>
                                <IconFont type='icon-problem' />
                                常见问题
                            </MenuItem>
                        </NavLink>
                    </MenuTitle>
                    <NavLink to='/members'>
                        <PrimaryItem key='3'>
                            <IconFont type='icon-huiyuan' />
                            会员录入
                        </PrimaryItem>
                    </NavLink>
                    <NavLink to='/wine'>
                        <PrimaryItem key='4'>
                            <IconFont type='icon-jiubei' />
                            酒品录入
                        </PrimaryItem>
                    </NavLink>
                    {Object.keys(session).length !== 0 &&
                        (session as any).userState.user.type === USERTYPE.ADMIN && (
                            <NavLink to='/usr_mgr'>
                                <PrimaryItem key='5'>
                                    <IconUser />
                                    用户管理
                                </PrimaryItem>
                            </NavLink>
                        )}
                </Menu>
            </MenuWrapper>
        </MenuX>
    );
};

export default MyMenu;
