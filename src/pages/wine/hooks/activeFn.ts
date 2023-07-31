import { ActiveWineApi } from '@/api/wine.api';
import { RespBadRqst, RespInvalidParams } from '@/models/resp';
import { isRespBadRqst, isRespInvalidParams } from '@/models/typeof';
import { ErrorsToString } from '@/utils/common';
import { Message } from '@arco-design/web-react';
import { useMutation } from '@tanstack/react-query';

export const useWineActive = () => {
    const mutation = useMutation({
        mutationFn: ActiveWineApi,
        onError: (error) => {
            if (isRespInvalidParams(error)) {
                Message.error(ErrorsToString((error as RespInvalidParams).errors));
            } else if (isRespBadRqst(error)) {
                Message.error((error as RespBadRqst).msg);
            }
        }
    });

    return { mutation };
};
