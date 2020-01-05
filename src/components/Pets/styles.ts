import styled from 'styled-components';

import {
  Button, Layout, Menu, Input,
} from 'antd/es';


const { Content, Footer, Sider } = Layout;

export const CustomContent = styled(Content)`
  margin: 24px 16px 0 !important;
  padding: 24;
  background: #fff; 
  text-align: center;
  min-height: 80vh;
`;

export const CustomFooter = styled(Footer)``;

export const CustomSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  background: rgb(206, 63, 113) !important;

`;

export const CustomButton = styled(Button)`
  width: 350px !important;
  margin: 8px 0 !important;
  height: 56px !important;
  font-size: 16px !important;
`;

export const CustomMenu = styled(Menu)`
  background: rgb(206, 63, 113) !important;
`;

export const MenuItem = styled(Menu.Item)``;

export const CustomInput = styled(Input)``;

export const Loading = styled.img<{loading: string}>`
  height: 100px;
  border-radius: 50px;
  margin: 16px 0;

  animation: rotating 2s linear ${(p) => p.loading};
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
