import React from 'react';
import Loading from '../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import Tool from '../../components/Tool';

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
        return <p className='text-red-500 text-center'>error: {error.message}</p>
    }

    return (
        <div className='max-w-screen-xl mx-auto px-6 lg:px-12 my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                tools?.map(tool => <Tool
                    key={tool._id}
                    tool={tool}
                ></Tool>)
            }
        </div>
    );
};

export default Tools;