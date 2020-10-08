import React from "react";
import { NavLink} from "react-router-dom";
import './NavCss.css';


const NavAdmin = () => {
  return (
    <div>
      <div className="navbar1">
        <ul>
          <li>
            <div id='logo'>
              <NavLink to="/">Phantom Ride</NavLink>
            </div>
              
          </li>
          <li>
            <div id='about'>
              <NavLink to="/aboutPage">About Us</NavLink>
            </div>
              
          </li>
          <li>
            <div id='admin'>
              <NavLink to="/AdminLogin">Admin Login</NavLink>
            </div>
              
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavAdmin;
