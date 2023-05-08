import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductRow from './ProductRow';

const ManageProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);
    const { data: tools, isLoading, refetch } = useQuery('tools', () => fetch('http://localhost:5000/tool', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>Manage Products: {tools.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tools.map((tool, index) => <ProductRow
                                key={tool._id}
                                tool={tool}
                                index={index}
                                refetch={refetch}
                                setDeletingProduct={setDeletingProduct}
                            ></ProductRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <DeleteConfirmModal
                    deletingProduct={deletingProduct}
                    refetch={refetch}
                    setDeletingProduct={setDeletingProduct}
                ></DeleteConfirmModal>
            }
        </div>
    );
};

export default ManageProducts;