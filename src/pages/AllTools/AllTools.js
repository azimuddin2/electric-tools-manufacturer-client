import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import { IoSearch } from "react-icons/io5";
import Tool from '../../components/Tool/Tool';
import useTitle from '../../hooks/useTitle';
import ErrorMessage from '../Shared/ErrorMessage/ErrorMessage';
import { useLoaderData } from 'react-router-dom';

const AllTools = () => {
    useTitle('All Tools');
    const searchRef = useRef();
    const [search, setSearch] = useState('');
    const { totalTools } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [toolsPerPage, setToolsPerPage] = useState(6);

    const totalPages = Math.ceil(totalTools / toolsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];

    const options = [3, 4, 5, 6, 7, 8, 9];
    const handleSelectChange = (event) => {
        setToolsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    };

    const { data: tools, isLoading, error } = useQuery({
        queryKey: ['all-tools', currentPage, toolsPerPage, search],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/all-tools?page=${currentPage}&limit=${toolsPerPage}&search=${search}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    return (
        <section className='max-w-screen-lg lg:mx-auto mx-5 my-12 lg:my-16'>
            <div className='text-center'>
                <div className="join w-full lg:w-1/2 mb-10">
                    <input
                        type='text'
                        ref={searchRef}
                        className="input input-sm w-full rounded input-bordered join-item focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Search for tool"
                    />
                    <button
                        className="btn btn-sm join-item rounded bg-primary hover:bg-primary text-white"
                        onClick={handleSearch}
                    >
                        <IoSearch className='text-xl' />
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tools?.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
            {/* pagination */}
            <div className='text-center mt-10 mb-2 w-full mx-auto'>
                {
                    pageNumbers?.map(number => <button
                        onClick={() => setCurrentPage(number)}
                        className={`btn btn-sm mr-2 ${currentPage === number ? 'bg-primary text-white hover:bg-primary' : 'bg-white'}`}
                        key={number}
                    >{number + 1}</button>)
                }
                <select
                    className='select select-sm select-bordered'
                    value={toolsPerPage}
                    onChange={handleSelectChange}
                >
                    {
                        options.map(option => <option
                            key={option}
                            value={option}
                        >{option}</option>)
                    }
                </select>
            </div>
        </section>
    );
};

export default AllTools;