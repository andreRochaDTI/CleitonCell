import React from 'react';
import { shallow } from 'enzyme';
import EmptyCart from '../Cart/EmptyCart';

describe('EmptyCart', () => {
  it('should render the empty cart message', () => {
    const wrapper = shallow(<EmptyCart />);

    // Verifica se a mensagem é renderizada corretamente
    expect(wrapper.find('h1').text()).toBe('Your cart is currently empty');
  });
});
