import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

/* eslint-disable no-undef */
test('should return 0 for no expenses', () => {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

test('should return the correct sum for 1 expense', () => {
  const total = selectExpensesTotal([expenses[0]]);
  expect(total).toBe(195);
});

test('should return the correct sum for several expenses', () => {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(114195);
});
/* eslint-enable */
