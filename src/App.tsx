import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './store';

import Routes from './routes';
import history from './services/history';

const App: React.FC = () => (
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
);

export default App;
