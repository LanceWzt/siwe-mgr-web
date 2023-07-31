// 将error数组转化为字符串
export function ErrorsToString(errors: object): string {
    let str = '';
    Object.values(errors).forEach((val) => {
        str = str + val + '; ';
        return str;
    });
    return str.slice(0, -1);
}

// 根据元素个数平均分割数组
export function ArraySlice<T = any>(array: T[], size: number): T[][] {
    let result = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
        let start = i * size;
        let end = start + size;
        result.push(array.slice(start, end));
    }

    return result;
}

// FileUrl2FileName 文件url截取文件名
export function FileUrl2FileName(url: string): string {
    let afterLastSlash = '';

    if (url.lastIndexOf('/') !== -1) {
        afterLastSlash = url.slice(url.lastIndexOf('/') + 1);
    }

    return afterLastSlash;
}
