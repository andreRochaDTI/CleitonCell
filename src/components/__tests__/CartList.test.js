import React from 'react';
import { shallow } from 'enzyme';
import CartList from '../Cart/CartList';

describe('CartList', () => {
  const mockValue = {
    cart: [
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 20 },
      { id: 3, name: 'Item 3', price: 30 },
    ],
  };

  it('should render the cart items correctly', () => {
    const wrapper = shallow(<CartList value={mockValue} />);

    // Verifica se os elementos renderizados estão corretos
    expect(wrapper.find('CartItem')).toHaveLength(3);
  });
});
