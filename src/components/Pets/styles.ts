import styled from 'styled-components';

import {
  Button, Layout, Menu, Input,
} from 'antd/es';


const {
  Content, Footer, Sider, Header,
} = Layout;

export const CustomContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  margin: 24px 16px 0 !important;
  padding: 24;
  background: #fff; 
  text-align: center;
  min-height: 80vh;
`;

export const CustomFooter = styled(Footer)``;

export const SiderImage = styled.img`
  height: 80px;
  border-radius: 40px;
  align-self: center;
  margin-left: 54px;
  margin-top: 32px;
`;

export const CustomSider = styled(Sider)`
  background: rgb(206, 63, 113) !important;
`;

export const ButtonsTop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const CustomButton = styled(Button)`
  width: 350px !important;
  margin: 8px 0 !important;
  height: 56px !important;
  font-size: 16px !important;
`;

export const CustomMenu = styled(Menu)`
  background: rgb(206, 63, 113) !important;
  width: 250px !important;

`;

export const MenuItem = styled(Menu.Item)``;

export const CustomInput = styled(Input)``;

export const Loading = styled.img<{loading: string}>`
  height: 50px;
  border-radius: 25px;
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

export const PetCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  
  width: 800px;

  min-height: 10px;
  padding: 16px;
  border: 1px solid rgb(206, 63, 113, 0.4);
  margin: 8px 8px;
`;

export const PetItem = styled.h3`
  font-size: 10px;

`;
