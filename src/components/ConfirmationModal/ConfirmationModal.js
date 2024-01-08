import React from 'react';
import { PiWarningCircleThin } from "react-icons/pi";

const ConfirmationModal = ({ modalData, closeModal, successModal }) => {

    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className='mb-8'>
                        <PiWarningCircleThin style={{ color: '#f8bb86' }} className='text-8xl mx-auto' />
                        <h3 className="font-normal text-4xl text-center">Are you sure?</h3>
                        <p className="pt-4 text-center text-xl">Name: {modalData.name || modalData.toolName}</p>
                        {
                            modalData.email && <p className="text-center text-lg">Email: {modalData.email}</p>
                        }
                    </div>
                    <div className="modal-action justify-center">
                        <label
                            onClick={closeModal}
                            htmlFor="confirmation-modal"
                            className="btn btn-accent text-white"
                        >
                            Cancel
                        </label>
                        <label
                            onClick={() => successModal(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-error text-white"
                        >
                            Delete
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;