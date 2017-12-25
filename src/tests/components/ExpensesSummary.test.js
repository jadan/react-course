import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

/* eslint-disable no-undef */
test('should correctly render expensesSummary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={24} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render expensesSummary with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={21234124} />);
  expect(wrapper).toMatchSnapshot();
});
/* eslint-enable */
