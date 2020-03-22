import React from 'react';

import {
  Card,
  CardHeader,
  Typography,
  ListItem,
  List,
  ListItemText,
  CardContent,
} from '@material-ui/core';

type RequestProps = {
  request: import('../../declarations/Request').Request;
};

const RequestCard: React.FC<RequestProps> = props => (
  <Card key={props.request.id}>
    <CardHeader
      subheader={new Date(props.request.createdOn.seconds * 1000).toUTCString()}
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
      <Typography>{props.request.otherNeed ?? 'Ingen andre ønsker'}</Typography>
    </CardContent>
  </Card>
);

export default RequestCard;
