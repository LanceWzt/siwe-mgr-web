import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/login';
import AuthCheck from './components/authCheck';
import Exception from './pages/exception/exception';
import LayoutX from './layout';
import UserEdit from './pages/user_mgr/UserEdit';
import Pwd from './pages/user_mgr/Pwd';
import WineList from './pages/wine/container/WineList';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading.comp';
import EditWine from './pages/wine/container/EditWine';
import MemberList from './pages/member/container/MemberList';
import MemberAdd from './pages/member/container/MemberAdd';
import MemberEdit from './pages/member/container/MemberEdit';
import Fee from './pages/qa/container/Fee';
import Qa from './pages/qa/container/QA';
import TopicList from './pages/topic/container/TopicList';
import { TOPIC_TYPE } from './models/topic.model';
import TopicAdd from './pages/topic/container/TopicAdd';
import TopicEdit from './pages/topic/container/TopicEdit';
import NoticeList from './pages/notice/container/NoticeList';
import { NOTICE_TYPE } from './models/notice.model';
import NoticeAdd from './pages/notice/container/NoticeAdd';
import NoticeEdit from './pages/notice/container/NoticeEdit';
import DailyList from './pages/notice/container/DailyList';
import DailyAdd from './pages/notice/container/DailyAdd';
import DailyEdit from './pages/notice/container/DailyEdit';

const LazyUserList = lazy(() => import('./pages/user_mgr/UserList'));
const LazyUserAdd = lazy(() => import('./pages/user_mgr/UserAdd'));
const LazyWineAdd = lazy(() => import('./pages/wine/container/AddWine'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/index',
        element: (
            <AuthCheck>
                <LayoutX bread={['index']} page={null} menu_key='10' />
            </AuthCheck>
        )
    },
    {
        path: '/daily',
        element: (
            <AuthCheck>
                <LayoutX bread={['信息录入', '交易综述']} page={<DailyList />} menu_key='0_1' />
            </AuthCheck>
        )
    },
    {
        path: '/daily/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '交易综述', '新增综述']}
                    page={<DailyAdd />}
                    menu_key='0_1'
                />
            </AuthCheck>
        )
    },
    {
        path: '/daily/:id',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '交易综述', '编辑综述']}
                    page={<DailyEdit />}
                    menu_key='0_1'
                />
            </AuthCheck>
        )
    },
    {
        path: '/notices/ancmt',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '中心公告']}
                    page={<NoticeList type={NOTICE_TYPE.ANCMT} />}
                    menu_key='0_2'
                />
            </AuthCheck>
        )
    },
    {
        path: '/notices/ancmt/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '中心公告', '新增公告']}
                    page={<NoticeAdd type={NOTICE_TYPE.ANCMT} />}
                    menu_key='0_2'
                />
            </AuthCheck>
        )
    },
    {
        path: '/notices/ancmt/:id',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '中心公告', '编辑公告']}
                    page={<NoticeEdit type={NOTICE_TYPE.ANCMT} />}
                    menu_key='0_2'
                />
            </AuthCheck>
        )
    },
    {
        path: '/notices/news',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '中心快讯']}
                    page={<NoticeList type={NOTICE_TYPE.NEWS} />}
                    menu_key='0_3'
                />
            </AuthCheck>
        )
    },
    {
        path: '/notices/news/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '中心快讯', '新增快讯']}
                    page={<NoticeAdd type={NOTICE_TYPE.NEWS} />}
                    menu_key='0_3'
                />
            </AuthCheck>
        )
    },
    {
        path: '/notices/news/:id',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['信息录入', '中心快讯', '编辑快讯']}
                    page={<NoticeEdit type={NOTICE_TYPE.NEWS} />}
                    menu_key='0_3'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/member_news',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '会员动态']}
                    page={<TopicList type={TOPIC_TYPE.MEMBER_NEWS} />}
                    menu_key='1_1'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/member_news/:id',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '会员动态', '编辑']}
                    page={<TopicEdit type={TOPIC_TYPE.MEMBER_NEWS} />}
                    menu_key='1_1'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/member_news/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '会员动态', '新增']}
                    page={<TopicAdd type={TOPIC_TYPE.MEMBER_NEWS} />}
                    menu_key='1_1'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/financial_info',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '财经资讯']}
                    page={<TopicList type={TOPIC_TYPE.FINANCIAL_INFO} />}
                    menu_key='1_2'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/financial_info/:id',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '财经资讯', '编辑']}
                    page={<TopicEdit type={TOPIC_TYPE.FINANCIAL_INFO} />}
                    menu_key='1_2'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/financial_info/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '财经资讯', '新增']}
                    page={<TopicAdd type={TOPIC_TYPE.FINANCIAL_INFO} />}
                    menu_key='1_2'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/industry_news/:id',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '行业动态', '编辑']}
                    page={<TopicEdit type={TOPIC_TYPE.INDUSTRY_NEWS} />}
                    menu_key='1_3'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/industry_news',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '行业动态']}
                    page={<TopicList type={TOPIC_TYPE.INDUSTRY_NEWS} />}
                    menu_key='1_3'
                />
            </AuthCheck>
        )
    },
    {
        path: '/topics/industry_news/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['专题管理', '行业动态', '新增']}
                    page={<TopicAdd type={TOPIC_TYPE.INDUSTRY_NEWS} />}
                    menu_key='1_3'
                />
            </AuthCheck>
        )
    },
    {
        path: '/fee',
        element: (
            <AuthCheck>
                <LayoutX bread={['费用一览']} page={<Fee />} menu_key='2_1' />
            </AuthCheck>
        )
    },
    {
        path: '/qa',
        element: (
            <AuthCheck>
                <LayoutX bread={['常见问题']} page={<Qa />} menu_key='2_2' />
            </AuthCheck>
        )
    },
    {
        path: '/members',
        element: (
            <AuthCheck>
                <LayoutX bread={['会员录入', '会员列表']} page={<MemberList />} menu_key='3' />
            </AuthCheck>
        )
    },
    {
        path: '/members/add',
        element: (
            <AuthCheck>
                <LayoutX bread={['会员录入', '新增会员']} page={<MemberAdd />} menu_key='3' />
            </AuthCheck>
        )
    },
    {
        path: '/members/:id',
        element: (
            <AuthCheck>
                <LayoutX bread={['会员录入', '编辑会员']} page={<MemberEdit />} menu_key='3' />
            </AuthCheck>
        )
    },
    {
        path: '/wine',
        element: (
            <AuthCheck>
                <LayoutX bread={['酒品录入', '酒品列表']} page={<WineList />} menu_key='4' />
            </AuthCheck>
        )
    },
    {
        path: '/wine/add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['酒品录入', '新增酒品']}
                    page={
                        <Suspense fallback={<Loading />}>
                            <LazyWineAdd />
                        </Suspense>
                    }
                    menu_key='4'
                />
            </AuthCheck>
        )
    },
    {
        path: '/wine/:id',
        element: (
            <AuthCheck>
                <LayoutX bread={['酒品录入', '编辑酒品']} page={<EditWine />} menu_key='4' />
            </AuthCheck>
        )
    },
    {
        path: '/usr_mgr',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['用户管理', '用户列表']}
                    page={
                        <Suspense fallback={<Loading />}>
                            <LazyUserList />
                        </Suspense>
                    }
                    menu_key='5'
                />
            </AuthCheck>
        )
    },
    {
        path: '/usr_add',
        element: (
            <AuthCheck>
                <LayoutX
                    bread={['用户管理', '新增用户']}
                    page={
                        <Suspense fallback={<Loading />}>
                            <LazyUserAdd />
                        </Suspense>
                    }
                    menu_key='5'
                />
            </AuthCheck>
        )
    },
    {
        path: '/usr_edit/:id',
        element: (
            <AuthCheck>
                <LayoutX bread={['用户管理', '编辑用户']} page={<UserEdit />} menu_key='5' />
            </AuthCheck>
        )
    },
    {
        path: '/pwd',
        element: (
            <AuthCheck>
                <LayoutX bread={['个人中心', '修改密码']} page={<Pwd />} menu_key='' />
            </AuthCheck>
        )
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '401',
        element: <Exception code={401} />
    },
    {
        path: '403',
        element: (
            <AuthCheck>
                <Exception code={403} />
            </AuthCheck>
        )
    },
    {
        path: '500',
        element: <Exception code={500} />
    },
    { path: '*', element: <Exception code={404} /> }
]);

export default router;
