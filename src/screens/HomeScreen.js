import React from 'react';
import { Redirect } from 'react-router';
import moment from 'moment';

const HomeScreen = ({ location }) => {
  return (
    <Redirect to={{
      pathname: `/report/${moment().format('YYYY-MM-DD')}`,
      state: { from: location },
    }}
    />
  );
};
export default HomeScreen;
