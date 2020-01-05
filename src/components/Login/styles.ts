import styled from 'styled-components';

import {
  Button, Layout, Input,
} from 'antd/es';


const { Content, Footer } = Layout;

export const CustomContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomFooter = styled(Footer)`
  text-align: center;
  background: rgb(206, 63, 113); 
  color: #fff;
`;

export const ContentCenter = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;

  background: #fff;
  text-align: center;
  min-height: 80vh !important;
  min-width: 500px !important;
`;

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

export const CustomLayout = styled(Layout)`

`;
export const CustomButton = styled(Button)`
  width: 350px !important;
  margin: 8px 0 !important;
  height: 56px !important;
  font-size: 16px !important;
`;
export const CustomInput = styled(Input)`
  margin: 8px 0 !important;
  width: 350px !important;
  height: 56px !important;
  font-size: 16px !important;
`;
