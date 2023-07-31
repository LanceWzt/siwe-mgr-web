export enum USERTYPE {
    // 管理员
    ADMIN = 1,
    // 操作员
    OPERATOR = 2,
    // 部门
    DEPART = 8,
    // 审计
    AUDITOR = 9
}

export enum USERSTATUS {
    // 无效
    INACTIVE = 0,
    // 有效
    ACTIVE = 1
}

// loginParams 用户登录参数
export interface loginParams {
    user_name: string;
    password: string;
    captcha_id: string;
    captcha_value: string;
}

// IDelUser 删除用户参数
export interface IDelUser {
    user_id: number;
}

// IAddUser 添加用户参数
export interface IAddUser {
    user_name: string;
    name: string;
    type: number;
    phone: string;
}

// IEditUser 编辑用户参数
export interface IEditUser {
    id: number;
    user_name: string;
    name: string;
    type: number;
    phone: string;
}
