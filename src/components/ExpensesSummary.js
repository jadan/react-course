import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expenseWord = props.count > 1 ? ' expenses ' : ' expense ';
  const formattedTotal = numeral(props.expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      {props.expensesCount > 0 &&
      <h1>
        Viewing {props.expensesCount}
        {expenseWord}
        totalling {formattedTotal}
      </h1>}
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
