import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import MatchWhenAuthorized from './containers/MatchWhenAuthorized';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const App = () => (
  <BrowserRouter>
    <div>
      <h1>Time Tracker</h1>
      <Match exactly pattern="/login" component={LoginScreen} />
      <MatchWhenAuthorized exactly pattern="/" component={HomeScreen} />
      <MatchWhenAuthorized exactly pattern="/report/:date" component={ReportScreen} />
      <Miss component={NotFoundScreen} />
    </div>
  </BrowserRouter>
);

export default App;
