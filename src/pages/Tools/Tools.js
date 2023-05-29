import React, { useRef, useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import Tool from '../../components/Tool';
import useTitle from '../../hooks/useTitle';

const Tools = () => {
    useTitle('Tools');
    const searchRef = useRef();
    const [search, setSearch] = useState('');

    const { data: tools, isLoading, error } = useQuery({
        queryKey: ['all-tools', search],
        queryFn: async () => {
            const res = await fetch(`https://electric-tools-server-seven.vercel.app/all-tools?search=${search}`);
            const data = await res.json();
            return data;
        }
    });

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <p className='text-red-500 text-center'>error: {error.message}</p>
    }

    return (
        <section className='max-w-screen-xl mx-auto px-6 lg:px-12 my-20'>
            <div className='text-center'>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered input-primary w-full max-w-xs"
                />
                <button onClick={handleSearch} className='btn btn-primary text-white'>Search</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    tools?.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
        </section>
    );
};

export default Tools;