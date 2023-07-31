import React from 'react';
import { Breadcrumb, Layout, Space, Typography } from '@arco-design/web-react';
import { ContentWrapper, ContentX, FooterX } from '@/style/layout_style';
import { IconCopyright } from '@arco-design/web-react/icon';

interface props {
    bread: string[];
    page: React.ReactElement | null;
}

const MyContent: React.FC<props> = ({ bread, page }) => {
    const breadItems = bread.map((v) => <Breadcrumb.Item key={v}>{v}</Breadcrumb.Item>);

    return (
        <ContentX style={{ paddingTop: 60, paddingLeft: 220 }}>
            <ContentWrapper>
                <div className='bread'>
                    <Breadcrumb>{breadItems}</Breadcrumb>
                </div>
                <Layout.Content>{page}</Layout.Content>
                <FooterX>
                    <Space>
                        <Typography.Text style={{ color: 'var(--color-text-2)' }}>
                            Shanghai International Wine Exchange
                        </Typography.Text>
                        <div>
                            <IconCopyright />
                            2023
                        </div>
                    </Space>
                </FooterX>
            </ContentWrapper>
        </ContentX>
    );
};

export default MyContent;
