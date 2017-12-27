import database from '../firebase/firebase';

// ADD EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});
// add to Firebase, then call addExpense action (trigger in reductor, REDUX connection)
export const startAddExpense = (expenseData = {}) => (
  (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {
      description, note, amount, createdAt
    };

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  }
);

// REMOVE EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
