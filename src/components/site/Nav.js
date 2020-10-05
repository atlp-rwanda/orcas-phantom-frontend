import React from 'react'
import { NavLink} from 'react-router-dom';
import Styled from '@emotion/styled';


const Navbar=Styled.div`
padding: 15px 10px 10px 10px;
background-color: rgb(12, 104, 243);
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 0%;
`;
const Ul =Styled.ul`
    display: flex;
    margin-left: 700px;
    margin-right: 100px;
`;
const Li =Styled.li`
    padding-left: 8px;
    list-style: none;
    margin-left: 10px;
`;
const Span=Styled.span`
    color: #fff;
    font-size: 17px;
    text-decoration: none;
    font-family:'Ubuntu', sans-serif;
`;
const Logo=Styled.span`
  color: #fff;
  text-decoration: none !important;
  font-family:'Ubuntu', sans-serif;
  `;


const Nav = () => {
  return (
    <div>
      <Navbar>
        <h2><NavLink to="/"><Logo>Phantom Ride</Logo></NavLink></h2>
        <Ul>
          <Li>
            <NavLink to="/Contact"><Span>Contact Us</Span></NavLink>
          </Li>
          <Li>
            <NavLink to="/aboutPage"><Span>About Us</Span></NavLink>
          </Li>
          <Li>
            <NavLink to="/faqs"><Span>FAQs</Span></NavLink>
          </Li>
        </Ul>
      </Navbar>
    </div>
  );
};

export default Nav;
