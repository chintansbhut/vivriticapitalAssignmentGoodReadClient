import React from 'react';
import { shallow } from 'enzyme';
import GoodReadsClient from './index';

it('renders GoodReadsClient component without crashing', () => {
    shallow(<GoodReadsClient />);
});
it('renders App Name', () => {
    const wrapper = shallow(<GoodReadsClient />);
    let name =  <h2>GoodReads Client</h2>;
    expect(wrapper.contains(name)).toEqual(true);
  });