import React from 'react';
import { shallow } from 'enzyme';
import CartColumns from '../Cart/CartColumns';

describe('CartColumns', () => {
  it('should render the cart columns correctly', () => {
    const wrapper = shallow(<CartColumns />);

    // Verifica se os elementos renderizados estão corretos
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
    expect(wrapper.find('.row')).toHaveLength(1);
    expect(wrapper.find('.col-10')).toHaveLength(6);
    expect(wrapper.find('p')).toHaveLength(6);

    // Verifica se o texto dos elementos está correto
    expect(wrapper.find('.col-10').at(0).text()).toBe('products');
    expect(wrapper.find('.col-10').at(1).text()).toBe('name of product');
    expect(wrapper.find('.col-10').at(2).text()).toBe('price');
    expect(wrapper.find('.col-10').at(3).text()).toBe('quantity');
    expect(wrapper.find('.col-10').at(4).text()).toBe('remove');
    expect(wrapper.find('.col-10').at(5).text()).toBe('total');
  });
});
