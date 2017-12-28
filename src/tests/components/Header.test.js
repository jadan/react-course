// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

/* eslint-disable no-undef */
test('should render Header correctly', () => {
  const wrapper = shallow(<Header logout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
// should call logout on logout click
test('should call logout on logout click', () => {
  const onLogoutSpy = jest.fn();
  const wrapper = shallow(<Header logout={onLogoutSpy} />);
  wrapper.find('button').simulate('click');
  expect(onLogoutSpy).toHaveBeenCalled();
});

/* eslint-enable */
