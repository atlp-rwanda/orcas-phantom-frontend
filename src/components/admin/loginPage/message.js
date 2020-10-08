import React, { Component } from 'react';
import propTypes from 'prop-types';

export class message extends Component {
  render(){
    var getStyle = () => {
      if (this.props.status === 'accepted1') {
        return {
          background: 'green',
          display: 'block'
        }}
      else if(this.props.status === 'error'){
        return {
          background: 'red',
          display: 'block'  
        } 
      }
      else if(this.props.status === 'unauthorised'){
        return {
          background: 'red',
          display: 'block'
        }}
      else if(this.props.status === ''||this.props.status === 'submitted'){
        return {
          background: 'red',
          display: 'none'
        }
      }}
    return(
      <div id='message' name='message' style={getStyle()}>{this.props.message}</div>
    );
  }
}
message.propTypes={
  status:propTypes.string.isRequired,
  message:propTypes.string.isRequired
}
export default message;
