import styled from 'styled-components';

import {
  Button, Layout, Menu, Input,
} from 'antd/es';


const { Content, Footer, Sider } = Layout;

export const CustomContent = styled(Content)`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  
  margin: 24px 16px 0 !important;
  padding: 24;
  background: #fff; 
  text-align: center;
  min-height: 80vh;
`;

export const CustomFooter = styled(Footer)`
 text-align: center; 
`;

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

// Pet Card
export const PetList = styled.div`
  max-width: 900px !important;
  display: grid !important;
  grid-gap: 1rem !important;

  @media (min-width: 200px) {
    grid-template-columns: repeat(1, 1fr) !important;
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(2, 1fr)!important;
  }

`;

export const Card = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 9px;
  margin-bottom: 20px;
  background-color: #fff;
  transition: all 0.3s;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  margin: 16px 16px;
  width: 400px;
  height: 180px;
  padding: 16px 0;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 32px;
`;

export const CardImage = styled.img`
  height: 60px;
  border-radius: 30px;
  border: 3px solid rgba(0, 0, 0, 0.2);
`;

export const CardMiddle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const PetName = styled.h3`
  font-weight: 700;
  color: #303030;
  margin-bottom: 16px;
  color: rgb(206, 63, 113);
  font-weight: bold;
`;

export const CardBottom = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  margin-top: 16px;
`;

export const PetPrice = styled.h3`
 color: #989898;
  margin-bottom: 16px;
`;
export const PetSubitem = styled.h4`
display: flex;
  justify-content: center;
  margin: 8px 0;
`;
