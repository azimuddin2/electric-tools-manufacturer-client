import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className='my-20'>
            <p className='text-red-500 text-center'>error: {message}</p>
        </div>
    );
};

export default ErrorMessage;