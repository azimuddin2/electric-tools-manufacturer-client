import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            style={{
                color: match ? '#4158f3' : 'white',
                fontWeight: match ? '700' : '500',
                borderBottom: match ? '2px solid #4158f3' : 'none',
            }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;