import React from 'react';
import Styled from '@emotion/styled';

const Foooter = Styled.footer`
display: flex;
    justify-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgb(46, 125, 245);
    color: white;
    text-align: center;
    padding: 8px;
    font-family:'Ubuntu', sans-serif;
`;
const A=Styled.a`
text-decoration: none !important;
    color: white;
    font-family:'Ubuntu', sans-serif;
`;

const Footer = ()=>{
  return(
    <div>
      <Foooter>
        <p>&copy; <span>Phantom Ltd</span></p>
        <A href="#" >Facebook</A>
        <A href="#" >Twitter</A>
        <A href="#" >Gmail</A>
        <A href="#" >Instagram</A>
      </Foooter>
            
    </div>
  )
}

export default Footer;