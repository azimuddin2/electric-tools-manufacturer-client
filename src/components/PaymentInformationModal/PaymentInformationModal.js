import React from 'react';
import successfullyGif from '../../assets/images/successfully.gif';

const PaymentInformationModal = () => {
    return (
        <div>
            <input type="checkbox" id="payment-information-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <div className='mb-8'>
                        <label htmlFor="payment-information-modal" className="btn btn-sm btn-accent btn-circle absolute right-2 top-2 text-white">✕</label>
                        <div>
                            <img src={successfullyGif} alt="" className='w-40 mx-auto' />
                            <h1 className='text-center text-3xl font-semibold'>Congratulation</h1>
                            <h2 className='text-center text-xl'>Payment Successful</h2>
                            <p>TransactionId:</p>
                            <p>Date:</p>
                            <p>Product Name:</p>
                            <p>Price:</p>
                            <p>Name:</p>
                            <p>Email:</p>
                        </div>
                    </div>

                    <div className="modal-action justify-end">
                        <label
                            htmlFor="payment-information-modal"
                            className="btn btn-primary text-white"
                        >
                            OK
                        </label>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentInformationModal;