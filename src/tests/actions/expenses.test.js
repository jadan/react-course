import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// Action generators tests
/* eslint-disable no-undef */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({
    id, description, note, amount, createdAt
  }) => {
    expensesData[id] = {
      description, note, amount, createdAt
    };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should set up removeExpense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should edit an expense', () => {
  const action = editExpense('123abc', { note: 'New note' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note'
    }
  });
});

test('should add an expense', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', async (done) => {
  console.log(process.env.FIREBASE_API_KEY);
  const store = mockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  try {
    await store.dispatch(startAddExpense(expenseData));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    const snapshot = await database.ref(`expenses/${actions[0].expense.id}`).once('value');
    expect(snapshot.val()).toEqual(expenseData);
    done();
  } catch (e) {
    console.log('error fetching from database or dispatching action');
    done();
  }
  await done();
});

test('should add default expense to database and store', async (done) => {
  const store = mockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  try {
    await store.dispatch(startAddExpense());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    const snapshot = await database.ref(`expenses/${actions[0].expense.id}`).once('value');
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  } catch (e) {
    console.log('error fetching from database or dispatching action');
    done();
  }
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch expenses from firebase', async (done) => {
  const store = mockStore({});
  await store.dispatch(startSetExpenses());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
  done();
});

test('should remove expenses from firebase', async (done) => {
  const store = mockStore({});
  await store.dispatch(startRemoveExpense(expenses[0]));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id
  });
  done();
});

test('should edit expenses from firebase', async (done) => {
  const store = mockStore({});
  await store.dispatch(startEditExpense(expenses[0].id, { description: 'updated remotely' }));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description: 'updated remotely'
    }
  });
  done();
});
/* eslint-enable */
