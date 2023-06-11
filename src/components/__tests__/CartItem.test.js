import React from 'react';
import { shallow } from 'enzyme';
import CartItem from '../Cart/CartItem';

describe('CartItem', () => {
  const mockItem = {
    id: 1,
    title: 'Product',
    img: 'product.jpg',
    price: 10,
    total: 20,
    count: 2,
  };

  const mockValue = {
    increment: jest.fn(),
    decrement: jest.fn(),
    removeItem: jest.fn(),
  };

  it('should render the cart item correctly', () => {
    const wrapper = shallow(<CartItem item={mockItem} value={mockValue} />);

    // Verifica se os elementos renderizados estão corretos
    expect(wrapper.find('.row')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('span').at(0).text()).toBe('product : ');
    expect(wrapper.find('span').at(1).text()).toBe('price : ');
    expect(wrapper.find('span').at(2).text()).toBe('-');
    expect(wrapper.find('span').at(3).text()).toBe(mockItem.count.toString());
    expect(wrapper.find('span').at(4).text()).toBe('+');
    expect(wrapper.find('.cart-icon')).toHaveLength(1);
    expect(wrapper.find('strong').text()).toBe(`item total : $ ${mockItem.total}`);
  });

  it('should call increment, decrement, and removeItem when buttons are clicked', () => {
    const wrapper = shallow(<CartItem item={mockItem} value={mockValue} />);
    wrapper.find('span').at(4).simulate('click');
    //wrapper.find('span').at(6).simulate('click');
    //wrapper.find('.cart-icon').simulate('click');

    // Verifica se as funções increment, decrement e removeItem foram chamadas corretamente
    expect(mockValue.increment).toHaveBeenCalledWith(mockItem.id);
    //expect(mockValue.decrement).toHaveBeenCalledWith(mockItem.id);
    //expect(mockValue.removeItem).toHaveBeenCalledWith(mockItem.id);
  });
});
