import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET TEXT FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        }
        return expense;
      });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, {
  text, sortBy, startDate, endDate
}) => expenses.filter((expense) => {
  const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
  const textMatch = text === '' || expense.description.toLowerCase().includes(text.toLowerCase());
  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    // If a is created before b then a goes first else b goes first
    return a.createdAt < b.createdAt ? 1 : -1;
  }
  // if a is less then it goes after b
  return a.amount < b.amount ? -1 : 1;
});

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 100 }));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('text'));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(100));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

store.dispatch(setTextFilter('cOffee'));
