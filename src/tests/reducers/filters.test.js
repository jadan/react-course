import moment from 'moment';
import filtersReducer from '../../reducers/filters';

/* eslint-disable  no-undef */
test('should setup default state', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy by amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy by amount', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toBe('date');
});

test('should set set text filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'droga' });
  expect(state.text).toBe('droga');
});

test('should set start date  filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(2) });
  expect(state.startDate).toEqual(moment(2));
});

test('should set end date  filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: moment(2) });
  expect(state.endDate).toEqual(moment(2));
});
/* eslint-enable */
