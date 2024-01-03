import React from 'react';

const Button = ({ children }) => {
    return (
        <button className='btn btn-primary text-white'>{children}</button>
    );
};

export default Button;