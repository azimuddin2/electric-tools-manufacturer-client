import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductRow from './ProductRow';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-toastify';
import useTitle from '../../../hooks/useTitle';

const ManageProducts = () => {
    useTitle('Manage Products');
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: tools, isLoading, refetch } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/tools');
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteProduct = (tool) => {
        fetch(`http://localhost:5000/tool/${tool._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Tool ${tool.name} deleted successfully`)
                }
            })
    };

    const closeModal = () => {
        setDeletingProduct(null);
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='h-full p-4 lg:p-10'>
            <h1 className='text-2xl font-medium mb-5'>Manage Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>MinimumQuantity</th>
                            <th>AvailableQuantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tools?.map((tool, index) => <ProductRow
                                key={tool._id}
                                tool={tool}
                                index={index}
                                setDeletingProduct={setDeletingProduct}
                            ></ProductRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    modalData={deletingProduct}
                    closeModal={closeModal}
                    successModal={handleDeleteProduct}
                ></ConfirmationModal>
            }
        </section>
    );
};

export default ManageProducts;