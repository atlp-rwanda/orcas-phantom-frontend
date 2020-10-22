import Styled from 'styled-components';
export const MobileFooter = Styled.li`
  display: none;
  @media (max-width: 957px) {
      bottom: 1em;
      position: absolute;
      z-index:999999;
      color: #ffffff;
      width: 100%;
      display:flex;
      flex-direction:column;
      left:-10px;
  }
`;
export const Fspan = Styled.span`
margin-right: 10px;
`;

export const FooterIcons = Styled.div`
display:table;
margin:0 auto;
`;
export const Text=Styled.div`
display:table;
margin:0 auto;
`;
