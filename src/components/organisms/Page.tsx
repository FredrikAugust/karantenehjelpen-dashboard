import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// Make the brand link look like normal text
const useStyles = makeStyles(theme => ({
  brand: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const Page: React.FC = props => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/" className={classes.brand}>
            <Typography variant="h6">Karantenehjelpen</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>{props.children}</Container>
    </>
  );
};

export default Page;
