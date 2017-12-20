import { createStore } from 'redux';

// Actions generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET',
});

// Reducers are pure functions: don't depend on external input or output
// Reducers do not modify states or actions (state and action are read-only)
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
    {
      const { incrementBy } = action;
      return { count: state.count + incrementBy };
    }
    case 'DECREMENT':
    {
      const { decrementBy } = action;
      return { count: state.count - decrementBy };
    }
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.count };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));

store.dispatch(resetCount());

unsubscribe();
