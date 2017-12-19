import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact>Go home</NavLink>
    <NavLink to="/create" activeClassName="is-active" exact>Create</NavLink>
    <NavLink to="/edit" activeClassName="is-active" exact>Edit</NavLink>
    <NavLink to="/help" activeClassName="is-active" exact>Help</NavLink>
  </div>
);

export default Header;

