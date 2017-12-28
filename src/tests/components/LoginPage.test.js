// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

/* eslint-disable no-undef */
test('should render Header correctly', () => {
  const wrapper = shallow(<LoginPage login={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call login on login click', () => {
  const onLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage login={onLoginSpy} />);
  wrapper.find('button').simulate('click');
  expect(onLoginSpy).toHaveBeenCalled();
});
/* eslint-enable */
