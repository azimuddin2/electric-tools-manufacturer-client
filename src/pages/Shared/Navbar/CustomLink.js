import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link className='lg:mr-1 mb-1 lg:mb-0 rounded-md'
            style={{
                background: match ? '#4158f3' : 'none',
                fontWeight: match ? '600' : '500'
            }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;