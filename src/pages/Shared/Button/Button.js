import React from 'react';

const Button = ({children}) => {
    return (
        <div>
            <button className='btn btn-md btn-primary text-white'>{children}</button>
        </div>
    );
};

export default Button;