
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';


const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 300 }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
