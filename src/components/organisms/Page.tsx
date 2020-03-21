import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Make the brand link look like normal text
const useStyles = makeStyles(theme => ({
  brand: {
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
    textDecoration: 'none',
  },
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const Page: React.FC = props => {
  const user = useSelector((store: import('../..').Store) => store.auth.user);

  const classes = useStyles();

  const onSignOut: React.MouseEventHandler = () => firebase.auth().signOut();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/" className={classes.brand}>
            <Typography variant="h6">Karantenehjelpen</Typography>
          </Link>
          {user && (
            <Button variant="contained" color="primary" onClick={onSignOut}>
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>{props.children}</Container>
    </>
  );
};

export default Page;
