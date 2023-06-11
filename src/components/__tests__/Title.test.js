import React from 'react';
import { shallow } from 'enzyme';
import Title from '../Title';

describe('Title', () => {
  it('should render the name and title correctly', () => {
    const wrapper = shallow(<Title name="Product" title="Title" />);
    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('Product  Title');
    expect(h1.hasClass('text-capitalize')).toBe(true);
    expect(h1.find('strong').text()).toBe('Title');
    expect(h1.find('strong').hasClass('text-blue')).toBe(true);
  });

  it('should render the correct class and props', () => {
    const wrapper = shallow(<Title name="Product" title="Title" />);
    const div = wrapper.find('.col-10');
    expect(div.hasClass('mx-auto')).toBe(true);
    expect(div.hasClass('my-2')).toBe(true);
    expect(div.hasClass('text-center')).toBe(true);
    expect(div.hasClass('text-title')).toBe(true);
  });
});
