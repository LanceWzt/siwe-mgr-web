import { Spin } from '@arco-design/web-react';
import React, { ReactElement } from 'react';

interface IProps {
    children?: ReactElement;
    isLoading?: boolean;
}

const Loading: React.FC<IProps> = ({ children, isLoading = true }) => {
    return children ? (
        <Spin loading={isLoading} dot block tip='加载中...'>
            {children}
        </Spin>
    ) : (
        <Spin loading={isLoading} dot block tip='加载中...' />
    );
};

export default Loading;
