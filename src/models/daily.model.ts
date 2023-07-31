export enum DAILY_STATUS {
    INACTIVE = 0,
    ACTIVE = 1
}

export interface IGetDailyList {
    page?: number;
    start_date?: string;
    end_date?: string;
    state?: DAILY_STATUS;
}

export interface IActivateDaily {
    daily_id: string;
    state: DAILY_STATUS;
}

export interface IDelDaily {
    daily_id: string;
}

export interface IAddDaily {
    time: string;
    content: string;
}

export interface IGetDaily {
    daily_id: string;
}

export interface IEditDaily {
    daily_id: string;
    time: string;
    content: string;
}
