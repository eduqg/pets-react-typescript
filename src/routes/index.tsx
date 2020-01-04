import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/Login';
import Pets from '../components/Pets';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/pets" component={Pets} />
    </Switch>
  );
}

export default Routes;
