import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ logout }) => (
  <div>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact>Go home</NavLink>
    <NavLink to="/create" activeClassName="is-active" exact>Create</NavLink>
    <button onClick={logout}>Logout</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);

