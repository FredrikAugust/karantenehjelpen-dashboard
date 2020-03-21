import React from 'react';

import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';

import App from './App';
import NotFound from './NotFound';
import Page from './Page';
import Login from './Login';

import auth from '../../reducers/auth';

const Router: React.FC = () => {
  // Redux hooks
  const dispatch = useDispatch();

  // Router hooks
  const history = useHistory();
  const location = useLocation();

  // Store the unregister function so we can clean up on unmount
  const [unregisterAuthObserver, setUnregisterAuthObserver] = React.useState<
    firebase.Unsubscribe
  >();

  React.useEffect(() => {
    // We need to pass an update function, as if not, react will try to call the
    // function immediately to set the value to the return type of that again,
    // leading to an update during render (this makes React very angry).
    setUnregisterAuthObserver(() =>
      firebase.auth().onAuthStateChanged(user => {
        dispatch(auth.actions.setUser(user));

        // If the user is not logged in and not on the login page, redirect to login
        // We need to perform this inside the authStateChanged to avoid a race
        // condition, where we redirect to /login before google gets to update
        // our state, meaning that even if a user is set after the redirect,
        // we're stuck on /login.
        if (!user && location.pathname !== '/login') {
          history.push('/login');
        }
      })
    );

    return () => {
      // We force unwrap as it can't unmount before it mounts.
      if (unregisterAuthObserver) {
        unregisterAuthObserver();
      }
    };
  }, []);

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
