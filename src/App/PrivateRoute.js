import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from 'prop-types';


const PrivateRoute = ({ authenticated, ownProps }) => {

  const { component: Component, ...rest } = ownProps;
  return (
    <Route
      {...rest}
      render={()=>
        authenticated ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/AdminLogin' }} />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  authenticated: propTypes.bool.isRequired,
  ownProps:propTypes.object.isRequired
}

export default PrivateRoute