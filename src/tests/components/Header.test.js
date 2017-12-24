// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

/* eslint-disable no-undef */
test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

/* eslint-enable */
