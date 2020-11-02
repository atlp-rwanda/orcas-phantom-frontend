import React from "react";
import { Link as NavLink } from "react-router-dom";
import backButton from "App/assets/images/back-button-navbar.svg";
import facebook from "App/assets/images/facebook.svg";
import instagram from "App/assets/images/instagram.svg";
import twitter from "App/assets/images/twitter.svg";
import Logo from "App/assets/images/logo.svg";
import closeIcon from "App/assets/images/close-icon.svg";
import PropTypes from "prop-types";
import { MobileFooter, FooterIcons } from "shared/styles/homepageStyles";

const SideMenu = (props) => {
  const toggle = () => {
    props.setState({
      ...props.data,
      isNavToggled: !props.data.isNavToggled,
    });
  };

  return (
    <div>
      <ul
        data-testid="navbar"
        style={{ display: props.data.isNavToggled ? "flex" : "none" }}
        className="navbar"
      >
        {props.data.isNavToggled ? (
          <img
            onClick={toggle}
            data-testid="navbar-hide-icon"
            className="back-btn"
            src={backButton}
          />
        ) : null}

        <img src={closeIcon} className="close-btn" onClick={toggle} />

        <img src={Logo} className="logo" />
        <div>
          <li>
            <NavLink className="text-center text-light" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/contact">
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/about">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/faqs">
              FAQs
            </NavLink>
          </li>
          <li>
            <NavLink className="text-center text-light" to="/AdminLogin">Admin Login</NavLink>
          </li>
          <MobileFooter>
            <FooterIcons>
              <img src={facebook} />
              <img src={instagram} />
              <img src={twitter} />
            </FooterIcons>
            <div>&copy; Orcas-Phantom 2020</div>
          </MobileFooter>
        </div>
      </ul>
    </div>
  );
};

SideMenu.propTypes = {
  data: PropTypes.object,
  setState: PropTypes.func,
};

export default SideMenu;
