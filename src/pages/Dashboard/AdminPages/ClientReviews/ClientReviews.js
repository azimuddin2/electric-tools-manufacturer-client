import React, { useState } from 'react';
import useReview from '../../../../hooks/useReview';
import Loading from '../../../Shared/Loading/Loading';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';
import useTitle from '../../../../hooks/useTitle';
import ClientReviewRow from './ClientReviewRow';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-toastify';

const ClientReviews = () => {
    useTitle('Client Reviews');
    const [testimonials, isLoading, error, refetch] = useReview();
    const [deletingReview, setDeletingReview] = useState(null);

    const handleDeleteReview = (review) => {
        fetch(`http://localhost:5000/review/${review._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.deletedCount > 0) {
                    refetch();
                    toast.success('Review deleted successfully');
                }
            })
    };

    const closeModal = () => {
        setDeletingReview(null);
    };

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
                                <th>Avatar</th>
                                <th>Name & Email</th>
                                <th>Review Message</th>
                                <th>Review Rating Star</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testimonials?.map((review, index) => <ClientReviewRow
                                    key={review._id}
                                    index={index}
                                    review={review}
                                    setDeletingReview={setDeletingReview}
                                ></ClientReviewRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingReview && <ConfirmationModal
                    modalData={deletingReview}
                    successModal={handleDeleteReview}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ClientReviews;