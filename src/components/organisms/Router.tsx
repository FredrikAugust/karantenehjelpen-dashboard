import React from 'react';

import { Switch, Route } from 'react-router-dom';

import App from './App';
import NotFound from './NotFound';
import Page from './Page';

const Router: React.FC = () => {
  return (
    <Page>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Page>
  );
};

export default Router;
