import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import MatchWhenAuthorized from './containers/MatchWhenAuthorized';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const App = () => (
  <BrowserRouter>
    <div>
      <h1>Time Tracker</h1>
      <Match pattern="/login" component={LoginScreen} />
      <MatchWhenAuthorized exactly pattern="/" component={DashboardScreen} />
      <Miss component={NotFoundScreen} />
    </div>
  </BrowserRouter>
);

export default App;
