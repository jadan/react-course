
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill' }));
store.dispatch(addExpense({ description: 'Gas bill' }));
store.dispatch(setTextFilter('bill'));
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(store.getState());
console.log(visibleExpenses);
ReactDOM.render(<AppRouter />, document.getElementById('app'));
