import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading';
import ProductRow from './ProductRow';
import UpdateProductModal from '../UpdateProductModal/UpdateProductModal';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import useTitle from '../../../../hooks/useTitle';
import { useLoaderData } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import ErrorMessage from '../../../Shared/ErrorMessage/ErrorMessage';

const ManageProducts = () => {
    useTitle('Manage Products');
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [updateProduct, setUpdateProduct] = useState(null);
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

    const { data: tools, isLoading, error, refetch } = useQuery({
        queryKey: ['all-tools', currentPage, toolsPerPage, search],
        queryFn: async () => {
            const res = await fetch(`https://electric-tools-manufacturer-server-two.vercel.app/all-tools?page=${currentPage}&limit=${toolsPerPage}&search=${search}`);
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteProduct = (tool) => {
        fetch(`https://electric-tools-manufacturer-server-two.vercel.app/tool/${tool._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Tool ${tool.name} deleted successfully`);
                }
            })
    };

    const closeModal = () => {
        setDeletingProduct(null);
    };

    if (error) {
        return <ErrorMessage message={error.message}></ErrorMessage>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='bg-gray-50 min-h-screen py-12 lg:py-16'>
            <div className='bg-white w-11/12 mx-auto p-5 lg:p-10'>
                <div>
                    <div className='lg:flex items-center justify-between mb-3 lg:mb-5'>
                        <h2 className='text-xl lg:text-2xl text-secondary font-medium font-family'>Manage Products</h2>
                        <div className="join w-full lg:w-1/2 mt-2 lg:mt-0 flex">
                            <input
                                type='text'
                                ref={searchRef}
                                className="input input-sm w-full rounded input-bordered join-item focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="Search for tool..."
                            />
                            <button
                                className="btn btn-sm join-item rounded bg-primary hover:bg-secondary text-white"
                                onClick={handleSearch}
                            >
                                <IoSearch className='text-xl' />
                            </button>
                        </div>
                    </div>
                    <div>
                        {
                            search && <h2 className='text-lg flex justify-end text-primary mb-1'>Matching Results: 0{tools?.length}</h2>
                        }
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className='bg-gray-100 font-bold'>
                            <tr>
                                <th>No</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>MinimumQuantity</th>
                                <th>AvailableQuantity</th>
                                <th>Product Rating Star</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tools?.map((tool, index) => <ProductRow
                                    key={tool._id}
                                    tool={tool}
                                    index={index}
                                    setUpdateProduct={setUpdateProduct}
                                    setDeletingProduct={setDeletingProduct}
                                ></ProductRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* pagination */}
            <div className='text-center mt-6 mb-2 w-full mx-auto'>
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
            {
                updateProduct && <UpdateProductModal
                    updateProduct={updateProduct}
                    setUpdateProduct={setUpdateProduct}
                    refetch={refetch}
                ></UpdateProductModal>
            }
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