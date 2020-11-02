import React, { useContext } from 'react';
import { Link as NavLink } from 'react-router-dom';
import backButton from 'pages/admin/Assets/close.png';
import buslogo from './Assets/logo1.png'; 
import { AppContext } from 'context/AppProvider';
import Styled from '@emotion/styled';
import facebook from 'App/assets/images/facebook.svg';
import instagram from 'App/assets/images/instagram.svg';
import twitter from 'App/assets/images/twitter.svg';

const MobileFooter = Styled.li`
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
const Fspan = Styled.span`
margin-right: 10px;
`;

const FooterIcons = Styled.div`
display:table;
margin:0 auto;
`;
const Text=Styled.div`
display:table;
margin:0 auto;
`;
const FirstLi=Styled.div`
margin-top:20vh;
`;


const AdminSideMenu = () => {
  const { state, setState } = useContext(AppContext);

  const toggle = () => {
    setState({
      ...state,
      isNavToggled: !state.isNavToggled
    });
  }

  return (
    <div>
      
      {/*Display a navigation bar*/}
      <ul data-testid="navbar" style={{display: state.isNavToggled ? "flex" : "none"}} className="navbar2">
       
       
        <div id='ul'>
          <div id='up'>
            <img className="buslogo" src={buslogo} /><img onClick={toggle} className="back-btn1" src={backButton} />
          </div>
          <FirstLi>
            <li>
              <NavLink className="text-center text-light" to='/'>Home</NavLink>
            </li>
          </FirstLi>
          
          <li>
            <NavLink className="text-center text-light" to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/faqs">FAQs</NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/AdminLogin">Admin login</NavLink>
          </li>
          <MobileFooter>
            <FooterIcons>
              <Fspan><img src={facebook} /></Fspan>
              <Fspan><img src={instagram} /></Fspan>
              <Fspan><img src={twitter} /></Fspan>
            </FooterIcons>
            <Text>&copy; Orcas-Phantom 2020</Text>
          </MobileFooter>
        </div>
      </ul>
     

    </div>
  );
}
export default AdminSideMenu;
