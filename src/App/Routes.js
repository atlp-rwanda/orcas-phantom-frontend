import React, { useContext } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import contactPage from "../pages/contactPage/contact";
import aboutPage from "../pages/aboutPage/aboutPage";
import Faqs from "../pages/FAQpage/FAQPage";
import ErrorPage from "../shared/components/ErrorPage/";
import PrivateRoute from "./PrivateRoute";
import PrivateLogin from "./PrivateLogin";
import history from "../browserHistory";
import AdminPage from "Dashboard/";
import AdminLogin from "../pages/admin/loginPage/AdminLogin";
import { AppContext } from "../context/AppProvider";

const Routes = () => {
  const { state } = useContext(AppContext);
  const props = { path: "/admin", component: AdminPage };
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={LandingPage} />
        <Route path="/contact" component={contactPage} />
        <Route path="/about" component={aboutPage} />
        <Route path="/faqs" component={Faqs} />
        <PrivateLogin
          exact
          path="/AdminLogin"
          component={AdminLogin}
          authenticated={state.currentUser ? true : false}
        />
        <PrivateRoute
          authenticated={state.currentUser ? true : false}
          ownProps={props}
        />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
