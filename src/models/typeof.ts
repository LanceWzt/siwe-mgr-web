import { RespBadRqst, RespInvalidParams, RespSuccess } from './resp';

// 通用类型保护函数
export default function isOfType<T>(target: unknown, prop: keyof T): target is T {
    return (target as T)[prop] !== undefined;
}

export function isRespSuccess(target: unknown): boolean {
    return isOfType<RespSuccess>(target, 'data');
}

export function isRespInvalidParams(target: unknown): boolean {
    return isOfType<RespInvalidParams>(target, 'errors');
}

export function isRespBadRqst(target: unknown): boolean {
    return (target as RespBadRqst).code !== 200;
}
