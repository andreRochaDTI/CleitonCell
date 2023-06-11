import React from 'react';
import { shallow } from 'enzyme';
import ProductList from '../ProductList';
import Product from '../Product';
import Title from '../Title';
import ProductConsumer from '../../context'

describe('ProductList', () => {


  it('should render the title correctly', () => {
    const wrapper = shallow(
      <ProductList>
        <Title name="our" title="products" />
      </ProductList>
    );

    const titleComponent = wrapper.find(Title);
    expect(titleComponent.prop('name')).toBe('our');
    expect(titleComponent.prop('title')).toBe('products');
  });
});
