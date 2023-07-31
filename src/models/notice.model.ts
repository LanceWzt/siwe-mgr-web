export enum NOTICE_STATUS {
    INACTIVE = 0,
    ACTIVE = 1,
    HIGHLIGHT = 2
}

export enum NOTICE_TYPE {
    ANCMT = 1,
    NEWS = 2
}

export interface IGetNoticeList {
    type: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    state?: number;
    page?: number;
}

export interface IActivateNotice {
    notice_id: string;
    state: NOTICE_STATUS;
}

export interface IDelNotice {
    notice_id: string;
}

export interface IAddNotice {
    type: 'd' | 'a';
    title: string;
    time: string;
    content: string;
}

export interface IEditNotice {
    notice_id: string;
    title: string;
    time: string;
    content: string;
}

export interface IGetNotice {
    notice_id: string;
}
