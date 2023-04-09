import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Tool from './Tool';

const Tools = () => {

    const {data:tools, isLoading, error } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/tools')
            const data = await res.json()
            return data;
        }
    })

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p className='text-red-500'>error: {error.message}</p>
    }

    const toolsCollection = tools.slice(0, 6);

    return (
        <div className='px-8 mt-4 mb-12'>
            <h1 className='text-center font-bold text-primary text-xl'>What Our Have</h1>
            <h1 className='text-center text-4xl font-normal uppercase mb-10'>Electric Tools</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    toolsCollection?.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
            <div className='review-button'>
                <div className='review-border'></div>
                <button className='btn-review'>
                    {/* <Link className='text-white text-decoration-none'
                        to={'/reviews'}>SHOW ALL CARS
                        <FontAwesomeIcon className='ml-1' icon={faArrowRightLong}></FontAwesomeIcon>
                    </Link> */}
                </button>
                <div className='review-border'></div>
            </div>
        </div>
    );
};

export default Tools;