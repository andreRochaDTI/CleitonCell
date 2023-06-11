import React from 'react';
import { shallow } from 'enzyme';
import CartTotals from '../Cart/CartTotals';

describe('CartTotals', () => {
  let value;
  let clearCartMock;

  beforeEach(() => {
    clearCartMock = jest.fn();
    value = {
      cartSubTotal: 100,
      cartTax: 10,
      cartTotal: 110,
      clearCart: clearCartMock,
    };
  });

  it('should render cart totals correctly', () => {
    const wrapper = shallow(<CartTotals value={value} />);

    expect(wrapper.find('h5')).toHaveLength(3);
    expect(wrapper.find('h5').at(0).text()).toContain('subtotal :');
    expect(wrapper.find('h5').at(0).find('strong').text()).toEqual('100');
    expect(wrapper.find('h5').at(1).text()).toContain('shipment  :');
    expect(wrapper.find('h5').at(1).find('strong').text()).toEqual('10');
    expect(wrapper.find('h5').at(2).text()).toContain('total :');
    expect(wrapper.find('h5').at(2).find('strong').text()).toEqual('110');
  });

  it('should call clearCart when clear cart button is clicked', () => {
    const wrapper = shallow(<CartTotals value={value} />);
    const clearCartButton = wrapper.find('button').first();

    clearCartButton.simulate('click');

    expect(clearCartMock).toHaveBeenCalledTimes(1);
  });

  it('should call buy function when buy button is clicked', () => {
    window.alert = jest.fn();
    const wrapper = shallow(<CartTotals value={value} />);
    const buyButton = wrapper.find('button').last();

    buyButton.simulate('click');

    expect(window.alert).toHaveBeenCalledWith("You'll be redirected to the payment page");
  });
});
