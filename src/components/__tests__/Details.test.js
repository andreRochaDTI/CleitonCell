import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter} from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import Details from '../Details';
import {ProductProvider} from '../../context';

describe('Details', () => {
  it('should render product details correctly', () => {
    const detailProduct = {
      id: 1,
      company: 'Company A',
      img: 'img/product-1.png',
      info: 'Product information',
      price: 10,
      title: 'Google Pixel - Black',
      inCart: false,
    };
    render(<ProductProvider value={{ detailProduct }}>
        <BrowserRouter>
        <Details />
        </BrowserRouter>
      </ProductProvider>);

    // Assert that the product title is rendered correctly
    expect(screen.getByText('Google Pixel - Black')).toBeInTheDocument();

    // Assert that the product image is rendered correctly
    expect(screen.getByAltText('product')).toHaveAttribute('src', 'img/product-1.png');

    // Assert that the "back to products" button is rendered
    expect(screen.getByText('back to products')).toBeInTheDocument();

    // Assert that the "add to cart" button is rendered
    expect(screen.getByText('add to cart')).toBeInTheDocument();
  });
});
