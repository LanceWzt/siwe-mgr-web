import React, { useState } from 'react';
import { Message, Upload } from '@arco-design/web-react';
import { RequestOptions, UploadItem } from '@arco-design/web-react/es/Upload';
import { useDelUploadImg, useUploadImg } from '@/hooks/upload.hook';
import { AxiosProgressEvent } from 'axios';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString, FileUrl2FileName } from '@/utils/common';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';

interface IUploadImg {
    fileList: UploadItem[];
    setFileList: React.Dispatch<React.SetStateAction<UploadItem[]>>;
    uploadSuccess: (v: string) => void;
    uploadRemove?: () => void;
}

const UploadImg: React.FC<IUploadImg> = ({
    fileList,
    setFileList,
    uploadSuccess,
    uploadRemove
}) => {
    const [imgName, setImgName] = useState<string | undefined>();

    const { mutation: uploadMutation } = useUploadImg();

    const { mutation: delMutation } = useDelUploadImg();

    const delUploadHandler = () => {
        delMutation.mutate({ image_name: imgName || '' });
        if (uploadRemove) {
            uploadRemove();
        }
    };

    const uploadHandler = (option: RequestOptions) => {
        const { onProgress, onSuccess, onError, file } = option;

        const onImgProgress = (event: AxiosProgressEvent) => {
            let percent = '0';

            if (event.total && event.total > 0) {
                percent = String((event.loaded / event.total) * 100);
            }

            onProgress(parseInt(percent, 10), event as unknown as ProgressEvent);
        };

        uploadMutation.mutate(
            { file: file, onImgProgress: onImgProgress },
            {
                onSuccess: (data: any) => {
                    setImgName(FileUrl2FileName(data.data['image_save_url']));
                    Message.info('上传图片成功');
                    uploadSuccess(data.data['image_url']);
                    onSuccess({});
                },
                onError: (error) => {
                    if (isRespInvalidParams(error)) {
                        Message.error(ErrorsToString((error as RespInvalidParams).errors));
                    } else if (isRespBadRqst(error)) {
                        Message.error((error as RespBadRqst).msg);
                    }
                    onError({});
                }
            }
        );
    };

    return (
        <Upload
            listType='picture-card'
            limit={1}
            imagePreview
            progressProps={{
                size: 'small',
                type: 'line',
                width: '100%'
            }}
            fileList={fileList}
            onChange={setFileList}
            customRequest={uploadHandler}
            onProgress={(currentFile) => {
                setFileList([currentFile]);
            }}
            onRemove={delUploadHandler}
        />
    );
};

export default UploadImg;
