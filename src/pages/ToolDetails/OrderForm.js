import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ tool }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, price, minimumQuantity, availableQuantity } = tool;
    const [check, setCheck] = useState(0);
    const navigate = useNavigate();

    const handleOrder = event => {
        event.preventDefault();
        const order = {
            toolId: _id,
            toolName: name,
            toolPrice: price,
            customerName: user?.displayName,
            customerEmail: user?.email,
            customerPhone: event.target.phone.value,
            customerAddress: event.target.address.value,
            orderQuantity: event.target.quantity.value,
        };

        fetch('https://electric-tools-server-seven.vercel.app/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order Complete');
                    navigate('/dashboard');
                }
            })
    };

    return (
        <div className='flex justify-center'>
            <div className=" w-full">
                <div className="card-body p-5 lg:p-8">
                    <h2 className="text-center text-primary font-medium text-3xl mb-2">Please Order</h2>
                    <form
                        onSubmit={handleOrder}
                        className='grid grid-cols-1 gap-4 justify-items-center my-6'
                    >
                        <div className="form-control w-full max-w-md">
                            <input
                                type="text"
                                name='name'
                                disabled
                                defaultValue={user?.displayName || ''}
                                className="input input-bordered w-full max-w-md"
                            />
                        </div>

                        <div className="form-control w-full max-w-md">
                            <input
                                type="email"
                                name='email'
                                disabled
                                defaultValue={user?.email || ''}
                                className="input input-bordered w-full max-w-md"
                            />
                        </div>

                        <div className="form-control w-full max-w-md">
                            <input
                                type="text"
                                name='address'
                                placeholder="Address"
                                required
                                className="input input-bordered w-full max-w-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="form-control w-full max-w-md">
                            <input
                                type="text"
                                name='phone'
                                placeholder="Phone Number"
                                required
                                className="input input-bordered w-full max-w-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="form-control w-full max-w-md">
                            <input
                                type="text"
                                name='tool'
                                value={name}
                                disabled
                                className="input input-bordered w-full max-w-md"
                            />
                        </div>

                        <div className="form-control w-full max-w-md">
                            <input
                                type='text'
                                name='price'
                                value={`Price: $${price}`}
                                disabled
                                className="input input-bordered w-full max-w-md"
                            />
                        </div>

                        <div className="form-control w-full max-w-md">
                            <input
                                onChange={(event) => setCheck(event.target.value)}
                                type="number"
                                name='quantity'
                                placeholder='Order Quantity'
                                className="input input-bordered w-full max-w-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            {
                                check < minimumQuantity && <span className="label-text-alt text-red-500 text-sm text-center"> Minimum Order Quantity/ 0{minimumQuantity}</span>
                            }
                            {
                                check > availableQuantity && <span className="label-text-alt text-red-600 text-sm text-center">Available Order Quantity/ {availableQuantity}</span>

                            }
                        </div>

                        <input
                            disabled={check < minimumQuantity || check > availableQuantity}
                            className='btn btn-primary text-white w-full max-w-md mt-4'
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