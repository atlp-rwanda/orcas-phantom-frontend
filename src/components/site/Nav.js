import React from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
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
                  </div>
                </ul>
              )}
          </Consumer>

          <div>
            <Route path='/' exact component={ LandingPage } />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Nav;
