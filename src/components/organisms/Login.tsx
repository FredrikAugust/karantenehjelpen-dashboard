import React from 'react';

import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

import firebase from 'firebase/app';
import 'firebase/auth';
import { Typography } from '@material-ui/core';

const Login: React.FC = () => {
  // Configure FirebaseUI
  const uiConfig: firebaseui.auth.Config = {
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        return false;
      },
    },
    credentialHelper: 'none',
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <>
      <Typography variant="h2">Sign in</Typography>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
};

export default Login;
