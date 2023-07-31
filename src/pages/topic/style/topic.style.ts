import styled from 'styled-components';

export const TopicFromWrapper = styled.div`
    overflow: hidden;

    .arco-card {
        margin-bottom: 16px;

        .arco-card-body {
            padding: 20px 20px 10px;

            .arco-typography {
                margin-top: 0;
                margin-bottom: 16px;
            }
        }

        .arco-col {
            padding: 0 40px 0 40px;
        }
    }
`;

export const FooterWrapper = styled.div`
    padding: 12px 40px;
    background-color: var(--color-bg-2);
    display: flex;
    flex-direction: row-reverse;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -3px 12px rgba(0, 0, 0, 0.1);
`;
