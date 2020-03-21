import React from 'react';

import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import App from './App';
import NotFound from './NotFound';
import Page from './Page';
import Login from './Login';
import { CircularProgress } from '@material-ui/core';

const Router: React.FC = () => {
  // Redux hooks
  const { user, loaded } = useSelector(
    (store: import('../..').Store) => store.auth
  );

  // Router hooks
  const location = useLocation();

  // Show loading indicator while waiting for google to give us auth status
  if (!loaded) {
    return <CircularProgress />;
  }

  // If user is not signed in and tries to access anything except for login
  if (!user && location.pathname !== '/login') {
    return <Redirect to="/login" />;
  }

  // If user is logged in and trying to access login
  if (user && location.pathname === '/login') {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Page>
  );
};

export default Router;
