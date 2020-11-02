import React, {  useContext} from 'react';
import { NavLink,Router} from "react-router-dom";
import buslogo from 'App/assets/images/logo1.png'; 

import SideBar from './SideBar';
import history from '../../browserHistory';
import { AppContext } from 'context/AppProvider';
import menuIcon from 'App/assets/images/menu-Icon.png';
import './NavCss.css';
import Styled from '@emotion/styled';


const SideMenu=Styled.div`
position:fixed;
width:70%;
height:100%;
color: white;
top:0;
left:0;
background-color: #071B4A;
z-index:999999;
`;
const Nav=()=>{
  const { state, setState } = useContext(AppContext);
  
  const logout=()=>{
    localStorage.removeItem("user");
    setState({...state,currentUser:null});
  }
  
  return (
    <div >
      <Router history={history}>
        <div className="navbar1" id='navbar1'>
      
          <ul>
            <li>
              <div id='logo1'>
                <NavLink to="/"><img src={buslogo} /></NavLink>
              </div>
            </li>
            <li>
              <div id='home'>
                <NavLink to="/">Home</NavLink>
              </div>
            </li>
            <li>
              <div id='aboutPage'>
                <NavLink to="/about">About</NavLink>
              </div>
            </li>
            <li>
              <div id='contact'>
                <NavLink to="/contact">Contacts</NavLink>
              </div>
            </li>
            <li>
              <div id='faqs'>
                <NavLink to="/faqs">FAQs</NavLink>
              </div>
            </li>
            <li>
              <div id='login' >
                {state.currentUser?<NavLink to="/AdminLogin" onClick={logout}>
                  Logout
                </NavLink>:<NavLink to="/AdminLogin">
                  Login
                </NavLink>}
              </div>
            </li>
          </ul>
        </div>
        <div id='mobileView'>
          <ul>
            <li>
              <div id='mobileMenu'>{
                state.isNavToggled ?  <SideMenu><SideBar /></SideMenu>

                  :

                  <div
                    data-testid="menu-icon"
                    onClick={() => setState({
                      ...state,
                      isNavToggled: !state.isNavToggled
                    })}
                    className="menu-icon1">
                    <img src={menuIcon} />
                  </div>
              }
              </div>
            </li>
            <li>
              <div id='MobileHome'>
                <NavLink to="/">PHANTOM</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </Router>
    </div>
  );
}

export default Nav;
