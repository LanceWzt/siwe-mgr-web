import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

interface IAjaxSuccessMsg {
    content?: string;
    closeNav?: string;
}

export const useAjaxSuccessMsg = ({ content = '成功', closeNav }: IAjaxSuccessMsg) => {
    const navigate = useNavigate();

    return () => {
        Message.success({
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

interface IAjaxErrorMsg {
    onErrorClose?: () => void;
}

export const useAjaxErrorMsg = ({ onErrorClose }: IAjaxErrorMsg) => {
    return (error: unknown) => {
        if (isRespInvalidParams(error)) {
            Message.error({
                content: ErrorsToString((error as RespInvalidParams).errors),
                duration: 1000,
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
            Message.error({
                duration: 1000,
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
