import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './CheckoutForm.css';

const CheckoutForm = ({ payment, totalToolPrice, setPayment, refetch }) => {

    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { customerName, customerEmail, _id, toolName } = payment;
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("https://electric-tools-manufacturer-server-two.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ totalToolPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [totalToolPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            toast.error(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerName,
                        email: customerEmail
                    },
                },
            },
        );

        if (confirmError) {
            toast.error(confirmError.message)
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // store payment info in the database
            const paymentInfo = {
                date: new Date(),
                toolName,
                totalToolPrice,
                transactionId: paymentIntent.id,
                customerName,
                customerEmail,
                paymentId: _id,
            };

            fetch(`https://electric-tools-manufacturer-server-two.vercel.app/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(paymentInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success(`Congrats! Your payment completed. Your Transaction: ${paymentIntent.id}`);
                        setPayment(null);
                        refetch();
                    }
                })
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className='payment-input-field'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className='payment-btn'
                type="submit"
                disabled={!stripe || !clientSecret || processing}
            >
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;