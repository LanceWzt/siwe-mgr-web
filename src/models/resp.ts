export interface RespBadRqst {
    code: number;
    msg: string;
}

export interface RespSuccess extends RespBadRqst {
    data: string | Array<any> | object;
}

export interface RespInvalidParams extends RespBadRqst {
    errors: object;
}
