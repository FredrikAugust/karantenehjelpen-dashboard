import React from 'react';

import { Typography, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { sagaActions } from './../../reducers/requests';

const App: React.FC = () => {
  const { loaded, requests } = useSelector(
    (store: import('../..').Store) => store.requests
  );
  const dispatch = useDispatch();

  // If we havent loaded the requests from before, load them on component mount
  React.useEffect(() => {
    if (!loaded) {
      dispatch(sagaActions.fetchAllRequests());
    }
  }, []);

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
    </>
  );
};

export default App;
