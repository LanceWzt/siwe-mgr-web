import { IDelUploadImg, IUploadFile, IUploadImg, IdelUploadFiles } from '@/models/upload.model';
import axiosfd from '@/utils/axiosFormData';
import axiosx from '@/utils/axiosJSON';

// UploadImgApi 上传单图片
export const UploadImgApi = async ({ file, onImgProgress }: IUploadImg) => {
    const url = '/images';

    const formData = new FormData();
    formData.append('images', file);

    return await axiosfd.post(url, formData, {
        onUploadProgress: onImgProgress
    });
};

// UploadFileApi 上传单文件
export const UploadFileApi = async ({ file }: IUploadFile) => {
    const url = '/pdfs';

    const formData = new FormData();
    formData.append('files', file);

    return await axiosfd.post(url, formData);
};

// DelUploadImgApi 删除单图片
export const DelUploadImgApi = async ({ image_name }: IDelUploadImg) => {
    const url = '/images/' + image_name;

    return await axiosx.delete(url);
};

// DelUploadFilesApi 删除多个文件
export const DelUploadFilesApi = async ({ file_names }: IdelUploadFiles) => {
    const url = '/batch/delete/files';

    return await axiosx.post(url, { file_names: file_names });
};
