import React, { Component } from 'react';
import { NavLink} from "react-router-dom";
import auth from '../../utilities/firebaseFile';
import './NavCss.css';


class NavAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedin: false};
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillMount(){
    let _this = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {
      //if logged in...
        _this.setState({loggedin: true});
      } else {
      //if not logged in...
        _this.setState({loggedin: false});
      }
    });
  }
  render(){
    let nav;
    if(this.state.loggedin){
      nav=<NavLink to="/AdminLogin" onClick={()=>auth.signOut()}>
      Admin Logout 
      </NavLink>;
    }else{
      nav=<NavLink to="/AdminLogin" >
      Admin Login
      </NavLink>;
    }
    return (
      <div >
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
              <div id='admin' >
                {nav}
              </div>
        
            </li>
          </ul>
        </div>
      </div>
    );
  }}

export default NavAdmin;
