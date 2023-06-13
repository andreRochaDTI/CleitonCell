import React, { useState } from 'react';

export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardOwner, setCardOwner] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [purchaseStatus, setPurchaseStatus] = useState('');

    const handlePaymentMethodClick = (method) => {
        setPaymentMethod(method);
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleCardOwnerChange = (e) => {
        setCardOwner(e.target.value);
    };

    const handleCardExpirationChange = (e) => {
        setCardExpiration(e.target.value);
    };

    const handleBuyClick = () => {
        if (!cardNumber || !cardOwner || !cardExpiration) {
            setPurchaseStatus('Please fill in all fields.');
        } else {
            setPurchaseStatus('Purchase completed successfully.');
        }
    };

    const renderPaymentForm = () => {
        if (paymentMethod === 'credit-card') {
            return (
                <div>
                    <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} />
                    </div>
                    <div>
                        <label htmlFor="cardOwner">Card Owner:</label>
                        <input type="text" id="cardOwner" value={cardOwner} onChange={handleCardOwnerChange} />
                    </div>
                    <div>
                        <label htmlFor="cardExpiration">Card Expiration:</label>
                        <input type="text" id="cardExpiration" value={cardExpiration} onChange={handleCardExpirationChange} />
                    </div>
                    <button className="btn btn-primary" onClick={handleBuyClick}>
                        Buy
                    </button>
                    {purchaseStatus && <p>{purchaseStatus}</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                    <h1>Payment Screen</h1>
                    <p>Please choose a payment method:</p>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary" onClick={() => handlePaymentMethodClick('boleto')}>
                                Boleto Bancário
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={() => handlePaymentMethodClick('pix')}>
                                PIX
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={() => handlePaymentMethodClick('credit-card')}>
                                Credit Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {renderPaymentForm()}
        </div>
    );
}
