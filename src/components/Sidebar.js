import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Sidebar = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            style={{
                color: match ? '#4158f3' : '',
                fontWeight: match ? '500' : '',
                borderLeft: match ? '3px solid #4158f3' : '',
                borderRadius: '0px',
            }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default Sidebar;