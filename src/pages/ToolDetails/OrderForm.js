import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const OrderForm = ({ tool }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, price, minimumQuantity, availableQuantity } = tool;
    const [check, setCheck] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const orderInfo = {
            toolId: _id,
            toolName: name,
            toolPrice: price,
            customerName: user?.displayName,
            customerEmail: user?.email,
            customerPhone: event.target.phone.value,
            customerAddress: event.target.address.value,
            orderQuantity: event.target.quantity.value,
        };

        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order Complete! Please Payment');
                    navigate('/dashboard');
                }
            })
    };

    return (
        <div className='flex justify-center'>
            <div className="w-full">
                <div className="card-body p-5 lg:p-8">
                    <h2 className="text-center text-secondary font-medium text-3xl mb-2">Please Order</h2>
                    <form
                        onSubmit={handleSubmit}
                        className='grid grid-cols-1 gap-4 justify-items-center my-6'
                    >
                        <div className="form-control w-full">
                            <input
                                type="text"
                                name='name'
                                disabled
                                defaultValue={user?.displayName || ''}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="email"
                                name='email'
                                disabled
                                defaultValue={user?.email || ''}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="text"
                                name='address'
                                placeholder="Address"
                                required
                                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="text"
                                name='phone'
                                placeholder="Phone Number"
                                required
                                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="text"
                                name='tool'
                                value={name}
                                disabled
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                type='text'
                                name='price'
                                value={`Price: $${price}`}
                                disabled
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                onChange={(event) => setCheck(event.target.value)}
                                type="number"
                                name='quantity'
                                placeholder='Order Quantity'
                                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            {
                                check < minimumQuantity && <span className="label-text-alt text-red-500 font-medium text-sm flex items-center mt-2 ml-2"><MdErrorOutline className='text-xl' /> Minimum Order Quantity/ 0{minimumQuantity}</span>
                            }
                            {
                                check > availableQuantity && <span className="label-text-alt text-red-500 font-medium text-sm flex items-center mt-2 ml-2"><MdErrorOutline className='text-xl' /> Available Order Quantity/ {availableQuantity}</span>
                            }
                        </div>
                        <input
                            disabled={check < minimumQuantity || check > availableQuantity}
                            className='btn btn-primary text-white w-full mt-3'
                            type="submit"
                            value='Order'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;