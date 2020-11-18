import React, { useContext } from 'react';
import { Link as NavLink } from 'react-router-dom';
import backButton from 'App/assets/images/back-button-navbar.svg';
import { AppContext } from 'context/AppProvider';

const SideMenu = () => {
  const { state, setState } = useContext(AppContext);

  const toggle = () => {
    setState({
      ...state,
      isNavToggled: !state.isNavToggled,
    });
  }

  return (
    <div  className={`navbarLanding ${state.isNavToggled ? "" : "navbarLandingShow"}`}>
      {/*Display a navigation bar*/}
      <ul data-testid="navbar"  className="navbar">
        <img onClick={toggle} className="back-btn" src={backButton} />
        <div>
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
        </div>
      </ul>

    </div>
  );
}
export default SideMenu;
