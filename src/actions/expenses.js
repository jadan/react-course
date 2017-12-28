import database from '../firebase/firebase';

// ADD EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

// add to Firebase, then call addExpense action (trigger in reductor, REDUX connection)
export const startAddExpense = (expenseData = {}) => (
  (dispatch, getState) => {
    const { uid } = getState().auth;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {
      description, note, amount, createdAt
    };

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  }
);

// REMOVE EXPENSE
export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => (
  (dispatch, getState) => {
    const { uid } = getState().auth;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() =>
      dispatch(removeExpense({ id })));
  }
);

// EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => (
  (dispatch, getState) => {
    const { uid } = getState().auth;
    return database.ref(`users/${uid}/expenses/${id}`).update({ ...updates }).then(() =>
      dispatch(editExpense(id, updates)));
  }
);
// SET EXPENSES
export const setExpenses = expenses => (
  {
    type: 'SET_EXPENSES',
    expenses
  }
);


export const startSetExpenses = () => (
  (dispatch, getState) => {
    const { uid } = getState().auth;
    // database.ref('users/thisismytestuid/expenses').once('value').then(snapshot =>
    //   snapshot.forEach(child => console.log(child.val())));
    return database.ref(`users/${uid}/expenses`).once('value')
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  }
);
