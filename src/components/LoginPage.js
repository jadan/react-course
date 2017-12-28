import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ login }) => (
  <div>
    Please login.
    <button onClick={login}>Login</button>
  </div>
);

const mapDispatchToProps = dispatch => ({ login: () => dispatch(startLogin()) });

export default connect(undefined, mapDispatchToProps)(LoginPage);
