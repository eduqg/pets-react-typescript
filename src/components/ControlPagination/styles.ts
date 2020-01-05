import styled from 'styled-components';
import { lighten } from 'polished';

export const ControlPages = styled.div<{grayStart: string, grayEnd: string}>`
  display: flex;
  flex-direction: row;
  height: 30px;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 32px;

  button {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    border-radius: 3px;
    color: #fff;
    height: 32px;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 16px;
    cursor: pointer;
    border: 0;
  }

  button.start {
    background: ${(props) => props.grayStart};
  }

  button.end {
    background: ${(props) => props.grayEnd};
  }

  p {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: #fff;
    border-radius: 3px;
    color: ${lighten(0.2, '#333')};
    height: 32px;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 10px;
    margin: 0 1px;
    width: 100px;
    justify-content: center;
  }
`;
