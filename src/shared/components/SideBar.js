import React, { useContext } from 'react';
import { Link as NavLink } from 'react-router-dom';
import backButton from 'App/assets/images/close.png';
import buslogo from 'App/assets/images/logo1.png'; 
import { AppContext } from 'context/AppProvider';
import facebook from 'App/assets/images/facebook.svg';
import instagram from 'App/assets/images/instagram.svg';
import twitter from 'App/assets/images/twitter.svg';
import {MobileFooter,Fspan,FooterIcons,Text} from '../../shared/styles/SidebarStyle';



const SideBar = () => {
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
          <div id="lis">
            <li>
              <NavLink className="text-center text-light" to='/'>Home</NavLink>
            </li>
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
              <NavLink className="text-center text-light" to="/AdminLogin">Login</NavLink>
            </li>
          </div>
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
export default SideBar;
