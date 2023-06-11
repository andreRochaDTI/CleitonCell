import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Payment from '../Payment/Payment';

describe('Payment Component', () => {
  it('should render without errors', async () => {
    render(<Payment />);
    expect(screen.getByText('Please choose a payment method:')).toBeInTheDocument();
  });

  it('should render payment form when "credit-card" payment method is selected', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('Credit Card'));
    expect(screen.getByLabelText('Card Number:')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Owner:')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Expiration:')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
  });

  it('should update cardNumber state on card number input change', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('Credit Card'));
    const cardNumberInput = screen.getByLabelText('Card Number:');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890' } });
    expect(cardNumberInput.value).toBe('1234567890');
  });

  it('should update cardOwner state on card owner input change', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('Credit Card'));
    const cardOwnerInput = screen.getByLabelText('Card Owner:');
    fireEvent.change(cardOwnerInput, { target: { value: 'John Doe' } });
    expect(cardOwnerInput.value).toBe('John Doe');
  });

  it('should update cardExpiration state on card expiration input change', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('Credit Card'));
    const cardExpirationInput = screen.getByLabelText('Card Expiration:');
    fireEvent.change(cardExpirationInput, { target: { value: '12/24' } });
    expect(cardExpirationInput.value).toBe('12/24');
  });

  it('should display "Please fill in all fields." when buy button is clicked and required fields are empty', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('Credit Card'));
    fireEvent.click(screen.getByText('Buy'));
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
  });

  it('should display "Purchase completed successfully." when buy button is clicked and all required fields are filled', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('Credit Card'));
    fireEvent.change(screen.getByLabelText('Card Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Card Owner:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Card Expiration:'), { target: { value: '12/24' } });
    fireEvent.click(screen.getByText('Buy'));
    expect(screen.getByText('Purchase completed successfully.')).toBeInTheDocument();
  });

  it('should not render payment form when payment method other than "credit-card" is selected', () => {
    render(<Payment />);
    fireEvent.click(screen.getByText('PIX'));
    expect(screen.queryByLabelText('Card Number:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Card Owner:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Card Expiration:')).not.toBeInTheDocument();
    expect(screen.queryByText('Buy')).not.toBeInTheDocument();
  });
});
