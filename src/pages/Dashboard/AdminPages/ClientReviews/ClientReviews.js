import React from 'react';
import useReview from '../../../../hooks/useReview';
import Loading from '../../../Shared/Loading/Loading';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';
import useTitle from '../../../../hooks/useTitle';

const ClientReviews = () => {
    useTitle('Client Reviews');
    const [testimonials, isLoading, error] = useReview();

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            <div className='bg-white w-11/12 lg:w-4/5 mx-auto p-5 lg:p-10'>
                <h1 className='text-2xl mb-4 font-medium font-family'>Client Reviews Manage</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className='bg-gray-100 font-bold uppercase'>
                            <tr>
                                <th>No</th>
                                <th>Name & Email</th>
                                <th>Review Message</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientReviews;