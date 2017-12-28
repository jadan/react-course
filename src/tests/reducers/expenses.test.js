import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

/* eslint-disable no-undef */

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT ' });
  expect(state).toEqual([]);
});

test('should remove an expense', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1' };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newExpense = {
    id: '-1',
    description: 'rent',
    note: '',
    amount: 32500,
    createdAt: moment(0).subtract(5, 'days').valueOf()
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
  const action = { type: 'EDIT_EXPENSE', id: expenses[1].id, updates: { note: 'droga' } };
  const state = expensesReducer(expenses, action);
  const editedExpense = { ...expenses[1], note: 'droga' };
  expect(state).toEqual([expenses[0], editedExpense, expenses[2]]);
});

test('should not edit an expense', () => {
  const action = { type: 'EDIT_EXPENSE', id: '09', updates: { note: 'droga' } };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
/* eslint-enable */
