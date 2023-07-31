import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { Notification } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

interface IAjaxSucc {
    content?: string;
    closeNav?: string;
}

export const useAjaxSuccess = ({ content = '成功', closeNav }: IAjaxSucc) => {
    const navigate = useNavigate();

    return () => {
        Notification.success({
            title: '成功',
            content: content,
            duration: 1000,
            onClose: closeNav
                ? () => {
                      navigate(closeNav);
                  }
                : () => {
                      return;
                  }
        });
    };
};

interface IAjaxError {
    failTitle?: string;
    onErrorClose?: () => void;
}

export const useAjaxError = ({ failTitle = '操作失败', onErrorClose }: IAjaxError) => {
    return (error: unknown) => {
        if (isRespInvalidParams(error)) {
            Notification.error({
                title: '参数错误',
                content: ErrorsToString((error as RespInvalidParams).errors),
                duration: 2000,
                onClose: onErrorClose
                    ? () => {
                          onErrorClose();
                      }
                    : () => {
                          return;
                      }
            });
            return;
        }

        if (isRespBadRqst(error)) {
            Notification.error({
                title: failTitle,
                content: (error as RespBadRqst).msg,
                onClose: onErrorClose
                    ? () => {
                          onErrorClose();
                      }
                    : () => {
                          return;
                      }
            });
            return;
        }
    };
};
