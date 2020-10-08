import React from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Contact from '../site/contactPage/contact';
import aboutPage from '../site/aboutPage/aboutPage';
import faqs from '../site/FAQpage/FAQPage';
import backButton from '../../assets/images/back-button.svg';
import { Consumer } from '../App';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          {/*Display a navigation bar*/}
          <Consumer>
            {
              ({store, actions}) => (
                <ul data-testid="navbar" style={{display: store.isNavToggled ? "flex" : "none"}} className="navbar">
                  <img onClick={() => actions.toggleNav()} className="back-btn" src={backButton} />
                  <div>
                    <li>
                      <NavLink className="text-center text-light" to='/'>Home</NavLink>
                    </li>
                    <li>
                      <NavLink className="text-center text-light" to="/Contact">Contact Us</NavLink>
                    </li>
                    <li>
                      <NavLink className="text-center text-light" to="/aboutPage">About Us</NavLink>
                    </li>
                    <li>
                      <NavLink className="text-center text-light" to="/faqs">FAQs</NavLink>
                    </li>
                  </div>
                </ul>
              )}
          </Consumer>

          <div>
            <Route path='/' exact component={ LandingPage } />
            <Route path="/Contact" component={Contact} />
            <Route path="/aboutPage" component={aboutPage} />
            <Route path="/faqs" component={faqs} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Nav;
