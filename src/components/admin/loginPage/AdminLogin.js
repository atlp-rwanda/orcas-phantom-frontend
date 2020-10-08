import React, { Component } from 'react';
import Message from './message';
import propTypes from 'prop-types';
import firebase from '../../../utilities/firebaseFile';
import validatePassword from '../../../utilities/validate-input';
import NavAdmin from '../NavAdmin';
import './css/AdminLogin.css';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      status: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange (e){ return this.setState({ [e.target.name]: e.target.value});}
  onSubmit (e){
    e.preventDefault();
    let authed = this;
    if (validatePassword(this.state.password)) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function () {
        authed.setState({ status: 'accepted1', message: 'authenticated👌' });
        setTimeout(function () {authed.setState({ status: 'accepted', message: '', email: '', password: '' }); authed.props.history.push('/AdminPage');}, 3000); })
        .catch(() => { authed.setState({ status: 'unauthorised', message: 'unauthorized👎' }); setTimeout(function () {authed.setState({ status: '', message: '', email: '', password: '' });
        }.bind(authed), 3000); });
      this.setState({ email: '', password: '', status: 'submitted' });
    } else {
      this.setState({ status: 'error', message: 'password must be atleast 6 characters' });
      setTimeout(function () {this.setState({ status: '', message: '', password: '', email: '' });
      }.bind(this), 3000);
    }
  }
  render() {
    return (
      <>
    
        <div>
          <NavAdmin />
      
          <div className='loginForm'>
       
            <div id='h1'><h1>Login Form</h1></div><br />
            <Message status={this.state.status} message={this.state.message} />
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }} className='form'>
              <input value={this.state.email} onChange={this.onChange} name='email' id='email' className='input' type="email" placeholder="Enter your Email" required /><br />
              <input value={this.state.password} onChange={this.onChange} name='password' id='password' className='input' type="password" placeholder="Enter Your Password" required /> <br />
              <input type='submit' value='Login' id="login" className="button" /><br />
              <div id='checkbox'><input type='checkbox' /><span> Remember me on this device</span></div>
            </form>
          </div>
        </div>
      </>
      
    );
  } 
}
AdminLogin.propTypes = {
  history: propTypes.object.isRequired,
  email: propTypes.string,
  password:propTypes.string,
}
export default AdminLogin;
