
import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({
  dispatch, description, amount, createdAt, id
}) => (
  // description, amount and createdAt
  <div>
    <h3>{description}</h3>
    <p>{createdAt} - {amount}</p>
    <button onClick={() => dispatch(removeExpense({ id }))}>Remove</button>
  </div>
);

export default connect()(ExpenseListItem);
