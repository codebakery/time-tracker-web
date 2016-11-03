import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';


const MatchWhenAuthorized = ({ authorized, component: Component, ...rest }) => (
  <Match {...rest} render={props => {
    switch (authorized) {
      case true:
        return <Component {...props} />;
      case false:
        return (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}
          />
        );
      default:
        return null;
    }}
  }
  />
);
export default connect(
  (state) => ({
    authorized: state.auth.authorized,
  })
)(MatchWhenAuthorized);
