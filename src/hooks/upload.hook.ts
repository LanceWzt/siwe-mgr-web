import { DelUploadFilesApi, DelUploadImgApi, UploadFileApi, UploadImgApi } from '@/api/upload.api';
import { useMutation } from '@tanstack/react-query';

export const useUploadImg = () => {
    const mutation = useMutation({
        mutationFn: UploadImgApi
    });

    return { mutation };
};

export const useUploadFile = () => {
    const mutation = useMutation({
        mutationFn: UploadFileApi
    });

    return { mutation };
};

export const useDelUploadImg = () => {
    const mutation = useMutation({
        mutationFn: DelUploadImgApi
    });

    return { mutation };
};

export const useDelUploadFiles = () => {
    const mutation = useMutation({
        mutationFn: DelUploadFilesApi
    });

    return { mutation };
};
