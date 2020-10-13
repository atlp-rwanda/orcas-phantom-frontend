import React, { useContext } from 'react';
import { Link as NavLink } from 'react-router-dom';
import backButton from 'App/assets/images/back-button.svg';
import { AppContext } from 'context/AppProvider';

const SideMenu = () => {
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
      <ul data-testid="navbar" style={{display: state.isNavToggled ? "flex" : "none"}} className="navbar">
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
