import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('should have a link to cart', () => {
    const wrapper = shallow(<Navbar />);
    const link = wrapper.find(Link).at(2);
    expect(link.props().to).toBe('/cart');
  });
});
