import React, { Component } from 'react';
import NavAdmin from '../NavAdmin';
import propTypes from 'prop-types';
import auth from '../../../utilities/firebaseFile';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedin: false};
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillMount(){
    let _this = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {_this.setState({loggedin: true});
      } else { _this.setState({loggedin: false});
        _this.props.history.push('/AdminLogin')
      }
    });
  }
  render(){
    return (
      <div>
        <NavAdmin />
        <h1>Hi <span role='img' aria-label="👋">👋</span> Admin</h1>
      </div>
    
    );
  }}
AdminPage.propTypes = {
  history: propTypes.object.isRequired
}
export default AdminPage;
