import authReducer from '../../reducers/auth';

/* eslint-disable no-undef */
test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc'
  };
  const state = authReducer({}, action);
  expect(state).toEqual({ uid: action.uid });
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT',
  };
  const state = authReducer({ uid: 'asdfasd' }, action);
  expect(state).toEqual({});
});

/* eslint-enable */
