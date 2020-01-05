import styled, { StyledFunction } from 'styled-components';

interface YourProps {
  invalid: boolean,
  active: boolean
}

// const Input = styled.input<{invalid: boolean}>`
//   border: ${(p) => (p.invalid ? 'red' : 'blue')}
// `;

/* const MyComp = styled.div`
  display: ${(p: YourProps) => (p.active ? 'block' : 'none')}
`; */

// export const Header = styled.div``;

// export const Content = styled.div`
// `;
// export const Footer = styled.div``;

// export const Sider = styled.div`
//   overflow: auto,
//   height: '100%',
//   width: '10%',
//   position: fixed,
//   left: 0,
// `;
