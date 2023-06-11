import React from 'react';
import { shallow } from 'enzyme';
import { ProductProvider, ProductConsumer } from './context';

describe('ProductProvider', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ProductProvider>
        <div>Test</div>
      </ProductProvider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('sets products correctly on mount', () => {
    const instance = wrapper.instance();
    const setProductsSpy = jest.spyOn(instance, 'setProducts');
    instance.componentDidMount();
    expect(setProductsSpy).toHaveBeenCalled();
  });

  it('adds product to cart correctly', () => {
    const instance = wrapper.instance();
    const addToCartSpy = jest.spyOn(instance, 'addToCart');
    const id = 1;
    instance.addToCart(id);
    expect(addToCartSpy).toHaveBeenCalledWith(id);
    expect(instance.state.cart.length).toBe(1);
  });

  // Test other methods and functionalities of ProductProvider

  it('renders children components', () => {
    expect(wrapper.find('div').text()).toEqual('Test');
  });
});

describe('ProductConsumer', () => {
  it('renders without crashing', () => {
    shallow(
      <ProductConsumer>
        {() => <div>Test</div>}
      </ProductConsumer>
    );
  });
});
describe('handleDetail', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
    });
  
    it('sets detailProduct correctly', () => {
      const instance = wrapper.instance();
      const handleDetailSpy = jest.spyOn(instance, 'handleDetail');
      const id = 1;
      instance.handleDetail(id);
      expect(handleDetailSpy).toHaveBeenCalledWith(id);
      expect(instance.state.detailProduct.id).toBe(id);
    });
  });
  
  describe('openModal', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
    });
  
    it('sets modalOpen to true and modalProduct correctly', () => {
      const instance = wrapper.instance();
      const openModalSpy = jest.spyOn(instance, 'openModal');
      const id = 1;
      instance.openModal(id);
      expect(openModalSpy).toHaveBeenCalledWith(id);
      expect(instance.state.modalOpen).toBe(true);
      expect(instance.state.modalProduct.id).toBe(id);
    });
  });
  
  describe('closeModal', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
    });
  
    it('sets modalOpen to false', () => {
      const instance = wrapper.instance();
      const closeModalSpy = jest.spyOn(instance, 'closeModal');
      instance.setState({ modalOpen: true });
      instance.closeModal();
      expect(closeModalSpy).toHaveBeenCalled();
      expect(instance.state.modalOpen).toBe(false);
    });
  });
  
  describe('increment', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
    });
  
    it('increments count and updates total correctly', () => {
      const instance = wrapper.instance();
      const incrementSpy = jest.spyOn(instance, 'increment');
      const id = 1;
      const initialCount = 2;
      const initialTotal = 20;
      const updatedCount = initialCount + 1;
      const updatedTotal = initialTotal * updatedCount / initialCount;
  
      const selectedProduct = {
        id: id,
        count: initialCount,
        price: 10,
        total: initialTotal
      };
      instance.setState({ cart: [selectedProduct] });
      instance.increment(id);
  
      expect(incrementSpy).toHaveBeenCalledWith(id);
      expect(instance.state.cart[0].count).toBe(updatedCount);
      expect(instance.state.cart[0].total).toBe(updatedTotal);
    });
  });
  
  describe('decrement', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
    });
  
    it('decrements count and updates total correctly', () => {
      const instance = wrapper.instance();
      const decrementSpy = jest.spyOn(instance, 'decrement');
      const id = 1;
      const initialCount = 2;
      const initialTotal = 20;
      const updatedCount = initialCount - 1;
      const updatedTotal = initialTotal * updatedCount / initialCount;
  
      const selectedProduct = {
        id: id,
        count: initialCount,
        price: 10,
        total: initialTotal
      };
      instance.setState({ cart: [selectedProduct] });
      instance.decrement(id);
  
      expect(decrementSpy).toHaveBeenCalledWith(id);
      expect(instance.state.cart[0].count).toBe(updatedCount);
      expect(instance.state.cart[0].total).toBe(updatedTotal);
    });
  
    it('removes item from cart when count reaches zero', () => {
      const instance = wrapper.instance();
      const decrementSpy = jest.spyOn(instance, 'decrement');
      const removeItemSpy = jest.spyOn(instance, 'removeItem');
      const id = 1;
      const initialCount = 1;
  
      const selectedProduct = {
        id: id,
        count: initialCount,
        price: 10,
        total: 10
      };
      instance.setState({ cart: [selectedProduct] });
      instance.decrement(id);
  
      expect(decrementSpy).toHaveBeenCalledWith(id);
      expect(removeItemSpy).toHaveBeenCalledWith(id);
      expect(instance.state.cart.length).toBe(0);
    });
  });
  
  describe('clearCart', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
    });
  
    it('clears the cart and resets product state', () => {
      const instance = wrapper.instance();
      const clearCartSpy = jest.spyOn(instance, 'clearCart');
      const setProductsSpy = jest.spyOn(instance, 'setProducts');
      const addTotalsSpy = jest.spyOn(instance, 'addTotals');
  
      const selectedProduct = {
        id: 1,
        inCart: true,
        count: 1,
        total: 10
      };
      instance.setState({ cart: [selectedProduct] });
      instance.clearCart();
  
      expect(clearCartSpy).toHaveBeenCalled();
      expect(setProductsSpy).toHaveBeenCalled();
      expect(addTotalsSpy).toHaveBeenCalled();
      expect(instance.state.cart.length).toBe(0);
      expect(instance.state.products[0].inCart).toBe(false);
      expect(instance.state.products[0].count).toBe(0);
      expect(instance.state.products[0].total).toBe(0);
    });
  });
describe('clearCart', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductProvider><div>Test</div></ProductProvider>);
  });

  it('clears the cart and resets product state', () => {
    const instance = wrapper.instance();
    const clearCartSpy = jest.spyOn(instance, 'clearCart');
    const setProductsSpy = jest.spyOn(instance, 'setProducts');
    const addTotalsSpy = jest.spyOn(instance, 'addTotals');

    const selectedProduct = {
      id: 1,
      inCart: true,
      count: 1,
      total: 10
    };
    instance.setState({ cart: [selectedProduct] });
    instance.clearCart();

    expect(clearCartSpy).toHaveBeenCalled();
    expect(setProductsSpy).toHaveBeenCalled();
    expect(addTotalsSpy).toHaveBeenCalled();
    expect(instance.state.cart.length).toBe(0);
    expect(instance.state.products[0].inCart).toBe(false);
    expect(instance.state.products[0].count).toBe(0);
    expect(instance.state.products[0].total).toBe(0);
  });
});
  