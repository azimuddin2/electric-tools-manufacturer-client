import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import { BiSearch } from 'react-icons/bi';
import Tool from '../../components/Tool/Tool';


const AllTools = () => {
    useTitle('Tools');
    const searchRef = useRef();
    const [search, setSearch] = useState('');

    const { data: tools, isLoading, error } = useQuery({
        queryKey: ['all-tools', search],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/all-tools?search=${search}`);
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
        <section className='max-w-screen-xl mx-auto px-6 lg:px-12 my-16'>
            <div className='relative mb-10 md:text-center'>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search..."
                    className="input input-primary w-72 lg:w-full max-w-xs lg:max-w-md input-bordered focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                    style={{ marginLeft: '-14px' }}
                    onClick={handleSearch}
                    className='btn btn-primary text-white absolute'
                >
                    <BiSearch className='text-2xl'></BiSearch>
                </button>
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

export default AllTools;