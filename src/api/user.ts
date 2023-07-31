import axiosx from '@/utils/axiosJSON';
import { IAddUser, IDelUser, IEditUser, loginParams } from '@/models/user';

// 获取图片验证码接口
export const getCaptchaApi = async () => {
    return await axiosx.get('/mgr/captcha');
};

// 用户登录接口
export const userLoginApi = async (data: loginParams) => {
    return await axiosx.post('/mgr/session', data);
};

// 用户登出接口
export const userLogoutApi = async () => {
    return await axiosx.delete('/mgr/session');
};

// 获取用户列表接口-参数声明
export interface getUsersInt {
    page?: number;
    type?: number;
    state?: number;
    user_name?: string;
    name?: string;
}
// 获取用户列表接口
export const getUsersApi = async (params: getUsersInt) => {
    const base_url = '/mgr/users';
    let url = base_url;

    if (
        !(!params.page && params.page !== 0) ||
        !(!params.name && params.name !== '') ||
        !(!params.user_name && params.user_name !== '') ||
        !(!params.type && params.type !== 0) ||
        !(!params.state && params.state !== 0)
    ) {
        url += '?';
        const keys = Object.keys(params);
        const values = Object.values(params);

        keys.forEach((key, index) => {
            if (values[index] !== undefined && values[index] !== null) {
                url += key + '=' + values[index] + '&';
            }
        });

        url = url.slice(0, -1);
    }

    return await axiosx.get(url);
};

interface IActiveUser {
    user_id: number;
    activation: number;
}
// 激活/冻结用户状态接口
export const activeUserApi = async ({ user_id, activation }: IActiveUser) => {
    const url = '/mgr/users/' + user_id + '/activation';

    return await axiosx.patch(url, { activation: activation });
};

// 删除用户接口
export const DelUserApi = async ({ user_id }: IDelUser) => {
    const url = '/mgr/users/' + user_id;

    return await axiosx.delete(url);
};

// AddUserApi 添加用户接口
export const AddUserApi = async (params: IAddUser) => {
    const url = '/mgr/users';

    return await axiosx.post(url, params);
};

// GetUserApi 获取用户详情接口
export const GetUserApi = async (user_id: number) => {
    const url = '/mgr/users/' + user_id;

    return await axiosx.get(url);
};

// EditUserApi 编辑用户
export const EditUserApi = async (params: IEditUser) => {
    const url = '/mgr/users/' + params.id;

    return await axiosx.put(url, params);
};

interface IChangePwd {
    old_passowrd: string;
    new_password: string;
    re_password: string;
}
// ChangePwdApi 修改密码
export const ChangePwdApi = async (params: IChangePwd) => {
    const url = '/mgr/password';

    return await axiosx.put(url, params);
};

interface IResetPwd {
    user_id: number;
}
// ResetPwdApi 重置用户密码
export const ResetPwdApi = async ({ user_id }: IResetPwd) => {
    const url = '/mgr/users/' + user_id + '/reset_pwd';

    return await axiosx.patch(url);
};
