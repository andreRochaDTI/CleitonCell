import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Product from '../Product';

describe('Product Component', () => {
  const product = {
    id: 1,
    title: 'Product Title',
    img: 'product-image.jpg',
    price: 9.99,
    inCart: false
  };

  it('should render without errors', () => {
    render(<Product product={product} />);
    expect(screen.getByText('Product Title')).toBeInTheDocument();
    expect(screen.getByText('9.99')).toBeInTheDocument();
  });

  // it('should not trigger handleDetail function on image container click', () => {
  //   const handleDetail = jest.fn();
  //   render(<Product product={product} handleDetail={handleDetail} />);
  //   fireEvent.click(screen.getByAltText('product'));
  //   expect(handleDetail).not.toHaveBeenCalled();
  // });

  // it('should trigger addToCart and openModal functions on cart button click', () => {
  //   const addToCart = jest.fn();
  //   const openModal = jest.fn();
  //   render(<Product product={product} addToCart={addToCart} openModal={openModal} />);
  //   fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));
  //   expect(addToCart).toHaveBeenCalledWith(1);
  //   expect(openModal).toHaveBeenCalledWith(1);
  // });

  it('should disable cart button if product is already in cart', () => {
    render(<Product product={{ ...product, inCart: true }} />);
    expect(screen.getByRole('button', { name: 'in Cart' })).toBeDisabled();
  });
});
