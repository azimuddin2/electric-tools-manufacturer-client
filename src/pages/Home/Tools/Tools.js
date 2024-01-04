import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import Tool from '../../../components/Tool/Tool';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import { IoArrowForwardCircleOutline } from "react-icons/io5"

const Tools = () => {

    const { data: tools, isLoading, error } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/tools');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    const toolsCollection = tools.slice(0, 6);

    return (
        <section className='max-w-screen-lg lg:mx-auto mx-5 mb-12'>
            <div className='text-center mb-10'>
                <h1 className='font-semibold text-primary text-lg'>What Our Have</h1>
                <h1 className='text-3xl leading-snug text-secondary'>Electric Tools</h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    toolsCollection?.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
            <div className="mt-10 text-center">
                <Link to='/tools'>
                    <button className='btn btn-sm btn-outline btn-primary'>
                        SHOW ALL TOOLS <IoArrowForwardCircleOutline className='text-xl'/>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Tools;