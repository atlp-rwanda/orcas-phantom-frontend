import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import contactPage from '../pages/contactPage/contact';
import aboutPage from '../pages/aboutPage/aboutPage';
import Faqs from '../pages/FAQpage/FAQPage';
import ErrorPage from '../shared/components/ErrorPage/';
import history from '../browserHistory';
import AdminPage from 'Dashboard/';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={LandingPage} />
      <Route path="/contact" component={contactPage} />
      <Route path="/about" component={aboutPage} />
      <Route path="/faqs" component={Faqs} />
      <Route path="/admin" component={AdminPage} />
      <Route component={ErrorPage} />
    </Switch>
  </Router>
);

export default Routes;
