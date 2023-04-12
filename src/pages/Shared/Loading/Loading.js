import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <ReactLoading
                type='spinningBubbles'
                color='#4158f3'
                height='60px'
                width='60px'
            />
        </div>
    );
};

export default Loading;