import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => (
  <div>
    <button onClick={() => {
      props.dispatch(removeExpense({ id: props.expense.id }));
      props.history.push('/');
    }}
    >Remove
    </button>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        props.dispatch(editExpense(expense));
        props.history.push('/');
      }}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditExpensePage);
