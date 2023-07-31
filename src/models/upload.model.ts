import { AxiosProgressEvent } from 'axios';

export interface IUploadImg {
    file: File;
    onImgProgress?: (ProgressEvent: AxiosProgressEvent) => void;
}

export interface IUploadFile {
    file: File;
}

export interface IDelUploadImg {
    image_name: string;
}

export interface IdelUploadFiles {
    file_names: string[];
}
