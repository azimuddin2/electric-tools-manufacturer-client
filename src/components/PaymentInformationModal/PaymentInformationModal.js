import React from 'react';
import successfullyGif from '../../assets/images/successfully.gif';
import { BsCheck2Circle } from 'react-icons/bs';
import { LuCalendarClock } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";
import { AiOutlineDollar } from "react-icons/ai";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const PaymentInformationModal = ({ paymentInformationModal }) => {

    const { customerName, customerEmail, toolName, toolPrice, orderQuantity, transactionId, date } = paymentInformationModal;
    const totalToolPrice = toolPrice * orderQuantity;

    return (
        <div>
            <input type="checkbox" id="payment-information-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <div className='mb-8'>
                        <label htmlFor="payment-information-modal" className="btn btn-sm btn-accent btn-circle absolute right-2 top-2 text-white">✕</label>
                        <div>
                            <img src={successfullyGif} alt="" className='w-40 mx-auto' />
                            <h1 className='text-center text-3xl font-semibold'>Congratulation!</h1>
                            <h2 className='text-center text-xl'>Payment Successful</h2>
                            <div>
                                <p className='flex items-center'>
                                    <BsCheck2Circle className='text-lg' />
                                    <span>TransactionId: {transactionId}</span>
                                </p>
                                <p className='flex items-center'>
                                    <LuCalendarClock className='text-lg' />
                                    <span>Date: {date}</span>
                                </p>
                                <p className='flex items-center'>
                                    <VscTools className='text-lg' />
                                    <span>Product Name: {toolName}</span>
                                </p>
                                <p className='flex items-center'>
                                    <AiOutlineDollar className="text-lg" />
                                    <span>Price: ${totalToolPrice}</span>
                                </p>
                                <p className='flex items-center'>
                                    <FaRegCircleUser className="text-lg" />
                                    <span>Name: {customerName}</span>
                                </p>
                                <p className='flex items-center'>
                                    <MdOutlineMarkEmailUnread className="text-lg" />
                                    <span>Email: {customerEmail}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="modal-action justify-end">
                        <label
                            htmlFor="payment-information-modal"
                            className="btn btn-primary text-white"
                        >
                            OK
                        </label>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default PaymentInformationModal;