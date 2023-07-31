import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IDomEditor, IEditorConfig, IToolbarConfig, Boot, SlateElement } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import attachmentModule, { AttachmentElement } from '@wangeditor/plugin-upload-attachment';
import '@wangeditor/editor/dist/css/style.css';
import { useDelUploadFiles, useUploadFile, useUploadImg } from '@/hooks/upload.hook';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString, FileUrl2FileName } from '@/utils/common';
import { Message } from '@arco-design/web-react';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';

type InsertFnType = (url: string, alt: string, href: string) => void;

type ImageElement = SlateElement & {
    src: string;
    alt: string;
    url: string;
    href: string;
};

interface IMyEditor {
    html: string;
    setHtml: React.Dispatch<React.SetStateAction<string>>;
    innerRef: React.Ref<{ diffFn: () => void }>;
    height?: string;
}

Boot.registerModule(attachmentModule);

const MyEditor: React.FC<IMyEditor> = forwardRef(
    ({ html, setHtml, innerRef, height = '500px' }, ref) => {
        // fucking unused, silly feature of TS.
        if (ref) {
            console.log(ref);
        }

        // 图片列表比较
        const uploadedImgs = useRef<string[]>([]);
        const editorImgs = useRef<string[]>([]);
        // 上传文件比较
        const uploadedFiles = useRef<string[]>([]);
        const editorFiles = useRef<string[]>([]);

        // 上传图片
        const { mutation: uploadImgMutation } = useUploadImg();

        // 上传文件
        const { mutation: uploadFileMutation } = useUploadFile();

        // 删除文件s
        const { mutation: delFilesMutation } = useDelUploadFiles();

        // editor实例
        const [editor, setEditor] = useState<IDomEditor | null>(null);

        // 工具栏配置
        const toolbarConfig: Partial<IToolbarConfig> = {
            insertKeys: {
                index: 24,
                keys: ['uploadAttachment']
            },
            excludeKeys: ['group-video']
        };

        // 编辑器配置
        const editorConfig: Partial<IEditorConfig> = {
            placeholder: '请输入内容...',
            MENU_CONF: {},
            hoverbarKeys: {
                attachment: {
                    menuKeys: ['downloadAttachment']
                }
            }
        };

        editorConfig.MENU_CONF!['uploadImage'] = {
            fieldName: 'images',
            maxFileSize: 5 * 1024 * 1024,
            maxNumberOfFiles: 10,
            async customUpload(file: File, insertFn: InsertFnType) {
                uploadImgMutation.mutate(
                    { file: file },
                    {
                        onSuccess: (data: any) => {
                            insertFn(data.data['image_url'], '', '');
                            Message.info('上传图片成功');
                        },
                        onError: (error) => {
                            if (isRespInvalidParams(error)) {
                                Message.error(ErrorsToString((error as RespInvalidParams).errors));
                            } else if (isRespBadRqst(error)) {
                                Message.error((error as RespBadRqst).msg);
                            }
                        }
                    }
                );
            }
        };

        editorConfig.MENU_CONF!['uploadAttachment'] = {
            fieldName: 'files',
            maxFileSize: 10 * 1024 * 1024,
            customUpload(file: File, insertFn: Function) {
                uploadFileMutation.mutate(
                    { file: file },
                    {
                        onSuccess: (data: any) => {
                            insertFn(file.name, data.data['file_url']);
                            Message.info('上传文件成功');
                        },
                        onError: (error) => {
                            if (isRespInvalidParams(error)) {
                                Message.error(ErrorsToString((error as RespInvalidParams).errors));
                            } else if (isRespBadRqst(error)) {
                                Message.error((error as RespBadRqst).msg);
                            }
                        }
                    }
                );
            },
            onInsertedAttachment(elem: AttachmentElement | null) {
                if (elem === null) return;
                const { link } = elem;
                uploadedFiles.current = [...uploadedFiles.current, FileUrl2FileName(link)];
            }
        };

        editorConfig.MENU_CONF!['insertImage'] = {
            onInsertedImage(imageNode: ImageElement | null) {
                if (imageNode === null) return;
                const { src } = imageNode;
                uploadedImgs.current = [...uploadedImgs.current, FileUrl2FileName(src)];
            }
        };

        const diffImgFiles = () => {
            const editorImages = editor?.getElemsByType('image');
            editorImgs.current =
                editorImages?.map((v: any) => {
                    return FileUrl2FileName(v.src as string);
                }) || [];
            const differenceImg = uploadedImgs.current.filter((v) => {
                return !editorImgs.current?.includes(v);
            });

            const editorFileList = editor?.getElemsByType('attachment');
            editorFiles.current =
                editorFileList?.map((v: any) => {
                    return FileUrl2FileName(v.link as string);
                }) || [];

            const differenceFile = uploadedFiles.current.filter((v) => {
                return !editorFiles.current.includes(v);
            });

            const delFileSet = [...differenceImg, ...differenceFile];

            if (delFileSet.length > 0) {
                delFilesMutation.mutate(
                    { file_names: delFileSet },
                    {
                        onSettled: () => {
                            uploadedImgs.current = [];
                            uploadedFiles.current = [];
                        }
                    }
                );
            }
        };

        useImperativeHandle(innerRef, () => ({ diffFn: diffImgFiles }));

        useEffect(() => {
            return () => {
                if (editor === null) return;
                editor.destroy();
                setEditor(null);
            };
        }, [editor]);

        return (
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode='default'
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode='default'
                    style={{ height: height, overflowY: 'hidden' }}
                />
            </div>
        );
    }
);

export default MyEditor;
