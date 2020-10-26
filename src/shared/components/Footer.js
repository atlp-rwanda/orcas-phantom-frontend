import React from 'react';
import facebook from 'App/assets/images/facebook.svg';
import instagram from 'App/assets/images/instagram.svg';
import twitter from 'App/assets/images/twitter.svg';
import Styled from '@emotion/styled';

const FooterWrapper = Styled.footer`
  z-index: 99999;
  
  width: 100vw;
  bottom: 0px;
  padding: 1em 0px;
  background: #071B4A;
  color: white;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1em;
  position: fixed;
  height: 7%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const FooterIcons = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5em;
`;

const Footer = () => (
  <FooterWrapper>
    <div>&copy; Orcas-Phantom 2020</div>
    <FooterIcons>
      <img src={facebook} />
      <img src={instagram} />
      <img src={twitter} />
    </FooterIcons>
  </FooterWrapper>
);

export default Footer;
