import React from "react";
import { Route, Redirect } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateLogin = ({authenticated, component: RouteComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        authenticated ? (<Redirect to={"/admin"} />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};
export default PrivateLogin;
