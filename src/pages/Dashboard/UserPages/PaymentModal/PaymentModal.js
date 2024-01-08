import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const PaymentModal = ({ payment, setPayment, refetch }) => {

    const { customerName, toolName, toolPrice, orderQuantity } = payment;
    const totalToolPrice = toolPrice * orderQuantity;

    return (
        <div>
            <input type="checkbox" id="payment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div>
                        <label htmlFor="payment-modal" className="btn btn-sm btn-accent btn-circle absolute right-2 top-2 text-white">✕</label>
                        <h4 style={{ color: '#3CBCA2' }} className='text-lg font-semibold'>Hello, {customerName}!</h4>
                        <h3 className="font-medium text-xl mt-2">Please Pay for <span className='font-semibold' style={{ color: '#F0AA22' }}>{toolName} Tools</span></h3>
                        <h2 className='text-xl font-medium mt-1'>Please Pay: <span className='text-primary'>${totalToolPrice}</span></h2>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                refetch={refetch}
                                payment={payment}
                                totalToolPrice={totalToolPrice}
                                setPayment={setPayment}
                            />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;