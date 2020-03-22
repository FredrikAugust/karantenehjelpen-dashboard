import React from 'react';

import {
  Card,
  CardHeader,
  Typography,
  ListItem,
  List,
  ListItemText,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  makeStyles,
  Button,
} from '@material-ui/core';
import requests, { connectedUsers } from '../../reducers/requests';
import { useSelector, useDispatch } from 'react-redux';

type RequestProps = {
  request: import('../../declarations/Request').Request;
};

const useStyles = makeStyles(theme => ({
  card: {
    height: 'min-content',
  },
  connectedUser: {
    marginTop: theme.spacing(2),
    minWidth: 160,
  },
}));

const RequestCard: React.FC<RequestProps> = props => {
  const users = useSelector(connectedUsers);
  const dispatch = useDispatch();

  const classes = useStyles();

  const onConnectedUserChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(
      requests.actions.updateConnectedUser({
        uid: props.request.uid,
        id: props.request.id,
        connectedUser: (e.target.value as string | undefined)
          ? {
              email: e.target.value as string,
              ...users[e.target.value as string],
            }
          : null,
      })
    );
  };

  return (
    <Card key={props.request.id} className={classes.card}>
      <CardHeader
        subheader={new Date(
          props.request.createdOn.seconds * 1000
        ).toUTCString()}
        title={props.request.address.place_name_no}
      />
      <CardContent>
        <Typography variant="overline">Handleliste</Typography>
        {props.request.items.length > 0 ? (
          <List>
            {props.request.items.map(i => (
              <ListItem key={`${i.count}x${i.itemName}`}>
                <ListItemText>
                  {i.count}x {i.itemName}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Ingen varer på handlelista</Typography>
        )}

        <Typography variant="overline">Andre ønsker</Typography>
        <Typography>
          {props.request.otherNeed ?? 'Ingen andre ønsker'}
        </Typography>

        <FormControl className={classes.connectedUser}>
          <InputLabel id="connected-user-select">Oppdragstager</InputLabel>
          <Select
            labelId="connected-user-select"
            value={props.request.connectedUser?.email ?? ''}
            onChange={onConnectedUserChange}
          >
            <MenuItem value={undefined}>Ingen oppdragstager</MenuItem>
            {Object.entries(users).map(u => (
              <MenuItem key={u[0]} value={u[0]}>
                {u[1].name ?? u[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary">
          Slett ordre
        </Button>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
