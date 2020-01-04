import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/Login';
import PetList from '../components/PetList';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/petlist" component={PetList} />
    </Switch>
  );
}

export default Routes;
