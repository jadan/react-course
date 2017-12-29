import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expenseWord = props.expensesCount > 1 ? ' expenses ' : ' expense ';
  const formattedTotal = numeral(props.expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        {props.expensesCount > 0 &&
        <h1 className="page-header__title">
          Viewing <span>{props.expensesCount}</span>
          {expenseWord}
          totalling <span>{formattedTotal}</span>
        </h1>}
        <div className="page-header__action">
          <Link className="login-button" to="/create">Add expense</Link>
        </div>
      </div>
    </div>);
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesTotal: selectExpensesTotal(visibleExpenses),
    expensesCount: visibleExpenses.length
  };
};

// HOC to add Redux to React
export default connect(mapStateToProps)(ExpensesSummary);
