import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { loginRequest } from '../actions/auth';
import ErrorList from '../components/ErrorList';
import { ref } from '../utils';

class LoginScreen extends Component {

  constructor(props) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.loginRequest(this._username.value, this._password.value);
  }

  render() {
    if (this.props.authorized === true) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: this.props.location },
        }}
        />
      );
    }
    return (
      <form action="#" onSubmit={this.onSubmit}>
        <input type="text" ref={ref('_username', this)} placeholder="Username" /><br/>
        <ErrorList errors={this.props.errors.username} />
        <input type="password" ref={ref('_password', this)} placeholder="Password" /><br/>
        <ErrorList errors={this.props.errors.password} />
        <ErrorList errors={this.props.errors.non_field_errors} />
        <input type="submit" />
      </form>
    );
  }

}

export default connect(
  (state) => ({
    errors: state.auth.errors,
    authorized: state.auth.authorized,
  }),
  {loginRequest}
)(LoginScreen);
