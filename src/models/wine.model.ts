export enum WINE_STATUS {
    // 无效
    INACTIVE = 0,
    // 有效
    ACTIVE = 1
}

export interface IGetWineList {
    page?: number;
    state?: number;
    wine_id?: string;
    wine_name?: string;
}

export interface IActiveWine {
    wine_id: string;
    op: WINE_STATUS;
}

export interface IDelWine {
    wine_id: string;
}

export interface IAddWine {
    wine_id: string;
    wine_name: string;
    total_name?: string;
    scale: string;
    unit?: string;
    coin?: string;
    inititor: string;
    productor: string;
    consignee: string;
    photo: string;
    content: string;
}

export interface IGetWine {
    wine_id: string;
}
