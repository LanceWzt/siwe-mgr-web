export enum MEM_STATUS {
    INACTIVE = 0,
    ACTIVE = 1
}

export interface IGetMemList {
    page?: number;
    member_id?: string;
    member_name?: string;
    city?: string;
}

export interface IDelMem {
    member_id: string;
}

export interface IAddMem {
    member_id: string;
    member_name: string;
    city: string;
    phone?: string;
    address?: string;
}

export interface IGetMem {
    member_id: string;
}

export interface IEditMem {
    member_id: string;
    member_name: string;
    city: string;
    phone?: string;
    address?: string;
}
