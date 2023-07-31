import { Form, Layout, Menu } from '@arco-design/web-react';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body,  #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-bg-1)
    }
`;

export const Container = styled(Layout)`
    width: 100%;
    height: 100%;
`;

export const Navibar = styled(Layout.Header)`
    width: 100%;
    height: 60px;
    min-width: 1100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg-2);

    > div {
        display: flex;
        align-items: center;
        margin: 1rem 2rem;
    }
`;

export const MenuWrapper = styled.div``;
export const MenuTitle = styled(Menu.SubMenu)``;
export const MenuItem = styled(Menu.Item)``;
export const PrimaryItem = styled(Menu.Item)``;

export const MenuX = styled(Layout.Sider)`
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding-top: 60px;
    z-index: 99;
    border: 1px solid var(--color-border);

    ${MenuWrapper} {
        overflow: auto;
        height: 100%;
        overflow-y: hidden;

        ${MenuTitle} {
            font-weight: 500;

            .menu_icon {
                font-size: 18px;
                vertical-align: text-bottom;
            }

            ${MenuItem} {
                font-weight: 400;
            }
        }

        ${PrimaryItem} {
            font-weight: 500;
        }
    }
`;

export const ContentX = styled(Layout)`
    background-color: var(--color-fill-2);
    min-width: 1100px;
    min-height: 100vh;
    transition: padding-left 0.2s;
    box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
    padding: 16px 20px 0;
    .bread {
        margin-bottom: 16px;
    }
`;

export const LayoutContent = styled(Layout.Content)``;

export const FooterX = styled(Layout.Footer)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    text-align: center;
    color: var(--color-text-2);
`;

export const FilterForm = styled(Form)``;
export const FormWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid var(--color-border-1);
    margin-bottom: 20px;
    > ${FilterForm} {
        padding-right: 20px;
    }
`;

export const RightBtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20px;
    margin-bottom: 20px;
    border-left: 1px solid var(--color-border-2);
    box-sizing: border-box;
`;

export const BtnGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;
