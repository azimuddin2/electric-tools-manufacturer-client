import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const ActiveLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            style={{
                color: match ? '#4158f3' : '#212121',
                fontWeight: match ? '600' : '500',
                borderLeft: match ? '3px solid #4158f3' : 'none',
                borderRadius: '0px',
                fontSize: '16px'
            }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default ActiveLink;