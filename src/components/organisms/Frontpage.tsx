/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Typography, CircularProgress, makeStyles } from '@material-ui/core';
import RequestCard from './../atoms/RequestCard';

import { useSelector, useDispatch } from 'react-redux';

import requestSlice from '../../reducers/requests';

const useStyles = makeStyles(theme => ({
  cards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${theme.spacing(0.1)}rem`,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const { loaded, requests } = useSelector(
    (store: import('../..').Store) => store.requests
  );
  const dispatch = useDispatch();

  // If we havent loaded the requests from before, load them on component mount
  React.useEffect(() => {
    if (!loaded) {
      dispatch(requestSlice.actions.fetchAllRequests());
    }
  }, [loaded]);

  // It isn't pretty, but it gets the job done
  if (!loaded) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h1">Statistikk</Typography>
      <Typography>
        {requests.filter(r => r.delivered).length} fullførte oppdrag
      </Typography>
      <Typography>
        {requests.filter(r => !r.delivered && r.connectedUser !== null).length}{' '}
        pågående oppdrag
      </Typography>
      <div className={classes.cards}>
        {requests
          .filter(r => !r.delivered)
          .map(r => (
            <RequestCard key={r.id} request={r} />
          ))}
      </div>
    </>
  );
};

export default App;
