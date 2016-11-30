import { Router, Route, browserHistory } from 'react-router';
import * as React from 'react';
import App from './App';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);
