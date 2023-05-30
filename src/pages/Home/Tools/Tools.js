import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import Tool from '../../../components/Tool';

const Tools = () => {

    const { data: tools, isLoading, error } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('https://electric-tools-server-seven.vercel.app/tools');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        return <p className='text-red-500 text-center'>error: {error.message}</p>
    }

    const toolsCollection = tools.slice(0, 6);

    return (
        <div className='px-6 lg:px-8 mb-12'>
            <div className='text-center mb-10'>
                <h1 className='font-semibold text-primary text-lg'>What Our Have</h1>
                <h1 className='text-3xl leading-snug text-secondary'>Electric Tools</h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    toolsCollection?.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
            <div className="divider mt-14">
                <Link to='/tools'>
                    <button className='btn btn-sm btn-outline'>SHOW ALL TOOLS</button>
                </Link>
            </div>
        </div>
    );
};

export default Tools;